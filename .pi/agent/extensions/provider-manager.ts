/**
 * Provider Manager Extension
 *
 * Manage LLM providers from within pi.
 *
 * Commands:
 *   /provider              - Interactive provider management
 *   /provider list         - List all configured providers
 *   /provider add          - Add a new provider
 *   /provider remove       - Remove a provider
 *   /provider set-key      - Update API key for a provider
 *
 * Usage:
 *   1. Copy to ~/.pi/agent/extensions/provider-manager.ts
 *   2. Use /provider to manage your providers
 */

import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { homedir } from "node:os";

const MODELS_FILE = `${homedir()}/.pi/agent/models.json`;

interface ModelConfig {
	id: string;
	name?: string;
	reasoning?: boolean;
	thinkingLevelMap?: Partial<Record<"off" | "minimal" | "low" | "medium" | "high" | "xhigh", string | null>>;
	input?: ("text" | "image")[];
	contextWindow?: number;
	maxTokens?: number;
	cost?: {
		input: number;
		output: number;
		cacheRead: number;
		cacheWrite: number;
	};
}

interface ProviderConfig {
	baseUrl?: string;
	apiKey?: string;
	api?: string;
	models?: ModelConfig[];
	headers?: Record<string, string>;
	authHeader?: boolean;
	compat?: Record<string, any>;
}

interface ModelsConfig {
	providers: Record<string, ProviderConfig>;
}

// Common provider templates
const PROVIDER_TEMPLATES: Record<string, ProviderConfig> = {
	zai: {
		baseUrl: "https://api.z.ai/api/coding/paas/v4",
		api: "openai-completions",
		apiKey: "ZAI_API_KEY",
		compat: {
			supportsDeveloperRole: false,
			thinkingFormat: "zai",
			zaiToolStream: true,
		},
		models: [
			{
				id: "glm-5.1",
				name: "GLM 5.1",
				reasoning: true,
				input: ["text"],
				contextWindow: 131072,
				maxTokens: 16384,
			},
			{
				id: "glm-5",
				name: "GLM 5",
				reasoning: true,
				input: ["text"],
				contextWindow: 131072,
				maxTokens: 16384,
			},
			{
				id: "glm-4.6",
				name: "GLM 4.6",
				reasoning: true,
				input: ["text"],
				contextWindow: 131072,
				maxTokens: 16384,
			},
		],
	},
	openrouter: {
		baseUrl: "https://openrouter.ai/api/v1",
		api: "openai-completions",
		apiKey: "OPENROUTER_API_KEY",
	},
	groq: {
		baseUrl: "https://api.groq.com/openai/v1",
		api: "openai-completions",
		apiKey: "GROQ_API_KEY",
	},
	cerebras: {
		baseUrl: "https://api.cerebras.ai/v1",
		api: "openai-completions",
		apiKey: "CEREBRAS_API_KEY",
	},
	mistral: {
		baseUrl: "https://api.mistral.ai/v1",
		api: "mistral-conversations",
		apiKey: "MISTRAL_API_KEY",
	},
	xai: {
		baseUrl: "https://api.x.ai/v1",
		api: "openai-completions",
		apiKey: "XAI_API_KEY",
	},
	deepseek: {
		baseUrl: "https://api.deepseek.com",
		api: "openai-completions",
		apiKey: "DEEPSEEK_API_KEY",
		compat: {
			supportsDeveloperRole: false,
			supportsStore: false,
			supportsReasoningEffort: true,
			requiresReasoningContentOnAssistantMessages: true,
			maxTokensField: "max_tokens",
			thinkingFormat: "deepseek",
		},
		models: [
			{
				id: "deepseek-v4-flash",
				name: "DeepSeek V4 Flash",
				reasoning: true,
				thinkingLevelMap: { minimal: "high", low: "high", medium: "high", high: "high", xhigh: "max" },
				input: ["text"],
				contextWindow: 131072,
				maxTokens: 16384,
			},
			{
				id: "deepseek-v4-pro",
				name: "DeepSeek V4 Pro",
				reasoning: true,
				thinkingLevelMap: { minimal: "high", low: "high", medium: "high", high: "high", xhigh: "max" },
				input: ["text"],
				contextWindow: 131072,
				maxTokens: 16384,
			},
			{
				id: "deepseek-chat",
				name: "DeepSeek Chat",
				reasoning: false,
				input: ["text"],
				contextWindow: 128000,
				maxTokens: 8192,
			},
			{
				id: "deepseek-reasoner",
				name: "DeepSeek Reasoner",
				reasoning: true,
				input: ["text"],
				contextWindow: 64000,
				maxTokens: 8192,
			},
		],
	},
	openai: {
		baseUrl: "https://api.openai.com/v1",
		api: "openai-completions",
		apiKey: "OPENAI_API_KEY",
	},
	anthropic: {
		baseUrl: "https://api.anthropic.com",
		api: "anthropic-messages",
		apiKey: "ANTHROPIC_API_KEY",
	},
	google: {
		baseUrl: "https://generativelanguage.googleapis.com",
		api: "google-generative-ai",
		apiKey: "GEMINI_API_KEY",
	},
	ollama: {
		baseUrl: "http://localhost:11434/v1",
		api: "openai-completions",
		apiKey: "ollama",
	},
	vllm: {
		baseUrl: "http://localhost:8000/v1",
		api: "openai-completions",
		apiKey: "vllm",
		compat: { supportsDeveloperRole: false, supportsReasoningEffort: false },
	},
	lmstudio: {
		baseUrl: "http://localhost:1234/v1",
		api: "openai-completions",
		apiKey: "lmstudio",
	},
};

