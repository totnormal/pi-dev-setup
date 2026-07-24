/**
 * Skill Browser Extension
 *
 * Provides a /skills command to browse, search, and load skills on demand.
 * Skills not in the always-on (+name) settings list are still discoverable
 * and loadable via this browser — they just don't auto-appear in the system prompt.
 *
 * Usage:
 *   /skills          →  open interactive browser with all skills
 *   /skills seo      →  open browser pre-filtered to "seo"
 *   /skills audit    →  matches names AND descriptions
 *
 * Features:
 *   - Fuzzy search across skill names and descriptions
 *   - Category grouping (inferred from name prefixes)
 *   - Skill descriptions visible while browsing
 *   - Load skill into conversation on select (no restart needed)
 *   - Shows which skills are already active (always-on or session-loaded)
 */

import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import { parseFrontmatter, stripFrontmatter, getSelectListTheme, DynamicBorder } from "@mariozechner/pi-coding-agent";
import { Container, SelectList, Text, type SelectItem, fuzzyFilter } from "@mariozechner/pi-tui";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { basename, join } from "node:path";
import { homedir } from "node:os";

// ─── Skill Index ─────────────────────────────────────────────────────────────

interface SkillEntry {
	name: string;
	description: string;
	filePath: string;
	baseDir: string;
	category: string;
}

const SKILL_DIRS = [
	join(homedir(), ".pi", "agent", "skills"),
	join(homedir(), ".agents", "skills"),
];

const CATEGORY_MAP: Record<string, string> = {
	seo: "SEO", ads: "Ads", blog: "Blog", gws: "Google Workspace",
	marketing: "Marketing", email: "Email", sales: "Sales", recipe: "GWS Recipes",
	paid: "Paid Ads", content: "Content", brand: "Brand", social: "Social",
	cloudflare: "Cloudflare", vercel: "Vercel", firecrawl: "Firecrawl",
	terraform: "Terraform", python: "Python", android: "Android", ios: "iOS",
	frontend: "Frontend", next: "Next.js", campaign: "Campaign",
	pricing: "Pricing", programmatic: "Programmatic", retention: "Retention",
	referral: "Referral", ab: "A/B Testing", abm: "ABM", customer: "Customer",
	persona: "Persona", competitive: "Competitive", competitor: "Competitive",
	growth: "Growth", influencer: "Influencer", video: "Video", demand: "Demand Gen",
	cold: "Cold Outreach", copywriting: "Copywriting", landing: "Landing",
	signup: "Signup", onboarding: "Onboarding", conversion: "Conversion",
	churn: "Churn", revenue: "Revenue", lead: "Lead Gen", popup: "Popup",
	form: "Form CRO", page: "Page CRO", visual: "Visual Identity",
	local: "Local Marketing", community: "Community", enterprise: "Enterprise",
	go: "Go-to-Market", launch: "Launch", startup: "Startup", minisite: "Minisite",
	accessibility: "Accessibility", security: "Security", compliance: "Compliance",
	testing: "Testing", account: "Account", interview: "HR", analytics: "Analytics",
	dashboard: "Dashboard", web: "Web", ui: "UI/UX", agent: "Agent Dev",
	ai: "AI", dispatching: "Agents", subagent: "Agents", executing: "Planning",
	task: "Task Mgmt", using: "Dev Workflow", finishing: "Dev Workflow",
	receiving: "Code Review", requesting: "Code Review", writing: "Writing",
	omni: "Omni", creative: "Creative", product: "Product", market: "Market Research",
	schema: "Schema", meta: "Meta Tags", internal: "Internal Links",
	on: "On-Page", technical: "Technical", serp: "SERP", keyword: "Keywords",
	site: "Site Architecture", slack: "Slack", phonetic: "Naming",
};

function inferCategory(name: string): string {
	const sorted = Object.keys(CATEGORY_MAP).sort((a, b) => b.length - a.length);
	for (const prefix of sorted) {
		if (name.startsWith(prefix + "-") || name === prefix) {
			return CATEGORY_MAP[prefix];
		}
	}
	return "Other";
}

