---
name: minimba-research-causality-check
description: |
  Use when interpreting research, dashboards, correlations, surveys, focus groups, attribution, or data-mined insights.
source_book: |
  How Not to Plan — APG; Eat Your Greens — Wiemer Snijders
source_chapter: |
  Correlation and causality
tags: [research, causality]
related_skills: []
disable-model-invocation: true
---

# Check Research, Correlation, and Causality

## R — Original Passage (Reading)

> Run experiments if you can. Change A and see what happens to B. It’s the only reliable way to establish causality.
>
> — Source: How Not to Plan — APG; Eat Your Greens — Wiemer Snijders, Correlation and causality

---

## I — Methodology Skeleton (Interpretation)

This skill distinguishes correlation from causation, checks reverse causality, looks for confounders and time order, and prefers experiments or triangulation for high-stakes decisions.

---

## A1 — Application in the Source Material (Past Application)

How Not to Plan warns about spurious correlations, reverse causality, and data mining; Eat Your Greens urges stronger evidence for stronger claims.

---

## A2 — Trigger Scenarios (Future Trigger)

### Use this skill when

- The request matches the frontmatter description.
- The user wants an executable strategy, marketing, planning, evidence, brand-growth, media, research, or learning artifact.
- The task benefits from MiniMBA-style structured decision-making rather than a book summary.

### Language signals

- “strategy”, “marketing plan”, “brand growth”, “evidence”, “market share”, “where to play”, “how to win”, “availability”, “loyalty”, “media budget”, “research”, “MiniMBA”

### Distinction from adjacent skills

- Use `minimba-strategy-marketing-orchestrator` when the correct focused skill is unclear.
- Use this skill when the problem is specifically about **Check Research, Correlation, and Causality**.
- Use `minimba-output-verifier` after producing the artifact.

---

## E — Execution Steps

1. **Step 1**
   - Restate the inference.
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

2. **Step 2**
   - Classify evidence type.
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

3. **Step 3**
   - Check reverse causality, confounders, selection bias, and time order.
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

4. **Step 4**
   - Recommend stronger test or triangulation.
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

5. **Step 5**
   - Label conclusion as causal, suggestive, descriptive, or speculative.
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

---

## B — Boundary

### Do not use this skill when

- Do not dismiss qualitative research.
- Do not claim causality from dashboard correlation.
- Do not overcomplicate low-risk decisions.

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

- None explicitly required; use `minimba-output-verifier` for final QA.

---

## Audit Information

- Verification passed: V1 ✓ / V2 ✓ / V3 ✓
- Test pass target: >=80%, with all should-not-trigger cases passing
- Distilled: 2026-07-21
