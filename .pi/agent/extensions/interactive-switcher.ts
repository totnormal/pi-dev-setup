/**
 * Interactive Switcher Extension
 *
 * Provides searchable, interactive TUI pickers for sessions, providers, and models.
 *
 * Commands:
 *   /sessions     - Switch to another session (searchable list with metadata)
 *   /providers    - Browse providers (auth status, model counts)
 *   /pick-model   - Pick a model from all available models (searchable, grouped by provider)
 *
 * Features:
 *   - Type-to-search filter field at the top (fuzzy matching)
 *   - Arrow keys to navigate, Enter to select, Esc to cancel
 *   - Rich metadata: session names, message counts, dates, model descriptions, auth status
 *
 * Usage:
 *   Copy to ~/.pi/agent/extensions/interactive-switcher.ts and restart pi (or /reload).
 */

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { SessionManager, DynamicBorder } from "@earendil-works/pi-coding-agent";
import {
	Container,
	Input,
	Key,
	type SelectItem,
	SelectList,
	Text,
	matchesKey,
	CURSOR_MARKER,
	type Focusable,
	truncateToWidth,
	type Component,
} from "@earendil-works/pi-tui";

// ─────────────────────────────────────────────────────────────────────────────
// Reusable Searchable Picker Component
// ─────────────────────────────────────────────────────────────────────────────

/**
 * A composite component that pairs a search Input with a SelectList.
 * The Input filters the SelectList in real time using fuzzy matching.
 *
 * Keyboard behavior:
 *   - Printable characters go to the search Input
 *   - Up/Down/Enter go to the SelectList (navigation + selection)
 *   - Esc cancels
 *   - Tab switches focus between search and list
 */
class SearchablePicker implements Component, Focusable {
	private searchInput: Input;
	private selectList: SelectList;
	private container: Container;
	private _focused = false;
	private items: SelectItem[];

	focused: boolean = false;

	constructor(
		title: string,
		items: SelectItem[],
		theme: any,
		private onSelect: (item: SelectItem) => void,
		private onCancel: () => void,
	) {
		this.items = items;
		this.container = new Container();

		// Top border
		this.container.addChild(new DynamicBorder((s: string) => theme.fg("accent", s)));

		// Title
		this.container.addChild(new Text(theme.fg("accent", theme.bold(title)), 1, 0));

		// Search input
		this.searchInput = new Input();
		this.searchInput.focused = false;
		this.searchInput.onEscape = () => this.onCancel();
		this.container.addChild(this.searchInput);

		// Select list
		this.selectList = new SelectList(items, Math.min(items.length, 12), {
			selectedPrefix: (t: string) => theme.fg("accent", t),
			selectedText: (t: string) => theme.fg("accent", t),
			description: (t: string) => theme.fg("muted", t),
			scrollInfo: (t: string) => theme.fg("dim", t),
			noMatch: (t: string) => theme.fg("warning", t),
		});
		this.selectList.onSelect = (item: SelectItem) => this.onSelect(item);
		this.selectList.onCancel = () => this.onCancel();
		this.container.addChild(this.selectList);

		// Help text
		this.container.addChild(
			new Text(
				theme.fg("dim", "type to search • ↑↓ navigate • enter select • tab switch focus • esc cancel"),
				1,
				0,
			),
		);

		// Bottom border
		this.container.addChild(new DynamicBorder((s: string) => theme.fg("accent", s)));
	}

	private filterList(): void {
		const query = this.searchInput.getValue();
		this.selectList.setFilter(query);
	}

	handleInput(data: string): void {
		// Escape always cancels
		if (matchesKey(data, Key.escape)) {
			this.onCancel();
			return;
		}

		// Navigation keys go to the select list
		if (
			matchesKey(data, Key.up) ||
			matchesKey(data, Key.down) ||
			matchesKey(data, Key.enter) ||
			matchesKey(data, Key.pageup) ||
			matchesKey(data, Key.pagedown) ||
			matchesKey(data, Key.home) ||
			matchesKey(data, Key.end)
		) {
			this.selectList.handleInput(data);
			return;
		}

		// Tab switches focus to select list (visual only, list always gets nav keys)
		if (matchesKey(data, Key.tab)) {
			return;
		}

		// Ctrl+C
		if (matchesKey(data, Key.ctrl("c"))) {
			this.onCancel();
			return;
		}

		// Everything else (printable chars, backspace) goes to search input
		this.searchInput.handleInput(data);
		this.filterList();
	}

	render(width: number): string[] {
		const lines = this.container.render(width);
		// If the search input is focused, insert the cursor marker
		// (The Input component already renders CURSOR_MARKER when focused=true)
		return lines;
	}

