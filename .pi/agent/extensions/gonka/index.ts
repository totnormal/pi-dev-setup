import type { ExtensionAPI, ProviderModelConfig } from "@earendil-works/pi-coding-agent";
import { createServer, type Server, type IncomingMessage, type ServerResponse } from "node:http";
import { appendFileSync } from "node:fs";

/**
 * Gonka provider extension — LOCAL PROXY edition.
 *
 * WHY A LOCAL PROXY:
 * The gonka backend (https://github.com/gonka-ai/gonka) is a DECENTRALIZED
 * inference network: each request is routed to a random compute node. It is
 * slow, delayed, and intermittent, and its OpenAI-compatible Edge Function
 * frequently returns empty bodies, 5xx, or stalls when `stream:true` is used.
 * Verified: `stream:false` is reliable (~1-2s); `stream:true` is flaky.
 *
 * THE FIX: this extension runs a tiny HTTP server bound to 127.0.0.1 and
 * registers the gonka provider with baseUrl=http://127.0.0.1:<port>. pi's OpenAI
 * client connects to localhost (always reachable), and this server:
 *   - rewrites every /chat/completions to `stream:false`,
 *   - retries with exponential backoff (each retry likely hits a DIFFERENT
 *     network node, so transient failures recover),
 *   - synthesizes an OpenAI SSE stream from the JSON response (which pi's
 *     built-in parser consumes normally: content, reasoning, tool calls, usage),
 *   - splits inline `<think>…</think>` (Qwen3, MiniMax) and separate `reasoning`
 *     fields (Kimi) into proper reasoning for clean display,
 *   - returns a descriptive 502 on total failure so pi shows the real reason.
 *
 * MODEL ID NOTE: pi/entwurf model IDs must NOT contain slashes (slashes break
 * entwurf session names). So pi registers BARE IDs (Qwen3, Kimi-2.6, MiniMax-2.7).
 * The gonka backend, however, expects FULL IDs with vendor prefixes. BARE_TO_FULL
 * translates bare→full before each backend request.
 */

const GONKA_BASE_URL = "https://hskyauefqcgbvgvxkluj.supabase.co/functions/v1/gonka";
// Gonka API key: prefer env var (allows runtime switching without code edits), fallback to hardcoded.
const GONKA_API_KEY = process.env.GONKA_API_KEY || "sk_4e17c285cbb34753b53525245f199753cb1d5de1f2764185b5e33c31a14c2e3d";
const LOG_FILE = `${process.env.HOME || process.env.HOMEPATH || "/tmp"}/.pi/gonka-extension.log`;

// BARE id (used by pi/entwurf, no slashes)  ->  FULL id (sent to gonka backend).
const BARE_TO_FULL: Record<string, string> = {
	"Qwen3":       "Qwen/Qwen3-235B-A22B-Instruct-2507-FP8",
	"Kimi-2.6":    "moonshotai/Kimi-K2.6",
	"MiniMax-2.7": "MiniMaxAI/MiniMax-M2.7",
};
// Reverse lookup: FULL id (from backend /models) -> BARE id.
const FULL_TO_BARE: Record<string, string> = Object.fromEntries(
	Object.entries(BARE_TO_FULL).map(([bare, full]) => [full, bare]),
);

const TIMEOUT_MS = 90_000; // per-attempt; Gonka is slow/delayed
const MAX_ATTEMPTS = 4; // each retry likely hits a different network node
const BACKOFF_BASE_MS = 1_000;
const BACKOFF_MAX_MS = 8_000;

// Known-good BARE model IDs. The gonka /models endpoint is unreliable/incomplete,
// so these are always included even if the backend omits them.
const KNOWN_MODELS = ["Qwen3", "Kimi-2.6", "MiniMax-2.7"];

// Capture the real fetch at module load (before anything could patch it).
const realFetch: typeof fetch =
	typeof globalThis.fetch === "function" ? globalThis.fetch.bind(globalThis) : fetch;

function log(line: string): void {
	try {
		appendFileSync(LOG_FILE, `[${new Date().toISOString()}] ${line}\n`);
	} catch {
		/* never let logging break a request */
	}
}

function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function modelConfig(bareId: string): ProviderModelConfig {
	const lower = bareId.toLowerCase();
	return {
		id: bareId,
		name: bareId,
		reasoning: lower.includes("think") || lower.includes("reason") || lower.includes("qwen3"),
		input: ["text"],
		cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
		contextWindow: 128000,
		// The Gonka network is heavily throttled (observed peak ~hundreds of output tokens);
		// keep maxTokens modest so requests are more likely to complete.
		maxTokens: 4096,
	};
}

