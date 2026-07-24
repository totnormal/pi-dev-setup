---
name: mkpsi-remove-hassle-before-adding-incentives
description: |
  Use when: Valuable action has subsidy/info/intent but low completion. Trigger phrases: we need a big
  ger discount, people know it pays back, they can’t face the paperwork, only one more step, it’s a no
  -brainer but nobody does it.. NOT for: Do not remove comprehension or consent steps that protect peo
  ple. Do not make entry easy while making cancellation hard.
source_book: |
  MKPSI behavioral persuasion corpus — Sutherland, Halpern, Knight, Martin/Goldstein/Cialdini, Gladwel
  l, Shotton, Packard, Kahneman, Lancaster
source_chapter: |
  Chapter 3, “Easy”; “Simplify, reduce hassle and take out friction”; loft insulation trial.
tags: [mkpsi-v2, choice, p1]
related_skills: [mkpsi-orchestrator, mkpsi-output-verifier, mkpsi-manipulation-ethics-gate, mkpsi-flip-default-to-beneficial-opt-out, mkpsi-simplify-message-to-one-clear-action, mkpsi-resequence-context-same-action]
disable-model-invocation: true
---

# Diagnose and remove last-mile friction before increasing incentives.

## R — Reading

> “Frictional costs are not a peripheral issue. Rather, they often make all the difference between something happening or not, be it a stone rolling down a slope, or a policy succeeding or failing.”
>
> — Source: Chapter 3, “Easy”; “Simplify, reduce hassle and take out friction”; loft insulation trial.

**Source mechanism:** - **Recognize:** A valuable action has subsidies, education, or stated intent, yet uptake remains low.
- **Intervene:** Map the last-mile hassle; remove, absorb, pre-fill, automate, or bundle the most aversive step.
- **Assess:** Compare friction removal against discount/incentive arms; measure completed behavior, not stated interest.

**Evidence type:** source-specific candidate extraction; evidence grade must still be checked before rollout.

---

## I — Methodology skeleton (Interpretation)

- **Recognize:** A valuable action has subsidies, education, or stated intent, yet uptake remains low.
- **Intervene:** Map the last-mile hassle; remove, absorb, pre-fill, automate, or bundle the most aversive step.
- **Assess:** Compare friction removal against discount/incentive arms; measure completed behavior, not stated interest.

Operationally, this means:

1. Identify the exact behavior, judgment, message, or design choice at stake.
2. Confirm the trigger matches this atomic mechanism rather than a broader MKPSI sibling.
3. Apply the source method as a concrete checklist, copy/design move, research protocol, or decision procedure.
4. State evidence level and avoid overclaiming from cases, lab studies, memoir, or historical examples.
5. Ship only with an ethical boundary and a test/verification plan.

---

## A1 — Application in the source

### Case 1: 1. Loft insulation
- **Problem:** 1. Loft insulation: extra discounts barely moved uptake, while paid attic-clearance service produced roughly three-times higher take-up; at-cost clearance rose to about five-times.
- **Mechanism:** The source example shows the named mechanism changing perception, judgment, motivation, or behavior in a specific context.
- **Result/evidence:** Use as source evidence, not universal proof; preserve the conditions that made the example work.
- **Transfer rule:** Apply only when the user's context matches the mechanism and can be tested with guardrails.

### Case 2: 2. US college aid/application pre-filling using tax data increased university en
- **Problem:** 2. US college aid/application pre-filling using tax data increased university enrolment from 34% to 42%, while information alone made no difference.
- **Mechanism:** The second source example gives a cross-check against turning one anecdote into a rule.
- **Result/evidence:** Treat as corroborating evidence or boundary evidence depending on the example.
- **Transfer rule:** If this case conflicts with the user's context, route to `/mkpsi-orchestrator` or `/mkpsi-output-verifier`.

---

## A2 — Future Trigger

### User needs this skill when

1. Valuable action has subsidy/info/intent but low completion.
2. The user needs an executable artifact, intervention, research protocol, or decision check — not a book summary.
3. The user can provide enough context to define audience, behavior, evidence, and constraints.

### Language signals

- "we need a bigger discount"
- "people know it pays back"
- "they can’t face the paperwork"
- "only one more step"
- "it’s a no-brainer but nobody does it."

### Distinction from siblings

- Use `/mkpsi-orchestrator` when multiple MKPSI mechanisms may apply or routing is unclear.
- Use `/mkpsi-output-verifier` after this skill produces an artifact or plan.
- Use `/mkpsi-manipulation-ethics-gate` first for hidden influence, vulnerable users, shame/fear/status exploitation, defaults, scarcity, authority, or sensitive data.
- Sibling confusion risks: - Not `mkpsi-flip-default-to-beneficial-opt-out`: no preselection required.
- Not `mkpsi-add-good-friction`: this removes friction for desired behavior.

---

## E — Execution steps

1. **Apply the source method: - **Recognize:** A valuable action has subsidies, education, or stated intent, yet uptake remains low. - **Intervene:** Map the last-mile hassle; remove, absorb, pre-fill, automate, or bundle the most aversive step. - **Assess:** Compare friction removal against discount/incentive arms; measure completed behavior, not stated interest.**
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

- **Selected mechanism:** `mkpsi-remove-hassle-before-adding-incentives` — Diagnose and remove last-mile friction before increasing incentives.
- **Trigger fit:** why this skill applies and which sibling skills were intentionally not used.
- **Evidence level:** field/lab/case/memoir/historical/hypothesis/unsupported.
- **Concrete artifact:** copy, UX change, research protocol, decision checklist, experiment, or plan.
- **Ethical boundary:** what must not be faked, hidden, pressured, inferred, or overclaimed.
- **Test plan:** baseline, primary metric, guardrail metric, sample/duration, stop/decision rule.

---

## B — Boundary

### Do not use this skill when

- Do not remove comprehension or consent steps that protect people. Do not make entry easy while making cancellation hard.
- The user only wants a book summary or author biography.
- The artifact affects high-risk contexts — minors, addiction, debt/financial hardship, health/legal/financial decisions, crisis/mental health, political persuasion, employment/housing/credit eligibility, or consent/privacy flows — unless the intervention clearly advances user welfare and preserves informed choice.
- The mechanism would require fake evidence, fake norms, fake scarcity, invented motives, invented founder stories, hidden fees, hidden defaults, or non-consensual sensitive inference.

### Source-specific misuse risks

- Not `mkpsi-flip-default-to-beneficial-opt-out`: no preselection required.
- Not `mkpsi-add-good-friction`: this removes friction for desired behavior.

### Author/source blind spots

- Effects vary by audience, culture, channel, and stakes.
- Some source examples are case-based, historical, memoir-derived, or lab-derived; grade evidence before rollout.
- Modern privacy, dark-pattern, AI-personalization, and platform risks can make old persuasion tactics more harmful.

---

## Related skills

- depends-on: `/mkpsi-orchestrator` when routing is unclear; `/mkpsi-manipulation-ethics-gate` for sensitive influence; `/mkpsi-output-verifier` for final QA
- contrasts-with: see sibling-confusion notes above
- composes-with: /mkpsi-orchestrator, /mkpsi-output-verifier, /mkpsi-manipulation-ethics-gate, /mkpsi-flip-default-to-beneficial-opt-out, /mkpsi-simplify-message-to-one-clear-action, /mkpsi-resequence-context-same-action

---

## Audit information

- **Validation passed:** V1 ✓ / V2 ✓ / V3 ✓ (P1.)
- **Test pass rate:** designed; see `test-prompts.json`
- **Distillation date:** 2026-07-21
