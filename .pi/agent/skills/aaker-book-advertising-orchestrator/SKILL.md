---
name: aaker-book-advertising-orchestrator
description: |
  Default router for Aaker Advertising & Brand Building requests. Diagnoses the user's goal and routes to the correct skill within this set. Trigger phrases: "Aaker advertising", "brand advertising", "advertising & brand building", any request about advertising & brand building. NOT for: other Aaker sets (use /aaker-book-orchestrator).
source_book: |
  Advertising Management (1996) — David A. Aaker
source_chapter: |
  Synthesizes all chapters in this set; routes based on user goal.
tags: [aaker-books, advertising, governance, p0]
related_skills: [aaker-book-advertising-planning-imc, aaker-book-advertising-objectives, aaker-book-advertising-response-model, aaker-book-ad-segmentation-positioning, aaker-book-attention-comprehension-design, aaker-book-benefit-attitude-formation, aaker-book-brand-feeling-association, aaker-book-creative-strategy, aaker-book-advertising-verifier, aaker-book-orchestrator]
disable-model-invocation: true
---

# Aaker Advertising & Brand Building — Orchestrator

## R — Reading

This orchestrator routes requests within the Advertising & Brand Building set, which distills Advertising Management (1996).

## I — Methodology skeleton

Diagnose the goal, then route to the smallest skill set.

## A2 — Routing table

| User goal | Route to |
|---|---|
| "advertising planning imc" | `aaker-book-advertising-planning-imc` |
| "advertising objectives" | `aaker-book-advertising-objectives` |
| "advertising response model" | `aaker-book-advertising-response-model` |
| "ad segmentation positioning" | `aaker-book-ad-segmentation-positioning` |
| "attention comprehension design" | `aaker-book-attention-comprehension-design` |
| "benefit attitude formation" | `aaker-book-benefit-attitude-formation` |
| "brand feeling association" | `aaker-book-brand-feeling-association` |
| "creative strategy" | `aaker-book-creative-strategy` |
| "copywriting craft" | `aaker-book-copywriting-craft` |
| "copy testing diagnosis" | `aaker-book-copy-testing-diagnosis` |


## E — Execution steps

1. **Classify the goal** within Advertising & Brand Building.
2. **Route** to the matching skill per the table above.
3. **Run** the skill and produce the deliverable.
4. **Hand to** `aaker-book-advertising-verifier` for QA.

## B — Boundary

Only routes within Advertising & Brand Building. For other sets, use `/aaker-book-orchestrator`.
