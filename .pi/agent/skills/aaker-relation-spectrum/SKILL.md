---
name: aaker-relation-spectrum
description: |
  Use when a user is designing, auditing, or explaining a brand architecture / brand portfolio and needs the master mental model: the Brand Relationship Spectrum — a continuum from House of Brands (stand-alone brands) to Branded House (one master brand), via Endorsed Brands and Subbrands. Trigger phrases: "brand architecture", "how related should these brands be", "brand portfolio", "subbrand vs endorsed brand", "master brand strategy", "House of Brands vs Branded House". NOT for: logo/naming craft, a one-off tagline, or pure financial M&A valuation (use aaker-relation-avoid-pitfalls for dilution/channel risks, aaker-relation-select-separation for the positioning decision).
source_book: |
  The Brand Relationship Spectrum: The Key to the Brand Architecture Challenge — David A. Aaker & Erich Joachimsthaler (2000)
source_chapter: |
  CMR Vol 42 No 4, pp. 8–22 (Figure 1)
tags: [brand-architecture, brand-portfolio, subbrand, endorsed-brand, marketing-strategy]
related_skills: [aaker-relation-select-separation, aaker-relation-house-of-brands, aaker-relation-branded-house, aaker-relation-endorsed-brands, aaker-relation-subbrand-codriver, aaker-relation-avoid-pitfalls]
disable-model-invocation: true
---

# Brand Relationship Spectrum

## R — Reading

> "The brand relationship spectrum ... is related to the driver role that brands play. The driver role reflects the degree to which a brand drives the purchase decision and use experience. ... these options define a continuum that involves four basic strategies and nine substrategies. The position on the spectrum reflects the degree to which brands ... are separated in strategy execution and, ultimately, in the customer's minds."
>
> — Aaker & Joachimsthaler (2000), p. 9–10

---

## I — Methodology skeleton (Interpretation)

The spectrum is a single axis of **brand separation** — how distinctly each brand stands apart in *strategy execution* and in the *customer's mind*. Four basic strategies, nine substrategies, ordered by the **driver role** gradient (top → bottom = most separation → least):

1. **House of Brands** — independent stand-alone brands (e.g., NutraSweet/G.D. Searle, Tide/P&G).
2. **Endorsed Brands** — independent but backed by another brand:
   - *Shadow endorser* — link known but not visibly stated (Lexus/Toyota, Saturn/GM, Dockers/Levi's).
   - *Token endorser* — master far less prominent than endorsed (Universal "A Sony Company", GE bulb, Betty Crocker spoon).
   - *Linked name* — common element implies endorsement (Egg McMuffin, OfficeJet↔LaserJet, Courtyard by Marriott).
   - *Strong endorsement* — endorser shares real driver role (Obsession by Calvin Klein, Gillette Mach3, Sony Trinitron).
3. **Subbrands** — augment/modify the master's associations:
   - *Co-driver* — master + subbrand both drive (Gillette + Mach3, Virgin + Virgin Vie).
   - *Subbrand as driver* — master identity differs by context (HP Deskjet, GE Capital vs GE Appliances, Club Med).
4. **Branded House** — one master spans offerings with descriptive subbrands (Virgin, BMW, Healthy Choice, Caterpillar).

**Driver role** = "what brand did you buy?" The higher on the spectrum, the more each brand owns its own driver role; the lower, the more the master brand drives and descriptive subbrands fade.

---

## A1 — Application in the source

### Case 1: P&G as House of Brands
- **Problem**: one master brand cannot serve contradictory niche positions.
- **Use**: Head & Shoulders (dandruff), Pert Plus (combo), Pantene (vitality) in hair care; Tide (tough), Cheer (all-temp), Bold (softener), Dash (concentrated) in detergents.
- **Result**: focused value propositions impossible under a single "P&G shampoo" — but P&G sacrifices scale/synergy and lets weak entries stagnate.

### Case 2: Virgin as Branded House
- **Problem**: wanting clarity + leverage across unrelated businesses.
- **Use**: Virgin Airlines/Express/Radio/Rail/Cola/Jeans/Music under one master.
- **Result**: one story (service, innovation, fun, value, underdog); maximum clarity, synergy, leverage — at the cost of targeting flexibility.

---

## A2 — Future Trigger (when the user needs this)

1. Mapping or explaining an existing brand portfolio ("how are these brands related and why?").
2. Deciding how *related* a new offering should be to the master (extend vs endorse vs subbrand vs new).
3. Onboarding someone to brand-architecture thinking / building a portfolio map.

### Language signals
- "brand architecture", "brand portfolio", "how should these brands relate"
- "subbrand vs endorsed brand", "master brand strategy"
- "House of Brands vs Branded House", "brand separation"

### Distinction from siblings
- Use `aaker-relation-select-separation` to actually *position* a new offering (the 4-question decision).
- Use `aaker-relation-house-of-brands` / `aaker-relation-branded-house` / `aaker-relation-endorsed-brands` / `aaker-relation-subbrand-codriver` for the *mechanics* of a specific position.
- Use `aaker-relation-avoid-pitfalls` for dilution/channel/identity risks.

---

## E — Execution steps

1. **Inventory the offerings** and name the current brand(s) attached to each.
   - Done when: every offering has a brand label and a parent (if any).
2. **Place each on the spectrum** (House of Brands → … → Branded House) by its driver-role share.
   - Done when: each offering has a position + a one-line reason.
3. **Check internal consistency** — do positions reflect deliberate strategy, not accident?
   - Done when: a portfolio map (mermaid/table) exists.
4. **Flag contradictions** (e.g., a "co-driver" subbrand dragging a premium master downward) and hand off to the relevant sibling skill or `aaker-relation-avoid-pitfalls`.

---

## B — Boundary

### Don't use for
- Logo/naming craft or visual identity (this is structure, not design).
- A one-time tagline or single-product naming.
- Financial M&A valuation (use the pitfalls skill for retention logic).

### Failure modes warned by the authors
- Treating the spectrum as "which is better" — it's a positioning choice, not a quality ranking.
- Assuming a pure architecture — nearly all firms mix strategies (GE looks branded-house but Hotpoint/NBC sit outside).

### Author blind spots / era limits
- Pre-social/digital (2000): light on community, ecosystem, platform effects.
- "Driver role" is one axis; modern architecture also weighs category fit, legal/regulatory, retail media.

### Easily confused with
- `aaker-relation-select-separation` (decision) vs this skill (map/framework).

---

## 相关 skills
- depends-on: —
- contrasts-with: (none — it is the umbrella)
- composes-with: aaker-relation-select-separation, aaker-relation-house-of-brands, aaker-relation-branded-house, aaker-relation-endorsed-brands, aaker-relation-subbrand-codriver

---

## 审计信息
- **验证通过**: V1 ✓ / V2 ✓ / V3 ✓
- **测试通过率**: see test-prompts.json
- **蒸馏时间**: 2026-07-13
