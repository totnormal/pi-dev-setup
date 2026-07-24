---
name: mkpsi-avoid-negative-social-proof
description: |
  Use when: Copy emphasizes “too many people fail/cheat/no-show/steal/abandon.” Trigger phrases: milli
  ons fail to, too many people, everyone is doing it, show the scale of the problem, only 25% have wom
  en on boards.. NOT for: Do not suppress material risk, fraud, or safety data. If transparency requir
  es bad-prevalence figures, pair them with clear disapproval, consequences, and desired action.
source_book: |
  MKPSI behavioral persuasion corpus — Sutherland, Halpern, Knight, Martin/Goldstein/Cialdini, Gladwel
  l, Shotton, Packard, Kahneman, Lancaster
source_chapter: |
  Chapter 5, “Avoiding the ‘big mistake’”; Cialdini petrified wood; policy-campaign examples.
tags: [mkpsi-v2, general, p1]
related_skills: [mkpsi-orchestrator, mkpsi-output-verifier, mkpsi-manipulation-ethics-gate, mkpsi-social-proof-specific-similar-truth]
disable-model-invocation: true
---

# Avoid making bad behavior look normal.

## R — Reading

> “Too often, in their haste to impress upon colleagues or the public the gravity of a particular issue, policymakers would inadvertently reinforce the very behaviour they were trying to discourage.”
>
> — Source: Chapter 5, “Avoiding the ‘big mistake’”; Cialdini petrified wood; policy-campaign examples.

**Source mechanism:** - **Recognize:** Copy emphasizes how many people offend, fail, miss, cheat, abandon, or do not comply.
- **Intervene:** Reframe toward the desirable majority, exceptional status of violation, approval norm, or positive momentum.
- **Assess:** Pretest perceived norm; then measure target behavior and copy interpretation.

**Evidence type:** source-specific candidate extraction; evidence grade must still be checked before rollout.

---

## I — Methodology skeleton (Interpretation)

- **Recognize:** Copy emphasizes how many people offend, fail, miss, cheat, abandon, or do not comply.
- **Intervene:** Reframe toward the desirable majority, exceptional status of violation, approval norm, or positive momentum.
- **Assess:** Pretest perceived norm; then measure target behavior and copy interpretation.

Operationally, this means:

1. Identify the exact behavior, judgment, message, or design choice at stake.
2. Confirm the trigger matches this atomic mechanism rather than a broader MKPSI sibling.
3. Apply the source method as a concrete checklist, copy/design move, research protocol, or decision procedure.
4. State evidence level and avoid overclaiming from cases, lab studies, memoir, or historical examples.
5. Ship only with an ethical boundary and a test/verification plan.

---

## A1 — Application in the source

### Case 1: 1. Cialdini’s petrified-wood signs saying many past visitors removed wood made v
- **Problem:** 1. Cialdini’s petrified-wood signs saying many past visitors removed wood made visitors more than four times likelier to take fossils.
- **Mechanism:** The source example shows the named mechanism changing perception, judgment, motivation, or behavior in a specific context.
- **Result/evidence:** Use as source evidence, not universal proof; preserve the conditions that made the example work.
- **Transfer rule:** Apply only when the user's context matches the mechanism and can be tested with guardrails.

### Case 2: 2. Halpern warns that missed-appointment signs in doctors’ surgeries can imply “
- **Problem:** 2. Halpern warns that missed-appointment signs in doctors’ surgeries can imply “so I’m not the only one,” normalizing no-shows.
- **Mechanism:** The second source example gives a cross-check against turning one anecdote into a rule.
- **Result/evidence:** Treat as corroborating evidence or boundary evidence depending on the example.
- **Transfer rule:** If this case conflicts with the user's context, route to `/mkpsi-orchestrator` or `/mkpsi-output-verifier`.

---

## A2 — Future Trigger

### User needs this skill when

1. Copy emphasizes “too many people fail/cheat/no-show/steal/abandon.”
2. The user needs an executable artifact, intervention, research protocol, or decision check — not a book summary.
3. The user can provide enough context to define audience, behavior, evidence, and constraints.

### Language signals

- "millions fail to"
- "too many people"
- "everyone is doing it"
- "show the scale of the problem"
- "only 25% have women on boards."

### Distinction from siblings

- Use `/mkpsi-orchestrator` when multiple MKPSI mechanisms may apply or routing is unclear.
- Use `/mkpsi-output-verifier` after this skill produces an artifact or plan.
- Use `/mkpsi-manipulation-ethics-gate` first for hidden influence, vulnerable users, shame/fear/status exploitation, defaults, scarcity, authority, or sensitive data.
- Sibling confusion risks: - Opposite side of `mkpsi-social-proof-specific-similar-truth`.
- Not mere positive spin: it requires evidence-based reframing without hiding the problem.

---

## E — Execution steps

1. **Apply the source method: - **Recognize:** Copy emphasizes how many people offend, fail, miss, cheat, abandon, or do not comply. - **Intervene:** Reframe toward the desirable majority, exceptional status of violation, approval norm, or positive momentum. - **Assess:** Pretest perceived norm; then measure target behavior and copy interpretation.**
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

- **Selected mechanism:** `mkpsi-avoid-negative-social-proof` — Avoid making bad behavior look normal.
- **Trigger fit:** why this skill applies and which sibling skills were intentionally not used.
- **Evidence level:** field/lab/case/memoir/historical/hypothesis/unsupported.
- **Concrete artifact:** copy, UX change, research protocol, decision checklist, experiment, or plan.
- **Ethical boundary:** what must not be faked, hidden, pressured, inferred, or overclaimed.
- **Test plan:** baseline, primary metric, guardrail metric, sample/duration, stop/decision rule.

---

## B — Boundary

### Do not use this skill when

- Do not suppress material risk, fraud, or safety data. If transparency requires bad-prevalence figures, pair them with clear disapproval, consequences, and desired action.
- The user only wants a book summary or author biography.
- The artifact affects high-risk contexts — minors, addiction, debt/financial hardship, health/legal/financial decisions, crisis/mental health, political persuasion, employment/housing/credit eligibility, or consent/privacy flows — unless the intervention clearly advances user welfare and preserves informed choice.
- The mechanism would require fake evidence, fake norms, fake scarcity, invented motives, invented founder stories, hidden fees, hidden defaults, or non-consensual sensitive inference.

### Source-specific misuse risks

- Opposite side of `mkpsi-social-proof-specific-similar-truth`.
- Not mere positive spin: it requires evidence-based reframing without hiding the problem.

### Author/source blind spots

- Effects vary by audience, culture, channel, and stakes.
- Some source examples are case-based, historical, memoir-derived, or lab-derived; grade evidence before rollout.
- Modern privacy, dark-pattern, AI-personalization, and platform risks can make old persuasion tactics more harmful.

---

## Related skills

- depends-on: `/mkpsi-orchestrator` when routing is unclear; `/mkpsi-manipulation-ethics-gate` for sensitive influence; `/mkpsi-output-verifier` for final QA
- contrasts-with: see sibling-confusion notes above
- composes-with: /mkpsi-orchestrator, /mkpsi-output-verifier, /mkpsi-manipulation-ethics-gate, /mkpsi-social-proof-specific-similar-truth

---

## Audit information

- **Validation passed:** V1 ✓ / V2 ✓ / V3 ✓ (P1.)
- **Test pass rate:** designed; see `test-prompts.json`
- **Distillation date:** 2026-07-21
