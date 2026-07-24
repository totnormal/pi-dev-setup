---
name: mkpsi-truth-default-trigger-ledger
description: |
  Use when: “Something feels off,” “red flags but,” “not enough to act,” team either dismisses or leap
  s to accusation. Trigger phrases: I have a bad feeling, but they seem credible, there are red flags,
   but…, we can explain that, not enough to act on.. NOT for: Use for material stranger-risk decisions
  , not routine social interaction. Do not punish people for ordinary ambiguity. Avoid discriminatory 
  “gut feel” triggers.
source_book: |
  MKPSI behavioral persuasion corpus — Sutherland, Halpern, Knight, Martin/Goldstein/Cialdini, Gladwel
  l, Shotton, Packard, Kahneman, Lancaster
source_chapter: |
  Part Two: Default to Truth; Chapter Three, “The Queen of Cuba”; Chapter Four, “The Holy Fool.”
tags: [mkpsi-v2, bias, p1]
related_skills: [mkpsi-orchestrator, mkpsi-output-verifier, mkpsi-manipulation-ethics-gate, mkpsi-holy-fool-escalation-channel, mkpsi-stranger-risk-pre-mortem, mkpsi-fragile-truth-protocol]
disable-model-invocation: true
---

# Convert vague suspicion into a trigger ledger before abandoning trust.

## R — Reading

> “To snap out of truth-default mode requires what Levine calls a ‘trigger.’ A trigger is not the same as a suspicion, or the first sliver of doubt… We start by believing. And we stop believing only when our doubts and misgivings rise to the point where we can no longer explain them away.”
>
> — Source: Part Two: Default to Truth; Chapter Three, “The Queen of Cuba”; Chapter Four, “The Holy Fool.”

**Source mechanism:** - **Recognize:** You have “something feels off” but no clear proof; the team is either dismissing red flags or leaping to betrayal.
- **Interpret:** Default-to-truth is normal and socially useful; the question is whether doubts have crossed a predefined threshold.
- **Act:** Create a trigger ledger: claim, observed anomaly, innocent explanations, confirming/disconfirming evidence needed, trigger threshold, deadline, and owner.

**Evidence type:** source-specific candidate extraction; evidence grade must still be checked before rollout.

---

## I — Methodology skeleton (Interpretation)

- **Recognize:** You have “something feels off” but no clear proof; the team is either dismissing red flags or leaping to betrayal.
- **Interpret:** Default-to-truth is normal and socially useful; the question is whether doubts have crossed a predefined threshold.
- **Act:** Create a trigger ledger: claim, observed anomaly, innocent explanations, confirming/disconfirming evidence needed, trigger threshold, deadline, and owner.

Operationally, this means:

1. Identify the exact behavior, judgment, message, or design choice at stake.
2. Confirm the trigger matches this atomic mechanism rather than a broader MKPSI sibling.
3. Apply the source method as a concrete checklist, copy/design move, research protocol, or decision procedure.
4. State evidence level and avoid overclaiming from cases, lab studies, memoir, or historical examples.
5. Ship only with an ethical boundary and a test/verification plan.

---

## A1 — Application in the source

### Case 1: Scott Carmichael saw Ana Montes freeze and later rationalized it away as embarra
- **Problem:** Scott Carmichael saw Ana Montes freeze and later rationalized it away as embarrassment or a private relationship.
- **Mechanism:** The source example shows the named mechanism changing perception, judgment, motivation, or behavior in a specific context.
- **Result/evidence:** Use as source evidence, not universal proof; preserve the conditions that made the example work.
- **Transfer rule:** Apply only when the user's context matches the mechanism and can be tested with guardrails.

### Case 2: Milgram participants noticed oddities in the setup, but doubts did not become en
- **Problem:** Milgram participants noticed oddities in the setup, but doubts did not become enough doubts to break belief.
- **Mechanism:** The second source example gives a cross-check against turning one anecdote into a rule.
- **Result/evidence:** Treat as corroborating evidence or boundary evidence depending on the example.
- **Transfer rule:** If this case conflicts with the user's context, route to `/mkpsi-orchestrator` or `/mkpsi-output-verifier`.

