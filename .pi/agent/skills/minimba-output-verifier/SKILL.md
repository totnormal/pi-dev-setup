---
name: minimba-output-verifier
description: |
  Use at the end of any minimba-* workflow to audit outputs for unsupported claims, vague goals, missing choices, weak evidence, short-termism, loyalty bias, and absent execution systems.
source_book: MiniMBA strategy/marketing readings: Laurie Pickard; Wiemer Snijders; Richard Rumelt; APG How Not to Plan; Byron Sharp; A.G. Lafley & Roger Martin; Les Binet & Peter Field
source_chapter: Quality layer
tags: [verification, qa]
related_skills: []
disable-model-invocation: true
---

# MiniMBA Output Verifier

## R — Original Passage (Reading)

> Explore the evidence, don’t assume too quickly, and find out what you think for yourself.
>
> — Source: MiniMBA strategy/marketing readings: Laurie Pickard; Wiemer Snijders; Richard Rumelt; APG How Not to Plan; Byron Sharp; A.G. Lafley & Roger Martin; Les Binet & Peter Field, Quality layer

---

## I — Methodology Skeleton (Interpretation)

This verifier should fail generic business advice. It checks whether the output faces the real problem, makes trade-offs, uses evidence cautiously, distinguishes long and short effects, and defines actions/systems.

---

## A1 — Application in the Source Material (Past Application)

Eat Your Greens and How Not to Plan warn against weak evidence and seductive claims; Rumelt warns against goals masquerading as strategy.

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
- Use this skill when the problem is specifically about **MiniMBA Output Verifier**.
- Use `minimba-output-verifier` after producing the artifact.

---

## E — Execution Steps

1. **Step 1**
   - Check for clear diagnosis/problem definition.
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

2. **Step 2**
   - Check for real choices and trade-offs.
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

3. **Step 3**
   - Check evidence quality and causal claims.
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

4. **Step 4**
   - Check coherent actions, metrics, owners, and review cadence.
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

5. **Step 5**
   - Return PASS or REVISE with fixes.
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

---


### How Brands Grow evidence-law QA addendum

For outputs using the Sharp/Romaniuk-derived skills, additionally check:

1. Does the output respect the Double Jeopardy law — i.e., are loyalty targets realistic for the brand's market share? If a plan claims to grow via loyalty alone, flag it.
2. Are competitive-set claims grounded in duplication-of-purchase evidence, not product-feature assumptions? Is segmentation evidence-based or assumed?
3. Does the strategy pursue distinctiveness (being noticed/identified) rather than meaningful differentiation? If it relies on "meaningful difference" as the growth driver, challenge it.
4. Are advertising objectives set as mental-availability maintenance/building, not short-term sales spikes? Is reach prioritised over targeting heavy buyers?
5. Are price promotions treated as a cost (rewarding existing buyers) rather than a growth strategy? Is forward-buying/purchase-reinforcement failure acknowledged?
6. Are loyalty programs evaluated against the evidence of weak effects and self-selection bias? Is the opportunity cost (penetration investment) calculated?
7. Are buyer-weight analyses controlling for regression to the mean? Is the Pareto ratio corrected from 80/20 to ~50/20? Is mass reach justified by the importance of light buyers?

### Human-centered business QA addendum

For outputs using the Tobaccowala-derived skills, additionally check:

1. Does the output combine spreadsheet logic with story/human consequences?
2. Does it make trust, culture, purpose, or dignity operational rather than decorative?
3. Does it avoid rejecting data/technology reflexively?
4. Are incentives, systems, leadership behaviors, and metrics aligned with the human claim?

## B — Boundary

### Do not use this skill when

- Do not rubber-stamp.
- Do not require every framework for every artifact.
- Label hypotheses when evidence is incomplete.

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