/**
 * Build a minimal OpenAI chat.completion.chunk SSE stream from a non-streaming
 * JSON response. Reasoning arrives two ways across gonka models:
 *   - inline <think>…</think> in content (Qwen3, MiniMax-M2.7)
 *   - a separate reasoning / reasoning_content field (Kimi-K2.6)
 * Both are normalized into delta.reasoning (pi renders it as thinking).
 * Returns an array of SSE "data:" lines (without the trailing [DONE]).
 */
function buildChunks(json: any, modelId: string): string[] {
	const id = json?.id || `gonka-${Date.now()}`;
	const model = json?.model || modelId;
	const choice = json?.choices?.[0];
	const msg = choice?.message || {};
	const usage = json?.usage;

	let textContent = typeof msg.content === "string" ? msg.content : "";
	let reasoning = "";
	const thinkMatch = textContent.match(/<think>([\s\S]*?)<\/think>/);
	if (thinkMatch) {
		reasoning += thinkMatch[1];
		textContent = textContent.replace(/<think>[\s\S]*?<\/think>/g, "").trim();
	}
	if (typeof msg.reasoning_content === "string" && msg.reasoning_content.length > 0)
		reasoning += msg.reasoning_content;
	if (typeof msg.reasoning === "string" && msg.reasoning.length > 0) reasoning += msg.reasoning;

	const delta: Record<string, unknown> = {};
	if (textContent.length > 0) delta.content = textContent;
	if (reasoning.length > 0) delta.reasoning = reasoning;
	if (Array.isArray(msg.tool_calls) && msg.tool_calls.length > 0) {
		delta.tool_calls = msg.tool_calls.map((tc: any, i: number) => ({
			index: i,
			id: tc?.id || "",
			type: "function",
			function: { name: tc?.function?.name || "", arguments: tc?.function?.arguments || "" },
		}));
	}

	const base = { id, object: "chat.completion.chunk", created: Math.floor(Date.now() / 1000), model };
	const chunk1 = { ...base, choices: [{ index: 0, delta, finish_reason: null }] };
	const chunk2: Record<string, unknown> = {
		...base,
		choices: [{ index: 0, delta: {}, finish_reason: choice?.finish_reason || "stop" }],
	};
	if (usage) chunk2.usage = usage;
	return [`data: ${JSON.stringify(chunk1)}`, `data: ${JSON.stringify(chunk2)}`, "data: [DONE]"];
}

/** Resolve the full backend model name for a (possibly bare) model id. */
function toBackendModel(maybeBare: string): string {
	return BARE_TO_FULL[maybeBare] || FULL_TO_BARE[maybeBare] || maybeBare;
}

/** Resolve the bare id for a (possibly full) model id. */
function toBareModel(maybeFull: string): string {
	return FULL_TO_BARE[maybeFull] || BARE_TO_FULL[maybeFull] || maybeFull;
}

/**
 * Always-non-stream request with retry/backoff. The incoming `parsedReq.model`
 * may be a BARE id (from pi) or a FULL id (legacy); it is normalized to the full
 * backend name before being sent. Returns the parsed JSON or throws clearly.
 */
