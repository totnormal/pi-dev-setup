---
name: mkpsi-anchor-resistance
description: |
  Use when: First offer, asking price, target number, budget cap, quota, initial forecast, arbitrary n
  umeric reference. Trigger phrases: first offer,, asking price,, their forecast says,, limit of 12,, 
  budget cap,, initial estimate,. NOT for: Some anchors contain valid information. Do not discard doma
  in evidence; separate evidential value from psychological pull.
source_book: |
  MKPSI behavioral persuasion corpus — Sutherland, Halpern, Knight, Martin/Goldstein/Cialdini, Gladwel
  l, Shotton, Packard, Kahneman, Lancaster
source_chapter: |
  Ch. 11 “Anchors,” “Uses and Abuses of Anchors,” “Anchoring and the Two Systems”
tags: [mkpsi-v2, bias, p1]
related_skills: [mkpsi-orchestrator, mkpsi-output-verifier, mkpsi-manipulation-ethics-gate, mkpsi-first-precise-anchor, mkpsi-reference-class-forecast]
disable-model-invocation: true
---

# Resist anchors by setting them aside and thinking the opposite.

## R — Reading

> “You should assume that any number that is on the table has had an anchoring effect on you, and if the stakes are high you should mobilize yourself (your System 2) to combat the effect.”
>
> — Source: Ch. 11 “Anchors,” “Uses and Abuses of Anchors,” “Anchoring and the Two Systems”

**Source mechanism:** When exposed to a number before estimating, explicitly mark it as an anchor, generate arguments against it, estimate from independent data or the other party’s reservation value, then compare.

**Evidence type:** source-specific candidate extraction; evidence grade must still be checked before rollout.

---

## I — Methodology skeleton (Interpretation)

When exposed to a number before estimating, explicitly mark it as an anchor, generate arguments against it, estimate from independent data or the other party’s reservation value, then compare.

Operationally, this means:

1. Identify the exact behavior, judgment, message, or design choice at stake.
2. Confirm the trigger matches this atomic mechanism rather than a broader MKPSI sibling.
3. Apply the source method as a concrete checklist, copy/design move, research protocol, or decision procedure.
4. State evidence level and avoid overclaiming from cases, lab studies, memoir, or historical examples.
5. Ship only with an ethical boundary and a test/verification plan.

---

## A1 — Application in the source

### Case 1: Wheel-of-fortune UN estimates
- **Problem:** Wheel-of-fortune UN estimates: random 10 vs 65 shifted estimates of African nations.
- **Mechanism:** The source example shows the named mechanism changing perception, judgment, motivation, or behavior in a specific context.
- **Result/evidence:** Use as source evidence, not universal proof; preserve the conditions that made the example work.
- **Transfer rule:** Apply only when the user's context matches the mechanism and can be tested with guardrails.

### Case 2: Real-estate agents denied influence from manipulated asking prices, yet showed a
- **Problem:** Real-estate agents denied influence from manipulated asking prices, yet showed a 41% anchoring effect.
- **Mechanism:** The second source example gives a cross-check against turning one anecdote into a rule.
- **Result/evidence:** Treat as corroborating evidence or boundary evidence depending on the example.
- **Transfer rule:** If this case conflicts with the user's context, route to `/mkpsi-orchestrator` or `/mkpsi-output-verifier`.

---

## A2 — Future Trigger

### User needs this skill when

1. First offer, asking price, target number, budget cap, quota, initial forecast, arbitrary numeric reference.
2. The user needs an executable artifact, intervention, research protocol, or decision check — not a book summary.
3. The user can provide enough context to define audience, behavior, evidence, and constraints.

### Language signals

- "first offer,"
- "asking price,"
- "their forecast says,"
- "limit of 12,"
- "budget cap,"
- "initial estimate,"
- "target number."

### Distinction from siblings

- Use `/mkpsi-orchestrator` when multiple MKPSI mechanisms may apply or routing is unclear.
- Use `/mkpsi-output-verifier` after this skill produces an artifact or plan.
- Use `/mkpsi-manipulation-ethics-gate` first for hidden influence, vulnerable users, shame/fear/status exploitation, defaults, scarcity, authority, or sensitive data.
- Sibling confusion risks: Not the same as base-rate anchoring; here the anchor may be arbitrary or strategic and should be challenged.

---

## E — Execution steps

1. **Apply the source method: When exposed to a number before estimating, explicitly mark it as an anchor, generate arguments against it, estimate from independent data or the other party’s reservation value, then compare.**
   - Done when: the final output contains this specific artifact/check, not generic advice.
2. **Request the concrete inputs needed for this mechanism: audience, current behavior/artifact, decision moment, available evidence, constraints, and success metric.**
   - Done when: the final output contains this specific artifact/check, not generic advice.
3. **Diagnose trigger fit and name at least one sibling skill that is close but not being used.**
   - Done when: the final output contains this specific artifact/check, not generic advice.
4. **Produce the concrete artifact/checklist/intervention implied by the method, not a generic explanation.**
   - Done when: the final output contains this specific artifact/check, not generic advice.
5. **Attach validation: evidence grade, primary metric, guardrail metric, and stop/decision rule.**
   - Done when: the final output contains this specific artifact/check, not generic advice.

### Required output fields

- **Selected mechanism:** `mkpsi-anchor-resistance` — Resist anchors by setting them aside and thinking the opposite.
- **Trigger fit:** why this skill applies and which sibling skills were intentionally not used.
- **Evidence level:** field/lab/case/memoir/historical/hypothesis/unsupported.
- **Concrete artifact:** copy, UX change, research protocol, decision checklist, experiment, or plan.
- **Ethical boundary:** what must not be faked, hidden, pressured, inferred, or overclaimed.
- **Test plan:** baseline, primary metric, guardrail metric, sample/duration, stop/decision rule.

---

## B — Boundary

### Do not use this skill when

- Some anchors contain valid information. Do not discard domain evidence; separate evidential value from psychological pull.
- The user only wants a book summary or author biography.
- The artifact affects high-risk contexts — minors, addiction, debt/financial hardship, health/legal/financial decisions, crisis/mental health, political persuasion, employment/housing/credit eligibility, or consent/privacy flows — unless the intervention clearly advances user welfare and preserves informed choice.
- The mechanism would require fake evidence, fake norms, fake scarcity, invented motives, invented founder stories, hidden fees, hidden defaults, or non-consensual sensitive inference.

### Source-specific misuse risks

Not the same as base-rate anchoring; here the anchor may be arbitrary or strategic and should be challenged.

### Author/source blind spots

- Effects vary by audience, culture, channel, and stakes.
- Some source examples are case-based, historical, memoir-derived, or lab-derived; grade evidence before rollout.
- Modern privacy, dark-pattern, AI-personalization, and platform risks can make old persuasion tactics more harmful.

---

## Related skills

- depends-on: `/mkpsi-orchestrator` when routing is unclear; `/mkpsi-manipulation-ethics-gate` for sensitive influence; `/mkpsi-output-verifier` for final QA
- contrasts-with: see sibling-confusion notes above
- composes-with: /mkpsi-orchestrator, /mkpsi-output-verifier, /mkpsi-manipulation-ethics-gate, /mkpsi-first-precise-anchor, /mkpsi-reference-class-forecast

---

## Audit information

- **Validation passed:** V1 ✓ / V2 ✓ / V3 ✓ (P1.)
- **Test pass rate:** designed; see `test-prompts.json`
- **Distillation date:** 2026-07-21
