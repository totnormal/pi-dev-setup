---
name: minimba-double-jeopardy-law
description: |
  Use when benchmarking brand metrics against market share expectations, setting realistic growth targets, diagnosing anomalous loyalty/penetration figures, or validating whether a brand's metrics are "normal" for its size.
source_book: How Brands Grow — Byron Sharp (2010); Marketing TEP — Byron Sharp
source_chapter: Ch 2 How Do Brands Grow?; Ch 13 The Scientific Laws
tags: [brand-growth, empirical-law, benchmarking]
related_skills: []
disable-model-invocation: true
---

# Double Jeopardy Law

## R — Original Passage (Reading)

> Smaller brands get "hit twice": their sales are lower because they have fewer buyers who buy the brand less often.
>
> — Source: How Brands Grow — Byron Sharp (2010); Marketing TEP — Byron Sharp, Ch 2 How Do Brands Grow?; Ch 13 The Scientific Laws

---

## I — Methodology Skeleton (Interpretation)

The Double Jeopardy law is an empirical generalisation: brands with less market share have far fewer buyers AND these buyers are slightly less loyal. Loyalty barely varies between competing brands — it is a function of market share and category, not of marketing brilliance. The law gives you a benchmark: if a brand's loyalty is much higher or lower than its share predicts, something unusual is happening.

---

## A1 — Application in the Source Material (Past Application)

Sharp shows that in UK washing powder, shampoo (UK and US), and even industrial ready-mix concrete, competing brands are bought at nearly identical purchase frequencies. Head & Shoulders (11% share) gets bought 1.9x/year; Vosene (2% share) gets bought 1.6x/year. Among IPA Advertising Effectiveness Awards submissions, 82% reported large penetration growth, only 2% reported loyalty growth alone.

---

## A2 — Trigger Scenarios (Future Trigger)

### Use this skill when

- Use when you need to: check if a brand's loyalty/penetration metrics are normal for its market share; set realistic growth targets (growth = penetration, not loyalty); validate market research panel data; challenge claims that a brand can grow via loyalty alone.

### Language signals

- "strategy", "marketing plan", "brand growth", "evidence", "market share", "where to play", "how to win", "availability", "loyalty", "media budget", "research", "MiniMBA"

### Distinction from adjacent skills

- Use `minimba-strategy-marketing-orchestrator` when the correct focused skill is unclear.
- Use this skill when the problem is specifically about the above trigger.
- Use `minimba-output-verifier` after producing the artifact.

---

## E — Execution Steps

1. **Step 1**
   - Obtain the brand's market share, market penetration (%), and average purchase frequency for the analysis period.
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

2. **Step 2**
   - Compare the brand's purchase frequency to competing brands of similar share. Expect ±10-15% variation, not 2x.
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

3. **Step 3**
   - Calculate the Dirichlet-predicted metrics for the brand's share — any large deviation signals a partition or data issue.
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

4. **Step 4**
   - Set growth targets: if you want +2 share points, predict the penetration increase needed (it's nearly all penetration), not the loyalty increase.
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

5. **Step 5**
   - Flag any brand whose loyalty is dramatically above/below what double jeopardy predicts for investigation.
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

---

## B — Boundary

### Do not use this skill when

Double Jeopardy applies to established, frequently-bought consumer brands and services. It does not perfectly predict brand-new categories, monopoly/near-monopoly markets, or subscription services with long-term contracts. Do not use it to justify inaction — it describes averages, not a ceiling.

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

- `minimba-penetration-over-loyalty`
- `minimba-market-share-growth`
- `minimba-duplication-of-purchase`

---

## Audit Information

- Verification passed: V1 ✓ / V2 ✓ / V3 ✓
- Test pass target: >=80%, with all should-not-trigger cases passing
- Distilled: 2026-07-21
