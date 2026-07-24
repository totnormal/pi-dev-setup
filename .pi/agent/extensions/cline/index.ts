/**
 * cline - Cline API gateway (OpenAI-compatible)
 *
 * https://docs.cline.bot/api
 * Endpoint: https://api.cline.bot/api/v1
 *
 * ONLY FREE MODELS are registered here, per user requirement.
 * The Cline API is a paid gateway, but minimax/minimax-m2.5 is free
 * (usage reports cost:0, is_byok:true). Do NOT add paid models here
 * without explicit user approval — that would incur charges.
 *
 * API key is read from ~/.pi/agent/auth.json["cline"].key at load time.
 * pi's registerProvider requires apiKey upfront (it does not auto-resolve
 * from auth.json), so we read the file directly and keep the key out of
 * this source file.
 */

import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

function getClineApiKey(): string {
  try {
    const authPath = join(homedir(), ".pi", "agent", "auth.json");
    const auth = JSON.parse(readFileSync(authPath, "utf-8"));
    const key = auth?.cline?.key;
    if (typeof key === "string" && key.length > 0) return key;
  } catch {
    // fall through to error below
  }
  throw new Error(
    'Cline API key not found. Add to ~/.pi/agent/auth.json: {"cline":{"type":"api_key","key":"sk_..."}}',
  );
}

export default function (pi: ExtensionAPI) {
  const apiKey = getClineApiKey();

  pi.registerProvider("cline", {
    name: "Cline (Free gateway)",
    baseUrl: "https://api.cline.bot/api/v1",
    apiKey,
    api: "openai-completions",
    authHeader: true,
    compat: {
      maxTokensField: "max_tokens",
      supportsDeveloperRole: false,
      supportsReasoningEffort: false,
      supportsStore: false,
      supportsUsageInStreaming: false,
    },
    models: [
      {
        id: "minimax/minimax-m2.5",
        name: "MiniMax M2.5 (free via Cline)",
        reasoning: true,
        input: ["text"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 1000000,
        maxTokens: 16384,
      },
    ],
  });

  // /cline command — switch to the free Cline model
  pi.registerCommand("cline", {
    description: "Switch to Cline free model (minimax/minimax-m2.5)",
    handler: async (_args, ctx) => {
      const model = ctx.modelRegistry.find("cline", "minimax/minimax-m2.5");
      if (!model) {
        ctx.ui.notify("cline/minimax-m2.5 not found", "error");
        return;
      }
      const ok = await pi.setModel(model);
      ctx.ui.notify(
        ok ? "Switched to Cline free model" : "No API key for cline (check auth.json)",
        ok ? "info" : "error",
      );
    },
  });
}
