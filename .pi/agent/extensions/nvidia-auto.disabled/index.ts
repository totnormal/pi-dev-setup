/**
 * nvidia-auto — Virtual model with automatic failover through free NVIDIA models.
 *
 * Registers "nvidia-auto/auto" as a single model in /model.
 * Uses before_provider_request to swap "auto" for a real model ID.
 * On failure, message_end advances the chain so pi's retry tries a new model.
 *
 * Chain: deepseek-v4-flash → qwen3.5-397b → kimi-k2.6 → llama-3.3-70b → ...
 */

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

// ─── Fallback chain (ordered by reliability/speed) ─────────────────────────

const CHAIN = [
  "deepseek-ai/deepseek-v4-flash",
  "qwen/qwen3.5-397b-a17b",
  "moonshotai/kimi-k2.6",
  "mistralai/mistral-medium-3.5-128b",
  "meta/llama-3.3-70b-instruct",
  "mistralai/mistral-nemotron",
  "nvidia/nemotron-3-super-120b-a12b",
  "mistralai/mistral-large-3-675b-instruct-2512",
  "qwen/qwen3-coder-480b-a35b-instruct",
  "meta/llama-4-maverick-17b-128e-instruct",
  "nvidia/nemotron-3-ultra-550b-a55b",
  "qwen/qwen3.5-122b-a10b",
  "mistralai/mistral-small-4-119b-2603",
  "nvidia/llama-3.3-nemotron-super-49b-v1.5",
  "google/gemma-4-31b-it",
  "abacusai/dracarys-llama-3.1-70b-instruct",
  "microsoft/phi-4-multimodal-instruct",
  "qwen/qwen3-next-80b-a3b-instruct",
  "minimaxai/minimax-m2.7",
  "deepseek-ai/deepseek-v4-flash",
];

// ─── State ─────────────────────────────────────────────────────────────────

let chainIndex = 0;
let lastUsedModel = CHAIN[0];
let modelFailTimes = new Map<string, number>(); // model → last-fail timestamp
let consecutiveFailures = 0; // resets to 0 on any success
const MODEL_COOLDOWN_MS = 60_000; // skip models that failed within last 60s

function resetChain() {
  chainIndex = 0;
  consecutiveFailures = 0;
}

/** Pick the first model in chain order that isn't in cooldown. */
function pickModel(): string {
  const now = Date.now();
  for (let i = 0; i < CHAIN.length; i++) {
    const idx = (chainIndex + i) % CHAIN.length;
    const m = CHAIN[idx];
    const failTime = modelFailTimes.get(m);
    if (!failTime || now - failTime > MODEL_COOLDOWN_MS) {
      chainIndex = idx;
      lastUsedModel = m;
      return m;
    }
  }
  // Everything in cooldown — fall back to chainIndex (don't block forever)
  lastUsedModel = CHAIN[chainIndex];
  return lastUsedModel;
}

/** Mark a model as failed (enters cooldown). */
function markFailed(model: string) {
  modelFailTimes.set(model, Date.now());
}

// ─── Garbled output detection ──────────────────────────────────────────────

