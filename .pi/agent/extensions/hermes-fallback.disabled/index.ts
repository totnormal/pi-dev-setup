/**
 * hermes-fallback - Automatic model fallback for pi
 *
 * When the active model fails (error, timeout, rate limit, stall, garbled output),
 * automatically switches to the next model in a fallback chain so Hermes never stalls.
 *
 * Strategy:
 *   - Hooks into message_end to detect failures
 *   - Switches to next model in chain BEFORE pi's retry fires
 *   - pi's built-in retry then uses the NEW model
 *   - After all fallbacks exhausted, reverts to original model
 */

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

// ─── Vision routing ────────────────────────────────────────────────────
// When the current model does NOT support image input, routes image-bearing
// turns to a dedicated vision-capable model with its own fallback chain.
// On failure, falls back to the session model (not the normal fallback chain).
// Restores the session model on the next non-image turn.

const VISION_CHAIN: FallbackEntry[] = [
  // Cheap, fast, verified vision: dedicated VL model
  { provider: "openrouter", model: "qwen/qwen3-vl-8b-instruct" },
  // Fallback: stronger general vision
  { provider: "openrouter", model: "google/gemini-2.5-flash" },
];

let visionActive = false;       // currently routing an image-bearing turn
let visionIndex = -1;           // which vision model in VISION_CHAIN
let preVisionProvider: string | null = null;  // session model to restore
let preVisionModel: string | null = null;

// ─── Fallback chain ───────────────────────────────────────────────────────
// INTERLEAVED across providers so a different rate-limit pool is available
// early. When NVIDIA hits a 5-hour rate ban, all NVIDIA models fail together —
// interleaving groq/cerebras/zai means recovery after 1-2 failures instead of 9.

interface FallbackEntry {
  provider: string;
  model: string;
}

const FALLBACK_CHAIN: FallbackEntry[] = [
  // ── Tier 1: best model from each independent rate-limit pool ──────────
  { provider: "nvidia", model: "deepseek-ai/deepseek-v4-flash" },
  { provider: "groq", model: "llama-3.3-70b-versatile" },
  { provider: "cerebras", model: "llama-3.3-70b" },
  { provider: "zai", model: "glm-5.1" },
  { provider: "cline", model: "minimax/minimax-m2.5" },
  // ── Tier 2: alternate NVIDIA models (same pool but different endpoints) ─
  { provider: "nvidia", model: "qwen/qwen3.5-397b-a17b" },
  { provider: "nvidia", model: "moonshotai/kimi-k2.6" },
  // ── Tier 3: more variety from each pool ────────────────────────────────
  { provider: "groq", model: "deepseek-r1-distill-llama-70b" },
  { provider: "nvidia", model: "mistralai/mistral-large-3-675b-instruct-2512" },
  { provider: "nvidia", model: "qwen/qwen3-coder-480b-a35b-instruct" },
  { provider: "nvidia", model: "meta/llama-4-maverick-17b-128e-instruct" },
];

// Max failures per model before blacklisting it for the rest of the session
const MAX_MODEL_FAILURES = 2;

// Providers that should NOT trigger fallback on first failure.
// Local models (ollama, lm-studio, etc.) need warmup time and may produce
// transient timeouts/empty responses during cold start. Let pi's built-in
// retry handle them instead of prematurely switching to cloud fallback.
const SKIP_PROVIDERS = new Set([
  "ollama",
  "lm-studio",
  "lmstudio",
  "local",
  "llama-cpp",
  "koboldcpp",
  "vllm",
  "mlc",
  "omlx",
]);

// For skipped providers, allow this many failures before falling back anyway.
// Prevents a permanently-broken local model from stalling forever.
const LOCAL_FAILURE_THRESHOLD = 3;

// ─── State ─────────────────────────────────────────────────────────────────

let fallbackIndex = -1; // -1 = using original model
let originalProvider: string | null = null;
let originalModel: string | null = null;
let modelFailureCounts = new Map<string, number>();
let isFalling = false; // prevent re-entrant fallback during switch

function modelKey(provider: string, model: string): string {
  return `${provider}/${model}`;
}

function resetChain() {
  fallbackIndex = -1;
}

function recordFailure(provider: string, model: string): number {
  const key = modelKey(provider, model);
  const count = (modelFailureCounts.get(key) ?? 0) + 1;
  modelFailureCounts.set(key, count);
  return count;
}

function isModelExhausted(provider: string, model: string): boolean {
  return (modelFailureCounts.get(modelKey(provider, model)) ?? 0) >= MAX_MODEL_FAILURES;
}

function getNextFallback(): FallbackEntry | null {
  for (let i = fallbackIndex + 1; i < FALLBACK_CHAIN.length; i++) {
    const entry = FALLBACK_CHAIN[i];
    if (!isModelExhausted(entry.provider, entry.model)) {
      return entry;
    }
  }
  return null;
}

// ─── Garbled output detection ──────────────────────────────────────────────

