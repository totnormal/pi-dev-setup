---
name: mkpsi-system2-bias-checkpoint
description: |
  Use when: “Quick take,” “gut feel,” “obvious,” “just decide,” high stakes under uncertainty. Trigger
   phrases: quick take,, gut feel,, obvious answer,, just decide,, high stakes,, we don’t have time,. 
  NOT for: Use when stakes or ambiguity justify delay. Do not overuse for trivial reversible choices o
  r when a validated rule/formula already governs.
source_book: |
  MKPSI behavioral persuasion corpus — Sutherland, Halpern, Knight, Martin/Goldstein/Cialdini, Gladwel
  l, Shotton, Packard, Kahneman, Lancaster
source_chapter: |
  Part I, Ch. 1 “The Characters of the Story”; Ch. 7 “A Machine for Jumping to Conclusions”
tags: [mkpsi-v2, bias, p1]
related_skills: [mkpsi-orchestrator, mkpsi-output-verifier, mkpsi-manipulation-ethics-gate, mkpsi-bayesian-base-rate-discipline, mkpsi-anchor-resistance, mkpsi-stranger-risk-pre-mortem]
disable-model-invocation: true
---

# Trigger deliberate review before high-stakes intuitive judgments.

## R — Reading

> “Jumping to conclusions is risky when the situation is unfamiliar, the stakes are high, and there is no time to collect more information. These are the circumstances in which intuitive errors are probable, which may be prevented by a deliberate intervention of System 2.”
>
> — Source: Part I, Ch. 1 “The Characters of the Story”; Ch. 7 “A Machine for Jumping to Conclusions”

**Source mechanism:** Before accepting a fast judgment, run a checkpoint: unfamiliar? high stakes? incomplete evidence? time pressure? If any are true, pause output, list missing data, alternatives, and a slow verification step.

**Evidence type:** source-specific candidate extraction; evidence grade must still be checked before rollout.

---

## I — Methodology skeleton (Interpretation)

Before accepting a fast judgment, run a checkpoint: unfamiliar? high stakes? incomplete evidence? time pressure? If any are true, pause output, list missing data, alternatives, and a slow verification step.

Operationally, this means:

1. Identify the exact behavior, judgment, message, or design choice at stake.
2. Confirm the trigger matches this atomic mechanism rather than a broader MKPSI sibling.
3. Apply the source method as a concrete checklist, copy/design move, research protocol, or decision procedure.
4. State evidence level and avoid overclaiming from cases, lab studies, memoir, or historical examples.
5. Ship only with an ethical boundary and a test/verification plan.

---

## A1 — Application in the source

### Case 1: Bat-and-ball puzzle
- **Problem:** Bat-and-ball puzzle: intuitive “10¢” answer is appealing but wrong; a small check yields 5¢.
- **Mechanism:** The source example shows the named mechanism changing perception, judgment, motivation, or behavior in a specific context.
- **Result/evidence:** Use as source evidence, not universal proof; preserve the conditions that made the example work.
- **Transfer rule:** Apply only when the user's context matches the mechanism and can be tested with guardrails.

### Case 2: Ambiguous “bank” / A-B-C vs 12-13-14
- **Problem:** Ambiguous “bank” / A-B-C vs 12-13-14: System 1 resolves ambiguity without noticing alternatives.
- **Mechanism:** The second source example gives a cross-check against turning one anecdote into a rule.
- **Result/evidence:** Treat as corroborating evidence or boundary evidence depending on the example.
- **Transfer rule:** If this case conflicts with the user's context, route to `/mkpsi-orchestrator` or `/mkpsi-output-verifier`.

---

## A2 — Future Trigger

### User needs this skill when

1. “Quick take,” “gut feel,” “obvious,” “just decide,” high stakes under uncertainty.
2. The user needs an executable artifact, intervention, research protocol, or decision check — not a book summary.
3. The user can provide enough context to define audience, behavior, evidence, and constraints.

### Language signals

- "quick take,"
- "gut feel,"
- "obvious answer,"
- "just decide,"
- "high stakes,"
- "we don’t have time,"
- "seems clear."

### Distinction from siblings

- Use `/mkpsi-orchestrator` when multiple MKPSI mechanisms may apply or routing is unclear.
- Use `/mkpsi-output-verifier` after this skill produces an artifact or plan.
- Use `/mkpsi-manipulation-ethics-gate` first for hidden influence, vulnerable users, shame/fear/status exploitation, defaults, scarcity, authority, or sensitive data.
- Sibling confusion risks: Not the same as outside-view forecasting; this is a generic pause/check gate. Not a demand for exhaustive research.

---

## E — Execution steps

1. **Apply the source method: Before accepting a fast judgment, run a checkpoint: unfamiliar? high stakes? incomplete evidence? time pressure? If any are true, pause output, list missing data, alternatives, and a slow verification step.**
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

- **Selected mechanism:** `mkpsi-system2-bias-checkpoint` — Trigger deliberate review before high-stakes intuitive judgments.
- **Trigger fit:** why this skill applies and which sibling skills were intentionally not used.
- **Evidence level:** field/lab/case/memoir/historical/hypothesis/unsupported.
- **Concrete artifact:** copy, UX change, research protocol, decision checklist, experiment, or plan.
- **Ethical boundary:** what must not be faked, hidden, pressured, inferred, or overclaimed.
- **Test plan:** baseline, primary metric, guardrail metric, sample/duration, stop/decision rule.

---

## B — Boundary

### Do not use this skill when

- Use when stakes or ambiguity justify delay. Do not overuse for trivial reversible choices or when a validated rule/formula already governs.
- The user only wants a book summary or author biography.
- The artifact affects high-risk contexts — minors, addiction, debt/financial hardship, health/legal/financial decisions, crisis/mental health, political persuasion, employment/housing/credit eligibility, or consent/privacy flows — unless the intervention clearly advances user welfare and preserves informed choice.
- The mechanism would require fake evidence, fake norms, fake scarcity, invented motives, invented founder stories, hidden fees, hidden defaults, or non-consensual sensitive inference.

### Source-specific misuse risks

Not the same as outside-view forecasting; this is a generic pause/check gate. Not a demand for exhaustive research.

### Author/source blind spots

- Effects vary by audience, culture, channel, and stakes.
- Some source examples are case-based, historical, memoir-derived, or lab-derived; grade evidence before rollout.
- Modern privacy, dark-pattern, AI-personalization, and platform risks can make old persuasion tactics more harmful.

---

## Related skills

- depends-on: `/mkpsi-orchestrator` when routing is unclear; `/mkpsi-manipulation-ethics-gate` for sensitive influence; `/mkpsi-output-verifier` for final QA
- contrasts-with: see sibling-confusion notes above
- composes-with: /mkpsi-orchestrator, /mkpsi-output-verifier, /mkpsi-manipulation-ethics-gate, /mkpsi-bayesian-base-rate-discipline, /mkpsi-anchor-resistance, /mkpsi-stranger-risk-pre-mortem

---

## Audit information

- **Validation passed:** V1 ✓ / V2 ✓ / V3 ✓ (P1.)
- **Test pass rate:** designed; see `test-prompts.json`
- **Distillation date:** 2026-07-21