function scanSkills(): SkillEntry[] {
	const skills: SkillEntry[] = [];
	const seenNames = new Set<string>();

	for (const dir of SKILL_DIRS) {
		if (!existsSync(dir)) continue;
		try {
			const entries = readdirSync(dir, { withFileTypes: true });
			for (const entry of entries) {
				if (entry.name.startsWith(".") || entry.name === "node_modules") continue;
				const skillDir = join(dir, entry.name);
				const skillFile = join(skillDir, "SKILL.md");

				let isDir = entry.isDirectory();
				if (entry.isSymbolicLink()) {
					try { isDir = statSync(skillDir).isDirectory(); } catch { continue; }
				}
				if (!isDir || !existsSync(skillFile)) continue;

				try {
					const content = readFileSync(skillFile, "utf-8");
					const { frontmatter } = parseFrontmatter(content);
					const name = frontmatter.name || entry.name;
					const description = frontmatter.description || "";
					if (!description || description.trim() === "") continue;
					if (seenNames.has(name)) continue;
					seenNames.add(name);
					skills.push({
						name,
						description: description.trim(),
						filePath: skillFile,
						baseDir: skillDir,
						category: inferCategory(name),
					});
				} catch { /* skip malformed */ }
			}
		} catch { /* skip unreadable */ }
	}

	return skills.sort((a, b) => {
		const catCmp = a.category.localeCompare(b.category);
		return catCmp !== 0 ? catCmp : a.name.localeCompare(b.name);
	});
}

function loadSkillContent(entry: SkillEntry, args?: string): string {
	const content = readFileSync(entry.filePath, "utf-8");
	const body = stripFrontmatter(content).trim();
	const skillBlock = `<skill name="${entry.name}" location="${entry.filePath}">\nReferences are relative to ${entry.baseDir}.\n\n${body}\n</skill>`;
	return args ? `${skillBlock}\n\n${args}` : skillBlock;
}

// ─── Custom filter: matches name OR description ──────────────────────────────

function customFilter(items: SelectItem[], query: string): SelectItem[] {
	if (!query) return items;
	const q = query.toLowerCase();
	// Two-pass: names first, then description matches not already included
	const nameMatches = new Set<string>();
	const result: SelectItem[] = [];

	for (const item of items) {
		if (item.value.startsWith("__cat__")) {
			// Category header — include if next items match
			result.push(item);
			continue;
		}
		const nameMatch = item.value.toLowerCase().includes(q);
		const descMatch = item.description?.toLowerCase().includes(q) ?? false;
		if (nameMatch) {
			nameMatches.add(item.value);
			result.push(item);
		} else if (descMatch) {
			result.push(item);
		} else {
			// Remove trailing category header if no items followed it
			if (result.length > 0 && result[result.length - 1].value.startsWith("__cat__")) {
				result.pop();
			}
		}
	}
	return result;
}

// ─── Extension ───────────────────────────────────────────────────────────────

