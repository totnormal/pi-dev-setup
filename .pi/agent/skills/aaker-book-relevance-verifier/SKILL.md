---
name: aaker-book-relevance-verifier
description: |
  QA gate for Brand Relevance & Innovation deliverables. Grades source fidelity, method completeness, trigger precision, and output quality. Use after any relevance skill produces output. Trigger phrases: "verify relevance", "check brand relevance & innovation", "audit brand relevance".
source_book: |
  Brand Relevance (2011) + Aaker on Branding (2014) — David A. Aaker
source_chapter: |
  QA methodology synthesized across all chapters.
tags: [aaker-books, relevance, governance, p0]
related_skills: [aaker-book-relevance-orchestrator, aaker-book-brand-relevance-diagnosis, aaker-book-concept-generation, aaker-book-concept-evaluation, aaker-book-subcategory-definition, aaker-book-competitive-barriers, aaker-book-relevance-maintenance, aaker-book-output-verifier]
disable-model-invocation: true
---

# Aaker Brand Relevance & Innovation — Verifier

## R — Reading

Validates that Brand Relevance & Innovation outputs are source-grounded, method-complete, and trigger-precise.

## I — Methodology skeleton

Grade on: (1) source fidelity, (2) method completeness, (3) trigger precision, (4) output actionability, (5) boundary respect. Return PASS / PASS WITH FIXES / FAIL.

## A2 — Future Trigger

### Run this skill when
1. Any `relevance` skill produced a deliverable.
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

Only audits Brand Relevance & Innovation outputs. For collection-level QA, use `/aaker-book-output-verifier`.
