---
name: aaker-relation-select-separation
description: |
  Use when a user must decide WHERE on the Brand Relationship Spectrum to place a NEW offering (or how to reposition an existing one): extend the master, endorse, subbrand, or create a separate brand. Built on Aaker's Figure 2 "Selecting the Brand Separation" 4-question matrix. Trigger phrases: "should this be a subbrand or new brand", "extend the master or create a new brand", "how related should the new product be", "brand architecture decision for a new offering", "endorse vs subbrand". NOT for: drawing the spectrum map (aaker-relation-spectrum) or dilution/channel risk triage (aaker-relation-avoid-pitfalls).
source_book: |
  The Brand Relationship Spectrum — Aaker & Joachimsthaler (2000)
source_chapter: |
  CMR Vol 42 No 4, pp. 16–22 (Figure 2)
tags: [brand-architecture, brand-decision, new-product, subbrand, endorsed-brand]
related_skills: [aaker-relation-spectrum, aaker-relation-house-of-brands, aaker-relation-branded-house, aaker-relation-endorsed-brands, aaker-relation-subbrand-codriver, aaker-relation-avoid-pitfalls]
disable-model-invocation: true
---

# Select Brand Separation (Figure 2 decision matrix)

## R — Reading

> "Each context is different ... Addressing the four key questions summarized in Figure 2 ... provides a structured way to analyze the issues. Positive answers to the two questions at the left will suggest a downward movement ... toward a branded house, while positive answers to the two questions on the right imply an upward movement ... toward a house of brands."
>
> — Aaker & Joachimsthaler (2000), p. 17

**The four questions (Figure 2):**
- **Left (→ Branded House):** (L1) Does the master brand *contribute* to the offering (add value-prop associations, credibility, visibility, communication efficiencies)? (L2) Will the master brand be *strengthened* by associating with the new offering?
- **Right (→ House of Brands):** (R1) Is there a *compelling need* for a separate brand (create/own an association, represent a new different offering, avoid an association, retain/capture a customer bond, deal with channel conflict)? (R2) Will the *business support* a new brand name (funding, longevity)?

---

## I — Methodology skeleton (Interpretation)

Position is decided by answering four questions; the balance of "yes" left vs right sets direction:
- **Downward (toward Branded House)** when the master *adds* value and is *helped* by the link — leverage clarity, synergy, efficiency.
- **Upward (toward House of Brands)** when there's a *compelling, necessary* reason for separation and the business can *fund* a standalone brand.
- A new offering is the primary frame, but the same logic applies when auditing an existing architecture for adjustment.
- "Absolutely necessary" is the bar for a new brand — guard against managers who rationalize a new name for every incremental improvement.

---

## A1 — Application in the source

### Case 1: Saturn — move UP (House of Brands)
- **Need**: tests showed any GM association would hurt perceived quality.
- **Decision**: no connection to GM; "a different kind of company, a different kind of car."
- **Result**: clean launch untainted by GM equity.

### Case 2: Healthy Choice — stay DOWN (Branded House)
- **Need**: master must reflect/reinforce core "healthy" identity.
- **Decision**: any Healthy Choice product not positioned healthy *undercuts* the brand.
- **Result**: discipline protects the master.

### Case 3: Courtyard by Marriott — middle (Endorsed)
- **Need**: credibility for a different (lower-tier) hotel promise without diluting Marriott Hotels.
- **Decision**: Marriott *organizational* endorsement, Marriott product brand kept distinct.
- **Result**: credibility + protection of premium master.

---

## A2 — Future Trigger

1. A new product/feature/service is being launched and someone must choose its brand structure.
2. Evaluating whether to *extend* a respected master into a new category.
3. Post-M&A: keep the acquired name or rebrand to the parent.

### Language signals
- "should this be a subbrand or its own brand?"
- "extend the master or start fresh?"
- "how closely should the new product be tied to the brand?"
- "do we need a separate brand for this?"

### Distinction from siblings
- vs `aaker-relation-spectrum`: this is the *decision*; that is the *map*.
- vs `aaker-relation-avoid-pitfalls`: this positions; that triages dilution/channel/identity danger.

---

## E — Execution steps

1. **Frame the offering** — what is it, what category, what promise.
   - Done when: one-paragraph brief exists.
2. **Answer L1 (does master contribute?):** associations / credibility / visibility / comms efficiency.
   - Stop-if: master adds nothing → lean UP.
3. **Answer L2 (will master be strengthened?):** does the link reinforce key master associations?
   - Stop-if: link would dilute/damage master → lean UP (or see pitfalls skill).
4. **Answer R1 (compelling need for separate brand?):** own association / new concept / avoid association / retain bond / channel conflict.
   - Stop-if: none compelling → lean DOWN.
5. **Answer R2 (will business fund a new brand?):** budget + longevity ("deep pockets, short arms" trap).
   - Stop-if: can't fund → lean DOWN despite R1.
6. **Place on spectrum** and state the four-answer rationale; hand off to the specific-position sibling skill for mechanics.

---

## B — Boundary

### Don't use for
- Pure naming/logo work (this decides structure, not the name).
- Industries where a master has zero equity to leverage (then "separate brand" is default, not a decision).

### Failure modes warned by the authors
- Creating a new brand without "absolutely necessary" justification (wishful "this deserves its own name").
- Planning brand building but failing to fund it ("deep pockets, short arms").
- Using a name change motivated by ego/convenience rather than architecture logic.

### Author blind spots
- Assumes a central sign-off committee; decentralized orgs may not run the four questions formally.

### Easily confused with
- `aaker-relation-spectrum` (map) and `aaker-relation-house-of-brands` / `aaker-relation-branded-house` (position mechanics).

---

## 相关 skills
- depends-on: aaker-relation-spectrum
- contrasts-with: aaker-relation-avoid-pitfalls
- composes-with: aaker-relation-house-of-brands, aaker-relation-branded-house, aaker-relation-endorsed-brands, aaker-relation-subbrand-codriver

---

## 审计信息
- **验证通过**: V1 ✓ / V2 ✓ / V3 ✓
- **测试通过率**: see test-prompts.json
- **蒸馏时间**: 2026-07-13