async function gonkaNonStream(parsedReq: any): Promise<any> {
	const incomingModel = parsedReq.model || "unknown";
	const backendModel = toBackendModel(incomingModel);
	const body = JSON.stringify({ ...parsedReq, model: backendModel, stream: false });
	const t0 = Date.now();
	let lastErr = "unknown error";

	for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
		if (attempt > 0) await sleep(Math.min(BACKOFF_BASE_MS * 2 ** (attempt - 1), BACKOFF_MAX_MS));

		const ac = new AbortController();
		const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
		try {
			const res = await realFetch(`${GONKA_BASE_URL}/chat/completions`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${GONKA_API_KEY}`,
					"Content-Type": "application/json",
				},
				body,
				signal: ac.signal,
			});
			if (!res.ok) {
				const text = await res.text().catch(() => "");
				lastErr = `HTTP ${res.status} ${text.slice(0, 200)}`.trim();
				log(`nonstream-fail attempt=${attempt}/${MAX_ATTEMPTS} model=${incomingModel}->${backendModel} ${lastErr} latency=${Date.now() - t0}ms`);
				continue; // retry -> likely a different network node
			}
			const text = await res.text();
			if (!text || text.trim() === "") {
				lastErr = "empty body";
				log(`nonstream-fail attempt=${attempt}/${MAX_ATTEMPTS} model=${incomingModel} empty body latency=${Date.now() - t0}ms`);
				continue;
			}
			let json: any;
			try {
				json = JSON.parse(text);
			} catch {
				lastErr = `non-JSON body: ${text.slice(0, 200)}`;
				log(`nonstream-fail attempt=${attempt}/${MAX_ATTEMPTS} model=${incomingModel} ${lastErr}`);
				continue;
			}
			const choice = json?.choices?.[0];
			if (!choice?.message) {
				const apiErr = json?.error?.message || json?.message;
				lastErr = apiErr ? `api error: ${String(apiErr).slice(0, 200)}` : `unexpected shape: ${text.slice(0, 200)}`;
				log(`nonstream-fail attempt=${attempt}/${MAX_ATTEMPTS} model=${incomingModel} ${lastErr}`);
				continue;
			}
			log(`nonstream-ok attempt=${attempt}/${MAX_ATTEMPTS} model=${incomingModel} finish=${choice.finish_reason} out=${json?.usage?.completion_tokens ?? "?"} latency=${Date.now() - t0}ms`);
			return json;
		} catch (e: any) {
			lastErr = e?.name === "AbortError" ? `timeout after ${TIMEOUT_MS}ms` : e?.message || String(e);
			log(`nonstream-error attempt=${attempt}/${MAX_ATTEMPTS} model=${incomingModel} ${lastErr}`);
		} finally {
			clearTimeout(timer);
		}
	}

	log(`nonstream-giveup model=${incomingModel} attempts=${MAX_ATTEMPTS} lastErr=${lastErr} latency=${Date.now() - t0}ms`);
	throw new Error(`Gonka (decentralized) failed after ${MAX_ATTEMPTS} attempt(s) over ${Math.round((Date.now() - t0) / 1000)}s: ${lastErr}`);
}

function readBody(req: IncomingMessage): Promise<string> {
	return new Promise((resolve, reject) => {
		let data = "";
		req.on("data", (c) => (data += c));
		req.on("end", () => resolve(data));
		req.on("error", reject);
	});
}

function sendJson(res: ServerResponse, status: number, obj: unknown): void {
	const body = JSON.stringify(obj);
	res.writeHead(status, { "content-type": "application/json", "cache-control": "no-cache" });
	res.end(body);
}

/** Fetch model ids from the gonka backend and normalize them to BARE ids. */
async function fetchGonkaModelIds(): Promise<string[]> {
	try {
		const res = await realFetch(`${GONKA_BASE_URL}/models`, {
			headers: { Authorization: `Bearer ${GONKA_API_KEY}`, "Content-Type": "application/json" },
		});
		if (res.ok) {
			const json = (await res.json()) as { data?: Array<{ id: string }> };
			// Backend returns FULL ids; normalize to BARE ids for pi.
			return (json.data || []).map((m) => toBareModel(m.id));
		}
	} catch {
		/* fall back to known models */
	}
	return [];
}

let httpServer: Server | null = null;
let localPort = 0;

export function startProxyServer(): Promise<number> {
	return new Promise((resolve, reject) => {
		const server = createServer(async (req, res) => {
			try {
				const url = req.url || "/";

				// GET /models — OpenAI-style list, always BARE ids.
				if (req.method === "GET" && url.includes("/models")) {
					const ids = await fetchGonkaModelIds();
					const merged = Array.from(new Set([...ids, ...KNOWN_MODELS]));
					const data = merged.map((id) => ({ id, object: "model", owned_by: "gonka" }));
					log(`models request -> ${data.length} models`);
					return sendJson(res, 200, { object: "list", data });
				}

				// POST /chat/completions — the main path.
				if (req.method === "POST" && url.includes("/chat/completions")) {
					const raw = await readBody(req);
					let parsedReq: any;
					try {
						parsedReq = JSON.parse(raw);
					} catch {
						return sendJson(res, 400, { error: { message: "invalid JSON body" } });
					}
					const bareModel = parsedReq.model || "unknown";
					const wantsStream = parsedReq.stream !== false;

					let json: any;
					try {
						// gonkaNonStream normalizes bare->full before hitting the backend.
						json = await gonkaNonStream(parsedReq);
					} catch (e: any) {
						return sendJson(res, 502, { error: { message: e?.message || String(e) } });
					}

					if (!wantsStream) {
						// Non-streaming client: return the raw JSON as-is.
						return sendJson(res, 200, json);
					}

					// Streaming client (pi): synthesize SSE and write it out.
					const lines = buildChunks(json, bareModel);
					res.writeHead(200, {
						"content-type": "text/event-stream",
						"cache-control": "no-cache",
						connection: "keep-alive",
					});
					for (const line of lines) {
						res.write(line + "\n\n");
					}
					res.end();
					return;
				}

				// Anything else.
				return sendJson(res, 404, { error: { message: `not found: ${req.method} ${url}` } });
			} catch (e: any) {
				log(`server-error ${e?.message || e}`);
				try {
					sendJson(res, 500, { error: { message: "proxy internal error" } });
				} catch {
					/* response already sent */
				}
			}
		});

		server.on("error", (e: any) => {
			log(`proxy server error: ${e?.message || e}`);
			reject(e);
		});

		server.listen(0, "127.0.0.1", () => {
			const addr = server.address();
			const port = typeof addr === "object" && addr ? addr.port : 0;
			httpServer = server;
			localPort = port;
			log(`proxy server listening on http://127.0.0.1:${port}`);
			resolve(port);
		});
	});
}

