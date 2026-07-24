/**
 * Prompt Refiner — intercepts user input, optionally refines it for clarity
 * and specificity before passing it to the main agent.
 *
 * How it works:
 * 1. On `input` event, checks if the prompt is short/vague enough to benefit
 *    from refinement (configurable thresholds)
 * 2. Makes a fast LLM call to expand/clarify the prompt
 * 3. Shows the refined version to the user and asks if they want to use it
 * 4. If accepted, transforms the input; otherwise passes through original
 *
 * Opt-in: only activates when /refine command was toggled on, or when
 * prompts are very short (< 15 chars).
 *
 * Toggle: /refine        — toggle auto-refinement on/off
 * Force:  /refine <text> — refine this specific text
 *
 * Uses claude-opus-4.8 via OpenRouter by default for high-quality refinement.
 * Config via environment variables:
 *   PI_REFINER_PROVIDER  — provider (default: openrouter)
 *   PI_REFINER_MODEL     — model id (default: anthropic/claude-opus-4.8)
 *   PI_REFINER_THRESHOLD — min prompt length to skip refinement (default: 15)
 */

import { complete, type UserMessage } from "@earendil-works/pi-ai";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

const REFINE_SYSTEM_PROMPT = `You are a prompt refinement assistant. Your job is to take a user's brief or vague prompt and expand it into a clear, specific, well-structured prompt that will get better results from an AI coding assistant.

Rules:
- Preserve the user's INTENT exactly — do not change what they're asking for
- Add specificity: file paths, variable names, expected behavior, constraints
- If the prompt is already clear and specific, return it as-is with MINIMAL changes
- Keep the output concise — don't pad with unnecessary context
- If the user's prompt is a question, keep it as a question
- If the user's prompt is an instruction, keep it as an instruction
- Do NOT add markdown formatting around the refined prompt
- Do NOT add preamble like "Here's the refined prompt:" — just output the refined prompt directly
- If the prompt is ambiguous, make reasonable assumptions but keep it flexible
- Preserve any code snippets, file paths, or technical terms exactly as given`;

const REFINER_PROVIDER = process.env.PI_REFINER_PROVIDER || "openrouter";
const REFINER_MODEL_ID = process.env.PI_REFINER_MODEL || "anthropic/claude-opus-4.8";
const THRESHOLD = parseInt(process.env.PI_REFINER_THRESHOLD || "15", 10);

interface RefinerState {
	enabled: boolean;
}

function getState(entries: Array<{ type: string; customType?: string; data?: unknown }>): RefinerState {
	// Default: disabled — user must opt in
	let enabled = false;
	for (const entry of entries) {
		if (entry.type === "custom" && entry.customType === "prompt-refiner-state" && entry.data) {
			enabled = (entry.data as RefinerState).enabled;
		}
	}
	return { enabled };
}

export default function (pi: ExtensionAPI) {
	// /refine command — toggle auto-refinement or force-refine a specific prompt
	pi.registerCommand("refine", {
		description: "Toggle prompt auto-refinement, or force-refine specific text",
		handler: async (args, ctx) => {
			// If args provided, force-refine that text
			if (args && args.trim()) {
				const refined = await doRefine(args.trim(), ctx);
				if (refined && refined !== args.trim()) {
					ctx.ui.setEditorText(refined);
					ctx.ui.notify("Refined prompt loaded into editor. Submit when ready.", "info");
				} else {
					ctx.ui.notify("Prompt is already clear — no changes needed.", "info");
				}
				return;
			}

			// Toggle mode
			const entries = ctx.sessionManager.getBranch();
			const state = getState(entries);
			const newState = !state.enabled;

			pi.appendEntry("prompt-refiner-state", { enabled: newState });
			ctx.ui.notify(
				newState
					? "Prompt auto-refinement: ON (short/vague prompts will be refined)"
					: "Prompt auto-refinement: OFF",
				"info",
			);
		},
	});

	// Input handler — intercept and refine when appropriate
	pi.on("input", async (event, ctx) => {
		// Skip extension-injected messages
		if (event.source === "extension") return { action: "continue" };

		// Skip during steering (low-latency corrections)
		if (event.streamingBehavior === "steer") return { action: "continue" };

		// Skip follow-up messages (user responding to agent)
		if (event.streamingBehavior === "followUp") return { action: "continue" };

		// Skip slash commands
		if (event.text.startsWith("/")) return { action: "continue" };

		// Check if auto-refinement is enabled
		const entries = ctx.sessionManager.getBranch();
		const state = getState(entries);

		// If not enabled and prompt is substantial, pass through
		if (!state.enabled && event.text.length >= THRESHOLD) {
			return { action: "continue" };
		}

		// If not enabled and prompt is very short, still don't interfere —
		// user hasn't opted in
		if (!state.enabled) {
			return { action: "continue" };
		}

		// Auto-refinement is ON. Check if refinement would help.
		// Skip long, detailed prompts — they're already clear
		if (event.text.length > 500) return { action: "continue" };

		// Skip prompts that look like they have code or file paths (already specific)
		if (/[`$]/.test(event.text) || /\.\//.test(event.text) || /\.\.\//.test(event.text)) {
			return { action: "continue" };
		}

		// Attempt refinement
		try {
			const refined = await doRefine(event.text, ctx);
			if (!refined || refined === event.text) {
				// No improvement — pass through original
				return { action: "continue" };
			}

			// Show diff and ask user
			const accepted = await ctx.ui.confirm(
				"Prompt Refinement",
				`Original:\n${event.text}\n\nRefined:\n${refined}\n\nUse refined version?`,
			);

			if (accepted) {
				return { action: "transform", text: refined };
			}
			return { action: "continue" };
		} catch {
			// On any error, pass through original prompt
			return { action: "continue" };
		}
	});

	async function doRefine(text: string, ctx: { model?: { id: string; provider: string }; modelRegistry: { find: (provider: string, id: string) => unknown; getApiKeyAndHeaders: (model: unknown) => Promise<{ ok: boolean; apiKey?: string; headers?: Record<string, string>; error?: string }> } }): Promise<string | null> {
		// Always use the configured refiner model (claude-opus-4.8 via openrouter)
		const modelId = REFINER_MODEL_ID;
		const provider = REFINER_PROVIDER;

		// Split model id — OpenRouter models use "provider/model" format
		// but the pi registry key is just the part after the slash for the model id
		// and "openrouter" is the provider name
		const model = ctx.modelRegistry.find(provider, modelId);
		if (!model) {
			console.error(`[prompt-refiner] Model not found: ${provider}/${modelId}`);
			return null;
		}

		const auth = await ctx.modelRegistry.getApiKeyAndHeaders(model);
		if (!auth.ok || !auth.apiKey) {
			console.error(`[prompt-refiner] Auth failed for ${provider}/${modelId}: ${auth.error || 'no key'}`);
			return null;
		}

		const userMessage: UserMessage = {
			role: "user",
			content: [{ type: "text", text }],
			timestamp: Date.now(),
		};

		try {
			const response = await complete(
				model as Parameters<typeof complete>[0],
				{ systemPrompt: REFINE_SYSTEM_PROMPT, messages: [userMessage] },
				{ apiKey: auth.apiKey, headers: auth.headers },
			);

			if (response.stopReason === "aborted") return null;

			const result = response.content
				.filter((c): c is { type: "text"; text: string } => c.type === "text")
				.map((c) => c.text)
				.join("\n")
				.trim();

			return result || null;
		} catch {
			return null;
		}
	}
}
