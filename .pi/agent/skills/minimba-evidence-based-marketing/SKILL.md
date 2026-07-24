---
name: minimba-evidence-based-marketing
description: |
  Use when evaluating marketing claims, best practices, channel myths, martech promises, or proposed brand tactics.
source_book: |
  Eat Your Greens — Wiemer Snijders; Marketing TEP — Byron Sharp; How Not to Plan — APG
source_chapter: |
  Evidence-based marketing synthesis
tags: [evidence, marketing-science]
related_skills: 
  - slug: minimba-output-verifier
    relation: composes-with
  - slug: minimba-research-causality-check
    relation: depends-on
disable-model-invocation: true
---

# Apply Evidence-Based Marketing Thinking

## R — Original Passage (Reading)

> The more extraordinary the claim of any technology platform or gizmo, the stronger the evidence must be to support that claim.
>
> — Source: Eat Your Greens — Wiemer Snijders; Marketing TEP — Byron Sharp; How Not to Plan — APG, Evidence-based marketing synthesis

---

## I — Methodology Skeleton (Interpretation)

Evidence-based marketing asks what the claim is, what supports it, whether causality is plausible, whether it generalizes, and what would change our mind.

---

## A1 — Application in the Source Material (Past Application)

Eat Your Greens assembles evidence against hype cycles; How Not to Plan tells planners to ask for evidence and causal logic.

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
- Use this skill when the problem is specifically about **Apply Evidence-Based Marketing Thinking**.
- Use `minimba-output-verifier` after producing the artifact.

---

## E — Execution Steps

1. **Step 1**
   - State the claim testably.
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

2. **Step 2**
   - Classify evidence type.
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

3. **Step 3**
   - Check causality, base rates, category fit, and counterevidence.
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

4. **Step 4**
   - Convert into a cautious recommendation or experiment.
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

5. **Step 5**
   - Verify unsupported assumptions are labelled.
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

---

## B — Boundary

### Do not use this skill when

- Do not treat absence of evidence as proof of absence.
- Do not ignore practitioner judgment.
- Do not overgeneralize from one case study.

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

- composes-with: `minimba-output-verifier`
- depends-on: `minimba-research-causality-check`

---

## Audit Information

- Verification passed: V1 ✓ / V2 ✓ / V3 ✓
- Test pass target: >=80%, with all should-not-trigger cases passing
- Distilled: 2026-07-21
