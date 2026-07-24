---
name: mkpsi-short-deadline-anti-procrastination
description: |
  Use when: People like the offer but defer because flexibility lowers urgency. Trigger phrases: last 
  day to register, expires Friday, review us today, just got back, RSVP by [near date].. NOT for: Dead
  lines must be honest and reasonable. Avoid pressuring complex, irreversible, or high-risk decisions.
source_book: |
  MKPSI behavioral persuasion corpus — Sutherland, Halpern, Knight, Martin/Goldstein/Cialdini, Gladwel
  l, Shotton, Packard, Kahneman, Lancaster
source_chapter: |
  Chapter 18, “reduce procrastination”; Chapter 49, “timing online reviews.”
tags: [mkpsi-v2, choice, p2]
related_skills: [mkpsi-orchestrator, mkpsi-output-verifier, mkpsi-manipulation-ethics-gate, mkpsi-use-scarcity-with-reason-and-anchor, mkpsi-active-commitment-and-plan, mkpsi-timely-precommitment-before-temptation]
disable-model-invocation: true
---

# Use shorter explicit deadlines to convert “later” into action.

## R — Reading

> “Instead of offering a longer time frame in order for your target audience to respond, in the mistaken belief that doing so will make it more attractive, this research suggests that a much shorter time frame should be offered.”
>
> — Source: Chapter 18, “reduce procrastination”; Chapter 49, “timing online reviews.”

**Source mechanism:** - **Recognize:** People like the offer but defer because flexibility reduces urgency.
- **Intervene:** Set a near, clear expiration or RSVP deadline; use same-day asks when freshness matters.
- **Assess:** Measure redemption/sign-up/review completion, not stated preference.

**Evidence type:** source-specific candidate extraction; evidence grade must still be checked before rollout.

---

## I — Methodology skeleton (Interpretation)

- **Recognize:** People like the offer but defer because flexibility reduces urgency.
- **Intervene:** Set a near, clear expiration or RSVP deadline; use same-day asks when freshness matters.
- **Assess:** Measure redemption/sign-up/review completion, not stated preference.

Operationally, this means:

1. Identify the exact behavior, judgment, message, or design choice at stake.
2. Confirm the trigger matches this atomic mechanism rather than a broader MKPSI sibling.
3. Apply the source method as a concrete checklist, copy/design move, research protocol, or decision procedure.
4. State evidence level and avoid overclaiming from cases, lab studies, memoir, or historical examples.
5. Ship only with an ethical boundary and a test/verification plan.

---

## A1 — Application in the source

### Case 1: **Recognize
- **Problem:** **Recognize:** People like the offer but defer because flexibility reduces urgency.
- **Mechanism:** The source example shows the named mechanism changing perception, judgment, motivation, or behavior in a specific context.
- **Result/evidence:** Use as source evidence, not universal proof; preserve the conditions that made the example work.
- **Transfer rule:** Apply only when the user's context matches the mechanism and can be tested with guardrails.

### Case 2: **Intervene
- **Problem:** **Intervene:** Set a near, clear expiration or RSVP deadline; use same-day asks when freshness matters.
- **Mechanism:** The second source example gives a cross-check against turning one anecdote into a rule.
- **Result/evidence:** Treat as corroborating evidence or boundary evidence depending on the example.
- **Transfer rule:** If this case conflicts with the user's context, route to `/mkpsi-orchestrator` or `/mkpsi-output-verifier`.

---

## A2 — Future Trigger

### User needs this skill when

1. People like the offer but defer because flexibility lowers urgency.
2. The user needs an executable artifact, intervention, research protocol, or decision check — not a book summary.
3. The user can provide enough context to define audience, behavior, evidence, and constraints.

### Language signals

- "last day to register"
- "expires Friday"
- "review us today"
- "just got back"
- "RSVP by [near date]."

### Distinction from siblings

- Use `/mkpsi-orchestrator` when multiple MKPSI mechanisms may apply or routing is unclear.
- Use `/mkpsi-output-verifier` after this skill produces an artifact or plan.
- Use `/mkpsi-manipulation-ethics-gate` first for hidden influence, vulnerable users, shame/fear/status exploitation, defaults, scarcity, authority, or sensitive data.
- Sibling confusion risks: - Not scarcity if the deadline is arbitrary or deceptive; this is anti-procrastination timing.
- Not future lock-in, which intentionally delays implementation.

---

## E — Execution steps

1. **Apply the source method: - **Recognize:** People like the offer but defer because flexibility reduces urgency. - **Intervene:** Set a near, clear expiration or RSVP deadline; use same-day asks when freshness matters. - **Assess:** Measure redemption/sign-up/review completion, not stated preference.**
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

- **Selected mechanism:** `mkpsi-short-deadline-anti-procrastination` — Use shorter explicit deadlines to convert “later” into action.
- **Trigger fit:** why this skill applies and which sibling skills were intentionally not used.
- **Evidence level:** field/lab/case/memoir/historical/hypothesis/unsupported.
- **Concrete artifact:** copy, UX change, research protocol, decision checklist, experiment, or plan.
- **Ethical boundary:** what must not be faked, hidden, pressured, inferred, or overclaimed.
- **Test plan:** baseline, primary metric, guardrail metric, sample/duration, stop/decision rule.

---

## B — Boundary

### Do not use this skill when

- Deadlines must be honest and reasonable. Avoid pressuring complex, irreversible, or high-risk decisions.
- The user only wants a book summary or author biography.
- The artifact affects high-risk contexts — minors, addiction, debt/financial hardship, health/legal/financial decisions, crisis/mental health, political persuasion, employment/housing/credit eligibility, or consent/privacy flows — unless the intervention clearly advances user welfare and preserves informed choice.
- The mechanism would require fake evidence, fake norms, fake scarcity, invented motives, invented founder stories, hidden fees, hidden defaults, or non-consensual sensitive inference.

### Source-specific misuse risks

- Not scarcity if the deadline is arbitrary or deceptive; this is anti-procrastination timing.
- Not future lock-in, which intentionally delays implementation.

### Author/source blind spots

- Effects vary by audience, culture, channel, and stakes.
- Some source examples are case-based, historical, memoir-derived, or lab-derived; grade evidence before rollout.
- Modern privacy, dark-pattern, AI-personalization, and platform risks can make old persuasion tactics more harmful.

---

## Related skills

- depends-on: `/mkpsi-orchestrator` when routing is unclear; `/mkpsi-manipulation-ethics-gate` for sensitive influence; `/mkpsi-output-verifier` for final QA
- contrasts-with: see sibling-confusion notes above
- composes-with: /mkpsi-orchestrator, /mkpsi-output-verifier, /mkpsi-manipulation-ethics-gate, /mkpsi-use-scarcity-with-reason-and-anchor, /mkpsi-active-commitment-and-plan, /mkpsi-timely-precommitment-before-temptation

---

## Audit information

- **Validation passed:** V1 ✓ / V2 ✓ / V3 ✓ (P2.)
- **Test pass rate:** designed; see `test-prompts.json`
- **Distillation date:** 2026-07-21
