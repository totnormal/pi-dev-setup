---
name: mkpsi-holy-fool-escalation-channel
description: |
  Use when: Socially awkward, low-status, obsessive, or disliked person brings specific warnings. Trig
  ger phrases: He’s a crank, she always sees fraud, nobody likes a tattletale, the evidence is strong,
   but the person is hard to deal with.. NOT for: Require evidence, not accusations. Protect good-fait
  h escalation, but penalize harassment, bias, or knowingly false claims.
source_book: |
  MKPSI behavioral persuasion corpus — Sutherland, Halpern, Knight, Martin/Goldstein/Cialdini, Gladwel
  l, Shotton, Packard, Kahneman, Lancaster
source_chapter: |
  Chapter Four, “The Holy Fool”; Madoff / Harry Markopolos sections.
tags: [mkpsi-v2, general, p2]
related_skills: [mkpsi-orchestrator, mkpsi-output-verifier, mkpsi-manipulation-ethics-gate, mkpsi-decorrelate-judgment, mkpsi-truth-default-trigger-ledger]
disable-model-invocation: true
---

# Give outlier truth-tellers a usable evidence escalation path.

## R — Reading

> “We need Holy Fools in our society, from time to time. They perform a valuable role… But the second, crucial part of Levine’s argument is that we can’t all be Holy Fools. That would be a disaster.”
>
> — Source: Chapter Four, “The Holy Fool”; Madoff / Harry Markopolos sections.

**Source mechanism:** - **Recognize:** A socially awkward, obsessive, or low-status person brings high-specificity warnings that others dismiss.
- **Interpret:** The warning may be valuable, but the messenger may be poor at trust-building and institutional navigation.
- **Act:** Assign a neutral translator/reviewer, convert the warning into evidence packets, define who must respond, and document accept/reject reasons.

**Evidence type:** source-specific candidate extraction; evidence grade must still be checked before rollout.

---

## I — Methodology skeleton (Interpretation)

- **Recognize:** A socially awkward, obsessive, or low-status person brings high-specificity warnings that others dismiss.
- **Interpret:** The warning may be valuable, but the messenger may be poor at trust-building and institutional navigation.
- **Act:** Assign a neutral translator/reviewer, convert the warning into evidence packets, define who must respond, and document accept/reject reasons.

Operationally, this means:

1. Identify the exact behavior, judgment, message, or design choice at stake.
2. Confirm the trigger matches this atomic mechanism rather than a broader MKPSI sibling.
3. Apply the source method as a concrete checklist, copy/design move, research protocol, or decision procedure.
4. State evidence level and avoid overclaiming from cases, lab studies, memoir, or historical examples.
5. Ship only with an ethical boundary and a test/verification plan.

---

## A1 — Application in the source

### Case 1: Markopolos had mathematical proofs on Madoff but failed to get regulators to act
- **Problem:** Markopolos had mathematical proofs on Madoff but failed to get regulators to act.
- **Mechanism:** The source example shows the named mechanism changing perception, judgment, motivation, or behavior in a specific context.
- **Result/evidence:** Use as source evidence, not universal proof; preserve the conditions that made the example work.
- **Transfer rule:** Apply only when the user's context matches the mechanism and can be tested with guardrails.

### Case 2: Renaissance and SEC had doubts but defaulted to institutional trust and did not 
- **Problem:** Renaissance and SEC had doubts but defaulted to institutional trust and did not fully escalate.
- **Mechanism:** The second source example gives a cross-check against turning one anecdote into a rule.
- **Result/evidence:** Treat as corroborating evidence or boundary evidence depending on the example.
- **Transfer rule:** If this case conflicts with the user's context, route to `/mkpsi-orchestrator` or `/mkpsi-output-verifier`.

---

## A2 — Future Trigger

### User needs this skill when

1. Socially awkward, low-status, obsessive, or disliked person brings specific warnings.
2. The user needs an executable artifact, intervention, research protocol, or decision check — not a book summary.
3. The user can provide enough context to define audience, behavior, evidence, and constraints.

### Language signals

- "He’s a crank"
- "she always sees fraud"
- "nobody likes a tattletale"
- "the evidence is strong, but the person is hard to deal with."

### Distinction from siblings

- Use `/mkpsi-orchestrator` when multiple MKPSI mechanisms may apply or routing is unclear.
- Use `/mkpsi-output-verifier` after this skill produces an artifact or plan.
- Use `/mkpsi-manipulation-ethics-gate` first for hidden influence, vulnerable users, shame/fear/status exploitation, defaults, scarcity, authority, or sensitive data.
- Sibling confusion risks: - Not `mkpsi-whistleblower-worship`: do not assume the Holy Fool is right.
- Not `mkpsi-consensus-check`: this protects non-consensus evidence from social dismissal.

---

## E — Execution steps

1. **Apply the source method: - **Recognize:** A socially awkward, obsessive, or low-status person brings high-specificity warnings that others dismiss. - **Interpret:** The warning may be valuable, but the messenger may be poor at trust-building and institutional navigation. - **Act:** Assign a neutral translator/reviewer, convert the warning into evidence packets, define who must respond, and document accept/reject reasons.**
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

- **Selected mechanism:** `mkpsi-holy-fool-escalation-channel` — Give outlier truth-tellers a usable evidence escalation path.
- **Trigger fit:** why this skill applies and which sibling skills were intentionally not used.
- **Evidence level:** field/lab/case/memoir/historical/hypothesis/unsupported.
- **Concrete artifact:** copy, UX change, research protocol, decision checklist, experiment, or plan.
- **Ethical boundary:** what must not be faked, hidden, pressured, inferred, or overclaimed.
- **Test plan:** baseline, primary metric, guardrail metric, sample/duration, stop/decision rule.

---

## B — Boundary

### Do not use this skill when

- Require evidence, not accusations. Protect good-faith escalation, but penalize harassment, bias, or knowingly false claims.
- The user only wants a book summary or author biography.
- The artifact affects high-risk contexts — minors, addiction, debt/financial hardship, health/legal/financial decisions, crisis/mental health, political persuasion, employment/housing/credit eligibility, or consent/privacy flows — unless the intervention clearly advances user welfare and preserves informed choice.
- The mechanism would require fake evidence, fake norms, fake scarcity, invented motives, invented founder stories, hidden fees, hidden defaults, or non-consensual sensitive inference.

### Source-specific misuse risks

- Not `mkpsi-whistleblower-worship`: do not assume the Holy Fool is right.
- Not `mkpsi-consensus-check`: this protects non-consensus evidence from social dismissal.

### Author/source blind spots

- Effects vary by audience, culture, channel, and stakes.
- Some source examples are case-based, historical, memoir-derived, or lab-derived; grade evidence before rollout.
- Modern privacy, dark-pattern, AI-personalization, and platform risks can make old persuasion tactics more harmful.

---

## Related skills

- depends-on: `/mkpsi-orchestrator` when routing is unclear; `/mkpsi-manipulation-ethics-gate` for sensitive influence; `/mkpsi-output-verifier` for final QA
- contrasts-with: see sibling-confusion notes above
- composes-with: /mkpsi-orchestrator, /mkpsi-output-verifier, /mkpsi-manipulation-ethics-gate, /mkpsi-decorrelate-judgment, /mkpsi-truth-default-trigger-ledger

---

## Audit information

- **Validation passed:** V1 ✓ / V2 ✓ / V3 ✓ (P2.)
- **Test pass rate:** designed; see `test-prompts.json`
- **Distillation date:** 2026-07-21
