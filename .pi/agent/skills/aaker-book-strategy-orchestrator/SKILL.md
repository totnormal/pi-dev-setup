---
name: aaker-book-strategy-orchestrator
description: |
  Default router for Aaker Strategic Market Analysis requests. Diagnoses the user's goal and routes to the correct skill within this set. Trigger phrases: "Aaker strategy", "brand strategy", "strategic market analysis", any request about strategic market analysis. NOT for: other Aaker sets (use /aaker-book-orchestrator).
source_book: |
  Strategic Market Management (2020) — David A. Aaker
source_chapter: |
  Synthesizes all chapters in this set; routes based on user goal.
tags: [aaker-books, strategy, governance, p0]
related_skills: [aaker-book-external-customer-analysis, aaker-book-competitor-analysis, aaker-book-market-submarket-analysis, aaker-book-environmental-analysis, aaker-book-internal-analysis, aaker-book-advantage-synergy-creation, aaker-book-value-proposition-design, aaker-book-business-energizing, aaker-book-strategy-verifier, aaker-book-orchestrator]
disable-model-invocation: true
---

# Aaker Strategic Market Analysis — Orchestrator

## R — Reading

This orchestrator routes requests within the Strategic Market Analysis set, which distills Strategic Market Management (2020).

## I — Methodology skeleton

Diagnose the goal, then route to the smallest skill set.

## A2 — Routing table

| User goal | Route to |
|---|---|
| "external customer analysis" | `aaker-book-external-customer-analysis` |
| "competitor analysis" | `aaker-book-competitor-analysis` |
| "market submarket analysis" | `aaker-book-market-submarket-analysis` |
| "environmental analysis" | `aaker-book-environmental-analysis` |
| "internal analysis" | `aaker-book-internal-analysis` |
| "advantage synergy creation" | `aaker-book-advantage-synergy-creation` |
| "value proposition design" | `aaker-book-value-proposition-design` |
| "business energizing" | `aaker-book-business-energizing` |
| "business leveraging" | `aaker-book-business-leveraging` |
| "new business creation" | `aaker-book-new-business-creation` |


## E — Execution steps

1. **Classify the goal** within Strategic Market Analysis.
2. **Route** to the matching skill per the table above.
3. **Run** the skill and produce the deliverable.
4. **Hand to** `aaker-book-strategy-verifier` for QA.

## B — Boundary

Only routes within Strategic Market Analysis. For other sets, use `/aaker-book-orchestrator`.