function loadModelsConfig(): ModelsConfig {
	if (!existsSync(MODELS_FILE)) {
		return { providers: {} };
	}
	try {
		const content = readFileSync(MODELS_FILE, "utf8");
		return JSON.parse(content);
	} catch {
		return { providers: {} };
	}
}

function saveModelsConfig(config: ModelsConfig): void {
	const dir = dirname(MODELS_FILE);
	if (!existsSync(dir)) {
		mkdirSync(dir, { recursive: true });
	}
	writeFileSync(MODELS_FILE, JSON.stringify(config, null, 2), "utf8");
}

function maskApiKey(key: string): string {
	if (key.length <= 8) return "****";
	if (key.startsWith("!") || key.includes("_")) {
		// Shell command or env var name - show as-is if short, mask middle if long
		if (key.length <= 20) return key;
		return `${key.slice(0, 10)}...${key.slice(-6)}`;
	}
	// Actual API key - mask most of it
	return `${key.slice(0, 4)}...${key.slice(-4)}`;
}

function cloneProviderConfig(provider: ProviderConfig | undefined): ProviderConfig {
	return provider ? JSON.parse(JSON.stringify(provider)) : {};
}

function humanizeModelId(modelId: string): string {
	const clean = modelId.split("/").pop() || modelId;
	return clean
		.replace(/[_-]+/g, " ")
		.replace(/\s+/g, " ")
		.trim()
		.replace(/\b\w/g, (char) => char.toUpperCase());
}

