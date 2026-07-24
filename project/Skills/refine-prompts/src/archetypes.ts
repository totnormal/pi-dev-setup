import type { TaskArchetype } from "./types.js";

const SIGNALS: Record<TaskArchetype, string[]> = {
  general: [],
  coding: ["code", "repo", "repository", "implement", "feature", "bug", "typescript", "python", "api", "component", "app", "build", "add", "fix"],
  debugging: ["debug", "error", "stack trace", "failing", "crash", "fix", "regression", "logs"],
  architecture: ["architecture", "design system", "system design", "scalable", "data flow", "structure"],
  audit: ["audit", "review", "evaluate", "readiness", "assess", "inspect", "do not make changes"],
  research: ["research", "sources", "market", "literature", "competitor", "find evidence"],
  strategy: ["strategy", "positioning", "growth", "brand", "business", "marketing", "hypotheses"],
  migration: ["migrate", "migration", "convert", "port", "upgrade from", "replace"],
  documentation: ["documentation", "docs", "readme", "guide", "manual", "explain"],
  testing: ["test", "unit test", "integration test", "e2e", "coverage", "qa"],
  deployment: ["deploy", "release", "production", "ci/cd", "hosting", "rollback"],
  data_task: ["csv", "spreadsheet", "dataset", "extract", "transform", "analyze data", "sql"],
  content_brief: ["write", "copy", "article", "brief", "content", "creative"],
  stakeholder_brief: ["client", "stakeholder", "founder", "cfo", "vp", "interview", "briefing"],
  tool_workflow: ["plugin", "tool", "integration", "api", "use ", "extension", "connector"]
};

export function detectArchetypes(text: string): TaskArchetype[] {
  const normalized = text.toLowerCase();
  const scores = Object.entries(SIGNALS)
    .filter(([name]) => name !== "general")
    .map(([name, signals]) => ({
      name: name as TaskArchetype,
      score: signals.reduce((sum, signal) => sum + (normalized.includes(signal) ? 1 : 0), 0)
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => item.name);

  return scores.length > 0 ? scores : ["general"];
}

export function archetypeSections(archetypes: TaskArchetype[]): string[] {
  const sections = new Set<string>(["Context", "Goal", "Required Output"]);

  if (archetypes.includes("coding") || archetypes.includes("debugging")) {
    sections.add("Repository Workflow");
    sections.add("Validation");
  }
  if (archetypes.includes("audit")) sections.add("Review Criteria");
  if (archetypes.includes("research")) sections.add("Source Requirements");
  if (archetypes.includes("strategy") || archetypes.includes("stakeholder_brief")) sections.add("Decision Framework");
  if (archetypes.includes("deployment")) sections.add("Release Boundaries");
  if (archetypes.includes("tool_workflow")) sections.add("Tool Usage Rules");

  return [...sections];
}
