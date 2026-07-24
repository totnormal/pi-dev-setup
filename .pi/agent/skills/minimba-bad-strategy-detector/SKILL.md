---
name: minimba-bad-strategy-detector
description: |
  Use to audit a strategy document, plan, OKRs, or leadership memo for fluff, failure to face the problem, goals mistaken for strategy, and bad objectives.
source_book: |
  Good Strategy/Bad Strategy — Richard Rumelt
source_chapter: |
  Chapters 3–4
tags: [strategy, anti-patterns]
related_skills: []
disable-model-invocation: true
---

# Detect Bad Strategy

## R — Original Passage (Reading)

> Bad strategy is not simply the absence of good strategy. It grows out of specific misconceptions and leadership dysfunctions.
>
> — Source: Good Strategy/Bad Strategy — Richard Rumelt, Chapters 3–4

---

## I — Methodology Skeleton (Interpretation)

Bad strategy has recognizable patterns: fluff, refusing to face the challenge, mistaking goals for strategy, and objectives that are incoherent or impractical.

---

## A1 — Application in the Source Material (Past Application)

Rumelt critiques template-style strategy and vague ambitions that preserve the appearance of strategy while avoiding hard choice.

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
- Use this skill when the problem is specifically about **Detect Bad Strategy**.
- Use `minimba-output-verifier` after producing the artifact.

---

## E — Execution Steps

1. **Step 1**
   - Extract stated challenge, objectives, and actions.
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

2. **Step 2**
   - Flag fluff and inflated language.
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

3. **Step 3**
   - Flag missing/softened diagnosis.
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

4. **Step 4**
   - Flag targets masquerading as strategy.
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

5. **Step 5**
   - Flag incoherent or blue-sky objectives.
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

6. **Step 6**
   - Rewrite failures into kernel components.
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

---

## B — Boundary

### Do not use this skill when

- Do not punish aspiration when real strategy is present.
- Do not stop at critique; propose fixes.
- Do not replace leadership choice with a menu.

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
