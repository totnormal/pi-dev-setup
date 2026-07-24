import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { execSync } from "node:child_process";

const OMNX_BIN = "/Users/andreitarnovski/node_modules/omniroute/bin/omniroute.mjs";
const OMNX_PORT = "20128";
const OMNX_BASE = `http://localhost:${OMNX_PORT}/v1`;
const FALLBACK_PROVIDER = "kilo";
const FALLBACK_MODEL_ID = "kilo-auto/free";
const FALLBACK_MODEL = `${FALLBACK_PROVIDER}/${FALLBACK_MODEL_ID}`;
const MAX_AUTO_FAILURES = 2;

const failureCount = new Map<string, number>();

function isOmniRouteRunning(): boolean {
  try {
    const output = execSync(`lsof -ti :${OMNX_PORT}`, {
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "ignore"],
    });
    return output.trim().length > 0;
  } catch {
    return false;
  }
}

async function execOmniRoute(args: string[]) {
  const result = await pi.exec("node", [OMNX_BIN, ...args], { timeout: 120_000 });
  return result;
}

async function ensureOmniRouteRunning(ctx: { ui: { notify: (message: string, type: string) => void } }) {
  if (isOmniRouteRunning()) {
    return true;
  }

  ctx.ui.notify("OmniRoute not running; starting it now...", "info");
  await execOmniRoute(["serve", `--port`, OMNX_PORT, "--no-open", "--daemon"]);
  await new Promise((r) => setTimeout(r, 2000));

  const started = isOmniRouteRunning();
  if (!started) {
    ctx.ui.notify("OmniRoute failed to start", "error");
  }
  return started;
}

function getModelKey(model: { provider?: string; id?: string } | undefined): string {
  if (!model) return "";
  return `${model.provider || ""}/${model.id || ""}`.toLowerCase();
}

async function switchToFallback(ctx: { ui: { notify: (message: string, type: string) => void }; modelRegistry: { find: (provider: string, modelId: string) => any } }) {
  try {
    const model = ctx.modelRegistry.find(FALLBACK_PROVIDER, FALLBACK_MODEL_ID);
    if (model) {
      const success = await pi.setModel(model);
      if (success) {
        ctx.ui.notify(`Switched to fallback model: ${FALLBACK_MODEL}`, "warning");
        return;
      }
    }
  } catch {
    // ignore
  }
  ctx.ui.notify(`Fallback model ${FALLBACK_MODEL} is not available`, "error");
}

export default function (pi: ExtensionAPI) {
  pi.registerCommand("omniroute-start", {
    description: "Start OmniRoute server locally (port 20128)",
    handler: async (_args, ctx) => {
      if (isOmniRouteRunning()) {
        ctx.ui.notify("OmniRoute is already running", "warning");
        return;
      }

      ctx.ui.notify("Starting OmniRoute...", "info");
      await execOmniRoute(["serve", `--port`, OMNX_PORT, "--no-open", "--daemon"]);
      await new Promise((r) => setTimeout(r, 2000));

      if (isOmniRouteRunning()) {
        ctx.ui.notify("OmniRoute started", "info");
      } else {
        ctx.ui.notify("OmniRoute failed to start", "error");
      }
    },
  });

  pi.registerCommand("omniroute-stop", {
    description: "Stop OmniRoute server",
    handler: async (_args, ctx) => {
      if (!isOmniRouteRunning()) {
        ctx.ui.notify("OmniRoute is not running", "warning");
        return;
      }

      ctx.ui.notify("Stopping OmniRoute...", "info");
      await execOmniRoute(["stop"]);
      await new Promise((r) => setTimeout(r, 1500));

      if (!isOmniRouteRunning()) {
        ctx.ui.notify("OmniRoute stopped", "info");
      } else {
        ctx.ui.notify("OmniRoute stop may have failed", "warning");
      }
    },
  });

  pi.registerCommand("omniroute-status", {
    description: "Show OmniRoute status",
    handler: async (_args, ctx) => {
      const running = isOmniRouteRunning();
      const status = running ? "running" : "stopped";

      let detail = "";
      if (running) {
        try {
          const probe = await fetch(OMNX_BASE + "/chat/completions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ model: "auto/chat", messages: [{ role: "user", content: "ping" }], max_tokens: 1 }),
            signal: AbortSignal.timeout(10_000),
          });
          detail = probe.ok ? "API responsive" : `API returned ${probe.status}`;
        } catch {
          detail = "API not reachable";
        }
      }

      ctx.ui.notify(`OmniRoute: ${status}${detail ? ` (${detail})` : ""}`, running ? "info" : "warning");
    },
  });

  pi.on("session_start", async (_event, ctx) => {
    if (ctx.model?.provider === "omniroute") {
      await ensureOmniRouteRunning(ctx);
    }
  });

  pi.on("model_select", async (event, ctx) => {
    if (event.model?.provider === "omniroute") {
      await ensureOmniRouteRunning(ctx);
      failureCount.set(getModelKey(event.model), 0);
    }
  });

  pi.on("after_provider_response", async (event, ctx) => {
    if (!event.model || event.model.provider !== "omniroute") {
      return;
    }

    const key = getModelKey(event.model);
    const current = failureCount.get(key) || 0;

    if (event.status >= 500 || event.status === 0) {
      failureCount.set(key, current + 1);
    } else {
      failureCount.set(key, 0);
      return;
    }

    if (current + 1 >= MAX_AUTO_FAILURES) {
      ctx.ui.notify(`OmniRoute model failed ${current + 1} times; switching to fallback`, "warning");
      await switchToFallback(ctx);
    }
  });

  pi.on("session_before_compact", async (_event, ctx) => {
    if (ctx.model?.provider === "omniroute" && !isOmniRouteRunning()) {
      ctx.ui.notify("OmniRoute unavailable for compaction; switching to fallback", "warning");
      await switchToFallback(ctx);
    }
  });
}