function normalizeModelConfig(model: ModelConfig): ModelConfig {
	const reasoning = model.reasoning ?? /reason|r1|deepseek-v4|glm-[45]/i.test(model.id);
	return {
		id: model.id,
		name: model.name || humanizeModelId(model.id),
		reasoning,
		...(model.thinkingLevelMap ? { thinkingLevelMap: model.thinkingLevelMap } : {}),
		input: model.input ?? ["text"],
		contextWindow: model.contextWindow ?? (reasoning ? 64000 : 131072),
		maxTokens: model.maxTokens ?? (reasoning ? 8192 : 16384),
		cost: model.cost ?? { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
	};
}

function mergeModelLists(existing: ModelConfig[] = [], discovered: ModelConfig[] = []): ModelConfig[] {
	const merged = new Map<string, ModelConfig>();
	for (const model of existing) {
		merged.set(model.id, normalizeModelConfig(model));
	}
	for (const model of discovered) {
		if (!merged.has(model.id)) {
			merged.set(model.id, normalizeModelConfig(model));
		}
	}
	return Array.from(merged.values());
}

function resolveApiKeyValue(apiKey?: string): string | undefined {
	if (!apiKey) return undefined;
	if (apiKey.startsWith("!")) return undefined;
	if (apiKey.startsWith("$")) {
		const envValue = process.env[apiKey.slice(1)];
		if (envValue) return envValue;
	}
	const envValue = process.env[apiKey];
	if (envValue) return envValue;
	return apiKey;
}

function createDeepSeekModelConfig(modelId: string): ModelConfig {
	const reasoning = /reason|r1|deepseek-v4/i.test(modelId);
	return {
		id: modelId,
		name: humanizeModelId(modelId),
		reasoning,
		input: ["text"],
		contextWindow: reasoning ? 64000 : 131072,
		maxTokens: reasoning ? 8192 : 16384,
		cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
	};
}

async function fetchDeepSeekModels(provider: ProviderConfig): Promise<ModelConfig[] | null> {
	const apiKey = resolveApiKeyValue(provider.apiKey);
	if (!apiKey) return null;

	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 5000);

	try {
		const response = await fetch("https://api.deepseek.com/models", {
			method: "GET",
			headers: {
				Authorization: `Bearer ${apiKey}`,
				Accept: "application/json",
			},
			signal: controller.signal,
		});

		if (!response.ok) return null;

		const payload = await response.json().catch(() => null);
		const rawModels = Array.isArray(payload)
			? payload
			: Array.isArray(payload?.data)
				? payload.data
				: Array.isArray(payload?.models)
					? payload.models
					: [];

		const modelIds = rawModels
			.map((entry: any) => (typeof entry === "string" ? entry : entry?.id))
			.filter((entry: any) => typeof entry === "string" && entry.length > 0);

		if (modelIds.length === 0) return null;
		return modelIds.map((modelId: string) => createDeepSeekModelConfig(modelId));
	} catch {
		return null;
	} finally {
		clearTimeout(timeout);
	}
}

async function normalizeProviderConfig(
	providerName: string,
	provider: ProviderConfig,
	options: { refreshDeepSeekModels?: boolean } = {}
): Promise<ProviderConfig> {
	const template = PROVIDER_TEMPLATES[providerName];
	const merged: ProviderConfig = {
		...cloneProviderConfig(template),
		...cloneProviderConfig(provider),
	};

	if (template?.headers || provider.headers) {
		merged.headers = { ...template?.headers, ...provider.headers };
	}
	if (template?.compat || provider.compat) {
		merged.compat = { ...template?.compat, ...provider.compat };
	}

	if (provider.models?.length) {
		merged.models = provider.models.map(normalizeModelConfig);
	} else if (template?.models?.length) {
		merged.models = template.models.map(normalizeModelConfig);
	}

	if (template?.baseUrl && !merged.baseUrl) merged.baseUrl = template.baseUrl;
	if (template?.api && !merged.api) merged.api = template.api;
	if (template?.apiKey && !merged.apiKey) merged.apiKey = template.apiKey;

	if (providerName === "deepseek") {
		merged.baseUrl = "https://api.deepseek.com";
		merged.api = "openai-completions";
		merged.compat = {
			...(template?.compat ?? {}),
			...(provider.compat ?? {}),
			supportsDeveloperRole: false,
			supportsStore: false,
			supportsReasoningEffort: true,
			requiresReasoningContentOnAssistantMessages: true,
			maxTokensField: "max_tokens",
			thinkingFormat: "deepseek",
		};

		const currentModels = merged.models?.length ? merged.models.map(normalizeModelConfig) : [];
		const shouldRefresh = options.refreshDeepSeekModels ?? true;
		const liveModels = shouldRefresh ? await fetchDeepSeekModels(merged) : null;

		if (liveModels?.length) {
			merged.models = mergeModelLists(currentModels, liveModels);
		} else if (currentModels.length > 0) {
			merged.models = currentModels;
		} else if (template?.models?.length) {
			merged.models = template.models.map(normalizeModelConfig);
		}

		merged.models = (merged.models ?? []).map((model) => ({
			...model,
			...(model.reasoning ? { thinkingLevelMap: model.thinkingLevelMap ?? { minimal: "high", low: "high", medium: "high", high: "high", xhigh: "max" } } : {}),
		}));
	}

	if (providerName === "zai") {
		merged.baseUrl = "https://api.z.ai/api/coding/paas/v4";
		merged.api = "openai-completions";
		delete merged.authHeader;
		merged.compat = {
			...(template?.compat ?? {}),
			...(provider.compat ?? {}),
			supportsDeveloperRole: false,
			thinkingFormat: "zai",
			zaiToolStream: true,
		};

		const currentModels = merged.models?.length ? merged.models.map(normalizeModelConfig) : [];
		if (currentModels.length > 0) {
			merged.models = mergeModelLists(currentModels, template?.models ?? []);
		} else if (template?.models?.length) {
			merged.models = template.models.map(normalizeModelConfig);
		}
	}

	return merged;
}

