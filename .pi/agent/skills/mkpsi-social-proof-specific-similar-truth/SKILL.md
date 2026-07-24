---
name: mkpsi-social-proof-specific-similar-truth
description: |
  Use when: Audience is uncertain whether people like them do the desired behavior. Trigger phrases: p
  eople think nobody does it, most customers like you, in your area, peers have already, normalize the
   good behavior.. NOT for: Never fabricate or cherry-pick norms. If the good behavior is minority beh
  avior, use injunctive norms, aspiration, trend, or commitment instead.
source_book: |
  MKPSI behavioral persuasion corpus — Sutherland, Halpern, Knight, Martin/Goldstein/Cialdini, Gladwel
  l, Shotton, Packard, Kahneman, Lancaster
source_chapter: |
  Chapter 5, “Social”; “Social norms in policy”; HMRC tax letters; stair-use norm.
tags: [mkpsi-v2, bias, p1]
related_skills: [mkpsi-orchestrator, mkpsi-output-verifier, mkpsi-manipulation-ethics-gate, mkpsi-avoid-negative-social-proof, mkpsi-messenger-authority-fit]
disable-model-invocation: true
---

# State truthful local/similar peer norms at the decision point.

## R — Reading

> “Sure enough, adding the single (truthful) line that ‘nine out of ten taxpayers pay on time’ raised the payment rate by around 1.5 percentage points.”
>
> — Source: Chapter 5, “Social”; “Social norms in policy”; HMRC tax letters; stair-use norm.

**Source mechanism:** - **Recognize:** People are uncertain, procrastinating, or misestimating what peers do.
- **Intervene:** Present a true descriptive norm from the most relevant peer group: local area, similar debt, previous guests, classmates, colleagues.
- **Assess:** Measure behavior lift and verify norm remains true after scaling.

**Evidence type:** source-specific candidate extraction; evidence grade must still be checked before rollout.

---

## I — Methodology skeleton (Interpretation)

- **Recognize:** People are uncertain, procrastinating, or misestimating what peers do.
- **Intervene:** Present a true descriptive norm from the most relevant peer group: local area, similar debt, previous guests, classmates, colleagues.
- **Assess:** Measure behavior lift and verify norm remains true after scaling.

Operationally, this means:

1. Identify the exact behavior, judgment, message, or design choice at stake.
2. Confirm the trigger matches this atomic mechanism rather than a broader MKPSI sibling.
3. Apply the source method as a concrete checklist, copy/design move, research protocol, or decision procedure.
4. State evidence level and avoid overclaiming from cases, lab studies, memoir, or historical examples.
5. Ship only with an ethical boundary and a test/verification plan.

---

## A1 — Application in the source

### Case 1: 1. HMRC letters saying “nine out of ten taxpayers pay on time” increased payment
- **Problem:** 1. HMRC letters saying “nine out of ten taxpayers pay on time” increased payments; local-area and “debt like yours” norms worked even better.
- **Mechanism:** The source example shows the named mechanism changing perception, judgment, motivation, or behavior in a specific context.
- **Result/evidence:** Use as source evidence, not universal proof; preserve the conditions that made the example work.
- **Transfer rule:** Apply only when the user's context matches the mechanism and can be tested with guardrails.

### Case 2: 2. Signs saying “most people use the stairs” increased stair use by 46%, while e
- **Problem:** 2. Signs saying “most people use the stairs” increased stair use by 46%, while exercise-information signs did not.
- **Mechanism:** The second source example gives a cross-check against turning one anecdote into a rule.
- **Result/evidence:** Treat as corroborating evidence or boundary evidence depending on the example.
- **Transfer rule:** If this case conflicts with the user's context, route to `/mkpsi-orchestrator` or `/mkpsi-output-verifier`.

---

## A2 — Future Trigger

### User needs this skill when

1. Audience is uncertain whether people like them do the desired behavior.
2. The user needs an executable artifact, intervention, research protocol, or decision check — not a book summary.
3. The user can provide enough context to define audience, behavior, evidence, and constraints.

### Language signals

- "people think nobody does it"
- "most customers like you"
- "in your area"
- "peers have already"
- "normalize the good behavior."

### Distinction from siblings

- Use `/mkpsi-orchestrator` when multiple MKPSI mechanisms may apply or routing is unclear.
- Use `/mkpsi-output-verifier` after this skill produces an artifact or plan.
- Use `/mkpsi-manipulation-ethics-gate` first for hidden influence, vulnerable users, shame/fear/status exploitation, defaults, scarcity, authority, or sensitive data.
- Sibling confusion risks: - Confusable with `mkpsi-avoid-negative-social-proof`: only use when desirable behavior is common or growing.
- Not `mkpsi-messenger-authority-fit`: the persuasive element is others’ behavior, not who speaks.

---

## E — Execution steps

1. **Apply the source method: - **Recognize:** People are uncertain, procrastinating, or misestimating what peers do. - **Intervene:** Present a true descriptive norm from the most relevant peer group: local area, similar debt, previous guests, classmates, colleagues. - **Assess:** Measure behavior lift and verify norm remains true after scaling.**
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

- **Selected mechanism:** `mkpsi-social-proof-specific-similar-truth` — State truthful local/similar peer norms at the decision point.
- **Trigger fit:** why this skill applies and which sibling skills were intentionally not used.
- **Evidence level:** field/lab/case/memoir/historical/hypothesis/unsupported.
- **Concrete artifact:** copy, UX change, research protocol, decision checklist, experiment, or plan.
- **Ethical boundary:** what must not be faked, hidden, pressured, inferred, or overclaimed.
- **Test plan:** baseline, primary metric, guardrail metric, sample/duration, stop/decision rule.

---

## B — Boundary

### Do not use this skill when

- Never fabricate or cherry-pick norms. If the good behavior is minority behavior, use injunctive norms, aspiration, trend, or commitment instead.
- The user only wants a book summary or author biography.
- The artifact affects high-risk contexts — minors, addiction, debt/financial hardship, health/legal/financial decisions, crisis/mental health, political persuasion, employment/housing/credit eligibility, or consent/privacy flows — unless the intervention clearly advances user welfare and preserves informed choice.
- The mechanism would require fake evidence, fake norms, fake scarcity, invented motives, invented founder stories, hidden fees, hidden defaults, or non-consensual sensitive inference.

### Source-specific misuse risks

- Confusable with `mkpsi-avoid-negative-social-proof`: only use when desirable behavior is common or growing.
- Not `mkpsi-messenger-authority-fit`: the persuasive element is others’ behavior, not who speaks.

### Author/source blind spots

- Effects vary by audience, culture, channel, and stakes.
- Some source examples are case-based, historical, memoir-derived, or lab-derived; grade evidence before rollout.
- Modern privacy, dark-pattern, AI-personalization, and platform risks can make old persuasion tactics more harmful.

---

## Related skills

- depends-on: `/mkpsi-orchestrator` when routing is unclear; `/mkpsi-manipulation-ethics-gate` for sensitive influence; `/mkpsi-output-verifier` for final QA
- contrasts-with: see sibling-confusion notes above
- composes-with: /mkpsi-orchestrator, /mkpsi-output-verifier, /mkpsi-manipulation-ethics-gate, /mkpsi-avoid-negative-social-proof, /mkpsi-messenger-authority-fit

---

## Audit information

- **Validation passed:** V1 ✓ / V2 ✓ / V3 ✓ (P1.)
- **Test pass rate:** designed; see `test-prompts.json`
- **Distillation date:** 2026-07-21
