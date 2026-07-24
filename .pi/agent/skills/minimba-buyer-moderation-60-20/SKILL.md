---
name: minimba-buyer-moderation-60-20
description: |
  Use when analysing customer panel data, segmenting customers by purchase weight, evaluating heavy-buyer targeting strategies, or interpreting changes in buyer behavior over time.
source_book: How Brands Grow — Byron Sharp (2010); Marketing TEP — Byron Sharp
source_chapter: Ch 4 Which Customers Matter Most?; Ch 13 The Scientific Laws
tags: [empirical-law, customer-segmentation, research]
related_skills: []
disable-model-invocation: true
---

# Buyer Moderation 60 20

## R — Original Passage (Reading)

> Non-buyers and light buyers are heavier buyers than you think, and heavy buyers are lighter. This is "regression to the mean" — it reflects no real change in buyer behaviour.
>
> — Source: How Brands Grow — Byron Sharp (2010); Marketing TEP — Byron Sharp, Ch 4 Which Customers Matter Most?; Ch 13 The Scientific Laws

---

## I — Methodology Skeleton (Interpretation)

Two related laws: (1) The Pareto law is NOT 80/20 — it's closer to 50-60/20. The heaviest 20% of a brand's buyers deliver ~50% of sales, not 80%. The lightest 50% deliver ~20%. This means light buyers are far more important than "80/20 thinking" suggests. (2) The Law of Buyer Moderation: heavy buyers in one period buy less in the next (regression to the mean), and light buyers buy more. This is statistical, not behavioral change. If you attribute the "decline" of heavy buyers or "growth" of light buyers to a marketing intervention, you are fooling yourself.

---

## A1 — Application in the Source Material (Past Application)

Sharp & Romaniuk (2007) examined dozens of brands across categories: annual Pareto share averages ~50%, ranging from 42% (shampoo) to 64% (soft drinks) — never near 80%. The 20:30:50 law: heaviest 20% = 50% of purchases, middle 30% = 30%, lightest 50% = 20%. Coca-Cola's "average" buyer buys 12x/year, but the TYPICAL buyer buys 1-2x/year — the average is skewed by ultra-heavy buyers.

---

## A2 — Trigger Scenarios (Future Trigger)

### Use this skill when

- Use when: a targeting strategy focuses on "heavy buyers"; panel data shows heavy buyers "churning" (it's regression to the mean); justifying mass reach over heavy-buyer targeting; interpreting loyalty program "success" (members bought more because they were heavy, not because of the program).

### Language signals

- "strategy", "marketing plan", "brand growth", "evidence", "market share", "where to play", "how to win", "availability", "loyalty", "media budget", "research", "MiniMBA"

### Distinction from adjacent skills

- Use `minimba-strategy-marketing-orchestrator` when the correct focused skill is unclear.
- Use this skill when the problem is specifically about the above trigger.
- Use `minimba-output-verifier` after producing the artifact.

---

## E — Execution Steps

1. **Step 1**
   - Calculate the actual Pareto share for your brand over a 12-month period. Expect ~50%, not 80%.
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

2. **Step 2**
   - Segment buyers into heavy (top 20%), medium (middle 30%), light (bottom 50%). Note that "light" = half your buyers.
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

3. **Step 3**
   - When analysing period-over-period changes, apply buyer moderation: expect heavy buyers to decline and light buyers to grow — this is statistical, not behavioral.
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

4. **Step 4**
   - Size the opportunity: the 50% lightest buyers deliver 20% of sales but represent the largest growth opportunity (they are numerous and under-served).
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

5. **Step 5**
   - Set reach strategy: target all category buyers, not just the heavy 20%. Mass media beats precision targeting for established brands.
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

6. **Step 6**
   - Use Dirichlet benchmarks to separate real behavioral change from statistical regression.
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

---

## B — Boundary

### Do not use this skill when

These laws describe stable, established brands in repeat-purchase categories. New brands, subscription services, and one-time-purchase categories behave differently. Buyer moderation is a statistical phenomenon — it does NOT mean marketing has no effect, only that you must control for regression to the mean when attributing effects.

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

- `minimba-double-jeopardy-law`
- `minimba-penetration-over-loyalty`
- `minimba-research-causality-check`

---

## Audit Information

- Verification passed: V1 ✓ / V2 ✓ / V3 ✓
- Test pass target: >=80%, with all should-not-trigger cases passing
- Distilled: 2026-07-21
