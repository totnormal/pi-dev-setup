/**
 * openrouter-credits - Shows OpenRouter spending in the footer.
 *
 * Format (only when an OpenRouter model is active):
 *   $X.XX / $Y.YY
 *
 * Left: cost accrued in the current session (from assistant message usage).
 * Right: remaining credit balance fetched via management API key.
 */
import type { AssistantMessage } from "@earendil-works/pi-ai";
import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";

const STATUS_KEY = "openrouter-credits";
const CACHE_TTL_MS = 60_000;
const REQUEST_TIMEOUT_MS = 5000;
const API_URL = "https://openrouter.ai/api/v1/credits";

/** Management API key — stored here since it differs from the inference API key */
const MANAGEMENT_KEY = "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";

interface CachedCredits {
	totalCredits: number;
	totalUsage: number;
	fetchedAt: number;
}

let cache: CachedCredits | null = null;

function computeSessionCost(ctx: ExtensionContext): number {
	let cost = 0;
	for (const e of ctx.sessionManager.getBranch()) {
		if (e.type === "message" && e.message.role === "assistant") {
			const m = e.message as AssistantMessage;
			cost += m.usage.cost.total;
		}
	}
	return cost;
}

async function fetchCredits(): Promise<CachedCredits | null> {
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

	try {
		const response = await fetch(API_URL, {
			headers: {
				Authorization: `Bearer ${MANAGEMENT_KEY}`,
			},
			signal: controller.signal,
		});

		clearTimeout(timeoutId);
		if (!response.ok) return null;

		const body = (await response.json()) as {
			data?: {
				total_credits?: number;
				total_usage?: number;
			};
		};

		const credits = body?.data;
		if (typeof credits?.total_credits !== "number" || typeof credits?.total_usage !== "number") {
			return null;
		}

		return {
			totalCredits: credits.total_credits,
			totalUsage: credits.total_usage,
			fetchedAt: Date.now(),
		};
	} catch {
		clearTimeout(timeoutId);
		return null;
	}
}

function formatDollars(amount: number): string {
	if (amount <= 0) return "$0.00";
	if (amount < 0.01) return "$0.00";
	return `$${amount.toFixed(2)}`;
}

function buildStatusText(ctx: ExtensionContext, credits: CachedCredits | null): string {
	const sessionCost = computeSessionCost(ctx);
	const sessionStr = formatDollars(sessionCost);

	if (credits) {
		const remaining = credits.totalCredits - credits.totalUsage;
		const remainingStr = formatDollars(remaining);
		const pct = credits.totalCredits > 0 ? Math.round((credits.totalUsage / credits.totalCredits) * 100) : 0;
		const warning = pct >= 90 ? " ⚠" : "";
		return `${sessionStr} / ${remainingStr}${warning}`;
	}

	return `${sessionStr} / ?`;
}

export default function (pi: ExtensionAPI) {
	async function updateStatusBar(ctx: ExtensionContext) {
		if (ctx.model?.provider !== "openrouter") return;

		const now = Date.now();

		if (cache && now - cache.fetchedAt < CACHE_TTL_MS) {
			const text = buildStatusText(ctx, cache);
			ctx.ui.setStatus(STATUS_KEY, text || undefined);
			return;
		}

		// Show session-only immediately while credits fetch in background
		ctx.ui.setStatus(STATUS_KEY, buildStatusText(ctx, null));

		const result = await fetchCredits();
		if (result) cache = result;

		const text = buildStatusText(ctx, result ?? cache);
		ctx.ui.setStatus(STATUS_KEY, text || undefined);
	}

	pi.on("model_select", (event, ctx) => {
		if (event.model.provider !== "openrouter") {
			cache = null;
			ctx.ui.setStatus(STATUS_KEY, undefined);
		} else {
			void updateStatusBar(ctx);
		}
	});

	pi.on("agent_end", async (_event, ctx) => {
		if (ctx.model?.provider === "openrouter") void updateStatusBar(ctx);
	});

	pi.on("session_start", async (_event, ctx) => {
		if (ctx.model?.provider === "openrouter") await updateStatusBar(ctx);
	});
}