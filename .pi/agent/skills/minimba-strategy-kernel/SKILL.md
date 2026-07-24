---
name: minimba-strategy-kernel
description: |
  Use when a plan has goals but lacks a real strategy, or when the user needs diagnosis, guiding policy, and coherent action.
source_book: |
  Good Strategy/Bad Strategy — Richard Rumelt
source_chapter: |
  Chapter 5: The Kernel of Good Strategy
tags: [strategy, diagnosis, execution]
related_skills: 
  - slug: minimba-output-verifier
    relation: composes-with
  - slug: minimba-bad-strategy-detector
    relation: contrasts-with
  - slug: minimba-proximate-objectives
    relation: composes-with
disable-model-invocation: true
---

# Build the Kernel of Good Strategy

## R — Original Passage (Reading)

> The kernel of a strategy contains three elements: a diagnosis, a guiding policy, and a set of coherent actions.
>
> — Source: Good Strategy/Bad Strategy — Richard Rumelt, Chapter 5: The Kernel of Good Strategy

---

## I — Methodology Skeleton (Interpretation)

Rumelt’s kernel turns aspiration into strategic logic: diagnose the challenge, choose an overall approach, then coordinate actions so they reinforce one another.

---

## A1 — Application in the Source Material (Past Application)

Rumelt uses cases from Apple, Desert Storm, Walmart, and others to show that good strategy often looks unexpected because it concentrates on the critical issue.

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
- Use this skill when the problem is specifically about **Build the Kernel of Good Strategy**.
- Use `minimba-output-verifier` after producing the artifact.

---

## E — Execution Steps

1. **Step 1**
   - Separate symptoms from the underlying challenge.
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

2. **Step 2**
   - Write a diagnosis that identifies what matters most.
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

3. **Step 3**
   - Choose a guiding policy and trade-off.
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

4. **Step 4**
   - List coherent actions that reinforce the policy.
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

5. **Step 5**
   - Verify actions flow from diagnosis rather than a wish list.
   - Completion standard: a concrete, inspectable decision, list, artifact, or revision exists.

---

## B — Boundary

### Do not use this skill when

- Do not call a target a strategy.
- Do not accept incoherent initiative lists.
- Do not use for tactical copy requests.

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
- contrasts-with: `minimba-bad-strategy-detector`
- composes-with: `minimba-proximate-objectives`

---

## Audit Information

- Verification passed: V1 ✓ / V2 ✓ / V3 ✓
- Test pass target: >=80%, with all should-not-trigger cases passing
- Distilled: 2026-07-21
