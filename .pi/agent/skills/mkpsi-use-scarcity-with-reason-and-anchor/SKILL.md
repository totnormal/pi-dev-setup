---
name: mkpsi-use-scarcity-with-reason-and-anchor
description: |
  Use when: Buyers delay because opportunity feels always available or quantity expectations are undef
  ined. Trigger phrases: limited time,, only X left,, while stocks last,, due to high demand,, purchas
  e limit,, last chance,. NOT for: Do not fake scarcity or use dark-pattern countdowns. Avoid pushing 
  overconsumption or inappropriate urgency in high-stakes products.
source_book: |
  MKPSI behavioral persuasion corpus — Sutherland, Halpern, Knight, Martin/Goldstein/Cialdini, Gladwel
  l, Shotton, Packard, Kahneman, Lancaster
source_chapter: |
  Bias 25: Scarcity; Bias 23: Variability.
tags: [mkpsi-v2, bias, p2]
related_skills: [mkpsi-orchestrator, mkpsi-output-verifier, mkpsi-manipulation-ethics-gate, mkpsi-short-deadline-anti-procrastination, mkpsi-social-proof-specific-similar-truth, mkpsi-anchor-resistance]
disable-model-invocation: true
---

# Use true scarcity plus a reason and quantity/time anchor.

## R — Reading

> “By doing so it applies two biases simultaneously: social proof and scarcity.”
>
> — Source: Bias 25: Scarcity; Bias 23: Variability.

**Source mechanism:** - **Recognize:** Buyers delay because the opportunity feels always available or quantity expectations are undefined.
- **Intervene:** State limited time/quantity, give the reason for scarcity, and set a high but plausible purchase/usage anchor where appropriate.
- **Assess:** Track urgency-driven conversion, units per transaction, stockouts, complaints, and post-purchase regret.

**Evidence type:** source-specific candidate extraction; evidence grade must still be checked before rollout.

---

## I — Methodology skeleton (Interpretation)

- **Recognize:** Buyers delay because the opportunity feels always available or quantity expectations are undefined.
- **Intervene:** State limited time/quantity, give the reason for scarcity, and set a high but plausible purchase/usage anchor where appropriate.
- **Assess:** Track urgency-driven conversion, units per transaction, stockouts, complaints, and post-purchase regret.

Operationally, this means:

1. Identify the exact behavior, judgment, message, or design choice at stake.
2. Confirm the trigger matches this atomic mechanism rather than a broader MKPSI sibling.
3. Apply the source method as a concrete checklist, copy/design move, research protocol, or decision procedure.
4. State evidence level and avoid overclaiming from cases, lab studies, memoir, or historical examples.
5. Ship only with an ethical boundary and a test/verification plan.

---

## A1 — Application in the source

### Case 1: Worchel’s scarce-cookie jar made cookies more likeable and attractive; participa
- **Problem:** Worchel’s scarce-cookie jar made cookies more likeable and attractive; participants were prepared to pay 11% more.
- **Mechanism:** The source example shows the named mechanism changing perception, judgment, motivation, or behavior in a specific context.
- **Result/evidence:** Use as source evidence, not universal proof; preserve the conditions that made the example work.
- **Transfer rule:** Apply only when the user's context matches the mechanism and can be tested with guardrails.

### Case 2: Wansink’s Campbell’s soup cap increased average purchase from 3.3 cans unlimited
- **Problem:** Wansink’s Campbell’s soup cap increased average purchase from 3.3 cans unlimited to 5.3 with a limit; a 12-can limit produced 7 cans on average.
- **Mechanism:** The second source example gives a cross-check against turning one anecdote into a rule.
- **Result/evidence:** Treat as corroborating evidence or boundary evidence depending on the example.
- **Transfer rule:** If this case conflicts with the user's context, route to `/mkpsi-orchestrator` or `/mkpsi-output-verifier`.

---

## A2 — Future Trigger

### User needs this skill when

