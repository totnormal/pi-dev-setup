---
name: mkpsi-orchestrator
description: |
  Use when: User asks for persuasion, influence, behavior change, campaign, UX flow, sales message, po
  licy nudge, or decision design. Trigger phrases: User asks for persuasion, influence, behavior chang
  e, campaign, UX flow, sales message. NOT for: Does not itself write final copy or deploy tactics; mu
  st not bypass verifier for vulnerable audiences or hidden influence.
source_book: |
  MKPSI behavioral persuasion corpus — Sutherland, Halpern, Knight, Martin/Goldstein/Cialdini, Gladwel
  l, Shotton, Packard, Kahneman, Lancaster
source_chapter: |
  Synthesizes all candidate books; especially Packard Ch. 23 morality, Kahneman Ch. 7/23/24, Halpern C
  h. 10 TEST, Sutherland alchemy rules.
tags: [mkpsi-v2, governance, p0]
related_skills: [mkpsi-output-verifier, mkpsi-manipulation-ethics-gate]
disable-model-invocation: true
---

# Select, sequence, and govern MKPSI skills for a persuasion task.

## R — Reading

> “Make it Easy, Attractive, Social and Timely.”
>
> — Source: Synthesizes all candidate books; especially Packard Ch. 23 morality, Kahneman Ch. 7/23/24, Halpern Ch. 10 TEST, Sutherland alchemy rules.

**Source mechanism:** Select the smallest skill sequence from target behavior and bottleneck; run ethics first and verifier last.

**Evidence type:** source-specific candidate extraction; evidence grade must still be checked before rollout.

---

## I — Methodology skeleton (Interpretation)

Select the smallest skill sequence from target behavior and bottleneck; run ethics first and verifier last.

Operationally, this means:

1. Identify the exact behavior, judgment, message, or design choice at stake.
2. Confirm the trigger matches this atomic mechanism rather than a broader MKPSI sibling.
3. Apply the source method as a concrete checklist, copy/design move, research protocol, or decision procedure.
4. State evidence level and avoid overclaiming from cases, lab studies, memoir, or historical examples.
5. Ship only with an ethical boundary and a test/verification plan.

---

## A1 — Application in the source

### Case 1: BIT/Halpern
- **Problem:** BIT/Halpern: tax, appointments, and public-service nudges worked by routing from target behavior to a testable intervention.
- **Mechanism:** The source example shows the named mechanism changing perception, judgment, motivation, or behavior in a specific context.
- **Result/evidence:** Use as source evidence, not universal proof; preserve the conditions that made the example work.
- **Transfer rule:** Apply only when the user's context matches the mechanism and can be tested with guardrails.

### Case 2: Sutherland/Packard/Kahneman
- **Problem:** Sutherland/Packard/Kahneman: hidden motives, psycho-logic, and bias checks require selection and verification, not blanket tactic stacking.
- **Mechanism:** The second source example gives a cross-check against turning one anecdote into a rule.
- **Result/evidence:** Treat as corroborating evidence or boundary evidence depending on the example.
- **Transfer rule:** If this case conflicts with the user's context, route to `/mkpsi-orchestrator` or `/mkpsi-output-verifier`.

---

## A2 — Future Trigger

### User needs this skill when

1. User asks for persuasion, influence, behavior change, campaign, UX flow, sales message, policy nudge, or decision design.
2. The user needs an executable artifact, intervention, research protocol, or decision check — not a book summary.
3. The user can provide enough context to define audience, behavior, evidence, and constraints.

### Language signals

- "User asks for persuasion"
- "influence"
- "behavior change"
- "campaign"
- "UX flow"
- "sales message"
- "policy nudge"
- "or decision design"

### Distinction from siblings

- Use `/mkpsi-orchestrator` when multiple MKPSI mechanisms may apply or routing is unclear.
- Use `/mkpsi-output-verifier` after this skill produces an artifact or plan.
- Use `/mkpsi-manipulation-ethics-gate` first for hidden influence, vulnerable users, shame/fear/status exploitation, defaults, scarcity, authority, or sensitive data.
- Sibling confusion risks: Starts with `mkpsi-manipulation-ethics-gate`, then chooses research, cognitive-bias, message, choice-architecture, or experience skills; ends with `mkpsi-output-verifier`.

---

## E — Execution steps

1. **Pre-screen the request for manipulation, high-risk audience/context, fake evidence, hidden defaults, coercion, or vulnerable exploitation; refuse or reframe unsafe parts.**
   - Done when: unsafe parts are refused/reframed.
2. **Define target behavior, audience, decision moment, current artifact, evidence, constraints, and requested deliverable.**
   - Done when: the final output contains this specific artifact/check, not generic advice.
3. **Route to the smallest sequence of atomic `/mkpsi-*` skills: research → bias/context diagnosis → intervention/message/value design → test design.**
   - Done when: the final output contains this specific artifact/check, not generic advice.