function detectGarbledOutput(msg: any): boolean {
  if (!msg.content) return false;
  for (const block of msg.content) {
    if (block.type !== "text" || !block.text) continue;
    const text = block.text;
    if (text.length < 80) continue;
    const junk = text.replace(
      /[a-zA-Z0-9\s.,!?;:'"()\[\]{}\-_/\\@#$%^&*+=<>~`\n\r\t]/g,
      ""
    );
    if (junk.length / text.length > 0.12) return true;
    const lines = text.split("\n");
    const unique = new Set(lines.map((l: string) => l.trim()).filter(Boolean));
    if (lines.length > 6 && unique.size < lines.length * 0.25) return true;
    if (/(.{8,}?)\1{3,}/.test(text)) return true;
  }
  return false;
}

// ─── Extension ─────────────────────────────────────────────────────────────

export default function (pi: ExtensionAPI) {
  // ── Register the virtual provider + model ──────────────────────────────

  pi.registerProvider("nvidia-auto", {
    name: "NVIDIA Auto (Free Fallback)",
    baseUrl: "https://integrate.api.nvidia.com/v1",
    apiKey: "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",
    api: "openai-completions",
    authHeader: true,
    models: [
      {
        id: "auto",
        name: "NVIDIA Auto (free failover)",
        reasoning: true,
        input: ["text"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 262144,
        maxTokens: 16384,
        compat: {
          maxTokensField: "max_tokens",
          supportsDeveloperRole: false,
          supportsReasoningEffort: false,
          supportsStore: false,
          supportsUsageInStreaming: false,
        },
      },
    ],
  });

  // ── Reset on new session ───────────────────────────────────────────────

  pi.on("session_start", async () => {
    resetChain();
    modelFailTimes.clear();
  });

  // ── Swap model in outgoing request ─────────────────────────────────────
  //
  // Key insight: check payload.model === "auto" rather than ctx.model.provider,
  // because ctx.model may not reflect nvidia-auto at hook time.

  pi.on("before_provider_request", (event, ctx) => {
    const payload = event.payload as Record<string, any>;
    if (!payload || payload.model !== "auto") return;

    const actualModel = pickModel();

    ctx.ui.notify(
      `🔵 nvidia-auto → ${actualModel} [${chainIndex + 1}/${CHAIN.length}]`,
      "info"
    );

    // Return modified payload with the real model ID
    return { ...payload, model: actualModel };
  });

  // ── Advance chain on failure ───────────────────────────────────────────

  pi.on("message_end", async (event, ctx) => {
    // Detect nvidia-auto by checking if model was auto
    const msg = event.message;
    if (msg.role !== "assistant") return;

    // Only handle if we're on the nvidia-auto provider
    if (ctx.model?.provider !== "nvidia-auto" && ctx.model?.id !== "auto") return;

    const isErr = msg.stopReason === "error";
    const errMsg = (msg.errorMessage ?? "").toLowerCase();

    const hasContent = msg.content?.some(
      (c: any) =>
        (c.type === "text" && c.text?.trim().length > 0) ||
        c.type === "toolCall"
    );
    const isEmpty = !hasContent && msg.stopReason !== "toolUse";
    const isGarbled = detectGarbledOutput(msg);

    // ── SUCCESS: reset to best model, clear failure streak ──────────────
    if (!isErr && !isEmpty && !isGarbled) {
      if (chainIndex !== 0 || consecutiveFailures !== 0) {
        ctx.ui.notify(
          `✅ ${lastUsedModel} succeeded — resetting to primary model`,
          "info"
        );
      }
      resetChain();
      return;
    }

    // ── FAILURE: mark model, advance chain ──────────────────────────────
    const failedModel = lastUsedModel;
    markFailed(failedModel);
    consecutiveFailures++;

    // Advance past current; pickModel() will skip cooled-down ones next time
    chainIndex = (chainIndex + 1) % CHAIN.length;

    const reason = isErr
      ? `Error: ${errMsg.slice(0, 80)}`
      : isGarbled
        ? "Garbled output"
        : "Empty response";

    ctx.ui.notify(
      `⚡ ${failedModel} failed (${reason}). Next: ${pickModel()}`,
      "warning"
    );

    // ── FORCE-RETRY garbled/empty output ─────────────────────────────────
    // pi only retries stopReason="error". Garbled/empty have stopReason="stop",
    // so pi accepts them as success and the agent receives garbage. By mutating
    // the message to an error with a retryable errorMessage, pi's _isRetryableError
    // returns true → pi retries → _prepareRetry removes this bad message from
    // agent state and re-requests with the next model (chain already advanced).
    if (isGarbled || isEmpty) {
      msg.stopReason = "error";
      msg.errorMessage = isGarbled
        ? "provider returned error: garbled output detected"
        : "provider returned error: empty response";
    }
  });

  // ── /nvidia-auto command ───────────────────────────────────────────────

  pi.registerCommand("nvidia-auto", {
    description: "Switch to nvidia-auto/auto (free model with automatic failover)",
    handler: async (_args, ctx) => {
      const model = ctx.modelRegistry.find("nvidia-auto", "auto");
      if (!model) {
        ctx.ui.notify("nvidia-auto/auto model not found", "error");
        return;
      }
      const ok = await pi.setModel(model);
      if (ok) {
        ctx.ui.notify(
          `Switched to nvidia-auto/auto. Starting with ${CHAIN[chainIndex]}. Will auto-rotate on failure.`,
          "info"
        );
      } else {
        ctx.ui.notify("No API key for nvidia-auto.", "error");
      }
    },
  });
}