1. Buyers delay because opportunity feels always available or quantity expectations are undefined.
2. The user needs an executable artifact, intervention, research protocol, or decision check — not a book summary.
3. The user can provide enough context to define audience, behavior, evidence, and constraints.

### Language signals

- "limited time,"
- "only X left,"
- "while stocks last,"
- "due to high demand,"
- "purchase limit,"
- "last chance,"
- "don’t miss out,"
- "anchor."

### Distinction from siblings

- Use `/mkpsi-orchestrator` when multiple MKPSI mechanisms may apply or routing is unclear.
- Use `/mkpsi-output-verifier` after this skill produces an artifact or plan.
- Use `/mkpsi-manipulation-ethics-gate` first for hidden influence, vulnerable users, shame/fear/status exploitation, defaults, scarcity, authority, or sensitive data.
- Sibling confusion risks: - Social proof says many people want it; scarcity says supply/access is limited. Best use may combine them with a true reason.
- Loss aversion is adjacent when copy stresses missing out; scarcity must be materially credible.

---

## E — Execution steps

1. **Apply the source method: - **Recognize:** Buyers delay because the opportunity feels always available or quantity expectations are undefined. - **Intervene:** State limited time/quantity, give the reason for scarcity, and set a high but plausible purchase/usage anchor where appropriate. - **Assess:** Track urgency-driven conversion, units per transaction, stockouts, complaints, and post-purchase regret.**
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

- **Selected mechanism:** `mkpsi-use-scarcity-with-reason-and-anchor` — Use true scarcity plus a reason and quantity/time anchor.
- **Trigger fit:** why this skill applies and which sibling skills were intentionally not used.
- **Evidence level:** field/lab/case/memoir/historical/hypothesis/unsupported.
- **Concrete artifact:** copy, UX change, research protocol, decision checklist, experiment, or plan.
- **Ethical boundary:** what must not be faked, hidden, pressured, inferred, or overclaimed.
- **Test plan:** baseline, primary metric, guardrail metric, sample/duration, stop/decision rule.

---

## B — Boundary

### Do not use this skill when

- Do not fake scarcity or use dark-pattern countdowns. Avoid pushing overconsumption or inappropriate urgency in high-stakes products.
- The user only wants a book summary or author biography.
- The artifact affects high-risk contexts — minors, addiction, debt/financial hardship, health/legal/financial decisions, crisis/mental health, political persuasion, employment/housing/credit eligibility, or consent/privacy flows — unless the intervention clearly advances user welfare and preserves informed choice.
- The mechanism would require fake evidence, fake norms, fake scarcity, invented motives, invented founder stories, hidden fees, hidden defaults, or non-consensual sensitive inference.

### Source-specific misuse risks

- Social proof says many people want it; scarcity says supply/access is limited. Best use may combine them with a true reason.
- Loss aversion is adjacent when copy stresses missing out; scarcity must be materially credible.

### Author/source blind spots

- Effects vary by audience, culture, channel, and stakes.
- Some source examples are case-based, historical, memoir-derived, or lab-derived; grade evidence before rollout.
- Modern privacy, dark-pattern, AI-personalization, and platform risks can make old persuasion tactics more harmful.

---

## Related skills

- depends-on: `/mkpsi-orchestrator` when routing is unclear; `/mkpsi-manipulation-ethics-gate` for sensitive influence; `/mkpsi-output-verifier` for final QA
- contrasts-with: see sibling-confusion notes above
- composes-with: /mkpsi-orchestrator, /mkpsi-output-verifier, /mkpsi-manipulation-ethics-gate, /mkpsi-short-deadline-anti-procrastination, /mkpsi-social-proof-specific-similar-truth, /mkpsi-anchor-resistance

---

## Audit information

- **Validation passed:** V1 ✓ / V2 ✓ / V3 ✓ (P2.)
- **Test pass rate:** designed; see `test-prompts.json`
- **Distillation date:** 2026-07-21
