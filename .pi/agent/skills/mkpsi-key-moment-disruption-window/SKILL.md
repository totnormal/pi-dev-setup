---
name: mkpsi-key-moment-disruption-window
description: |
  Use when: New lifecycle, first use, relocation, renewal, pre-expiry, onboarding, routine disruption.
   Trigger phrases: first year, before expiry, new customer onboarding, just moved, first child, habit
  s not formed yet.. NOT for: Do not target sensitive life events in ways users perceive as intrusive 
  or exploitative. Healthcare, pregnancy, bereavement, and financial distress require extra consent an
  d care.
source_book: |
  MKPSI behavioral persuasion corpus — Sutherland, Halpern, Knight, Martin/Goldstein/Cialdini, Gladwel
  l, Shotton, Packard, Kahneman, Lancaster
source_chapter: |
  Chapter 6, “Timely”; “Intervening early”; “Key moments to prompt or reshape established behaviour”; 
  visa, first-time mothers, moving house, recruitment prompt.
tags: [mkpsi-v2, choice, p1]
related_skills: [mkpsi-orchestrator, mkpsi-output-verifier, mkpsi-manipulation-ethics-gate, mkpsi-timely-precommitment-before-temptation, mkpsi-target-choice-contexts-not-personas]
disable-model-invocation: true
---

# Intervene when habits are forming or disrupted.

## R — Reading

> “Intervene before the behaviour has been established if you can; look for when the intervention is most salient or disrupted for other reasons; and try to help people overcome their own time inconsistency.”
>
> — Source: Chapter 6, “Timely”; “Intervening early”; “Key moments to prompt or reshape established behaviour”; visa, first-time mothers, moving house, recruitment prompt.

**Source mechanism:** - **Recognize:** A new lifecycle, onboarding, relocation, first year, pre-expiry, or disrupted routine opens a habit window.
- **Intervene:** Deliver advice/action before bad habits form or at the exact moment the old script is unstable.
- **Assess:** Compare effects by timing cohort: before vs after habit formation or event.

**Evidence type:** source-specific candidate extraction; evidence grade must still be checked before rollout.

---

## I — Methodology skeleton (Interpretation)

- **Recognize:** A new lifecycle, onboarding, relocation, first year, pre-expiry, or disrupted routine opens a habit window.
- **Intervene:** Deliver advice/action before bad habits form or at the exact moment the old script is unstable.
- **Assess:** Compare effects by timing cohort: before vs after habit formation or event.

Operationally, this means:

1. Identify the exact behavior, judgment, message, or design choice at stake.
2. Confirm the trigger matches this atomic mechanism rather than a broader MKPSI sibling.
3. Apply the source method as a concrete checklist, copy/design move, research protocol, or decision procedure.
4. State evidence level and avoid overclaiming from cases, lab studies, memoir, or historical examples.
5. Ship only with an ethical boundary and a test/verification plan.

---

## A1 — Application in the source

### Case 1: 1. Nurse Family Partnership worked much better with first-time mothers; habits w
- **Problem:** 1. Nurse Family Partnership worked much better with first-time mothers; habits were already established with later children.
- **Mechanism:** The source example shows the named mechanism changing perception, judgment, motivation, or behavior in a specific context.
- **Result/evidence:** Use as source evidence, not universal proof; preserve the conditions that made the example work.
- **Transfer rule:** Apply only when the user's context matches the mechanism and can be tested with guardrails.

### Case 2: 2. Writing before visas expired increased recorded departures by around 20%, com
- **Problem:** 2. Writing before visas expired increased recorded departures by around 20%, compared with waiting until after expiry.
- **Mechanism:** The second source example gives a cross-check against turning one anecdote into a rule.
- **Result/evidence:** Treat as corroborating evidence or boundary evidence depending on the example.
- **Transfer rule:** If this case conflicts with the user's context, route to `/mkpsi-orchestrator` or `/mkpsi-output-verifier`.

