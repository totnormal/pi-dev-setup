---
name: aaker-book-advertising-verifier
description: |
  QA gate for Advertising & Brand Building deliverables. Grades source fidelity, method completeness, trigger precision, and output quality. Use after any advertising skill produces output. Trigger phrases: "verify advertising", "check advertising & brand building", "audit brand advertising".
source_book: |
  Advertising Management (1996) — David A. Aaker
source_chapter: |
  QA methodology synthesized across all chapters.
tags: [aaker-books, advertising, governance, p0]
related_skills: [aaker-book-advertising-orchestrator, aaker-book-advertising-planning-imc, aaker-book-advertising-objectives, aaker-book-advertising-response-model, aaker-book-ad-segmentation-positioning, aaker-book-attention-comprehension-design, aaker-book-benefit-attitude-formation, aaker-book-output-verifier]
disable-model-invocation: true
---

# Aaker Advertising & Brand Building — Verifier

## R — Reading

Validates that Advertising & Brand Building outputs are source-grounded, method-complete, and trigger-precise.

## I — Methodology skeleton

Grade on: (1) source fidelity, (2) method completeness, (3) trigger precision, (4) output actionability, (5) boundary respect. Return PASS / PASS WITH FIXES / FAIL.

## A2 — Future Trigger

### Run this skill when
1. Any `advertising` skill produced a deliverable.
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

Only audits Advertising & Brand Building outputs. For collection-level QA, use `/aaker-book-output-verifier`.