---

## A2 — Future Trigger

### User needs this skill when

1. “Something feels off,” “red flags but,” “not enough to act,” team either dismisses or leaps to accusation.
2. The user needs an executable artifact, intervention, research protocol, or decision check — not a book summary.
3. The user can provide enough context to define audience, behavior, evidence, and constraints.

### Language signals

- "I have a bad feeling"
- "but they seem credible"
- "there are red flags, but…"
- "we can explain that"
- "not enough to act on."

### Distinction from siblings

- Use `/mkpsi-orchestrator` when multiple MKPSI mechanisms may apply or routing is unclear.
- Use `/mkpsi-output-verifier` after this skill produces an artifact or plan.
- Use `/mkpsi-manipulation-ethics-gate` first for hidden influence, vulnerable users, shame/fear/status exploitation, defaults, scarcity, authority, or sensitive data.
- Sibling confusion risks: - Not `mkpsi-assume-fraud`: the ledger preserves trust until evidence crosses threshold.
- Not `mkpsi-red-team-paranoia`: it structures doubt without making suspicion the default.

---

## E — Execution steps

1. **Apply the source method: - **Recognize:** You have “something feels off” but no clear proof; the team is either dismissing red flags or leaping to betrayal. - **Interpret:** Default-to-truth is normal and socially useful; the question is whether doubts have crossed a predefined threshold. - **Act:** Create a trigger ledger: claim, observed anomaly, innocent explanations, confirming/disconfirming evidence needed, trigger threshold, deadline, **
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

- **Selected mechanism:** `mkpsi-truth-default-trigger-ledger` — Convert vague suspicion into a trigger ledger before abandoning trust.
- **Trigger fit:** why this skill applies and which sibling skills were intentionally not used.
- **Evidence level:** field/lab/case/memoir/historical/hypothesis/unsupported.
- **Concrete artifact:** copy, UX change, research protocol, decision checklist, experiment, or plan.
- **Ethical boundary:** what must not be faked, hidden, pressured, inferred, or overclaimed.
- **Test plan:** baseline, primary metric, guardrail metric, sample/duration, stop/decision rule.

---

## B — Boundary

### Do not use this skill when

- Use for material stranger-risk decisions, not routine social interaction. Do not punish people for ordinary ambiguity. Avoid discriminatory “gut feel” triggers.
- The user only wants a book summary or author biography.
- The artifact affects high-risk contexts — minors, addiction, debt/financial hardship, health/legal/financial decisions, crisis/mental health, political persuasion, employment/housing/credit eligibility, or consent/privacy flows — unless the intervention clearly advances user welfare and preserves informed choice.
- The mechanism would require fake evidence, fake norms, fake scarcity, invented motives, invented founder stories, hidden fees, hidden defaults, or non-consensual sensitive inference.

### Source-specific misuse risks

- Not `mkpsi-assume-fraud`: the ledger preserves trust until evidence crosses threshold.
- Not `mkpsi-red-team-paranoia`: it structures doubt without making suspicion the default.

### Author/source blind spots

- Effects vary by audience, culture, channel, and stakes.
- Some source examples are case-based, historical, memoir-derived, or lab-derived; grade evidence before rollout.
- Modern privacy, dark-pattern, AI-personalization, and platform risks can make old persuasion tactics more harmful.

---

## Related skills

- depends-on: `/mkpsi-orchestrator` when routing is unclear; `/mkpsi-manipulation-ethics-gate` for sensitive influence; `/mkpsi-output-verifier` for final QA
- contrasts-with: see sibling-confusion notes above
- composes-with: /mkpsi-orchestrator, /mkpsi-output-verifier, /mkpsi-manipulation-ethics-gate, /mkpsi-holy-fool-escalation-channel, /mkpsi-stranger-risk-pre-mortem, /mkpsi-fragile-truth-protocol

---

## Audit information

- **Validation passed:** V1 ✓ / V2 ✓ / V3 ✓ (P1.)
- **Test pass rate:** designed; see `test-prompts.json`
- **Distillation date:** 2026-07-21
