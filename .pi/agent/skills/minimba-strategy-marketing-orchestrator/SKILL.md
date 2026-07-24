---
name: minimba-strategy-marketing-orchestrator
description: |
  Use when unsure which minimba-* skill to call, or when converting a business/marketing problem into a strategy, planning, evidence, brand-growth, media, research, or learning workflow. It diagnoses the task, selects relevant minimba-* skills, sequences them, and runs final verification.
source_book: MiniMBA strategy/marketing readings: Laurie Pickard; Wiemer Snijders; Richard Rumelt; APG How Not to Plan; Byron Sharp; A.G. Lafley & Roger Martin; Les Binet & Peter Field
source_chapter: Corpus synthesis
tags: [orchestrator, strategy, marketing]
related_skills: 
  - slug: minimba-self-directed-mba
    relation: routes-to
  - slug: minimba-strategy-kernel
    relation: routes-to
  - slug: minimba-bad-strategy-detector
    relation: routes-to
  - slug: minimba-proximate-objectives
    relation: routes-to
  - slug: minimba-playing-to-win-cascade
    relation: routes-to
  - slug: minimba-where-to-play-how-to-win
    relation: routes-to
  - slug: minimba-capabilities-systems-fit
    relation: routes-to
  - slug: minimba-evidence-based-marketing
    relation: routes-to
  - slug: minimba-availability-growth
    relation: routes-to
  - slug: minimba-penetration-over-loyalty
    relation: routes-to
  - slug: minimba-distinctive-assets
    relation: routes-to
  - slug: minimba-long-short-balance
    relation: routes-to
  - slug: minimba-media-reach-planning
    relation: routes-to
  - slug: minimba-research-causality-check
    relation: routes-to
  - slug: minimba-planning-anti-patterns
    relation: routes-to
  - slug: minimba-market-share-growth
    relation: routes-to
  - slug: minimba-brand-portfolio-lifecycle
    relation: routes-to
  - slug: minimba-human-centered-business
    relation: routes-to
  - slug: minimba-trust-culture-leadership
    relation: routes-to
  - slug: minimba-tech-human-balance
    relation: routes-to
  - slug: minimba-double-jeopardy-law
    relation: routes-to
  - slug: minimba-duplication-of-purchase
    relation: routes-to
  - slug: minimba-differentiation-vs-distinctiveness
    relation: routes-to
  - slug: minimba-advertising-as-salience
    relation: routes-to
  - slug: minimba-price-promotion-evidence
    relation: routes-to
  - slug: minimba-loyalty-program-evidence
    relation: routes-to
  - slug: minimba-buyer-moderation-60-20
    relation: routes-to
disable-model-invocation: true
---

# MiniMBA Strategy/Marketing Orchestrator

## R — Original Passage (Reading)

> Strategy is about making choices, trade-offs; it is about deliberately choosing to be different.
>
> — Source: MiniMBA strategy/marketing readings: Laurie Pickard; Wiemer Snijders; Richard Rumelt; APG How Not to Plan; Byron Sharp; A.G. Lafley & Roger Martin; Les Binet & Peter Field, Corpus synthesis

---

## I — Methodology Skeleton (Interpretation)

The orchestrator routes MiniMBA problems into the right workflow: strategy diagnosis, choice cascade, evidence-based marketing, brand growth, media effectiveness, research quality, planning anti-patterns, or self-directed learning.

---

## A1 — Application in the Source Material (Past Application)

The corpus combines Rumelt/Lafley-Martin strategy, Sharp/APG/Snijders evidence-based marketing, Binet/Field effectiveness, and Pickard self-directed education.

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
- Use this skill when the problem is specifically about **MiniMBA Strategy/Marketing Orchestrator**.
- Use `minimba-output-verifier` after producing the artifact.

---

## E — Execution Steps

1. **Step 1**
   - Classify the task domain and artifact needed.
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

2. **Step 2**
   - Identify the missing layer: diagnosis, choices, evidence, availability, long/short balance, execution, or learning proof.
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

3. **Step 3**
   - Route to 1–4 focused minimba-* skills.
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

4. **Step 4**
   - Produce the artifact and name the skill logic used.
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

