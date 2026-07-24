import type { PromptAnalysis, QualityScore, RefinedPrompt } from "./types.js";

export function scoreOriginal(analysis: PromptAnalysis): QualityScore {
  return scoreText(analysis.normalizedPrompt, analysis, false);
}

export function scoreRefined(analysis: PromptAnalysis, refined: RefinedPrompt): QualityScore {
  return scoreText(refined.text || analysis.normalizedPrompt, analysis, true);
}

function scoreText(text: string, analysis: PromptAnalysis, refined: boolean): QualityScore {
  const hasSections = (text.match(/^## /gm) ?? []).length;
  const clarity = bounded(analysis.goal.length > 0 ? 55 + Math.min(25, analysis.goal.length / 12) : 35);
  const specificity = bounded(45 + analysis.files.length * 8 + analysis.urls.length * 6 + analysis.tools.length * 5 + analysis.deliverables.length * 4);
  const structure = bounded(refined ? 55 + hasSections * 7 : hasSections * 10 + (text.includes("\n") ? 25 : 10));
  const executionReadiness = bounded(35 + (text.includes("Required Workflow") ? 25 : 0) + (text.includes("Required Output") ? 20 : 0) + (text.includes("Validation") ? 15 : 0));
  const riskControl = bounded(analysis.risks.length === 0 ? 80 : text.includes("Safety And Approval Boundaries") ? 82 : 45);
  const assumptionControl = bounded(text.toLowerCase().includes("assumption") || analysis.missingContext.length === 0 ? 78 : 48);
  const overall = Math.round((clarity + specificity + structure + executionReadiness + riskControl + assumptionControl) / 6);

  return { clarity, specificity, structure, executionReadiness, riskControl, assumptionControl, overall };
}

function bounded(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}
