---
name: mkpsi-depth-interview-motive-trace
description: |
  Use when: Stated wants conflict with observed purchase, adoption, churn, or resistance. Trigger phra
  ses: customers say they want,, survey says,, why don’t people buy,, what do users really want,, stat
  ed preference doesn’t match behavior.. NOT for: Use informed consent where possible; do not patholog
  ize customers; do not infer clinical diagnoses; never use intimate vulnerabilities without a benefit
   and ethics review.
source_book: |
  MKPSI behavioral persuasion corpus — Sutherland, Halpern, Knight, Martin/Goldstein/Cialdini, Gladwel
  l, Shotton, Packard, Kahneman, Lancaster
source_chapter: |
  Ch. 2 “The Trouble with People”; Ch. 3 “So Ad Men Become Depth Men”; Ch. 4 “. . . And the Hooks Are 
  Lowered”
tags: [mkpsi-v2, research, p1]
related_skills: [mkpsi-orchestrator, mkpsi-output-verifier, mkpsi-manipulation-ethics-gate, mkpsi-observe-do-not-ask, mkpsi-find-real-why, mkpsi-mr-validity-ladder]
disable-model-invocation: true
---

# Use depth interviews to trace motives beneath stated preferences.

## R — Reading

> “The trouble with this approach, they found, was that what people might tell interviewers had only a remote bearing on how the people would actually behave in a buying situation.”
>
> — Source: Ch. 2 “The Trouble with People”; Ch. 3 “So Ad Men Become Depth Men”; Ch. 4 “. . . And the Hooks Are Lowered”

**Source mechanism:** - **Recognize:** User-reported wants conflict with observed behavior, sales data, or adoption patterns.
- **Interpret:** Treat the stated answer as a social-performance artifact, not the motive itself.
- **Act:** Run patient, non-leading depth interviews about situations, memories, emotions, and substitutions; extract motive hypotheses only after repeated patterns appear.

**Evidence type:** source-specific candidate extraction; evidence grade must still be checked before rollout.

---

## I — Methodology skeleton (Interpretation)

- **Recognize:** User-reported wants conflict with observed behavior, sales data, or adoption patterns.
- **Interpret:** Treat the stated answer as a social-performance artifact, not the motive itself.
- **Act:** Run patient, non-leading depth interviews about situations, memories, emotions, and substitutions; extract motive hypotheses only after repeated patterns appear.

Operationally, this means:

1. Identify the exact behavior, judgment, message, or design choice at stake.
2. Confirm the trigger matches this atomic mechanism rather than a broader MKPSI sibling.
3. Apply the source method as a concrete checklist, copy/design move, research protocol, or decision procedure.
4. State evidence level and avoid overclaiming from cases, lab studies, memoir, or historical examples.
5. Ship only with an ethical boundary and a test/verification plan.

---

## A1 — Application in the source

### Case 1: Ketchup users said they preferred a new bottle in survey, then rejected it in te
- **Problem:** Ketchup users said they preferred a new bottle in survey, then rejected it in test markets.
- **Mechanism:** The source example shows the named mechanism changing perception, judgment, motivation, or behavior in a specific context.
- **Result/evidence:** Use as source evidence, not universal proof; preserve the conditions that made the example work.
- **Transfer rule:** Apply only when the user's context matches the mechanism and can be tested with guardrails.

### Case 2: Kipper rejecters said they disliked the taste, but 40% had never tasted kippers.
- **Problem:** Kipper rejecters said they disliked the taste, but 40% had never tasted kippers.
- **Mechanism:** The second source example gives a cross-check against turning one anecdote into a rule.
- **Result/evidence:** Treat as corroborating evidence or boundary evidence depending on the example.
- **Transfer rule:** If this case conflicts with the user's context, route to `/mkpsi-orchestrator` or `/mkpsi-output-verifier`.

---

## A2 — Future Trigger

### User needs this skill when

