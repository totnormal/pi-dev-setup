---
name: mkpsi-haystack-search-sweet-spot
description: |
  Use when: “Check everyone,” “better safe than sorry,” rare bad actors justify broad intrusive screen
  ing. Trigger phrases: Check everyone, go beyond the ticket, better safe than sorry, one bad apple ju
  stifies it, we stop for violations.. NOT for: Do not use protected-class proxies. Require legal, eth
  ical, and proportionality review where liberty, employment, access, or safety is affected.
source_book: |
  MKPSI behavioral persuasion corpus — Sutherland, Halpern, Knight, Martin/Goldstein/Cialdini, Gladwel
  l, Shotton, Packard, Kahneman, Lancaster
source_chapter: |
  Chapter Eleven, “Case Study: The Kansas City Experiments”; Chapter Twelve, Sandra Bland.
tags: [mkpsi-v2, bias, p1]
related_skills: [mkpsi-orchestrator, mkpsi-output-verifier, mkpsi-manipulation-ethics-gate, mkpsi-bayesian-base-rate-discipline, mkpsi-coupling-context-map]
disable-model-invocation: true
---

# Restrict aggressive checks to evidence-dense contexts.

## R — Reading

> “You wouldn’t tell doctors to go out and start cutting people up to see if they’ve got bad gallbladders… You need to do lots of diagnosis first before you do any kind of dangerous procedure. And stop-and-search is a dangerous procedure.”
>
> — Source: Chapter Eleven, “Case Study: The Kansas City Experiments”; Chapter Twelve, Sandra Bland.

**Source mechanism:** - **Recognize:** A team searches many ordinary people to find rare bad actors: fraud, abuse, weapons, policy violations, churn, spam.
- **Interpret:** Needle-in-haystack searches defeat default-to-truth and create high false-positive harm unless tightly coupled to hot spots.
- **Act:** Define base rate, hot spots, time windows, harm budget, escalation criteria, and stop rules before expanding checks.

**Evidence type:** source-specific candidate extraction; evidence grade must still be checked before rollout.

---

## I — Methodology skeleton (Interpretation)

- **Recognize:** A team searches many ordinary people to find rare bad actors: fraud, abuse, weapons, policy violations, churn, spam.
- **Interpret:** Needle-in-haystack searches defeat default-to-truth and create high false-positive harm unless tightly coupled to hot spots.
- **Act:** Define base rate, hot spots, time windows, harm budget, escalation criteria, and stop rules before expanding checks.

Operationally, this means:

1. Identify the exact behavior, judgment, message, or design choice at stake.
2. Confirm the trigger matches this atomic mechanism rather than a broader MKPSI sibling.
3. Apply the source method as a concrete checklist, copy/design move, research protocol, or decision procedure.
4. State evidence level and avoid overclaiming from cases, lab studies, memoir, or historical examples.
5. Ship only with an ethical boundary and a test/verification plan.

---

## A1 — Application in the source

### Case 1: Kansas City gun patrols worked because they focused on the worst parts of the wo
- **Problem:** Kansas City gun patrols worked because they focused on the worst parts of the worst neighborhoods at relevant times.
- **Mechanism:** The source example shows the named mechanism changing perception, judgment, motivation, or behavior in a specific context.
- **Result/evidence:** Use as source evidence, not universal proof; preserve the conditions that made the example work.
- **Transfer rule:** Apply only when the user's context matches the mechanism and can be tested with guardrails.

### Case 2: North Carolina’s extra 400,000 traffic stops found only 17 additional guns/drugs
- **Problem:** North Carolina’s extra 400,000 traffic stops found only 17 additional guns/drugs while stigmatizing masses of innocent drivers.
- **Mechanism:** The second source example gives a cross-check against turning one anecdote into a rule.
- **Result/evidence:** Treat as corroborating evidence or boundary evidence depending on the example.
- **Transfer rule:** If this case conflicts with the user's context, route to `/mkpsi-orchestrator` or `/mkpsi-output-verifier`.

