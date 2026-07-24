import type { PromptAnalysis, RefinedPrompt, ValidationResult } from "./types.js";

const REQUIRED_SECTIONS = ["## Context", "## Goal", "## Required Workflow", "## Required Output", "## Validation"];

export function validateRefinement(analysis: PromptAnalysis, refined: RefinedPrompt): ValidationResult {
  const missing: string[] = [];
  const warnings: string[] = [];

  if (refined.clarifyingQuestions.length > 0 && refined.text.length === 0) {
    return { passed: true, missing: [], warnings: ["Clarification is required before rewriting."] };
  }

  for (const section of REQUIRED_SECTIONS) {
    if (!refined.text.includes(section)) missing.push(section);
  }

  if (analysis.risks.length > 0 && !refined.text.includes("Safety And Approval Boundaries")) {
    warnings.push("Risk flags were detected but no explicit governance section was added.");
  }

  for (const file of analysis.files) {
    if (!refined.text.includes(file)) warnings.push(`Referenced file path is not preserved: ${file}`);
  }

  for (const url of analysis.urls) {
    if (!refined.text.includes(url)) warnings.push(`Referenced URL is not preserved: ${url}`);
  }

  if (/solve|answer the task inside/i.test(refined.text)) {
    warnings.push("Refined prompt may imply solving the embedded task.");
  }

  return {
    passed: missing.length === 0,
    missing,
    warnings
  };
}
