import type { RefinementConfig, RefinementResult } from "./types.js";

export function formatResult(result: Omit<RefinementResult, "output">, config: RefinementConfig): string {
  if (config.mode === "json") return JSON.stringify(result, null, 2);

  if (result.refinedPrompt.clarifyingQuestions.length > 0 && result.refinedPrompt.text.length === 0) {
    return [
      "I need the following context before rewriting the prompt:",
      "",
      ...result.refinedPrompt.clarifyingQuestions.map((question, index) => `${index + 1}. ${question}`)
    ].join("\n");
  }

  if (config.mode === "verbose_markdown" || config.includeAnalysis) {
    return verbose(result);
  }

  return `\`\`\`text\n${result.refinedPrompt.text}\n\`\`\``;
}

function verbose(result: Omit<RefinementResult, "output">): string {
  const archetypes = result.analysis.archetypes.join(", ");
  const risks = result.analysis.risks.length > 0 ? result.analysis.risks.join(", ") : "none";
  return [
    "# Analysis of the Prompt",
    "",
    `Goal: ${result.analysis.goal}`,
    `Complexity: ${result.analysis.complexity}`,
    `Task archetype(s): ${archetypes}`,
    `Risk flags: ${risks}`,
    "",
    "# Improvements to be made",
    "",
    "| Original element | Improved version | Reasoning |",
    "| --- | --- | --- |",
    "| Unstructured request | Structured prompt with role, context, workflow, output, and validation | Improves execution readiness |",
    "| Implicit assumptions | Labeled assumptions and clarification triggers | Reduces unsupported inference |",
    "| Missing safety boundaries | Governance rules when risks are detected | Prevents unsafe execution |",
    "",
    "# Improved Prompt",
    "",
    "```text",
    result.refinedPrompt.text,
    "```",
    "",
    "# Rewrite Quality Assessment",
    "",
    "| Dimension | Before | After |",
    "| --- | ---: | ---: |",
    `| Overall | ${result.qualityBefore.overall} | ${result.qualityAfter.overall} |`,
    `| Execution readiness | ${result.qualityBefore.executionReadiness} | ${result.qualityAfter.executionReadiness} |`,
    `| Risk control | ${result.qualityBefore.riskControl} | ${result.qualityAfter.riskControl} |`
  ].join("\n");
}