	invalidate(): void {
		this.container.invalidate();
	}
}

// ─────────────────────────────────────────────────────────────────────────────
// Helper: format relative time
// ─────────────────────────────────────────────────────────────────────────────

function relativeTime(date: Date): string {
	const now = new Date();
	const diff = now.getTime() - date.getTime();
	const seconds = Math.floor(diff / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	if (days > 7) return date.toLocaleDateString();
	if (days > 0) return `${days}d ago`;
	if (hours > 0) return `${hours}h ago`;
	if (minutes > 0) return `${minutes}m ago`;
	return "just now";
}

// ─────────────────────────────────────────────────────────────────────────────
// Extension Entry Point
// ─────────────────────────────────────────────────────────────────────────────

export default function interactiveSwitcher(pi: ExtensionAPI) {
	// ─── /sessions — Interactive session browser ─────────────────────────────

	pi.registerCommand("sessions", {
		description: "Browse and switch sessions interactively",
		handler: async (_args, ctx) => {
			if (ctx.mode !== "tui") {
				ctx.ui.notify("Interactive session picker requires TUI mode", "warning");
				return;
			}

			ctx.ui.notify("Loading sessions...", "info");

			let sessions: Awaited<ReturnType<typeof SessionManager.list>>;
			try {
				sessions = await SessionManager.list(ctx.cwd);
			} catch (err) {
				ctx.ui.notify(`Failed to list sessions: ${err}`, "error");
				return;
			}

			if (sessions.length === 0) {
				ctx.ui.notify("No sessions found in this project", "info");
				return;
			}

			// Sort by modified date (most recent first)
			sessions.sort((a, b) => b.modified.getTime() - a.modified.getTime());

			const currentSession = ctx.sessionManager.getSessionFile();

			// Build select items
			const items: SelectItem[] = sessions.map((s) => {
				const name = s.name || s.firstMessage.slice(0, 60) || "(empty session)";
				const isCurrent = currentSession === s.path;
				const label = isCurrent ? `${name} (current)` : name;
				const description = [
					`${s.messageCount} msgs`,
					relativeTime(s.modified),
					s.cwd ? truncateToWidth(s.cwd.split("/").pop() || s.cwd, 20) : "",
				]
					.filter(Boolean)
					.join(" · ");

				return {
					value: s.path,
					label,
					description,
				};
			});

			const result = await ctx.ui.custom<string | null>((tui, theme, _kb, done) => {
				const picker = new SearchablePicker(
					"Switch Session",
					items,
					theme,
					(item) => done(item.value),
					() => done(null),
				);

				return {
					render: (w: number) => picker.render(w),
					invalidate: () => picker.invalidate(),
					handleInput: (data: string) => {
						picker.handleInput(data);
						tui.requestRender();
					},
				};
			});

			if (!result) return;

			// Switch to the selected session
			const targetSession = result;
			if (targetSession === currentSession) {
				ctx.ui.notify("Already in this session", "info");
				return;
			}

			await ctx.switchSession(targetSession, {
				withSession: async (newCtx) => {
					newCtx.ui.notify("Switched session", "info");
				},
			});
		},
	});

	// ─── /providers — Interactive provider browser ───────────────────────────

	pi.registerCommand("providers", {
		description: "Browse configured providers with auth status",
		handler: async (_args, ctx) => {
			if (ctx.mode !== "tui") {
				ctx.ui.notify("Interactive provider browser requires TUI mode", "warning");
				return;
			}

			const providerIds = [...ctx.modelRegistry.getRegisteredProviderIds()];

			if (providerIds.length === 0) {
				ctx.ui.notify("No providers configured", "info");
				return;
			}

			// Build items with auth status and model counts
			const allModels = ctx.modelRegistry.getAvailable();
			const items: SelectItem[] = providerIds
				.map((providerId) => {
					const display = ctx.modelRegistry.getProviderDisplayName(providerId);
					const authStatus = ctx.modelRegistry.getProviderAuthStatus(providerId);
					const modelCount = allModels.filter((m) => m.provider === providerId).length;

					const authLabel =
						authStatus === "ok"
							? "✓ auth"
							: authStatus === "partial"
								? "△ partial"
								: authStatus === "oauth"
									? "✓ oauth"
									: "✗ no key";

					return {
						value: providerId,
						label: display || providerId,
						description: `${modelCount} models · ${authLabel}`,
					};
				})
				.sort((a, b) => a.label.localeCompare(b.label));

			const result = await ctx.ui.custom<string | null>((tui, theme, _kb, done) => {
				const picker = new SearchablePicker(
					"Providers (select to browse models)",
					items,
					theme,
					(item) => done(item.value),
					() => done(null),
				);

				return {
					render: (w: number) => picker.render(w),
					invalidate: () => picker.invalidate(),
					handleInput: (data: string) => {
						picker.handleInput(data);
						tui.requestRender();
					},
				};
			});

			if (!result) return;

			// After selecting a provider, show its models
			const selectedProvider = result;
			const providerModels = allModels.filter((m) => m.provider === selectedProvider);

			if (providerModels.length === 0) {
				ctx.ui.notify(`No available models for ${selectedProvider}`, "warning");
				return;
			}

			const providerDisplay = ctx.modelRegistry.getProviderDisplayName(selectedProvider);
			const modelItems: SelectItem[] = providerModels
				.map((m) => ({
					value: m.id,
					label: m.name || m.id,
					description: [m.reasoning ? "reasoning" : "", m.input?.includes("image") ? "vision" : ""]
						.filter(Boolean)
						.join(" · "),
				}))
				.sort((a, b) => a.label.localeCompare(b.label));

			const modelResult = await ctx.ui.custom<string | null>((tui, theme, _kb, done) => {
				const picker = new SearchablePicker(
					`Models — ${providerDisplay || selectedProvider}`,
					modelItems,
					theme,
					(item) => done(item.value),
					() => done(null),
				);

				return {
					render: (w: number) => picker.render(w),
					invalidate: () => picker.invalidate(),
					handleInput: (data: string) => {
						picker.handleInput(data);
						tui.requestRender();
					},
				};
			});

			if (!modelResult) return;

			// Set the selected model
			const model = ctx.modelRegistry.find(selectedProvider, modelResult);
			if (model) {
				const success = await pi.setModel(model);
				if (success) {
					ctx.ui.notify(`Switched to ${selectedProvider}/${modelResult}`, "info");
				} else {
					ctx.ui.notify(`No API key for ${selectedProvider}/${modelResult}`, "warning");
				}
			}
		},
	});

	// ─── /pick-model — Unified model picker with search ──────────────────────

	pi.registerCommand("pick-model", {
		description: "Search and select any available model",
		handler: async (_args, ctx) => {
			if (ctx.mode !== "tui") {
				ctx.ui.notify("Interactive model picker requires TUI mode", "warning");
				return;
			}

			const models = ctx.modelRegistry.getAvailable();

			if (models.length === 0) {
				ctx.ui.notify("No models available (configure API keys first)", "info");
				return;
			}

			const currentModel = ctx.model;
			const currentKey = currentModel
				? `${currentModel.provider}/${currentModel.id}`
				: null;

			// Build flat list of provider/model items
			const items: SelectItem[] = models
				.map((m) => {
					const key = `${m.provider}/${m.id}`;
					const isCurrent = key === currentKey;
					const label = isCurrent ? `${m.name || m.id} (current)` : m.name || m.id;
					const tags = [
						ctx.modelRegistry.getProviderDisplayName(m.provider) || m.provider,
						m.reasoning ? "reasoning" : "",
						m.input?.includes("image") ? "vision" : "",
					].filter(Boolean);

					return {
						value: key,
						label,
						description: tags.join(" · "),
					};
				})
				.sort((a, b) => {
					// Current model first, then alphabetical
					if (a.value === currentKey) return -1;
					if (b.value === currentKey) return 1;
					return a.label.localeCompare(b.label);
				});

			const result = await ctx.ui.custom<string | null>((tui, theme, _kb, done) => {
				const picker = new SearchablePicker(
					"Pick Model",
					items,
					theme,
					(item) => done(item.value),
					() => done(null),
				);

				return {
					render: (w: number) => picker.render(w),
					invalidate: () => picker.invalidate(),
					handleInput: (data: string) => {
						picker.handleInput(data);
						tui.requestRender();
					},
				};
			});

			if (!result) return;

			// Parse provider/model from "provider/model" value
			const slashIdx = result.indexOf("/");
			if (slashIdx === -1) return;
			const provider = result.slice(0, slashIdx);
			const modelId = result.slice(slashIdx + 1);

			if (result === currentKey) {
				ctx.ui.notify("Already using this model", "info");
				return;
			}

			const model = ctx.modelRegistry.find(provider, modelId);
			if (model) {
				const success = await pi.setModel(model);
				if (success) {
					ctx.ui.notify(`Switched to ${provider}/${modelId}`, "info");
				} else {
					ctx.ui.notify(`Failed to switch to ${provider}/${modelId}`, "warning");
				}
			}
		},
	});
}