---

## A2 — Future Trigger

### User needs this skill when

1. “Check everyone,” “better safe than sorry,” rare bad actors justify broad intrusive screening.
2. The user needs an executable artifact, intervention, research protocol, or decision check — not a book summary.
3. The user can provide enough context to define audience, behavior, evidence, and constraints.

### Language signals

- "Check everyone"
- "go beyond the ticket"
- "better safe than sorry"
- "one bad apple justifies it"
- "we stop for violations."

### Distinction from siblings

- Use `/mkpsi-orchestrator` when multiple MKPSI mechanisms may apply or routing is unclear.
- Use `/mkpsi-output-verifier` after this skill produces an artifact or plan.
- Use `/mkpsi-manipulation-ethics-gate` first for hidden influence, vulnerable users, shame/fear/status exploitation, defaults, scarcity, authority, or sensitive data.
- Sibling confusion risks: - Not `mkpsi-risk-zeroing`: the goal is calibrated intrusion, not maximum enforcement.
- Not `mkpsi-bias-audit-only`: coupling/base-rate analysis complements fairness review.

---

## E — Execution steps

1. **Apply the source method: - **Recognize:** A team searches many ordinary people to find rare bad actors: fraud, abuse, weapons, policy violations, churn, spam. - **Interpret:** Needle-in-haystack searches defeat default-to-truth and create high false-positive harm unless tightly coupled to hot spots. - **Act:** Define base rate, hot spots, time windows, harm budget, escalation criteria, and stop rules before expanding checks.**
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

- **Selected mechanism:** `mkpsi-haystack-search-sweet-spot` — Restrict aggressive checks to evidence-dense contexts.
- **Trigger fit:** why this skill applies and which sibling skills were intentionally not used.
- **Evidence level:** field/lab/case/memoir/historical/hypothesis/unsupported.
- **Concrete artifact:** copy, UX change, research protocol, decision checklist, experiment, or plan.
- **Ethical boundary:** what must not be faked, hidden, pressured, inferred, or overclaimed.
- **Test plan:** baseline, primary metric, guardrail metric, sample/duration, stop/decision rule.

---

## B — Boundary

### Do not use this skill when

- Do not use protected-class proxies. Require legal, ethical, and proportionality review where liberty, employment, access, or safety is affected.
- The user only wants a book summary or author biography.
- The artifact affects high-risk contexts — minors, addiction, debt/financial hardship, health/legal/financial decisions, crisis/mental health, political persuasion, employment/housing/credit eligibility, or consent/privacy flows — unless the intervention clearly advances user welfare and preserves informed choice.
- The mechanism would require fake evidence, fake norms, fake scarcity, invented motives, invented founder stories, hidden fees, hidden defaults, or non-consensual sensitive inference.

### Source-specific misuse risks

- Not `mkpsi-risk-zeroing`: the goal is calibrated intrusion, not maximum enforcement.
- Not `mkpsi-bias-audit-only`: coupling/base-rate analysis complements fairness review.

### Author/source blind spots

- Effects vary by audience, culture, channel, and stakes.
- Some source examples are case-based, historical, memoir-derived, or lab-derived; grade evidence before rollout.
- Modern privacy, dark-pattern, AI-personalization, and platform risks can make old persuasion tactics more harmful.

---

## Related skills

- depends-on: `/mkpsi-orchestrator` when routing is unclear; `/mkpsi-manipulation-ethics-gate` for sensitive influence; `/mkpsi-output-verifier` for final QA
- contrasts-with: see sibling-confusion notes above
- composes-with: /mkpsi-orchestrator, /mkpsi-output-verifier, /mkpsi-manipulation-ethics-gate, /mkpsi-bayesian-base-rate-discipline, /mkpsi-coupling-context-map

---

## Audit information

- **Validation passed:** V1 ✓ / V2 ✓ / V3 ✓ (P1.)
- **Test pass rate:** designed; see `test-prompts.json`
- **Distillation date:** 2026-07-21
