import type { RefinementConfig } from "./types.js";

declare const process: { env?: Record<string, string | undefined> } | undefined;

export const DEFAULT_CONFIG: RefinementConfig = {
  mode: "copy_paste",
  targetAgent: "general_agent",
  includeAnalysis: false,
  includeQualityScore: false,
  maxSimpleWords: 18,
  maxModerateWords: 90,
  askClarifyingQuestions: true,
  preserveMarkdown: true
};

export function resolveConfig(overrides: Partial<RefinementConfig> = {}): RefinementConfig {
  const env = typeof process === "undefined" ? {} : process.env ?? {};
  return {
    ...DEFAULT_CONFIG,
    mode: parseMode(env.REFINE_PROMPTS_MODE) ?? DEFAULT_CONFIG.mode,
    targetAgent: env.REFINE_PROMPTS_TARGET_AGENT ?? DEFAULT_CONFIG.targetAgent,
    includeAnalysis: parseBoolean(env.REFINE_PROMPTS_INCLUDE_ANALYSIS) ?? DEFAULT_CONFIG.includeAnalysis,
    includeQualityScore: parseBoolean(env.REFINE_PROMPTS_INCLUDE_SCORE) ?? DEFAULT_CONFIG.includeQualityScore,
    ...overrides
  };
}

function parseMode(value: string | undefined): RefinementConfig["mode"] | undefined {
  if (value === "copy_paste" || value === "verbose_markdown" || value === "json") return value;
  return undefined;
}

function parseBoolean(value: string | undefined): boolean | undefined {
  if (value === undefined) return undefined;
  return ["1", "true", "yes", "on"].includes(value.toLowerCase());
}
