# Analysis Report

## Existing Skill Findings

The existing `refine-skill` is a compact Pi extension. It registers `/refine`, stores an enabled/disabled state, intercepts input when enabled, sends short prompts to a configured LLM, asks for confirmation, and transforms the user input only when accepted.

Strengths:
- Opt-in refinement avoids surprising users.
- Fail-open behavior keeps the original prompt usable.
- Confirmation protects against unwanted rewrites.
- Environment variables make provider/model/threshold configurable.
- The system prompt correctly preserves intent and avoids preambles.

Weaknesses:
- Refinement logic is embedded in the Pi adapter instead of reusable.
- It does not classify task archetypes or complexity.
- It does not build source hierarchies for files, links, examples, and tools.
- It has limited governance handling for risky prompts.
- It has no validation layer, quality scoring, schemas, examples, or Codex skill metadata.
- It is coding-assistant oriented and not a universal prompt-refinement layer.

Reusable components:
- `/refine` command pattern.
- Session state for opt-in behavior.
- Confirmation-before-transform flow.
- Fail-open error behavior.

## Example Transformation Findings

The examples follow a consistent refinement methodology:
- Diagnose the original prompt's weaknesses.
- Identify the deeper objective and elevate the task frame.
- Add role, context, source hierarchy, constraints, workflow, deliverables, output format, validation, and acceptance criteria.
- Add governance boundaries for destructive, production, account, payment, legal, or deployment work.
- Preserve the user's intent while turning broad requests into actionable operating briefs.

Recurring structural improvements:
- Facts and assumptions are separated.
- Examples are marked as inspiration unless authoritative.
- Contract/addendum or user-stated scope becomes primary authority.
- Tool names are operationalized with usage rules and fallbacks.
- Read-only audits explicitly prohibit mutation.
- Coding prompts require inspection before changes and validation after changes.

## Candidate Prompt Findings

Retain:
- Concept elevation.
- Risk-based expansion.
- Task archetype detection.
- Failure-mode analysis.
- Source hierarchy construction.
- Governance boundary detection.
- Tool/repository handling.
- Execution-readiness validation.

Modify:
- Make analysis verbosity configurable rather than mandatory.
- Default to copy-paste-ready output for normal use.
- Generalize beyond coding while retaining coding-specific safeguards.
- Move detailed methodology into references and config.

Remove:
- XML-by-default output.
- Long analysis for simple prompts.
- Rigid section requirements when the prompt only needs light cleanup.

Add:
- Deterministic TypeScript engine.
- JSON schema and examples.
- Quality scoring.
- Pi adapter that reuses shared logic.
- Clarification mode for materially incomplete prompts.

## Synthesis

The new skill should behave as a reusable prompt-refinement layer: concise for simple prompts, structured for complex prompts, and governance-aware for risky prompts. It should never solve the embedded task. It should preserve user intent, add execution structure, label assumptions, identify missing context, and optimize prompts for the likely downstream agent or workflow.