function registerNormalizedProvider(pi: ExtensionAPI, providerName: string, provider: ProviderConfig): void {
	const registration: any = {
		baseUrl: provider.baseUrl,
		apiKey: provider.apiKey,
		api: provider.api as any,
		headers: provider.headers,
		authHeader: provider.authHeader,
		compat: provider.compat as any,
	};

	if (provider.models?.length) {
		registration.models = provider.models.map((model) => ({
			id: model.id,
			name: model.name || humanizeModelId(model.id),
			reasoning: model.reasoning ?? false,
			input: model.input ?? ["text"],
			contextWindow: model.contextWindow ?? 131072,
			maxTokens: model.maxTokens ?? 16384,
			cost: model.cost ?? { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
		}));
	}

	try {
		pi.unregisterProvider(providerName);
	} catch {
		// Provider may not be registered yet.
	}

	pi.registerProvider(providerName, registration);
}

async function repairAndRegisterProviders(pi: ExtensionAPI): Promise<void> {
	const config = loadModelsConfig();
	const providers = config.providers || {};
	const repairedProviders: Record<string, ProviderConfig> = {};
	let changed = false;

	for (const [providerName, provider] of Object.entries(providers)) {
		const repaired = await normalizeProviderConfig(providerName, provider, {
			refreshDeepSeekModels: providerName === "deepseek",
		});

		repairedProviders[providerName] = repaired;
		registerNormalizedProvider(pi, providerName, repaired);

		if (JSON.stringify(repaired) !== JSON.stringify(provider)) {
			changed = true;
		}
	}

	if (changed) {
		saveModelsConfig({ providers: repairedProviders });
	}
}

export default async function (pi: ExtensionAPI) {
	await repairAndRegisterProviders(pi);

	// Register the /provider command
	pi.registerCommand("provider", {
		description: "Manage LLM providers (add, remove, list, set-key)",
		getArgumentCompletions: (prefix: string) => {
			const subcommands = ["list", "add", "remove", "set-key"];
			const filtered = subcommands.filter((s) => s.startsWith(prefix));
			return filtered.length > 0 ? filtered.map((s) => ({ value: s, label: s })) : null;
		},
		handler: async (args: string, ctx) => {
			const parts = args.trim().split(/\s+/);
			const subcommand = parts[0] || "";

			switch (subcommand) {
				case "list":
					await listProviders(ctx);
					break;
				case "add":
					await addProvider(ctx, pi);
					break;
				case "remove":
					await removeProvider(ctx, pi);
					break;
				case "set-key":
					await setApiKey(ctx, pi);
					break;
				default:
					// Interactive mode - show menu
					await interactiveMenu(ctx, pi);
			}
		},
	});

	async function interactiveMenu(ctx: any, pi: ExtensionAPI) {
		const action = await ctx.ui.select("Provider Manager", [
			"📋 List providers",
			"➕ Add provider",
			"🔑 Set API key",
			"❌ Remove provider",
		]);

		if (!action) return;

		if (action.includes("List")) await listProviders(ctx);
		else if (action.includes("Add")) await addProvider(ctx, pi);
		else if (action.includes("Set API")) await setApiKey(ctx, pi);
		else if (action.includes("Remove")) await removeProvider(ctx, pi);
	}

	async function listProviders(ctx: any) {
		const config = loadModelsConfig();
		const providers = Object.keys(config.providers);

		if (providers.length === 0) {
			ctx.ui.notify("No custom providers configured. Use /provider add to add one.", "info");
			return;
		}

		const items: string[] = [];
		for (const [name, provider] of Object.entries(config.providers)) {
			const apiKeyDisplay = provider.apiKey ? ` 🔑 ${maskApiKey(provider.apiKey)}` : "";
			const baseUrlDisplay = provider.baseUrl || "no base URL";
			items.push(`${name} - ${baseUrlDisplay}${apiKeyDisplay}`);
		}

		// Also show built-in providers from templates
		items.push("");
		items.push("--- Built-in Templates ---");
		for (const name of Object.keys(PROVIDER_TEMPLATES)) {
			if (!config.providers[name]) {
				items.push(`${name} (not configured)`);
			}
		}

		await ctx.ui.select("Configured Providers", items);
	}

	async function addProvider(ctx: any, pi: ExtensionAPI) {
		// Ask if user wants to use a template or custom
		const choice = await ctx.ui.select("Add Provider", [
			"📦 From template (OpenRouter, Groq, etc.)",
			"✏️ Custom provider",
		]);

		if (!choice) return;

		let providerName: string;
		let providerConfig: ProviderConfig;

		if (choice.includes("template")) {
			const templates = Object.keys(PROVIDER_TEMPLATES);
			const selected = await ctx.ui.select("Select provider template", templates);
			if (!selected) return;

			providerName = selected.toLowerCase().replace(/[^a-z0-9-]/g, "-");
			providerConfig = { ...PROVIDER_TEMPLATES[selected] };

			// Ask for API key
			const defaultKey = providerConfig.apiKey || "";
			const apiKey = await ctx.ui.input(
				`API key for ${providerName}`,
				defaultKey.startsWith("!") || defaultKey.includes("_")
					? `Env var name (default: ${defaultKey})`
					: "Enter API key or env var name",
				{ default: defaultKey }
			);

			if (apiKey) {
				providerConfig.apiKey = apiKey;
			}
		} else {
			// Custom provider
			providerName = await ctx.ui.input("Provider name", "e.g., my-proxy, custom-llm");
			if (!providerName) {
				ctx.ui.notify("Provider name is required", "error");
				return;
			}
			providerName = providerName.toLowerCase().replace(/[^a-z0-9-]/g, "-");

			const baseUrl = await ctx.ui.input("Base URL", "e.g., https://api.example.com/v1");
			if (!baseUrl) {
				ctx.ui.notify("Base URL is required", "error");
				return;
			}

			const apiType = await ctx.ui.select("API type", [
				"openai-completions",
				"anthropic-messages",
				"openai-responses",
				"google-generative-ai",
				"mistral-conversations",
			]);

			if (!apiType) return;

			const apiKey = await ctx.ui.input("API key", "Enter API key, env var name, or shell command (!cmd)");

			providerConfig = {
				baseUrl,
				api: apiType,
				apiKey: apiKey || undefined,
			};
		}

		// Ask about models
		const addModels = await ctx.ui.confirm("Add models now?", "Configure model IDs for this provider?");
		if (addModels) {
			const models: ModelConfig[] = [];
			let addMore = true;

			while (addMore) {
				const modelId = await ctx.ui.input("Model ID", "e.g., llama-3.1-70b, gpt-4o");
				if (modelId) {
					const modelName = await ctx.ui.input("Display name (optional)", modelId);
					models.push({
						id: modelId,
						name: modelName || undefined,
					});
				}

				addMore = await ctx.ui.confirm("Add another model?", "");
			}

			if (models.length > 0) {
				providerConfig.models = models;
			}
		}

		// Save to models.json
		const config = loadModelsConfig();
		const normalizedProvider = await normalizeProviderConfig(providerName, providerConfig, {
			refreshDeepSeekModels: providerName === "deepseek",
		});
		config.providers[providerName] = normalizedProvider;
		saveModelsConfig(config);

		// Register immediately
		registerNormalizedProvider(pi, providerName, normalizedProvider);

		ctx.ui.notify(`Provider "${providerName}" added successfully! Use /model to select it.`, "success");
	}

	async function removeProvider(ctx: any, pi: ExtensionAPI) {
		const config = loadModelsConfig();
		const providers = Object.keys(config.providers);

		if (providers.length === 0) {
			ctx.ui.notify("No custom providers to remove.", "info");
			return;
		}

		const selected = await ctx.ui.select("Select provider to remove", providers);
		if (!selected) return;

		const confirmed = await ctx.ui.confirm(
			`Remove "${selected}"?`,
			"This will delete the provider configuration from models.json"
		);

		if (!confirmed) {
			ctx.ui.notify("Cancelled.", "info");
			return;
		}

		// Remove from config
		delete config.providers[selected];
		saveModelsConfig(config);

		// Unregister immediately
		pi.unregisterProvider(selected);

		ctx.ui.notify(`Provider "${selected}" removed.`, "success");
	}

	async function setApiKey(ctx: any, pi: ExtensionAPI) {
		// Show both custom providers and built-in templates
		const config = loadModelsConfig();
		const customProviders = Object.keys(config.providers);
		const templateProviders = Object.keys(PROVIDER_TEMPLATES).filter(
			(t) => !customProviders.includes(t)
		);

		const items: string[] = [];

		if (customProviders.length > 0) {
			items.push("--- Custom Providers ---");
			for (const name of customProviders) {
				const currentKey = config.providers[name].apiKey;
				const display = currentKey ? ` (current: ${maskApiKey(currentKey)})` : " (no key)";
				items.push(`${name}${display}`);
			}
		}

		if (templateProviders.length > 0) {
			items.push("--- Built-in Templates ---");
			for (const name of templateProviders) {
				const defaultKey = PROVIDER_TEMPLATES[name].apiKey || "";
				items.push(`${name} (default: ${defaultKey})`);
			}
		}

		const selected = await ctx.ui.select("Select provider", items);
		if (!selected) return;

		const providerName = selected.split(" ")[0]; // Remove any suffix

		const currentKey = config.providers[providerName]?.apiKey || "";
		const newKey = await ctx.ui.input(
			`API key for ${providerName}`,
			"Enter API key, env var name (MY_API_KEY), or shell command (!cmd)",
			{ default: currentKey }
		);

		if (!newKey) {
			ctx.ui.notify("Cancelled.", "info");
			return;
		}

		// If provider doesn't exist in config, create it from template
		if (!config.providers[providerName] && PROVIDER_TEMPLATES[providerName]) {
			config.providers[providerName] = { ...PROVIDER_TEMPLATES[providerName] };
		}

		config.providers[providerName].apiKey = newKey;
		const providerConfig = await normalizeProviderConfig(providerName, config.providers[providerName], {
			refreshDeepSeekModels: providerName === "deepseek",
		});
		config.providers[providerName] = providerConfig;
		saveModelsConfig(config);

		// Re-register to apply new key
		registerNormalizedProvider(pi, providerName, providerConfig);

		ctx.ui.notify(`API key updated for "${providerName}".`, "success");
	}
}