4. **Apply the selected skills and produce the artifact with mechanism, evidence level, ethical boundary, and metrics.**
   - Done when: the final output contains this specific artifact/check, not generic advice.
5. **Run `/mkpsi-output-verifier`; obey PASS / PASS WITH FIXES / FAIL before final delivery.**
   - Done when: the final output contains this specific artifact/check, not generic advice.

### Required output fields

- **Selected mechanism:** `mkpsi-orchestrator` — Select, sequence, and govern MKPSI skills for a persuasion task.
- **Trigger fit:** why this skill applies and which sibling skills were intentionally not used.
- **Evidence level:** field/lab/case/memoir/historical/hypothesis/unsupported.
- **Concrete artifact:** copy, UX change, research protocol, decision checklist, experiment, or plan.
- **Ethical boundary:** what must not be faked, hidden, pressured, inferred, or overclaimed.
- **Test plan:** baseline, primary metric, guardrail metric, sample/duration, stop/decision rule.

---

## B — Boundary

### Do not use this skill when

- Does not itself write final copy or deploy tactics; must not bypass verifier for vulnerable audiences or hidden influence.
- The user only wants a book summary or author biography.
- The artifact affects high-risk contexts — minors, addiction, debt/financial hardship, health/legal/financial decisions, crisis/mental health, political persuasion, employment/housing/credit eligibility, or consent/privacy flows — unless the intervention clearly advances user welfare and preserves informed choice.
- The mechanism would require fake evidence, fake norms, fake scarcity, invented motives, invented founder stories, hidden fees, hidden defaults, or non-consensual sensitive inference.

### Source-specific misuse risks

Starts with `mkpsi-manipulation-ethics-gate`, then chooses research, cognitive-bias, message, choice-architecture, or experience skills; ends with `mkpsi-output-verifier`.

### Author/source blind spots

- Effects vary by audience, culture, channel, and stakes.
- Some source examples are case-based, historical, memoir-derived, or lab-derived; grade evidence before rollout.
- Modern privacy, dark-pattern, AI-personalization, and platform risks can make old persuasion tactics more harmful.

### Dichter motivation-research routing addendum

Route to:

- `mkpsi-rationality-fetish-suspicion` when a "rational" explanation for behavior is accepted as obvious and no deeper investigation is attempted. First step — creates the suspicion that triggers the search.
- `mkpsi-product-symbolic-meaning-decode` when functional features don't explain desire and the product seems to carry emotional/identity/status meaning. Decodes the unconscious symbolic meaning using Dichter's functional/dynamic/fundamental principles.
- `mkpsi-mental-block-inventory-removal` when a correct rational argument fails to persuade and the resistance is irrational/emotional. Inventories ALL mental blocks (guilt, fear, ego, status, superstition) and removes each systematically.
- `mkpsi-insight-as-persuasion-mirror` when the audience resists because they feel misunderstood or psychologically distant. Mirrors back the hidden motive to build trust.
- `mkpsi-functional-context-anthropology` when investigating WHY people buy/use something and functional explanations feel incomplete. Maps the cultural/biological/social context first.
- `mkpsi-aspiration-scale-trajectory` when demographics don't explain behavior and life-direction matters more than static state.
- `mkpsi-buyer-as-discoverer-credit` when messaging steals the buyer's sense of agency. Let them feel like the clever discoverer.
- `mkpsi-pregnant-moment-selection` when choosing which moment to depict in advertising. Not peak performance — the moment closest to the human heart.
- `mkpsi-purchase-as-life-philosophy` when economic anxiety suppresses spending. Frame the purchase as optimism about the future.

These nine compose with the existing diagnostic skills (`mkpsi-find-real-why`, `mkpsi-depth-interview-motive-trace`, `mkpsi-observe-do-not-ask`) to form the full Dichter motivation-research workflow.

---

## Related skills

- depends-on: `/mkpsi-orchestrator` when routing is unclear; `/mkpsi-manipulation-ethics-gate` for sensitive influence; `/mkpsi-output-verifier` for final QA
- contrasts-with: see sibling-confusion notes above
- composes-with: /mkpsi-output-verifier, /mkpsi-manipulation-ethics-gate, /mkpsi-insight-as-persuasion-mirror, /mkpsi-mental-block-inventory-removal, /mkpsi-rationality-fetish-suspicion, /mkpsi-product-symbolic-meaning-decode, /mkpsi-functional-context-anthropology, /mkpsi-aspiration-scale-trajectory, /mkpsi-buyer-as-discoverer-credit, /mkpsi-pregnant-moment-selection, /mkpsi-purchase-as-life-philosophy

---

## Audit information

- **Validation passed:** V1 ✓ / V2 ✓ / V3 ✓ (P0.)
- **Test pass rate:** designed; see `test-prompts.json`
- **Distillation date:** 2026-07-21