5. **Step 5**
   - Run minimba-output-verifier and revise.
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

---


### How Brands Grow empirical-law routing addendum

Route to:

- `minimba-double-jeopardy-law` when benchmarking brand metrics against market share expectations, setting growth targets, or diagnosing anomalous loyalty/penetration figures.
- `minimba-duplication-of-purchase` when defining competitive sets, testing segmentation claims, or identifying market partitions.
- `minimba-differentiation-vs-distinctiveness` when auditing positioning that depends on perceived differentiation or evaluating brand image survey results.
- `minimba-advertising-as-salience` when evaluating advertising strategy, setting creative objectives, or measuring advertising effectiveness.
- `minimba-price-promotion-evidence` when evaluating promotion ROI or deciding between promotion vs brand-building investment.
- `minimba-loyalty-program-evidence` when evaluating loyalty program investment, ROI, or wind-down decisions.
- `minimba-buyer-moderation-60-20` when analysing customer panel data, segmenting by purchase weight, or interpreting period-over-period buyer changes.
- `minimba-customer-bases-seldom-vary` when a targeting strategy assumes a unique customer base or segmentation claims need testing.
- `minimba-usage-drives-attitude` when interpreting brand health/image survey results or diagnosing why larger brands score higher.
- `minimba-natural-monopoly-light-buyers` when deciding whether to target heavy "super consumers" vs light/non-buyers for growth.
- `minimba-polygamous-repertoire-loyalty` when setting loyalty targets, designing programs, or evaluating share-of-requirements.
- `minimba-retention-double-jeopardy` when evaluating retention/churn ROI or assessing CRM investment claims.
- `minimba-physical-availability-threshold` when setting distribution targets or diagnosing why share is stuck below potential.

### Human-centered business routing addendum

Route to:

- `minimba-human-centered-business` when a plan overweights data, metrics, technology, or optimization and needs the human/story dimension restored.
- `minimba-trust-culture-leadership` when the issue is culture, trust, retention, motivation, talent, or leadership behavior.
- `minimba-tech-human-balance` when evaluating AI, automation, analytics, digital transformation, or screen-based work through a human business lens.

## B — Boundary

### Do not use this skill when

- Do not use for isolated factual lookup.
- Do not invent unsupported MBA theory.
- Do not skip final verification.

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

- routes-to: `minimba-self-directed-mba`
- routes-to: `minimba-strategy-kernel`
- routes-to: `minimba-bad-strategy-detector`
- routes-to: `minimba-proximate-objectives`
- routes-to: `minimba-playing-to-win-cascade`
- routes-to: `minimba-where-to-play-how-to-win`
- routes-to: `minimba-capabilities-systems-fit`
- routes-to: `minimba-evidence-based-marketing`
- routes-to: `minimba-availability-growth`
- routes-to: `minimba-penetration-over-loyalty`
- routes-to: `minimba-distinctive-assets`
- routes-to: `minimba-long-short-balance`
- routes-to: `minimba-media-reach-planning`
- routes-to: `minimba-research-causality-check`
- routes-to: `minimba-planning-anti-patterns`
- routes-to: `minimba-market-share-growth`
- routes-to: `minimba-brand-portfolio-lifecycle`
- routes-to: `minimba-double-jeopardy-law`
- routes-to: `minimba-duplication-of-purchase`
- routes-to: `minimba-differentiation-vs-distinctiveness`
- routes-to: `minimba-advertising-as-salience`
- routes-to: `minimba-price-promotion-evidence`
- routes-to: `minimba-loyalty-program-evidence`
- routes-to: `minimba-buyer-moderation-60-20`
- routes-to: `minimba-customer-bases-seldom-vary`
- routes-to: `minimba-usage-drives-attitude`
- routes-to: `minimba-natural-monopoly-light-buyers`
- routes-to: `minimba-polygamous-repertoire-loyalty`
- routes-to: `minimba-retention-double-jeopardy`
- routes-to: `minimba-physical-availability-threshold`

---

## Audit Information

- Verification passed: V1 ✓ / V2 ✓ / V3 ✓
- Test pass target: >=80%, with all should-not-trigger cases passing
- Distilled: 2026-07-21
