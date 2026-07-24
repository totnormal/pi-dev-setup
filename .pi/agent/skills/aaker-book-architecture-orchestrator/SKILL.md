---
name: aaker-book-architecture-orchestrator
description: |
  Default router for Aaker Brand Architecture & Portfolio requests. Diagnoses the user's goal and routes to the correct skill within this set. Trigger phrases: "Aaker architecture", "brand architecture", "brand architecture & portfolio", any request about brand architecture & portfolio. NOT for: other Aaker sets (use /aaker-book-orchestrator).
source_book: |
  Brand Leadership (2000) + Brand Portfolio Strategy (2004) — David A. Aaker
source_chapter: |
  Synthesizes all chapters in this set; routes based on user goal.
tags: [aaker-books, architecture, governance, p0]
related_skills: [aaker-book-brand-identity-elaboration, aaker-book-brand-architecture-design, aaker-book-brand-portfolio-roles, aaker-book-portfolio-inputs-decisions, aaker-book-brand-differentiation-energy, aaker-book-brand-alliances-cobranding, aaker-book-brand-new-market-leverage, aaker-book-upscale-value-markets, aaker-book-architecture-verifier, aaker-book-orchestrator]
disable-model-invocation: true
---

# Aaker Brand Architecture & Portfolio — Orchestrator

## R — Reading

This orchestrator routes requests within the Brand Architecture & Portfolio set, which distills Brand Leadership (2000) + Brand Portfolio Strategy (2004).

## I — Methodology skeleton

Diagnose the goal, then route to the smallest skill set.

## A2 — Routing table

| User goal | Route to |
|---|---|
| "brand identity elaboration" | `aaker-book-brand-identity-elaboration` |
| "brand architecture design" | `aaker-book-brand-architecture-design` |
| "brand portfolio roles" | `aaker-book-brand-portfolio-roles` |
| "portfolio inputs decisions" | `aaker-book-portfolio-inputs-decisions` |
| "brand differentiation energy" | `aaker-book-brand-differentiation-energy` |
| "brand alliances cobranding" | `aaker-book-brand-alliances-cobranding` |
| "brand new market leverage" | `aaker-book-brand-new-market-leverage` |
| "upscale value markets" | `aaker-book-upscale-value-markets` |
| "corporate brand strategy" | `aaker-book-corporate-brand-strategy` |
| "portfolio focus clarity" | `aaker-book-portfolio-focus-clarity` |


## E — Execution steps

1. **Classify the goal** within Brand Architecture & Portfolio.
2. **Route** to the matching skill per the table above.
3. **Run** the skill and produce the deliverable.
4. **Hand to** `aaker-book-architecture-verifier` for QA.

## B — Boundary

Only routes within Brand Architecture & Portfolio. For other sets, use `/aaker-book-orchestrator`.