function detectGarbledOutput(msg: any): boolean {
  if (!msg.content) return false;

  for (const block of msg.content) {
    if (block.type !== "text" || !block.text) continue;
    const text = block.text;
    if (text.length < 100) continue;

    // High ratio of non-standard characters
    const nonAlphaNum = text.replace(
      /[a-zA-Z0-9\s.,!?;:'"()\[\]{}\-_ /\\@#$%^&*+=<>~`]/g,
      ""
    );
    if (nonAlphaNum.length / text.length > 0.15) return true;

    // Line duplication
    const lines = text.split("\n");
    const unique = new Set(lines.map((l: string) => l.trim()).filter(Boolean));
    if (lines.length > 8 && unique.size < lines.length * 0.3) return true;

    // Pattern repetition
    if (text.match(/(.{10,}?)\1{3,}/)) return true;
  }

  return false;
}

// ─── Extension ─────────────────────────────────────────────────────────────

export default function (pi: ExtensionAPI) {
  pi.on("session_start", async () => {
    fallbackIndex = -1;
    modelFailureCounts.clear();
    isFalling = false;
    originalProvider = null;
    originalModel = null;
    visionActive = false;
    visionIndex = -1;
    preVisionProvider = null;
    preVisionModel = null;
  });

  // Capture the user's intended model before any fallback
  pi.on("model_select", async (event) => {
    if (!isFalling) {
      originalProvider = event.model.provider;
      originalModel = event.model.id;
    }
  });

  // ── Detect image-bearing turns and route to vision model ──────────────
  pi.on("before_agent_start", async (event, ctx) => {
    const hasImages = Array.isArray(event.images) && event.images.length > 0;

    if (hasImages) {
      // Session model already supports images — no routing needed
      if (ctx.model?.input?.includes("image")) {
        if (visionActive) {
          // Session model was restored but we're still flagged — clear
          visionActive = false;
          visionIndex = -1;
          preVisionProvider = null;
          preVisionModel = null;
        }
        return;
      }

      // Save the session model (only on first image turn)
      if (!visionActive && ctx.model) {
        preVisionProvider = ctx.model.provider;
        preVisionModel = ctx.model.id;
      }

      // Start vision chain from the top
      visionIndex = 0;
      visionActive = true;

      const target = VISION_CHAIN[0];
      // Skip if already on this vision model (should not happen, but safe)
      if (ctx.model?.provider === target.provider && ctx.model?.id === target.model) return;

      isFalling = true;
      const t = ctx.modelRegistry.find(target.provider, target.model);
      if (t) {
        const ok = await pi.setModel(t);
        if (!ok) {
          // First vision model unavailable — try next
          visionIndex = 1;
          const t2 = ctx.modelRegistry.find(VISION_CHAIN[1].provider, VISION_CHAIN[1].model);
          if (t2) await pi.setModel(t2);
          // If both fail, just stay on session model
        }
      }
      isFalling = false;
      return;
    }

    // ── No images in this turn: restore session model if we were in vision mode ─
    if (visionActive && preVisionProvider && preVisionModel) {
      isFalling = true;
      const t = ctx.modelRegistry.find(preVisionProvider, preVisionModel);
      if (t) await pi.setModel(t);
      visionActive = false;
      visionIndex = -1;
      preVisionProvider = null;
      preVisionModel = null;
      isFalling = false;
    }
  });

  // Watch for failures and switch models
  pi.on("message_end", async (event, ctx) => {
    const msg = event.message;
    if (msg.role !== "assistant") return;
    if (isFalling) return;

    // ── Vision turn failure handling ──────────────────────────────────
    // Runs BEFORE the normal fallback chain. If we're in vision mode and a
    // failure is detected, advance the vision chain or restore the session
    // model. Never run the normal fallback chain during a vision turn.
    if (visionActive) {
      const provider = msg.provider ?? ctx.model?.provider;
      const modelId = msg.model ?? ctx.model?.id;
      if (!provider || !modelId) return;

      const isErr = msg.stopReason === "error";
      const hasContent = msg.content?.some(
        (c: any) =>
          (c.type === "text" && c.text?.trim().length > 0) ||
          c.type === "toolCall"
      );
      const isEmpty = !hasContent && msg.stopReason !== "toolUse";
      const isGarbled = detectGarbledOutput(msg);

      // Success — keep vision model (restore happens at next before_agent_start)
      if (!isErr && !isEmpty && !isGarbled) return;

      // Force retry-able error for empty/garbled
      if (isGarbled || isEmpty) {
        msg.stopReason = "error";
        msg.errorMessage = isGarbled
          ? "provider returned error: garbled output detected"
          : "provider returned error: empty response";
      }

      // Try next vision model in chain
      const nextVision = VISION_CHAIN[visionIndex + 1];
      if (nextVision) {
        visionIndex++;
        isFalling = true;
        const t = ctx.modelRegistry.find(nextVision.provider, nextVision.model);
        if (t) {
          ctx.ui.notify(
            `👁️ Vision model failed — trying ${nextVision.model.split('/').pop()}`,
            "warning"
          );
          await pi.setModel(t);
        }
        isFalling = false;
      } else {
        // All vision models exhausted — restore session model
        isFalling = true;
        if (preVisionProvider && preVisionModel) {
          const t = ctx.modelRegistry.find(preVisionProvider, preVisionModel);
          if (t) {
            ctx.ui.notify(
              `👁️ All vision models exhausted — returning to ${preVisionModel?.split('/').pop()}`,
              "warning"
            );
            await pi.setModel(t);
          }
        }
        visionActive = false;
        visionIndex = -1;
        preVisionProvider = null;
        preVisionModel = null;
        isFalling = false;
      }
      return; // never run normal fallback chain during vision turn
    }

    // Skip if nvidia-auto is handling its own failover
    const activeProvider = ctx.model?.provider;
    if (activeProvider === "nvidia-auto") return;

    const provider = msg.provider ?? activeProvider;
    const modelId = msg.model ?? ctx.model?.id;
    if (!provider || !modelId) return;

    // ── Local model grace period ──────────────────────────────────────
    // Local providers (ollama, lm-studio, etc.) need warmup time and may
    // produce transient failures on cold start. Don't fallback until we've
    // seen enough failures to rule out a simple slow start.
    const isLocalProvider = SKIP_PROVIDERS.has(provider.toLowerCase());

    const isErr = msg.stopReason === "error";
    const errMsg = (msg.errorMessage ?? "").toLowerCase();

    // No content and not a tool-use turn
    const hasContent = msg.content?.some(
      (c: any) =>
        (c.type === "text" && c.text?.trim().length > 0) ||
        c.type === "toolCall"
    );
    const isEmpty = !hasContent && msg.stopReason !== "toolUse";

    const isGarbled = detectGarbledOutput(msg);

    // ── SUCCESS on fallback: silently reset failure tracking ──
    // No notification here: printing recovery status mid-task would interrupt
    // the agent's flow — the agent would stop and read the notification instead
    // of continuing the work. The user can check the current model with /model.
    if (!isErr && !isEmpty && !isGarbled) {
      if (fallbackIndex >= 0) {
        if (originalProvider && originalModel) {
          modelFailureCounts.delete(modelKey(originalProvider, originalModel));
        }
        resetChain();
      }
      return;
    }

    // ── FAILURE detected (error / garbled / empty) ─────────────────────

    // FORCE-RETRY garbled/empty output: pi only retries stopReason="error",
    // but garbled/empty arrive as stopReason="stop" so pi would accept them
    // as success and the agent receives garbage. Mutate the message to a
    // retryable error (matches pi's "provider returned error" pattern) so
    // pi retries WITHIN this turn using the model we switch to below.
    if (isGarbled || isEmpty) {
      msg.stopReason = "error";
      msg.errorMessage = isGarbled
        ? "provider returned error: garbled output detected"
        : "provider returned error: empty response";
    }

    const failCount = recordFailure(provider, modelId);

    // Local provider: only fallback after threshold exceeded (not on first hiccup)
    if (isLocalProvider && failCount < LOCAL_FAILURE_THRESHOLD) {
      ctx.ui.notify(
        `⏳ ${modelKey(provider, modelId)} slow/fail #${failCount}/${LOCAL_FAILURE_THRESHOLD} — giving local model more time`,
        "info"
      );
      return; // let pi's built-in retry handle it
    }

    const reason = isErr
      ? `Error: ${errMsg.slice(0, 100)}`
      : isGarbled
        ? "Garbled output"
        : "Empty response";

    const next = getNextFallback();
    if (!next) {
      if (originalProvider && originalModel) {
        ctx.ui.notify(
          `⚡ Switched back to ${originalModel?.split('/').pop() || originalModel} (all fallbacks exhausted)`,
          "warning"
        );
        isFalling = true;
        const t = ctx.modelRegistry.find(originalProvider, originalModel);
        if (t) await pi.setModel(t);
        resetChain();
        isFalling = false;
      } else {
        ctx.ui.notify(`⚡ All fallbacks exhausted — last model may be unreliable`, "warning");
        resetChain();
      }
      return;
    }

    fallbackIndex = FALLBACK_CHAIN.indexOf(next);
    isFalling = true;

    // Mini-notification: just the model name, no full path.
    // Keeps the context small — the agent should resume, not read a novel.
    ctx.ui.notify(
      `⚡ Switched to ${next.model.split('/').pop()} [${fallbackIndex + 1}/${FALLBACK_CHAIN.length}]`,
      "warning"
    );

    const t = ctx.modelRegistry.find(next.provider, next.model);
    if (t) {
      const ok = await pi.setModel(t);
      if (!ok) {
        recordFailure(next.provider, next.model);
      }
    }
    isFalling = false;
  });
}