1. Stated wants conflict with observed purchase, adoption, churn, or resistance.
2. The user needs an executable artifact, intervention, research protocol, or decision check — not a book summary.
3. The user can provide enough context to define audience, behavior, evidence, and constraints.

### Language signals

- "customers say they want,"
- "survey says,"
- "why don’t people buy,"
- "what do users really want,"
- "stated preference doesn’t match behavior."

### Distinction from siblings

- Use `/mkpsi-orchestrator` when multiple MKPSI mechanisms may apply or routing is unclear.
- Use `/mkpsi-output-verifier` after this skill produces an artifact or plan.
- Use `/mkpsi-manipulation-ethics-gate` first for hidden influence, vulnerable users, shame/fear/status exploitation, defaults, scarcity, authority, or sensitive data.
- Sibling confusion risks: - Not the same as generic customer interviews; it specifically probes hidden motive gaps.
- Not the same as quantitative validation; it produces hypotheses requiring confirmation.
- Not the same as deception-based manipulation; use with consent and protective framing.

---

## E — Execution steps

1. **Apply the source method: - **Recognize:** User-reported wants conflict with observed behavior, sales data, or adoption patterns. - **Interpret:** Treat the stated answer as a social-performance artifact, not the motive itself. - **Act:** Run patient, non-leading depth interviews about situations, memories, emotions, and substitutions; extract motive hypotheses only after repeated patterns appear.**
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

- **Selected mechanism:** `mkpsi-depth-interview-motive-trace` — Use depth interviews to trace motives beneath stated preferences.
- **Trigger fit:** why this skill applies and which sibling skills were intentionally not used.
- **Evidence level:** field/lab/case/memoir/historical/hypothesis/unsupported.
- **Concrete artifact:** copy, UX change, research protocol, decision checklist, experiment, or plan.
- **Ethical boundary:** what must not be faked, hidden, pressured, inferred, or overclaimed.
- **Test plan:** baseline, primary metric, guardrail metric, sample/duration, stop/decision rule.

---

## B — Boundary

### Do not use this skill when

- Use informed consent where possible; do not pathologize customers; do not infer clinical diagnoses; never use intimate vulnerabilities without a benefit and ethics review.
- The user only wants a book summary or author biography.
- The artifact affects high-risk contexts — minors, addiction, debt/financial hardship, health/legal/financial decisions, crisis/mental health, political persuasion, employment/housing/credit eligibility, or consent/privacy flows — unless the intervention clearly advances user welfare and preserves informed choice.
- The mechanism would require fake evidence, fake norms, fake scarcity, invented motives, invented founder stories, hidden fees, hidden defaults, or non-consensual sensitive inference.

### Source-specific misuse risks

- Not the same as generic customer interviews; it specifically probes hidden motive gaps.
- Not the same as quantitative validation; it produces hypotheses requiring confirmation.
- Not the same as deception-based manipulation; use with consent and protective framing.

### Author/source blind spots

- Effects vary by audience, culture, channel, and stakes.
- Some source examples are case-based, historical, memoir-derived, or lab-derived; grade evidence before rollout.
- Modern privacy, dark-pattern, AI-personalization, and platform risks can make old persuasion tactics more harmful.

---

## Related skills

- depends-on: `/mkpsi-orchestrator` when routing is unclear; `/mkpsi-manipulation-ethics-gate` for sensitive influence; `/mkpsi-output-verifier` for final QA
- contrasts-with: see sibling-confusion notes above
- composes-with: /mkpsi-orchestrator, /mkpsi-output-verifier, /mkpsi-manipulation-ethics-gate, /mkpsi-observe-do-not-ask, /mkpsi-find-real-why, /mkpsi-mr-validity-ladder

---

## Audit information

- **Validation passed:** V1 ✓ / V2 ✓ / V3 ✓ (P1.)
- **Test pass rate:** designed; see `test-prompts.json`
- **Distillation date:** 2026-07-21
