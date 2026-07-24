---
name: aaker-book-relevance-orchestrator
description: |
  Default router for Aaker Brand Relevance & Innovation requests. Diagnoses the user's goal and routes to the correct skill within this set. Trigger phrases: "Aaker relevance", "brand relevance", "brand relevance & innovation", any request about brand relevance & innovation. NOT for: other Aaker sets (use /aaker-book-orchestrator).
source_book: |
  Brand Relevance (2011) + Aaker on Branding (2014) — David A. Aaker
source_chapter: |
  Synthesizes all chapters in this set; routes based on user goal.
tags: [aaker-books, relevance, governance, p0]
related_skills: [aaker-book-brand-relevance-diagnosis, aaker-book-concept-generation, aaker-book-concept-evaluation, aaker-book-subcategory-definition, aaker-book-competitive-barriers, aaker-book-relevance-maintenance, aaker-book-relevance-threats-diagnosis, aaker-book-brand-energizing, aaker-book-relevance-verifier, aaker-book-orchestrator]
disable-model-invocation: true
---

# Aaker Brand Relevance & Innovation — Orchestrator

## R — Reading

This orchestrator routes requests within the Brand Relevance & Innovation set, which distills Brand Relevance (2011) + Aaker on Branding (2014).

## I — Methodology skeleton

Diagnose the goal, then route to the smallest skill set.

## A2 — Routing table

| User goal | Route to |
|---|---|
| "brand relevance diagnosis" | `aaker-book-brand-relevance-diagnosis` |
| "concept generation" | `aaker-book-concept-generation` |
| "concept evaluation" | `aaker-book-concept-evaluation` |
| "subcategory definition" | `aaker-book-subcategory-definition` |
| "competitive barriers" | `aaker-book-competitive-barriers` |
| "relevance maintenance" | `aaker-book-relevance-maintenance` |
| "relevance threats diagnosis" | `aaker-book-relevance-threats-diagnosis` |
| "brand energizing" | `aaker-book-brand-energizing` |
| "must have innovation" | `aaker-book-must-have-innovation` |
| "innovative organization" | `aaker-book-innovative-organization` |


## E — Execution steps

1. **Classify the goal** within Brand Relevance & Innovation.
2. **Route** to the matching skill per the table above.
3. **Run** the skill and produce the deliverable.
4. **Hand to** `aaker-book-relevance-verifier` for QA.

## B — Boundary

Only routes within Brand Relevance & Innovation. For other sets, use `/aaker-book-orchestrator`.
