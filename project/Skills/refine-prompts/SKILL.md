---
name: refine-prompts
description: Refine, rewrite, improve, upgrade, or structure raw user prompts into execution-ready prompts for AI agents, coding agents, tool workflows, research, strategy, audits, documentation, implementation planning, and other agentic work. Use when the user asks to improve a prompt, make a prompt clearer or more actionable, convert a vague request into a stronger prompt, or create a copy-paste-ready prompt for another AI system.
disable-model-invocation: true
---

# Refine Prompts

Transform raw prompts into clear, structured, execution-ready prompts. Improve the prompt only; do not solve the task inside the prompt.

## Workflow

1. Identify the user's explicit goal, context, constraints, sources, tools, and desired output.
2. Infer the underlying task archetype only when strongly supported by the prompt.
3. Scale the rewrite to prompt complexity:
   - Simple: light cleanup and specificity.
   - Moderate: role, goal, context, deliverables, output format.
   - Complex: workflow, source hierarchy, assumptions, risks, validation, acceptance criteria.
   - Mission-critical: add approval gates, safety boundaries, rollback/review points, and decision rights.
4. Preserve all file paths, URLs, code snippets, names, technical terms, and explicit user constraints.
5. Add assumptions only when useful and label them clearly.
6. Ask one concise round of clarifying questions only when missing information materially changes the rewrite.
7. Output a copy-paste-ready refined prompt unless the user requests analysis, JSON, examples, or a report.

## Required Guardrails

- Do not complete the embedded task.
- Do not invent unsupported facts, sources, tools, or access.
- Do not add heavy governance to low-risk prompts.
- Add approval boundaries for destructive actions, production systems, publishing, deployments, account changes, credentials, payments, legal/compliance risk, external services, or repository modification.
- For coding or repository prompts, include inspect-first behavior, minimal compatible changes, validation with tests/checks, and a final summary of changes when relevant.
- For prompts involving files, repositories, links, examples, or attachments, define which sources are authoritative and how conflicts should be resolved.

## Output Modes

- Default: return only the improved prompt in a fenced code block.
- Verbose: include a brief analysis, improvements table, improved prompt, and quality assessment.
- Clarification: ask focused questions and stop when critical context is missing.
- JSON: return a structured refinement result.

## References

Read `references/methodology.md` for complex or mission-critical refinement. Use `examples/transformations.json` only when the user asks for examples or when validating style consistency.
