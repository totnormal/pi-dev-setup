---
name: aaker-book-strategy-verifier
description: |
  QA gate for Strategic Market Analysis deliverables. Grades source fidelity, method completeness, trigger precision, and output quality. Use after any strategy skill produces output. Trigger phrases: "verify strategy", "check strategic market analysis", "audit brand strategy".
source_book: |
  Strategic Market Management (2020) — David A. Aaker
source_chapter: |
  QA methodology synthesized across all chapters.
tags: [aaker-books, strategy, governance, p0]
related_skills: [aaker-book-strategy-orchestrator, aaker-book-external-customer-analysis, aaker-book-competitor-analysis, aaker-book-market-submarket-analysis, aaker-book-environmental-analysis, aaker-book-internal-analysis, aaker-book-advantage-synergy-creation, aaker-book-output-verifier]
disable-model-invocation: true
---

# Aaker Strategic Market Analysis — Verifier

## R — Reading

Validates that Strategic Market Analysis outputs are source-grounded, method-complete, and trigger-precise.

## I — Methodology skeleton

Grade on: (1) source fidelity, (2) method completeness, (3) trigger precision, (4) output actionability, (5) boundary respect. Return PASS / PASS WITH FIXES / FAIL.

## A2 — Future Trigger

### Run this skill when
1. Any `strategy` skill produced a deliverable.
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

Only audits Strategic Market Analysis outputs. For collection-level QA, use `/aaker-book-output-verifier`.
