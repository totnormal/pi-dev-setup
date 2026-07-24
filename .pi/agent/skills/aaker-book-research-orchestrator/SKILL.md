---
name: aaker-book-research-orchestrator
description: |
  Default router for Aaker Research & Measurement requests. Diagnoses the user's goal and routes to the correct skill within this set. Trigger phrases: "Aaker research", "brand research", "research & measurement", any request about research & measurement. NOT for: other Aaker sets (use /aaker-book-orchestrator).
source_book: |
  Marketing Research (2013) — David A. Aaker
source_chapter: |
  Synthesizes all chapters in this set; routes based on user goal.
tags: [aaker-books, research, governance, p0]
related_skills: [aaker-book-research-decision-framework, aaker-book-research-design-selection, aaker-book-qualitative-research-methods, aaker-book-questionnaire-design, aaker-book-sampling-design, aaker-book-attitude-measurement, aaker-book-brand-customer-metrics, aaker-book-marketing-mix-measurement, aaker-book-research-verifier, aaker-book-orchestrator]
disable-model-invocation: true
---

# Aaker Research & Measurement — Orchestrator

## R — Reading

This orchestrator routes requests within the Research & Measurement set, which distills Marketing Research (2013).

## I — Methodology skeleton

Diagnose the goal, then route to the smallest skill set.

## A2 — Routing table

| User goal | Route to |
|---|---|
| "research decision framework" | `aaker-book-research-decision-framework` |
| "research design selection" | `aaker-book-research-design-selection` |
| "qualitative research methods" | `aaker-book-qualitative-research-methods` |
| "questionnaire design" | `aaker-book-questionnaire-design` |
| "sampling design" | `aaker-book-sampling-design` |
| "attitude measurement" | `aaker-book-attitude-measurement` |
| "brand customer metrics" | `aaker-book-brand-customer-metrics` |
| "marketing mix measurement" | `aaker-book-marketing-mix-measurement` |


## E — Execution steps

1. **Classify the goal** within Research & Measurement.
2. **Route** to the matching skill per the table above.
3. **Run** the skill and produce the deliverable.
4. **Hand to** `aaker-book-research-verifier` for QA.

## B — Boundary

Only routes within Research & Measurement. For other sets, use `/aaker-book-orchestrator`.
