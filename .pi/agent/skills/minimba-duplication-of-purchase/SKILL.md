---
name: minimba-duplication-of-purchase
description: |
  Use when defining competitive sets, testing whether market segmentation actually exists, identifying market partitions, or resolving debates about who the "real" competitors are.
source_book: How Brands Grow — Byron Sharp (2010); Marketing TEP — Byron Sharp
source_chapter: Ch 6 Who Do You Really Compete With?; Ch 13 The Scientific Laws
tags: [competitive-analysis, empirical-law, segmentation]
related_skills: []
disable-model-invocation: true
---

# Duplication Of Purchase

## R — Original Passage (Reading)

> All brands, within a category, share their customer base with other brands in line with the size of those other brands. Everyone shares a lot with big brands and a little with small brands.
>
> — Source: How Brands Grow — Byron Sharp (2010); Marketing TEP — Byron Sharp, Ch 6 Who Do You Really Compete With?; Ch 13 The Scientific Laws

---

## I — Methodology Skeleton (Interpretation)

The Duplication of Purchase law means that if 30% of brand A's buyers also bought brand X, then roughly 30% of every other brand's buyers also bought brand X — regardless of how "different" the brands are positioned. Brands share customers proportional to market share. Deviations from this baseline reveal genuine market partitions (e.g., premium vs mainstream), but such partitions are rarer and weaker than managers assume.

---

## A1 — Application in the Source Material (Past Application)

In UK ice-cream, every brand shares ~38% of its customers with Walls Carte D'Or (the largest) and only ~7% with Mars (the smallest). The only notable partition: Ben & Jerry's and Häagen Dazs share 26% with each other (double the expected rate) — a genuine premium sub-market. Yet even Ben & Jerry's buyers are still more likely to buy Carte D'Or than Häagen Dazs.

---

## A2 — Trigger Scenarios (Future Trigger)

### Use this skill when

- Use when: building a competitive set and you need evidence, not opinion; a segmentation study claims brands sell to "different" customer types; a manager insists two brands don't compete because they're "positioned differently"; you need to define a product category boundary.

### Language signals

- "strategy", "marketing plan", "brand growth", "evidence", "market share", "where to play", "how to win", "availability", "loyalty", "media budget", "research", "MiniMBA"

### Distinction from adjacent skills

- Use `minimba-strategy-marketing-orchestrator` when the correct focused skill is unclear.
- Use this skill when the problem is specifically about the above trigger.
- Use `minimba-output-verifier` after producing the artifact.

---

## E — Execution Steps

1. **Step 1**
   - Obtain panel/loyalty data showing which consumers bought which brands over a meaningful period (long enough for repeat purchases).
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

2. **Step 2**
   - Build a duplication-of-purchase matrix: rows = buyers of each brand, columns = % who also bought each other brand.
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

3. **Step 3**
   - Calculate the average sharing rate for each brand (column average). Compare observed sharing to the average.
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

4. **Step 4**
   - Flag brands that share substantially MORE than average with each other = a market partition. Flag substantially LESS = unusual disjunction.
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

5. **Step 5**
   - Use the partition structure to define the real competitive set, not product-feature definitions.
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

6. **Step 6**
   - Test any "segmentation" claim: if segments were real, brands within a segment would share more customers than the law predicts.
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

---

## B — Boundary

### Do not use this skill when

Requires actual purchase data (panel, loyalty, transaction), not survey intentions. Over very short periods, duplication looks low (people haven't bought multiple brands yet); over very long periods, everything looks high. Choose a period that captures repeat purchasing.

### Common corpus-level failure modes

- Replacing strategy with goals, slogans, or wish lists.
- Treating a case study or correlation as universal proof.
- Over-optimizing short-term metrics while starving long-term brand effects.
- Over-targeting existing customers while ignoring reach, penetration, and availability.
- Producing a plan with no capabilities, systems, owners, or review cadence.

### Verification requirement

Before finalizing output, run the final verification step in this skill. For larger artifacts, also apply `minimba-output-verifier`.

---

## Related skills

- `minimba-evidence-based-marketing`
- `minimba-double-jeopardy-law`

---

## Audit Information

- Verification passed: V1 ✓ / V2 ✓ / V3 ✓
- Test pass target: >=80%, with all should-not-trigger cases passing
- Distilled: 2026-07-21
