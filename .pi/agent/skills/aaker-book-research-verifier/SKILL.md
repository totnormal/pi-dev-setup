---
name: aaker-book-research-verifier
description: |
  QA gate for Research & Measurement deliverables. Grades source fidelity, method completeness, trigger precision, and output quality. Use after any research skill produces output. Trigger phrases: "verify research", "check research & measurement", "audit brand research".
source_book: |
  Marketing Research (2013) — David A. Aaker
source_chapter: |
  QA methodology synthesized across all chapters.
tags: [aaker-books, research, governance, p0]
related_skills: [aaker-book-research-orchestrator, aaker-book-research-decision-framework, aaker-book-research-design-selection, aaker-book-qualitative-research-methods, aaker-book-questionnaire-design, aaker-book-sampling-design, aaker-book-attitude-measurement, aaker-book-output-verifier]
disable-model-invocation: true
---

# Aaker Research & Measurement — Verifier

## R — Reading

Validates that Research & Measurement outputs are source-grounded, method-complete, and trigger-precise.

## I — Methodology skeleton

Grade on: (1) source fidelity, (2) method completeness, (3) trigger precision, (4) output actionability, (5) boundary respect. Return PASS / PASS WITH FIXES / FAIL.

## A2 — Future Trigger

### Run this skill when
1. Any `research` skill produced a deliverable.
2. The user asks to verify, audit, or quality-check a brand strategy output.
3. Before finalizing a recommendation for stakeholders.

### Language signals
- "verify", "audit", "check", "validate" + brand strategy context
- "is this Aaker-based analysis correct?"

### Distinction from siblings
- This skill only **audits**; it does not generate strategy. Route back to the atomic skill to fix any FAIL.
- For collection-level QA, use `/aaker-book-output-verifier`.

## E — Execution steps

1. Collect the deliverable, claimed method, and source references.
2. Grade each axis.
3. Return verdict with fixes.

## B — Boundary

Only audits Research & Measurement outputs. For collection-level QA, use `/aaker-book-output-verifier`.
