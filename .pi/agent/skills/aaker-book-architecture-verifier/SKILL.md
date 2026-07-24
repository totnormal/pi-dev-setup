---
name: aaker-book-architecture-verifier
description: |
  QA gate for Brand Architecture & Portfolio deliverables. Grades source fidelity, method completeness, trigger precision, and output quality. Use after any architecture skill produces output. Trigger phrases: "verify architecture", "check brand architecture & portfolio", "audit brand architecture".
source_book: |
  Brand Leadership (2000) + Brand Portfolio Strategy (2004) — David A. Aaker
source_chapter: |
  QA methodology synthesized across all chapters.
tags: [aaker-books, architecture, governance, p0]
related_skills: [aaker-book-architecture-orchestrator, aaker-book-brand-identity-elaboration, aaker-book-brand-architecture-design, aaker-book-brand-portfolio-roles, aaker-book-portfolio-inputs-decisions, aaker-book-brand-differentiation-energy, aaker-book-brand-alliances-cobranding, aaker-book-output-verifier]
disable-model-invocation: true
---

# Aaker Brand Architecture & Portfolio — Verifier

## R — Reading

Validates that Brand Architecture & Portfolio outputs are source-grounded, method-complete, and trigger-precise.

## I — Methodology skeleton

Grade on: (1) source fidelity, (2) method completeness, (3) trigger precision, (4) output actionability, (5) boundary respect. Return PASS / PASS WITH FIXES / FAIL.

## A2 — Future Trigger

### Run this skill when
1. Any `architecture` skill produced a deliverable.
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

Only audits Brand Architecture & Portfolio outputs. For collection-level QA, use `/aaker-book-output-verifier`.
