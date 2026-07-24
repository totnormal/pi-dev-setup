import { readFileSync, statSync } from "node:fs";
import type { ExtensionAPI, Skill } from "@mariozechner/pi-coding-agent";
import { formatSkillsForPrompt, stripFrontmatter } from "@mariozechner/pi-coding-agent";

const SKILLS_INTRO =
  "\n\nThe following skills provide specialized instructions for specific tasks.";
const DATE_MARKER = "\nCurrent date:";
const DEFAULT_MAX_SKILLS = 3;
const DEFAULT_MAX_CHARS = 4200;
const AUTO_EXPAND_MIN_SCORE = 30;

const STOPWORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "be",
  "by",
  "for",
  "from",
  "how",
  "i",
  "if",
  "in",
  "into",
  "is",
  "it",
  "its",
  "me",
  "of",
  "on",
  "or",
  "our",
  "please",
  "that",
  "the",
  "their",
  "them",
  "these",
  "this",
  "to",
  "use",
  "using",
  "want",
  "what",
  "when",
  "where",
  "which",
  "who",
  "why",
  "with",
  "you",
  "your",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9-]+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 0);
}

function escapeRegExp(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function scoreSkill(
  skill: Skill,
  promptLower: string,
  promptTokens: Set<string>,
): number {
  let score = 0;
  const name = skill.name.toLowerCase();
  const nameParts = name.split("-").filter((part) => part.length > 0);
  const descriptionTokens = tokenize(skill.description);

  if (promptLower.includes("/skill:" + name)) score += 1000;
  if (promptLower.includes("skill:" + name)) score += 800;
  if (promptLower.includes("/" + name)) score += 400;
  if (promptLower.includes(name)) score += 120;

  for (const part of nameParts) {
    if (!STOPWORDS.has(part) && promptTokens.has(part)) {
      score += 40;
    }
  }

  for (const token of descriptionTokens) {
    if (!STOPWORDS.has(token) && promptTokens.has(token)) {
      score += 7;
    }
  }

  return score;
}

function isExplicitlyInvoked(skill: Skill, prompt: string): boolean {
  const escapedName = escapeRegExp(skill.name);
  const explicitCommand = new RegExp(String.raw`\/skill:${escapedName}\b`, "i");
  const explicitBlock = new RegExp(String.raw`<skill\s+name="${escapedName}"`, "i");
  return explicitCommand.test(prompt) || explicitBlock.test(prompt);
}

function getBodyCacheEntry(skill: Skill): { mtimeMs: number; body: string; rendered: string } | null {
  try {
    const stats = statSync(skill.filePath);
    const cached = bodyCache.get(skill.filePath);
    if (cached && cached.mtimeMs === stats.mtimeMs) {
      return cached;
    }

    const raw = readFileSync(skill.filePath, "utf8");
    const body = stripFrontmatter(raw).trim();
    const rendered = [
      `<skill name="${skill.name}" location="${skill.filePath}">`,
      `References are relative to ${skill.baseDir}.`,
      "",
      body,
      "</skill>",
    ]
      .filter((line, idx, lines) => line.length > 0 || idx !== lines.length - 1)
      .join("\n");

    const entry = { mtimeMs: stats.mtimeMs, body, rendered };
    bodyCache.set(skill.filePath, entry);
    return entry;
  } catch {
    return null;
  }
}

function renderSelectedSkills(selectedSkills: Skill[]): string {
  if (selectedSkills.length === 0) {
    return "";
  }

  const metadata = formatSkillsForPrompt(selectedSkills);
  const bodies = selectedSkills
    .map((skill) => getBodyCacheEntry(skill)?.rendered)
    .filter((value): value is string => Boolean(value))
    .join("\n\n");

  return `${metadata}\n\n${bodies}`;
}

function selectSkills(skills: Skill[], prompt: string, usagePercent: number | null | undefined): Skill[] {
  const promptLower = prompt.toLowerCase();
  const promptTokens = new Set(tokenize(promptLower));

  const scored = skills
    .filter((skill) => !skill.disableModelInvocation)
    .filter((skill) => !isExplicitlyInvoked(skill, prompt))
    .map((skill) => ({
      skill,
      score: scoreSkill(skill, promptLower, promptTokens),
    }))
    .filter((item) => item.score >= AUTO_EXPAND_MIN_SCORE)
    .sort((a, b) => b.score - a.score || a.skill.name.localeCompare(b.skill.name));

  if (scored.length === 0) {
    return [];
  }

  const maxSkills =
    usagePercent == null
      ? DEFAULT_MAX_SKILLS
      : usagePercent >= 90
        ? 1
        : usagePercent >= 75
          ? 2
          : DEFAULT_MAX_SKILLS;

  const maxChars =
    usagePercent == null
      ? DEFAULT_MAX_CHARS
      : usagePercent >= 90
        ? 1200
        : usagePercent >= 75
          ? 2200
          : DEFAULT_MAX_CHARS;

  const chosen: Skill[] = [];
  let usedChars = 0;

  for (const item of scored) {
    if (chosen.length >= maxSkills) {
      break;
    }

    const rendered = getBodyCacheEntry(item.skill)?.rendered;
    if (!rendered) {
      continue;
    }
    const estimatedSize = rendered.length + item.skill.name.length + item.skill.description.length + 240;

    if (chosen.length > 0 && usedChars + estimatedSize > maxChars) {
      break;
    }

    chosen.push(item.skill);
    usedChars += estimatedSize;
  }

  return chosen;
}

function rewriteSkillsSection(systemPrompt: string, selectedSkills: Skill[]): string {
  const start = systemPrompt.indexOf(SKILLS_INTRO);
  if (start === -1) {
    return systemPrompt;
  }

  const end = systemPrompt.indexOf(DATE_MARKER, start);
  if (end === -1) {
    return systemPrompt;
  }

  const skillsSection = selectedSkills.length > 0 ? renderSelectedSkills(selectedSkills) : "";

  return systemPrompt.slice(0, start) + skillsSection + systemPrompt.slice(end);
}

const bodyCache = new Map<string, { mtimeMs: number; body: string; rendered: string }>();

export default function (pi: ExtensionAPI) {
  pi.on("before_agent_start", (event, ctx) => {
    const skills = event.systemPromptOptions.skills ?? [];
    if (skills.length === 0) {
      return;
    }

    const usage = ctx.getContextUsage()?.percent;
    const selectedSkills = selectSkills(skills, event.prompt, usage);
    const rewritten = rewriteSkillsSection(event.systemPrompt, selectedSkills);

    if (rewritten === event.systemPrompt) {
      return;
    }

    return { systemPrompt: rewritten };
  });

  pi.registerCommand("skill-router", {
    description: "Show how the skill router trims the active registry",
    handler: async (_args, ctx) => {
      const usage = ctx.getContextUsage();
      const percent = usage?.percent == null ? "unknown" : `${Math.round(usage.percent)}%`;
      ctx.ui.notify(
        `Skill router active: up to ${DEFAULT_MAX_SKILLS} skills / ${DEFAULT_MAX_CHARS} chars (context ${percent})`,
        "info",
      );
    },
  });
}
