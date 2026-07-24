---
name: aaker-book-output-verifier
description: |
  Collection-level QA gate for all Aaker book skill outputs. Grades source fidelity, conceptual accuracy, method completeness, correct routing, and output quality across all 6 sets. Use after any aaker-book-* deliverable. Trigger phrases: "verify Aaker analysis", "audit brand strategy", "check Aaker output".
source_book: |
  Aaker corpus — David A. Aaker et al.
source_chapter: |
  Collection-level QA across all 6 thematic sets.
tags: [aaker-books, governance, p0]
related_skills: [aaker-book-orchestrator, aaker-book-equity-verifier, aaker-book-architecture-verifier, aaker-book-relevance-verifier, aaker-book-strategy-verifier, aaker-book-advertising-verifier, aaker-book-research-verifier]
disable-model-invocation: true
---

# Aaker Book Collection — Output Verifier

## R — Reading

Validates that any Aaker-based deliverable is source-grounded, method-complete, correctly routed, and internally consistent across the 6 thematic sets.

## I — Methodology skeleton

Grade on: (1) source fidelity to Aaker's actual frameworks, (2) correct method selection, (3) routing accuracy, (4) output actionability, (5) cross-set consistency, (6) boundary respect. Return PASS / PASS WITH FIXES / FAIL.

## A2 — Future Trigger

### Run this skill when
1. Any `output` skill produced a deliverable.
2. The user asks to verify, audit, or quality-check a brand strategy output.
3. Before finalizing a recommendation for stakeholders.

### Language signals
- "verify", "audit", "check", "validate" + brand strategy context
- "is this Aaker-based analysis correct?"

### Distinction from siblings
- This skill only **audits**; it does not generate strategy. Route back to the atomic skill to fix any FAIL.
- For collection-level QA, use `/aaker-book-output-verifier`.

## E — Execution steps

1. Collect the deliverable and claimed Aaker methods.
2. Verify each claim traces to a specific book/chapter.
3. Check the method matches the user's actual need.
4. Return verdict.

## B — Boundary

Collection-level QA only. Does not generate outputs. Delegates to set-level verifiers for set-specific checks.
