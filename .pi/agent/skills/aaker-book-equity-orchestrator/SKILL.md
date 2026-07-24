---
name: aaker-book-equity-orchestrator
description: |
  Default router for Aaker Brand Equity Foundations requests. Diagnoses the user's goal and routes to the correct skill within this set. Trigger phrases: "Aaker equity", "brand equity", "brand equity foundations", any request about brand equity foundations. NOT for: other Aaker sets (use /aaker-book-orchestrator).
source_book: |
  Managing Brand Equity (1991) + Building Strong Brands (1995) — David A. Aaker
source_chapter: |
  Synthesizes all chapters in this set; routes based on user goal.
tags: [aaker-books, equity, governance, p0]
related_skills: [aaker-book-brand-equity-model, aaker-book-brand-loyalty-management, aaker-book-brand-awareness-strategy, aaker-book-perceived-quality-leverage, aaker-book-brand-association-positioning, aaker-book-brand-association-measurement, aaker-book-brand-identity-system, aaker-book-brand-personality-design, aaker-book-equity-verifier, aaker-book-orchestrator]
disable-model-invocation: true
---

# Aaker Brand Equity Foundations — Orchestrator

## R — Reading

This orchestrator routes requests within the Brand Equity Foundations set, which distills Managing Brand Equity (1991) + Building Strong Brands (1995).

## I — Methodology skeleton

Diagnose the goal, then route to the smallest skill set.

## A2 — Routing table

| User goal | Route to |
|---|---|
| "brand equity model" | `aaker-book-brand-equity-model` |
| "brand loyalty management" | `aaker-book-brand-loyalty-management` |
| "brand awareness strategy" | `aaker-book-brand-awareness-strategy` |
| "perceived quality leverage" | `aaker-book-perceived-quality-leverage` |
| "brand association positioning" | `aaker-book-brand-association-positioning` |
| "brand association measurement" | `aaker-book-brand-association-measurement` |
| "brand identity system" | `aaker-book-brand-identity-system` |
| "brand personality design" | `aaker-book-brand-personality-design` |
| "organizational associations" | `aaker-book-organizational-associations` |
| "identity implementation" | `aaker-book-identity-implementation` |


## E — Execution steps

1. **Classify the goal** within Brand Equity Foundations.
2. **Route** to the matching skill per the table above.
3. **Run** the skill and produce the deliverable.
4. **Hand to** `aaker-book-equity-verifier` for QA.

## B — Boundary

Only routes within Brand Equity Foundations. For other sets, use `/aaker-book-orchestrator`.
