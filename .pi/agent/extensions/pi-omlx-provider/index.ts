import type { ExtensionAPI, ProviderModelConfig } from "@earendil-works/pi-coding-agent";

const OMLX_BASE_URL = "http://127.0.0.1:9999/v1";
const OMLX_API_KEY = "oMLX9999";

async function fetchOmlxModels(): Promise<ProviderModelConfig[]> {
  try {
    const response = await fetch(`${OMLX_BASE_URL}/models`, {
      headers: {
        "Authorization": `Bearer ${OMLX_API_KEY}`,
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) return [];
    const json = await response.json() as { data: any[] };
    return json.data.map(m => ({
      id: m.id,
      name: m.id,
      reasoning: m.id.toLowerCase().includes("thinking") || 
                 m.id.toLowerCase().includes("reasoning") || 
                 m.id.toLowerCase().includes("r1") || 
                 m.id.toLowerCase().includes("o1") ||
                 m.id.toLowerCase().includes("pro"),
      input: ["text"], 
      cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
      contextWindow: m.max_model_len || 128000,
      maxTokens: 32768
    }));
  } catch (e) {
    return [];
  }
}

export default async function(pi: ExtensionAPI) {
  const providerId = "omlx";

  async function refresh() {
    const models = await fetchOmlxModels();
    // Always register the provider so pi knows omlx exists,
    // even if the MLX server is temporarily unreachable (models will be []).
    pi.registerProvider(providerId, {
      baseUrl: OMLX_BASE_URL,
      apiKey: OMLX_API_KEY,
      api: "openai-completions",
      authHeader: true,
      models: models
    });
  }

  // Initial refresh
  await refresh();

  // Refresh on every session start (each new pi-acp session gets fresh models)
  pi.on("session_start", async () => {
    await refresh();
  });

  // Also provide a command to manual refresh
  pi.registerCommand("omlx-refresh", {
    description: "Refresh oMLX models from the local MLX server",
    handler: async (_args, ctx) => {
      await refresh();
      ctx.ui.notify("oMLX models refreshed", "info");
    }
  });
}