---

## A2 — Future Trigger

### User needs this skill when

1. New lifecycle, first use, relocation, renewal, pre-expiry, onboarding, routine disruption.
2. The user needs an executable artifact, intervention, research protocol, or decision check — not a book summary.
3. The user can provide enough context to define audience, behavior, evidence, and constraints.

### Language signals

- "first year"
- "before expiry"
- "new customer onboarding"
- "just moved"
- "first child"
- "habits not formed yet."

### Distinction from siblings

- Use `/mkpsi-orchestrator` when multiple MKPSI mechanisms may apply or routing is unclear.
- Use `/mkpsi-output-verifier` after this skill produces an artifact or plan.
- Use `/mkpsi-manipulation-ethics-gate` first for hidden influence, vulnerable users, shame/fear/status exploitation, defaults, scarcity, authority, or sensitive data.
- Sibling confusion risks: - Not `mkpsi-timely-precommitment-before-temptation`: timing windows can be about habit disruption, not self-control.
- Not generic reminder timing: the moment must change receptivity or scripts.

---

## E — Execution steps

1. **Apply the source method: - **Recognize:** A new lifecycle, onboarding, relocation, first year, pre-expiry, or disrupted routine opens a habit window. - **Intervene:** Deliver advice/action before bad habits form or at the exact moment the old script is unstable. - **Assess:** Compare effects by timing cohort: before vs after habit formation or event.**
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

- **Selected mechanism:** `mkpsi-key-moment-disruption-window` — Intervene when habits are forming or disrupted.
- **Trigger fit:** why this skill applies and which sibling skills were intentionally not used.
- **Evidence level:** field/lab/case/memoir/historical/hypothesis/unsupported.
- **Concrete artifact:** copy, UX change, research protocol, decision checklist, experiment, or plan.
- **Ethical boundary:** what must not be faked, hidden, pressured, inferred, or overclaimed.
- **Test plan:** baseline, primary metric, guardrail metric, sample/duration, stop/decision rule.

---

## B — Boundary

### Do not use this skill when

- Do not target sensitive life events in ways users perceive as intrusive or exploitative. Healthcare, pregnancy, bereavement, and financial distress require extra consent and care.
- The user only wants a book summary or author biography.
- The artifact affects high-risk contexts — minors, addiction, debt/financial hardship, health/legal/financial decisions, crisis/mental health, political persuasion, employment/housing/credit eligibility, or consent/privacy flows — unless the intervention clearly advances user welfare and preserves informed choice.
- The mechanism would require fake evidence, fake norms, fake scarcity, invented motives, invented founder stories, hidden fees, hidden defaults, or non-consensual sensitive inference.

### Source-specific misuse risks

- Not `mkpsi-timely-precommitment-before-temptation`: timing windows can be about habit disruption, not self-control.
- Not generic reminder timing: the moment must change receptivity or scripts.

### Author/source blind spots

- Effects vary by audience, culture, channel, and stakes.
- Some source examples are case-based, historical, memoir-derived, or lab-derived; grade evidence before rollout.
- Modern privacy, dark-pattern, AI-personalization, and platform risks can make old persuasion tactics more harmful.

---

## Related skills

- depends-on: `/mkpsi-orchestrator` when routing is unclear; `/mkpsi-manipulation-ethics-gate` for sensitive influence; `/mkpsi-output-verifier` for final QA
- contrasts-with: see sibling-confusion notes above
- composes-with: /mkpsi-orchestrator, /mkpsi-output-verifier, /mkpsi-manipulation-ethics-gate, /mkpsi-timely-precommitment-before-temptation, /mkpsi-target-choice-contexts-not-personas

---

## Audit information

- **Validation passed:** V1 ✓ / V2 ✓ / V3 ✓ (P1.)
- **Test pass rate:** designed; see `test-prompts.json`
- **Distillation date:** 2026-07-21
