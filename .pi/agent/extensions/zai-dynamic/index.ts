/**
 * zai-dynamic — Dynamic model list for the zai (z.ai) provider.
 *
 * Fetches the live model catalogue from the zai OpenAI-compatible /models
 * endpoint on every session start, so newly-added models appear immediately
 * without waiting for a pi release.
 *
 * Falls back to pi's built-in zai models if the API is unreachable.
 */

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

const PROVIDER_ID = "zai";
const BASE_URL = "https://api.z.ai/api/coding/paas/v4";
const DEFAULT_CONTEXT_WINDOW = 262_144;
const DEFAULT_MAX_TOKENS = 16_384;

/** zai-specific compat shared by all their models. */
const ZAI_COMPAT = {
  supportsDeveloperRole: false,
  thinkingFormat: "zai" as const,
};

export default function (pi: ExtensionAPI) {
  pi.on("session_start", async (event, _ctx) => {
    // Don't re-fetch on /reload — the built-in list is fine for that.
    if (event.reason === "reload") return;

    const apiKey = process.env.ZAI_API_KEY;
    if (!apiKey) return;

    try {
      const res = await fetch(`${BASE_URL}/models`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        signal: AbortSignal.timeout(15_000),
      });

      if (!res.ok) return;

      const body = (await res.json()) as {
        data?: Array<{ id: string; owned_by?: string }>;
      };
      const apiModels = body.data;
      if (!Array.isArray(apiModels) || apiModels.length === 0) return;

      pi.registerProvider(PROVIDER_ID, {
        baseUrl: BASE_URL,
        apiKey: "$ZAI_API_KEY",
        api: "openai-completions",
        models: apiModels.map((m) => ({
          id: m.id,
          name: m.id.toUpperCase().replace(/^GLM-?/, "GLM-"),
          reasoning: true, // all zai GLM models support thinking (thinkingFormat: "zai")
          input: ["text"] as const,
          cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
          contextWindow: DEFAULT_CONTEXT_WINDOW,
          maxTokens: DEFAULT_MAX_TOKENS,
          compat: ZAI_COMPAT,
        })),
      });
    } catch {
      // API unreachable — leave pi's built-in zai models as-is.
    }
  });
}
