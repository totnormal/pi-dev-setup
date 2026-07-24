/**
 * nvidia-free - Pi extension for free NVIDIA models from build.nvidia.com
 *
 * Uses the OpenAI-compatible endpoint at integrate.api.nvidia.com/v1
 * API key stored in ~/.pi/agent/auth.json under "nvidia" key.
 *
 * All models are free tier (rate-limited, no cost).
 */

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  pi.registerProvider("nvidia", {
    name: "NVIDIA (Free)",
    baseUrl: "https://integrate.api.nvidia.com/v1",
    apiKey: "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",
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
      // ─── Top-tier coding/reasoning ───────────────────────────────────
      {
        id: "moonshotai/kimi-k2.6",
        name: "Kimi K2.6",
        reasoning: true,
        input: ["text"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 131072,
        maxTokens: 16384,
        compat: {
          maxTokensField: "max_tokens",
          supportsDeveloperRole: false,
          supportsReasoningEffort: false,
          supportsStore: false,
          supportsUsageInStreaming: false,
        },
      },
      {
        id: "nvidia/nemotron-3-ultra-550b-a55b",
        name: "Nemotron 3 Ultra 550B",
        reasoning: true,
        input: ["text"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 131072,
        maxTokens: 16384,
        compat: {
          maxTokensField: "max_tokens",
          supportsDeveloperRole: false,
          thinkingFormat: "qwen-chat-template",
        },
      },
      {
        id: "deepseek-ai/deepseek-v4-pro",
        name: "DeepSeek V4 Pro",
        reasoning: true,
        input: ["text"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 131072,
        maxTokens: 16384,
        compat: {
          maxTokensField: "max_tokens",
          supportsDeveloperRole: false,
        },
      },
      {
        id: "deepseek-ai/deepseek-v4-flash",
        name: "DeepSeek V4 Flash",
        reasoning: true,
        input: ["text"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 131072,
        maxTokens: 16384,
        compat: {
          maxTokensField: "max_tokens",
          supportsDeveloperRole: false,
        },
      },

      // ─── Qwen family ─────────────────────────────────────────────────
      {
        id: "qwen/qwen3.5-397b-a17b",
        name: "Qwen 3.5 397B",
        reasoning: true,
        input: ["text"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 131072,
        maxTokens: 16384,
        compat: {
          maxTokensField: "max_tokens",
          supportsDeveloperRole: false,
        },
      },
      {
        id: "qwen/qwen3-coder-480b-a35b-instruct",
        name: "Qwen3 Coder 480B",
        reasoning: true,
        input: ["text"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 131072,
        maxTokens: 16384,
        compat: {
          maxTokensField: "max_tokens",
          supportsDeveloperRole: false,
        },
      },
      {
        id: "qwen/qwen3.5-122b-a10b",
        name: "Qwen 3.5 122B",
        reasoning: true,
        input: ["text"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 131072,
        maxTokens: 16384,
        compat: {
          maxTokensField: "max_tokens",
          supportsDeveloperRole: false,
        },
      },
      {
        id: "qwen/qwen3-next-80b-a3b-instruct",
        name: "Qwen3 Next 80B",
        reasoning: false,
        input: ["text"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 131072,
        maxTokens: 16384,
        compat: {
          maxTokensField: "max_tokens",
          supportsDeveloperRole: false,
        },
      },

      // ─── Mistral family ──────────────────────────────────────────────
      {
        id: "mistralai/mistral-large-3-675b-instruct-2512",
        name: "Mistral Large 3 675B",
        reasoning: true,
        input: ["text"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 131072,
        maxTokens: 16384,
        compat: {
          maxTokensField: "max_tokens",
          supportsDeveloperRole: false,
        },
      },
      {
        id: "mistralai/mistral-medium-3.5-128b",
        name: "Mistral Medium 3.5 128B",
        reasoning: true,
        input: ["text"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 131072,
        maxTokens: 16384,
        compat: {
          maxTokensField: "max_tokens",
          supportsDeveloperRole: false,
        },
      },
      {
        id: "mistralai/mistral-small-4-119b-2603",
        name: "Mistral Small 4 119B",
        reasoning: false,
        input: ["text"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 131072,
        maxTokens: 16384,
        compat: {
          maxTokensField: "max_tokens",
          supportsDeveloperRole: false,
        },
      },
      {
        id: "mistralai/mistral-nemotron",
        name: "Mistral Nemotron",
        reasoning: false,
        input: ["text"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 131072,
        maxTokens: 16384,
        compat: {
          maxTokensField: "max_tokens",
          supportsDeveloperRole: false,
        },
      },

      // ─── Meta Llama ──────────────────────────────────────────────────
      {
        id: "meta/llama-4-maverick-17b-128e-instruct",
        name: "Llama 4 Maverick 128E",
        reasoning: false,
        input: ["text", "image"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 1048576,
        maxTokens: 16384,
        compat: {
          maxTokensField: "max_tokens",
          supportsDeveloperRole: false,
        },
      },
      {
        id: "meta/llama-3.3-70b-instruct",
        name: "Llama 3.3 70B",
        reasoning: false,
        input: ["text"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 131072,
        maxTokens: 16384,
        compat: {
          maxTokensField: "max_tokens",
          supportsDeveloperRole: false,
        },
      },

      // ─── NVIDIA Nemotron ──────────────────────────────────────────────
      {
        id: "nvidia/llama-3.1-nemotron-ultra-253b-v1",
        name: "Nemotron Ultra 253B",
        reasoning: true,
        input: ["text"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 131072,
        maxTokens: 16384,
        compat: {
          maxTokensField: "max_tokens",
          supportsDeveloperRole: false,
        },
      },
      {
        id: "nvidia/nemotron-3-super-120b-a12b",
        name: "Nemotron 3 Super 120B",
        reasoning: false,
        input: ["text"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 131072,
        maxTokens: 16384,
        compat: {
          maxTokensField: "max_tokens",
          supportsDeveloperRole: false,
        },
      },
      {
        id: "nvidia/llama-3.3-nemotron-super-49b-v1.5",
        name: "Nemotron Super 49B v1.5",
        reasoning: false,
        input: ["text"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 131072,
        maxTokens: 16384,
        compat: {
          maxTokensField: "max_tokens",
          supportsDeveloperRole: false,
        },
      },

      // ─── Google ───────────────────────────────────────────────────────
      {
        id: "google/gemma-4-31b-it",
        name: "Gemma 4 31B",
        reasoning: false,
        input: ["text", "image"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 131072,
        maxTokens: 16384,
        compat: {
          maxTokensField: "max_tokens",
          supportsDeveloperRole: false,
        },
      },

      // ─── Microsoft ────────────────────────────────────────────────────
      {
        id: "microsoft/phi-4-multimodal-instruct",
        name: "Phi-4 Multimodal",
        reasoning: false,
        input: ["text", "image"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 131072,
        maxTokens: 16384,
        compat: {
          maxTokensField: "max_tokens",
          supportsDeveloperRole: false,
        },
      },

      // ─── Abacus ───────────────────────────────────────────────────────
      {
        id: "abacusai/dracarys-llama-3.1-70b-instruct",
        name: "Dracarys 70B",
        reasoning: false,
        input: ["text"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 131072,
        maxTokens: 16384,
        compat: {
          maxTokensField: "max_tokens",
          supportsDeveloperRole: false,
        },
      },
    ],
  });
}
