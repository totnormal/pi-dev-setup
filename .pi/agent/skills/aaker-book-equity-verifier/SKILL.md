---
name: aaker-book-equity-verifier
description: |
  QA gate for Brand Equity Foundations deliverables. Grades source fidelity, method completeness, trigger precision, and output quality. Use after any equity skill produces output. Trigger phrases: "verify equity", "check brand equity foundations", "audit brand equity".
source_book: |
  Managing Brand Equity (1991) + Building Strong Brands (1995) — David A. Aaker
source_chapter: |
  QA methodology synthesized across all chapters.
tags: [aaker-books, equity, governance, p0]
related_skills: [aaker-book-equity-orchestrator, aaker-book-brand-equity-model, aaker-book-brand-loyalty-management, aaker-book-brand-awareness-strategy, aaker-book-perceived-quality-leverage, aaker-book-brand-association-positioning, aaker-book-brand-association-measurement, aaker-book-output-verifier]
disable-model-invocation: true
---

# Aaker Brand Equity Foundations — Verifier

## R — Reading

Validates that Brand Equity Foundations outputs are source-grounded, method-complete, and trigger-precise.

## I — Methodology skeleton

Grade on: (1) source fidelity, (2) method completeness, (3) trigger precision, (4) output actionability, (5) boundary respect. Return PASS / PASS WITH FIXES / FAIL.

## A2 — Future Trigger

### Run this skill when
1. Any `equity` skill produced a deliverable.
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

Only audits Brand Equity Foundations outputs. For collection-level QA, use `/aaker-book-output-verifier`.
