---
name: aaker-relation-orchestrator
description: |
  Default entry point for any Aaker Brand Relationship Spectrum request. Diagnoses the goal (map a portfolio, position a new offering, execute a specific spectrum band, or audit risks) and routes to the smallest set of aaker-relation-* skills. Trigger phrases: "brand architecture", "brand portfolio", "subbrand vs endorsed brand", "master brand strategy", "House of Brands vs Branded House", "how should these brands relate". NOT for: logo/naming craft, a one-off tagline, or pure financial M&A valuation.
source_book: |
  The Brand Relationship Spectrum — Aaker & Joachimsthaler (2000)
source_chapter: |
  CMR Vol 42 No 4, pp. 8–22 (driver-role continuum)
tags: [brand-architecture, orchestrator, routing, mkpsi-v2-free]
related_skills: [aaker-relation-spectrum, aaker-relation-select-separation, aaker-relation-house-of-brands, aaker-relation-endorsed-brands, aaker-relation-subbrand-codriver, aaker-relation-branded-house, aaker-relation-avoid-pitfalls, aaker-relation-output-verifier]
disable-model-invocation: true
---

# Aaker Brand Relationship Spectrum — Orchestrator

## R — Reading

> "The brand relationship spectrum ... is related to the driver role that brands play. The driver role reflects the degree to which a brand drives the purchase decision and use experience. ... these options define a continuum that involves four basic strategies and nine substrategies."
>
> — Aaker & Joachimsthaler (2000), p. 9–10

The whole package hangs on one idea: place each offering on a single axis of **brand separation**, then apply the mechanics for that band. This skill is the router that gets you to the right band skill.

## I — Methodology skeleton (Interpretation)

Diagnose the user's goal, then route to the smallest skill set, then hand to the verifier.

1. **Classify the goal**: (a) map/explain an existing portfolio, (b) position a new or repositioned offering, (c) execute the mechanics of one band, or (d) audit risks/dilution.
2. **Pick the smallest set** using the routing table in A2.
3. **Run `/aaker-relation-output-verifier` last** on any deliverable.

## A1 — Application in the source

### Case 1: P&G — House of Brands chosen because niches contradict
- **Problem**: one master brand cannot own "dandruff", "combo", and "vitality" at once.
- **Route**: explain via `/aaker-relation-spectrum`, justify with `/aaker-relation-house-of-brands`, audit weak entries with `/aaker-relation-avoid-pitfalls`.

### Case 2: Virgin — Branded House chosen for clarity + leverage
- **Problem**: one story across unrelated businesses, maximum synergy.
- **Route**: `/aaker-relation-branded-house` for mechanics; `/aaker-relation-avoid-pitfalls` for targeting-flexibility cost.

## A2 — Future Trigger (when the user needs this)

### Routing table

| User goal / language signal | Route to |
|---|---|
| "explain/map our brand architecture", "how are these brands related" | `/aaker-relation-spectrum` (+ map) |
| "where should this new offering sit", "extend vs endorse vs new brand", "brand separation decision" | `/aaker-relation-select-separation` (the Figure 2 four-question matrix) |
| "stand-alone brand", "independent brand", "protect a niche", "shadow endorser" | `/aaker-relation-house-of-brands` |
| "borrow credibility from parent", "token/linked/strong endorsement", "endorses it" | `/aaker-relation-endorsed-brands` |
| "attach to master brand", "subbrand", "co-driver", "HP Deskjet style" | `/aaker-relation-subbrand-codriver` |
| "one master brand everywhere", "descriptive subbrands", "Virgin/BMW style" | `/aaker-relation-branded-house` |
| "brand is diluted", "too many extensions", "channel conflict", "M&A keep or rebrand" | `/aaker-relation-avoid-pitfalls` |

### Language signals
- "brand architecture", "brand portfolio", "master brand", "subbrand vs endorsed"
- "House of Brands vs Branded House", "brand separation", "driver role"

### Distinction from siblings
- This skill only **routes**. It does not produce the final architecture; the leaf skills do.
- If unsure between two bands, run `/aaker-relation-select-separation` (it exists to resolve exactly that).

## E — Execution steps

1. **Capture the goal and the offering(s)**: what is being designed/audited, what brands exist, what decision is pending.
   - Done when: the goal is one of (map / position / execute-band / audit-risk).
2. **Route per the A2 table**; if the user only wants the big picture, start at `/aaker-relation-spectrum`.
   - Done when: exactly one primary leaf skill is chosen (plus optional risk audit).
3. **Run the chosen leaf skill(s)** and produce the artifact (portfolio map, positioning, band mechanics, or risk list).
   - Done when: a concrete, source-grounded deliverable exists.
4. **Hand off to `/aaker-relation-output-verifier`** for the final QA gate.
   - Done when: verifier returns PASS (or PASS WITH FIXES applied).

### Required output fields
- **Goal classified**: map / position / execute-band / audit-risk.
- **Primary skill chosen**: which `/aaker-relation-*` and why.
- **Deliverable**: the leaf skill's output.
- **Verifier verdict**: PASS / PASS WITH FIXES / FAIL.

## B — Boundary

### Don't use for
- Logo, naming craft, visual identity, or taglines (this is structure, not design).
- Pure financial M&A valuation (route to `/aaker-relation-avoid-pitfalls` only for retention/dilution logic).

### Misuse risks
- Routing to multiple band skills at once when one decision is pending — pick one primary band via `/aaker-relation-select-separation`.
- Skipping the verifier on a final architecture recommendation.

### Easily confused with
- `/aaker-relation-spectrum` (the framework/map) — the orchestrator routes *to* it.

## Related skills
- depends-on: `/aaker-relation-spectrum` (map), `/aaker-relation-select-separation` (decision)
- composes-with: all `/aaker-relation-*` leaves + `/aaker-relation-output-verifier`

## Audit information
- **Validation passed**: orchestrator (routing layer); leaf skills V1 ✓ / V2 ✓ / V3 ✓.
- **Test pass rate**: see `test-prompts.json`
- **Distillation date**: 2026-07-21
