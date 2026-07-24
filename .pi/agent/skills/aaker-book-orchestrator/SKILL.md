---
name: aaker-book-orchestrator
description: |
  Collection-level router for all Aaker book skills. Diagnoses whether the user needs brand equity, architecture, relevance, strategy, advertising, or research, then routes to the correct set orchestrator. Trigger phrases: "Aaker", "brand strategy", "brand equity", "brand portfolio", "brand relevance", "advertising strategy", "marketing research". NOT for: non-Aaker frameworks or general marketing without source grounding.
source_book: |
  Aaker corpus: Managing Brand Equity, Building Strong Brands, Brand Leadership, Brand Portfolio Strategy, Brand Relevance, Aaker on Branding, Strategic Market Management, Advertising Management, Marketing Research — David A. Aaker et al.
source_chapter: |
  Collection router across 6 thematic sets.
tags: [aaker-books, governance, p0]
related_skills: [aaker-book-output-verifier, aaker-book-equity-orchestrator, aaker-book-architecture-orchestrator, aaker-book-relevance-orchestrator, aaker-book-strategy-orchestrator, aaker-book-advertising-orchestrator, aaker-book-research-orchestrator]
disable-model-invocation: true
---

# Aaker Book Collection — Orchestrator

## R — Reading

David Aaker's body of work spans brand equity, identity, architecture, portfolio, relevance/innovation, strategic analysis, advertising, and research. This router classifies the user's need and routes to the correct set.

## I — Methodology skeleton

1. Classify the user's strategic domain.
2. Route to the matching set orchestrator.
3. The set orchestrator routes to the atomic skill.

## A2 — Routing table

| User domain | Set | Route to |
|---|---|---|
| Brand equity, loyalty, awareness, quality, associations, identity, personality, extensions, measurement | Brand Equity Foundations | `/aaker-book-equity-orchestrator` |
| Brand architecture, portfolio roles, alliances, corporate brand, global, focus | Architecture & Portfolio | `/aaker-book-architecture-orchestrator` |
| Brand relevance, subcategory creation, innovation, barriers, must-haves, energizing | Relevance & Innovation | `/aaker-book-relevance-orchestrator` |
| Strategic analysis, competitor, market, environmental, internal, value proposition, synergy, priorities | Strategic Market Analysis | `/aaker-book-strategy-orchestrator` |
| Advertising planning, creative, copy, media, testing | Advertising & Brand Building | `/aaker-book-advertising-orchestrator` |
| Research design, qualitative, questionnaire, sampling, measurement, metrics | Research & Measurement | `/aaker-book-research-orchestrator` |

## E — Execution steps

1. **Identify the domain** from the user's request.
2. **Route** to the set orchestrator.
3. If the domain spans multiple sets, sequence them.
4. **Hand to** `/aaker-book-output-verifier` for final QA.

## B — Boundary

Only routes Aaker-based work. For the Brand Relationship Spectrum specifically, use the existing `aaker-relation-*` skills.
