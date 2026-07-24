import { analyzePrompt } from "./analyzer.js";
import { resolveConfig } from "./config.js";
import { formatResult } from "./formatters.js";
import { buildRefinedPrompt } from "./prompt-builder.js";
import { scoreOriginal, scoreRefined } from "./quality-score.js";
import { validateRefinement } from "./validator.js";
import type { RawPromptInput, RefinementConfig, RefinementResult } from "./types.js";

export * from "./types.js";
export { analyzePrompt } from "./analyzer.js";
export { resolveConfig } from "./config.js";

export function refinePrompt(input: string | RawPromptInput, overrides: Partial<RefinementConfig> = {}): RefinementResult {
  const raw: RawPromptInput = typeof input === "string" ? { prompt: input } : input;
  const config = resolveConfig({
    ...overrides,
    mode: raw.mode ?? overrides.mode
  });

  const analysis = analyzePrompt(raw.prompt);
  const refinedPrompt = buildRefinedPrompt(analysis);
  const validation = validateRefinement(analysis, refinedPrompt);
  const qualityBefore = scoreOriginal(analysis);
  const qualityAfter = scoreRefined(analysis, refinedPrompt);
  const resultWithoutOutput = { analysis, refinedPrompt, validation, qualityBefore, qualityAfter };
  const output = formatResult(resultWithoutOutput, config);

  return { ...resultWithoutOutput, output };
}

export function refinePromptText(prompt: string, overrides: Partial<RefinementConfig> = {}): string {
  return refinePrompt(prompt, overrides).output;
}