export default async function (pi: ExtensionAPI) {
	const providerId = "gonka";

	// Start the local proxy server (OS-assigned port on 127.0.0.1).
	let port = localPort;
	if (!httpServer) {
		try {
			port = await startProxyServer();
		} catch (e: any) {
			log(`FATAL: could not start proxy server: ${e?.message || e}`);
		}
	}
	const baseUrl = `http://127.0.0.1:${port}`;

	async function refresh() {
		const ids = await fetchGonkaModelIds();
		const merged = Array.from(new Set([...ids, ...KNOWN_MODELS]));
		const models = merged.map(modelConfig);
		pi.registerProvider(providerId, {
			name: "GonkaAI (decentralized)",
			baseUrl,
			apiKey: GONKA_API_KEY,
			api: "openai-completions",
			authHeader: true,
			models,
		});
		log(`provider registered baseUrl=${baseUrl} models=${models.length} ids=${merged.join(",")}`);
	}

	await refresh();

	pi.on("session_start", async () => {
		await refresh();
	});

	pi.registerCommand("gonka-refresh", {
		description: "Refresh GonkaAI models",
		handler: async (_args, ctx) => {
			await refresh();
			ctx.ui.notify(`GonkaAI models refreshed (${localPort ? "proxy up on :" + localPort : "proxy down"})`, "info");
		},
	});

	pi.registerCommand("gonka-health", {
		description: "Probe the Gonka backend (models list + a stream:false completion)",
		handler: async (_args, ctx) => {
			if (!httpServer || !localPort) {
				ctx.ui.notify("Gonka proxy server is NOT running", "warn");
				return;
			}
			let modelsOk = false;
			let modelCount = 0;
			let probeModel = "";
			let detail = "";
			try {
				const r = await realFetch(`${GONKA_BASE_URL}/models`, {
					headers: { Authorization: `Bearer ${GONKA_API_KEY}` },
				});
				modelsOk = r.ok;
				if (modelsOk) {
					const j = (await r.json()) as { data?: Array<{ id: string }> };
					modelCount = Array.isArray(j?.data) ? j.data.length : 0;
					probeModel = j?.data?.[0]?.id || BARE_TO_FULL[KNOWN_MODELS[0]];
				} else {
					detail = `models HTTP ${r.status}`;
				}
			} catch (e: any) {
				detail = `models error: ${e?.message || e}`;
			}

			let completionOk = false;
			const t0 = Date.now();
			try {
				const r = await realFetch(`${GONKA_BASE_URL}/chat/completions`, {
					method: "POST",
					headers: { Authorization: `Bearer ${GONKA_API_KEY}`, "Content-Type": "application/json" },
					body: JSON.stringify({
						model: probeModel || BARE_TO_FULL[KNOWN_MODELS[0]],
						messages: [{ role: "user", content: "hi" }],
						stream: false,
						max_tokens: 5,
					}),
				});
				completionOk = r.ok;
				if (!r.ok) detail = `${detail} | completion HTTP ${r.status}`.trim();
			} catch (e: any) {
				detail = `${detail} | completion error: ${e?.message || e}`.trim();
			}
			const status = modelsOk && completionOk ? "ok" : "degraded";
			ctx.ui.notify(
				`Gonka ${status} (proxy :${localPort}): models=${modelsOk ? `ok(${modelCount})` : "FAIL"}, completion=${completionOk ? "ok" : "FAIL"} (${Date.now() - t0}ms)${detail ? ` — ${detail}` : ""}`,
				status === "ok" ? "info" : "warn",
			);
			log(`health status=${status} modelsOk=${modelsOk} modelCount=${modelCount} completionOk=${completionOk} latency=${Date.now() - t0}ms detail=${detail}`);
		},
	});
}
