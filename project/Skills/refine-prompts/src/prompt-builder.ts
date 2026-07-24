import { archetypeSections } from "./archetypes.js";
import { requiresGovernance } from "./risk-detector.js";
import type { PromptAnalysis, RefinedPrompt } from "./types.js";

export function buildRefinedPrompt(analysis: PromptAnalysis): RefinedPrompt {
  const clarifyingQuestions = buildClarifyingQuestions(analysis);
  if (clarifyingQuestions.length > 0 && analysis.complexity !== "simple" && analysis.risks.includes("missing_context")) {
    return {
      text: "",
      changed: false,
      clarifyingQuestions
    };
  }

  const lines: string[] = [];
  const role = roleFor(analysis);
  lines.push(`You are ${role}.`);
  lines.push("");
  lines.push("## Context");
  lines.push(contextFor(analysis));
  lines.push("");
  lines.push("## Goal");
  lines.push(goalFor(analysis));

  if (analysis.sourceHierarchy.sources.length > 1) {
    lines.push("");
    lines.push("## Source Hierarchy");
    for (const source of analysis.sourceHierarchy.sources) {
      lines.push(`- ${titleCase(source.authority)}: ${source.value} (${source.reason})`);
    }
    lines.push(`- Conflict rule: ${analysis.sourceHierarchy.conflictRule}`);
  }

  const sections = archetypeSections(analysis.archetypes);
  if (sections.includes("Repository Workflow")) addRepositoryWorkflow(lines);
  if (sections.includes("Review Criteria")) addReviewCriteria(lines);
  if (sections.includes("Source Requirements")) addSourceRequirements(lines);
  if (sections.includes("Decision Framework")) addDecisionFramework(lines);
  if (sections.includes("Tool Usage Rules")) addToolRules(lines, analysis);

  if (requiresGovernance(analysis.risks)) addGovernance(lines);

  lines.push("");
  lines.push("## Required Workflow");
  lines.push("- First, restate the objective and identify any assumptions.");
  lines.push("- Inspect or analyze the available context before producing conclusions or changes.");
  lines.push("- Keep the work tightly scoped to the user's request.");
  lines.push("- Ask concise clarifying questions only when missing information materially affects the result.");
  lines.push("- Do not invent unsupported facts, sources, tool outputs, or access.");

  lines.push("");
  lines.push("## Required Output");
  if (analysis.deliverables.length > 0) {
    for (const deliverable of analysis.deliverables.slice(0, 5)) lines.push(`- ${deliverable}`);
  } else {
    lines.push("- A clear, structured response that directly satisfies the goal.");
    lines.push("- Any assumptions, risks, missing context, and recommended next steps.");
  }

  lines.push("");
  lines.push("## Validation");
  lines.push("- Verify the response against the stated goal, constraints, and source hierarchy.");
  lines.push("- Call out any remaining uncertainty or information gaps.");
  lines.push("- Ensure the final answer is actionable and not generic.");

  return {
    text: lines.join("\n").trim(),
    changed: lines.join("\n").trim() !== analysis.originalPrompt.trim(),
    clarifyingQuestions
  };
}

function buildClarifyingQuestions(analysis: PromptAnalysis): string[] {
  if (analysis.missingContext.length === 0) return [];
  return analysis.missingContext.slice(0, 3).map((item) => item.replace(/\.$/, "?"));
}

function roleFor(analysis: PromptAnalysis): string {
  if (analysis.archetypes.includes("coding")) return "an expert software engineering agent";
  if (analysis.archetypes.includes("research")) return "a rigorous research agent";
  if (analysis.archetypes.includes("strategy")) return "a senior strategy and decision-support advisor";
  if (analysis.archetypes.includes("audit")) return "a careful audit and assessment specialist";
  if (analysis.archetypes.includes("documentation")) return "a precise technical documentation specialist";
  return "an expert AI task-execution assistant";
}

function contextFor(analysis: PromptAnalysis): string {
  const context = analysis.contextItems.length > 0 ? analysis.contextItems.join("\n") : analysis.normalizedPrompt;
  return context.length > 1200 ? `${context.slice(0, 1197)}...` : context;
}

function goalFor(analysis: PromptAnalysis): string {
  return `Complete the user's request while preserving this intent: ${analysis.goal}`;
}

function addRepositoryWorkflow(lines: string[]): void {
  lines.push("");
  lines.push("## Repository Workflow");
  lines.push("- Inspect the existing codebase, architecture, conventions, and tests before making recommendations or changes.");
  lines.push("- Prefer minimal, compatible changes over broad refactors.");
  lines.push("- Do not overwrite unrelated user work.");
  lines.push("- Validate with the most relevant tests, builds, linters, or manual checks available.");
  lines.push("- Summarize changed files, reasoning, validation results, and residual risks.");
}

function addReviewCriteria(lines: string[]): void {
  lines.push("");
  lines.push("## Review Criteria");
  lines.push("- Separate critical blockers from high-priority, medium-priority, and low-priority findings.");
  lines.push("- Include evidence, impact, and recommended next action for each important finding.");
  lines.push("- Keep read-only reviews strictly non-mutating unless the user explicitly authorizes changes.");
}

function addSourceRequirements(lines: string[]): void {
  lines.push("");
  lines.push("## Source Requirements");
  lines.push("- Use authoritative primary sources when possible.");
  lines.push("- Distinguish evidence from inference.");
  lines.push("- Cite or name the sources used when the final output depends on them.");
}

function addDecisionFramework(lines: string[]): void {
  lines.push("");
  lines.push("## Decision Framework");
  lines.push("- Identify the decisions the output should support.");
  lines.push("- Separate facts, assumptions, hypotheses, risks, and recommendations.");
  lines.push("- Prioritize the highest-leverage questions or actions over exhaustive generic lists.");
}

function addToolRules(lines: string[], analysis: PromptAnalysis): void {
  lines.push("");
  lines.push("## Tool Usage Rules");
  lines.push("- Use mentioned tools only when they are available and materially improve the result.");
  if (analysis.tools.length > 0) lines.push(`- Mentioned tools: ${analysis.tools.join(", ")}.`);
  lines.push("- State fallback behavior if a required tool, connector, file, or API is unavailable.");
  lines.push("- Do not claim tool results that were not actually obtained.");
}

function addGovernance(lines: string[]): void {
  lines.push("");
  lines.push("## Safety And Approval Boundaries");
  lines.push("- Do not perform destructive, irreversible, publishing, deployment, account-level, payment, or production-impacting actions without explicit approval.");
  lines.push("- Do not expose, print, or store secrets or credentials.");
  lines.push("- Present a short plan before risky changes and include validation or rollback guidance where relevant.");
}

function titleCase(value: string): string {
  return value.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}
