---
name: aaker-relation-output-verifier
description: |
  Final QA gate for any Aaker Brand Relationship Spectrum deliverable. Audits whether the output names the driver role correctly, places the offering on the right spectrum band, is source-grounded, respects the pitfalls, and is testable. Use after any aaker-relation-* skill produces a recommendation, portfolio map, or architecture decision. Trigger phrases: "check my brand architecture", "is this positioning right", "audit this portfolio", "verify brand separation", "is this driver role correct".
source_book: |
  The Brand Relationship Spectrum — Aaker & Joachimsthaler (2000)
source_chapter: |
  CMR Vol 42 No 4, pp. 8–22 (driver role + Figure 2 decision criteria)
tags: [brand-architecture, verifier, qa]
related_skills: [aaker-relation-spectrum, aaker-relation-select-separation, aaker-relation-house-of-brands, aaker-relation-endorsed-brands, aaker-relation-subbrand-codriver, aaker-relation-branded-house, aaker-relation-avoid-pitfalls]
disable-model-invocation: true
---

# Aaker Brand Relationship Spectrum — Output Verifier

## R — Reading

> "The driver role reflects the degree to which a brand drives the purchase decision and use experience. ... The position on the spectrum reflects the degree to which brands ... are separated in strategy execution and, ultimately, in the customer's minds."
>
> — Aaker & Joachimsthaler (2000), p. 9–10

A correct Aaker deliverable must be explicit about the **driver role** and the resulting **band**, grounded in the source criteria (Figure 2's four questions), and checked against the failure modes the authors warn about.

## I — Methodology skeleton (Interpretation)

Grade the deliverable on five axes and return PASS / PASS WITH FIXES / FAIL.

1. **Driver-role clarity**: does the output state what brand drives purchase and use, and the driver-role share?
2. **Band correctness**: is the offering placed on the right spectrum band, justified by the Figure 2 criteria?
3. **Source grounding**: are claims tied to the source (cases, criteria), not generic advice?
4. **Pitfall coverage**: are dilution, promiscuity, channel conflict, and identity anarchy addressed where relevant?
5. **Testability**: is there a way to know if it worked (market signal, customer perception, search/driver-role survey)?

## A1 — Application in the source

### Case 1: P&G House of Brands — passes
- **Driver role**: each brand (Tide, Pantene) fully drives; P&G is invisible to the buyer.
- **Band**: House of Brands, justified by contradictory niches (Figure 2 → separate).

### Case 2: a sloppy "call it a subbrand" — fails
- **Driver role**: unstated; "subbrand" used as a synonym for "extension".
- **Band**: wrong — no co-driver / subbrand-as-driver distinction; no master-risk check.
- **Fix**: re-run `/aaker-relation-subbrand-codriver` and `/aaker-relation-avoid-pitfalls`.

## A2 — Future Trigger (when the user needs this)

### Run this skill when
1. Any `/aaker-relation-*` leaf produced a final recommendation, map, or positioning.
2. The user asks "is this brand architecture right / safe / consistent".
3. Before publishing a portfolio decision to stakeholders.

### Language signals
- "check / verify / audit my brand architecture"
- "is this positioning right", "is the driver role correct"
- "did we miss a dilution risk"

### Distinction from siblings
- This skill only **audits**; it does not generate the architecture. Re-run the relevant leaf skill to fix any FAIL.

## E — Execution steps

1. **Collect inputs**: the deliverable, the target offering(s), the claimed band and driver role, and any market evidence.
   - Done when: the five audit axes can be answered.
2. **Grade each axis** (clear / weak / missing) and cite the source criterion for band correctness.
   - Done when: every axis has a verdict + evidence pointer.
3. **Check pitfalls**: dilution, promiscuity, channel conflict, identity anarchy, M&A retention (if relevant).
   - Done when: each relevant failure mode is addressed or explicitly N/A.
4. **Return verdict**:
   - **PASS** — all axes clear, pitfalls covered, testable.
   - **PASS WITH FIXES** — list exact corrections (e.g., "state driver role", "re-run select-separation").
   - **FAIL** — wrong band, unsupported claims, or an unaddressed high-severity pitfall; route back to the leaf skill.
   - Done when: a one-line verdict + actionable fix list is returned.

### Required output fields
- **Verdict**: PASS / PASS WITH FIXES / FAIL.
- **Axis grades**: driver-role / band / grounding / pitfalls / testability.
- **Fixes**: concrete, skill-routed corrections.

## B — Boundary

### Don't use for
- Generating the architecture (use leaf skills; this only audits).
- Logo/naming/visual craft.

### Misuse risks
- Returning PASS on a deliverable that never names the driver role.
- Confusing "endorsed" with "subbrand" — they are different bands with different driver-role splits; FAIL if mixed.

### Easily confused with
- `/aaker-relation-avoid-pitfalls` (a leaf that finds risks) vs this (the QA gate over the whole deliverable).

## Related skills
- depends-on: any `/aaker-relation-*` leaf must run first to produce the deliverable
- composes-with: `/aaker-relation-orchestrator` (which calls this last)

## Audit information
- **Validation passed**: verifier (QA layer); leaf skills V1 ✓ / V2 ✓ / V3 ✓.
- **Test pass rate**: see `test-prompts.json`
- **Distillation date**: 2026-07-21
