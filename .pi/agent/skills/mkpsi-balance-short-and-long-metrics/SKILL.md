---
name: mkpsi-balance-short-and-long-metrics
description: |
  Use when: Optimization chases clicks, immediate conversion, view count, response rate, quarterly num
  ber, or single KPI. Trigger phrases: optimize to clicks,, cost per sale,, views,, KPI,, target,, att
  ribution,. NOT for: Do not reject metrics wholesale. The skill requires better measurement, not intu
  ition-only decision-making.
source_book: |
  MKPSI behavioral persuasion corpus — Sutherland, Halpern, Knight, Martin/Goldstein/Cialdini, Gladwel
  l, Shotton, Packard, Kahneman, Lancaster
source_chapter: |
  Bias 17: Goodhart’s Law; Bias 22: The Replicability Crisis.
tags: [mkpsi-v2, governance, p0]
related_skills: [mkpsi-orchestrator, mkpsi-output-verifier, mkpsi-manipulation-ethics-gate, mkpsi-test-learn-adapt-rct]
disable-model-invocation: true
---

# Prevent Goodhart failures with balanced outcome metrics.

## R — Reading

> “When a measure becomes a target, it ceases to be a good measure.”
>
> — Source: Bias 17: Goodhart’s Law; Bias 22: The Replicability Crisis.

**Source mechanism:** - **Recognize:** Optimization chases cheap clicks, immediate sales, view counts, or quarterly targets while brand demand or profit quality erodes.
- **Intervene:** Pair short-term response metrics with long-term brand/equity tracking, control groups, and human judgment; audit for gaming/unintended consequences.
- **Assess:** Monitor saleability, exposed-vs-control brand lift, margin, retention, and downstream quality.

**Evidence type:** source-specific candidate extraction; evidence grade must still be checked before rollout.

---

## I — Methodology skeleton (Interpretation)

- **Recognize:** Optimization chases cheap clicks, immediate sales, view counts, or quarterly targets while brand demand or profit quality erodes.
- **Intervene:** Pair short-term response metrics with long-term brand/equity tracking, control groups, and human judgment; audit for gaming/unintended consequences.
- **Assess:** Monitor saleability, exposed-vs-control brand lift, margin, retention, and downstream quality.

Operationally, this means:

1. Identify the exact behavior, judgment, message, or design choice at stake.
2. Confirm the trigger matches this atomic mechanism rather than a broader MKPSI sibling.
3. Apply the source method as a concrete checklist, copy/design move, research protocol, or decision procedure.
4. State evidence level and avoid overclaiming from cases, lab studies, memoir, or historical examples.
5. Ship only with an ethical boundary and a test/verification plan.

---

## A1 — Application in the source

### Case 1: Hanoi’s rat-tail bounty produced thousands of tails and more tail-less rats, not
- **Problem:** Hanoi’s rat-tail bounty produced thousands of tails and more tail-less rats, not fewer rats.
- **Mechanism:** The source example shows the named mechanism changing perception, judgment, motivation, or behavior in a specific context.
- **Result/evidence:** Use as source evidence, not universal proof; preserve the conditions that made the example work.
- **Transfer rule:** Apply only when the user's context matches the mechanism and can be tested with guardrails.

### Case 2: Tesco almost delisted gluten-free due to low basket sales until interviews showe
- **Problem:** Tesco almost delisted gluten-free due to low basket sales until interviews showed the range determined store choice for gluten-free shoppers.
- **Mechanism:** The second source example gives a cross-check against turning one anecdote into a rule.
- **Result/evidence:** Treat as corroborating evidence or boundary evidence depending on the example.
- **Transfer rule:** If this case conflicts with the user's context, route to `/mkpsi-orchestrator` or `/mkpsi-output-verifier`.

---

## A2 — Future Trigger

### User needs this skill when

1. Optimization chases clicks, immediate conversion, view count, response rate, quarterly number, or single KPI.
2. The user needs an executable artifact, intervention, research protocol, or decision check — not a book summary.
3. The user can provide enough context to define audience, behavior, evidence, and constraints.

### Language signals

- "optimize to clicks,"
- "cost per sale,"
- "views,"
- "KPI,"
- "target,"
- "attribution,"
- "short term,"
- "dashboard says."

### Distinction from siblings

- Use `/mkpsi-orchestrator` when multiple MKPSI mechanisms may apply or routing is unclear.
- Use `/mkpsi-output-verifier` after this skill produces an artifact or plan.
- Use `/mkpsi-manipulation-ethics-gate` first for hidden influence, vulnerable users, shame/fear/status exploitation, defaults, scarcity, authority, or sensitive data.
- Sibling confusion risks: - Claimed-data risk is about asking the wrong source; Goodhart is about making the metric the mission.
- Overconfidence can cause overuse of data, but Goodhart focuses on incentive/target distortion.

---

## E — Execution steps

1. **Apply the source method: - **Recognize:** Optimization chases cheap clicks, immediate sales, view counts, or quarterly targets while brand demand or profit quality erodes. - **Intervene:** Pair short-term response metrics with long-term brand/equity tracking, control groups, and human judgment; audit for gaming/unintended consequences. - **Assess:** Monitor saleability, exposed-vs-control brand lift, margin, retention, and downstream quality**
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

- **Selected mechanism:** `mkpsi-balance-short-and-long-metrics` — Prevent Goodhart failures with balanced outcome metrics.
- **Trigger fit:** why this skill applies and which sibling skills were intentionally not used.
- **Evidence level:** field/lab/case/memoir/historical/hypothesis/unsupported.
- **Concrete artifact:** copy, UX change, research protocol, decision checklist, experiment, or plan.
- **Ethical boundary:** what must not be faked, hidden, pressured, inferred, or overclaimed.
- **Test plan:** baseline, primary metric, guardrail metric, sample/duration, stop/decision rule.

---

## B — Boundary

### Do not use this skill when

- Do not reject metrics wholesale. The skill requires better measurement, not intuition-only decision-making.
- The user only wants a book summary or author biography.
- The artifact affects high-risk contexts — minors, addiction, debt/financial hardship, health/legal/financial decisions, crisis/mental health, political persuasion, employment/housing/credit eligibility, or consent/privacy flows — unless the intervention clearly advances user welfare and preserves informed choice.
- The mechanism would require fake evidence, fake norms, fake scarcity, invented motives, invented founder stories, hidden fees, hidden defaults, or non-consensual sensitive inference.

### Source-specific misuse risks

- Claimed-data risk is about asking the wrong source; Goodhart is about making the metric the mission.
- Overconfidence can cause overuse of data, but Goodhart focuses on incentive/target distortion.

### Author/source blind spots

- Effects vary by audience, culture, channel, and stakes.
- Some source examples are case-based, historical, memoir-derived, or lab-derived; grade evidence before rollout.
- Modern privacy, dark-pattern, AI-personalization, and platform risks can make old persuasion tactics more harmful.

---

## Related skills

- depends-on: `/mkpsi-orchestrator` when routing is unclear; `/mkpsi-manipulation-ethics-gate` for sensitive influence; `/mkpsi-output-verifier` for final QA
- contrasts-with: see sibling-confusion notes above
- composes-with: /mkpsi-orchestrator, /mkpsi-output-verifier, /mkpsi-manipulation-ethics-gate, /mkpsi-test-learn-adapt-rct

---

## Audit information

- **Validation passed:** V1 ✓ / V2 ✓ / V3 ✓ (P0.)
- **Test pass rate:** designed; see `test-prompts.json`
- **Distillation date:** 2026-07-21