export default function skillBrowserExtension(pi: ExtensionAPI) {
	let skillIndex: SkillEntry[] = [];
	let indexBuiltAt = 0;
	const loadedSkills = new Set<string>();

	function buildIndex(): SkillEntry[] {
		const now = Date.now();
		if (skillIndex.length > 0 && now - indexBuiltAt < 30_000) return skillIndex;
		skillIndex = scanSkills();
		indexBuiltAt = now;
		return skillIndex;
	}

	function getActiveSkillNames(): Set<string> {
		const active = new Set<string>();
		try {
			const enabledSkills = pi.getCommands()
				.filter((c) => c.source === "skill")
				.map((c) => c.name.replace(/^skill:/, ""));
			for (const name of enabledSkills) active.add(name);
		} catch { /* commands not available in all contexts */ }
		for (const name of loadedSkills) active.add(name);
		return active;
	}

	function buildSelectItems(skills: SkillEntry[], activeNames: Set<string>): SelectItem[] {
		let lastCategory = "";
		const items: SelectItem[] = [];
		for (const skill of skills) {
			if (skill.category !== lastCategory) {
				items.push({ value: `__cat__${skill.category}`, label: `── ${skill.category} ──` });
				lastCategory = skill.category;
			}
			const isActive = activeNames.has(skill.name);
			const prefix = isActive ? "✓ " : "  ";
			items.push({
				value: skill.name,
				label: `${prefix}${skill.name}`,
				description: isActive ? `${skill.description} [active]` : skill.description,
			});
		}
		return items;
	}

	pi.registerCommand("skills", {
		description: "Browse and load skills on demand (searches names + descriptions)",
		getArgumentCompletions: (prefix: string) => {
			const skills = buildIndex();
			const q = prefix.toLowerCase();
			const matches = skills
				.filter((s) => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q))
				.slice(0, 20)
				.map((s) => ({ value: s.name, label: s.name, description: s.description.slice(0, 80) }));
			return matches.length > 0 ? matches : null;
		},
		handler: async (args, ctx) => {
			const skills = buildIndex();
			const activeNames = getActiveSkillNames();
			const trimmedArgs = (args || "").trim();

			// Direct load if exact name match
			if (trimmedArgs) {
				const exactMatch = skills.find((s) => s.name === trimmedArgs);
				if (exactMatch) {
					const content = loadSkillContent(exactMatch);
					loadedSkills.add(exactMatch.name);
					pi.sendUserMessage(content, { deliverAs: "steer" });
					ctx.ui.notify(`✓ Loaded skill: ${exactMatch.name}`, "info");
					return;
				}
			}

			// Build items for the selector
			const allItems = buildSelectItems(skills, activeNames);

			// Pre-filter if args provided
			const initialItems = trimmedArgs ? customFilter(allItems, trimmedArgs) : allItems;

			if (initialItems.length === 0) {
				ctx.ui.notify(`No skills matching "${trimmedArgs}"`, "warning");
				return;
			}

			// Interactive browser
			const selectedSkill = await ctx.ui.custom<string | null>((tui, theme, _kb, done) => {
				const container = new Container();
				container.addChild(new DynamicBorder((s: string) => theme.fg("accent", s)));
				container.addChild(new Text(
					theme.fg("accent", theme.bold("  Skill Browser")) +
					theme.fg("dim", `  •  ${skills.length} skills available  •  type to search`),
					1, 0
				));

				// Search state
				let searchQuery = trimmedArgs;

				// Search bar
				const searchBar = new Text(
					theme.fg("muted", `  Search: ${searchQuery}${searchQuery ? "" : "(type to filter)"}`),
					0, 0
				);

				container.addChild(searchBar);

				// SelectList
				const selectList = new SelectList(initialItems, Math.min(initialItems.length, 12), {
					...getSelectListTheme(),
					description: (t: string) => theme.fg("muted", t),
				});

				selectList.onSelect = (item) => {
					if (item.value.startsWith("__cat__")) return;
					done(item.value);
				};
				selectList.onCancel = () => done(null);

				container.addChild(selectList);
				container.addChild(new Text(
					theme.fg("dim", "  ↑↓ navigate • enter load • type to search • ⌫ backspace • esc cancel"),
					1, 0
				));
				container.addChild(new DynamicBorder((s: string) => theme.fg("accent", s)));

				function updateSearch() {
					searchBar.setText(
						theme.fg("muted", `  Search: `) +
						theme.fg("accent", searchQuery) +
						theme.fg("dim", "▏") +
						(searchQuery ? "" : theme.fg("dim", " type to filter"))
					);
					const filtered = customFilter(allItems, searchQuery);
					// Rebuild the select list with filtered items
					selectList["items"] = filtered;
					selectList["filteredItems"] = filtered;
					selectList["selectedIndex"] = 0;
					tui.requestRender();
				}

				return {
					render: (w: number) => container.render(w),
					invalidate: () => container.invalidate(),
					handleInput: (data: string) => {
						// Navigation keys → SelectList
						if (data === "\x1b[A" || data === "\x1b[B" ||   // up/down
							data === "\x1b[5~" || data === "\x1b[6~" ||   // pgup/pgdn
							data === "k" || data === "j") {               // vim
							selectList.handleInput(data === "k" ? "\x1b[A" : data === "j" ? "\x1b[B" : data);
							tui.requestRender();
							return;
						}
						// Enter → select
						if (data === "\r") {
							const filtered = selectList["filteredItems"] as SelectItem[];
							const idx = selectList["selectedIndex"] as number;
							if (filtered?.[idx] && !filtered[idx].value.startsWith("__cat__")) {
								done(filtered[idx].value);
							}
							return;
						}
						// Escape → cancel
						if (data === "\x1b") {
							done(null);
							return;
						}
						// Backspace → delete from search
						if (data === "\x7f" || data === "\b") {
							if (searchQuery.length > 0) {
								searchQuery = searchQuery.slice(0, -1);
								updateSearch();
							}
							return;
						}
						// Ctrl+U → clear search
						if (data === "\x15") {
							searchQuery = "";
							updateSearch();
							return;
						}
						// Printable characters → append to search
						if (data.length === 1 && data >= " " && data <= "~") {
							searchQuery += data;
							updateSearch();
							return;
						}
						// Other keys → pass through to SelectList
						selectList.handleInput(data);
						tui.requestRender();
					},
				};
			});

			if (selectedSkill) {
				const skill = skills.find((s) => s.name === selectedSkill);
				if (skill) {
					const content = loadSkillContent(skill);
					loadedSkills.add(skill.name);
					pi.sendUserMessage(content, { deliverAs: "steer" });
					ctx.ui.notify(`✓ Loaded skill: ${skill.name}`, "info");
				}
			}
		},
	});

	// Reset index on session start
	pi.on("session_start", async () => {
		skillIndex = [];
		indexBuiltAt = 0;
		loadedSkills.clear();
	});
}
