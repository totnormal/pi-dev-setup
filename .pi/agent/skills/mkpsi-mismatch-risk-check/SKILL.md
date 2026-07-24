---
name: mkpsi-mismatch-risk-check
description: |
  Use when: “That’s not how an innocent/victim/scared/honest person acts,” or “he seemed so normal.” T
  rigger phrases: That’s not how an innocent person acts, if she were scared, she would…, he seemed so
   normal, real victims don’t…. NOT for: Do not use mismatch as an excuse to ignore explicit statement
  s, consent boundaries, threats, or hard evidence.
source_book: |
  MKPSI behavioral persuasion corpus — Sutherland, Halpern, Knight, Martin/Goldstein/Cialdini, Gladwel
  l, Shotton, Packard, Kahneman, Lancaster
source_chapter: |
  Chapter Seven, Amanda Knox; Chapter Eight, Brock Turner / Emily Doe; Chapter Twelve, Sandra Bland.
tags: [mkpsi-v2, bias, p1]
related_skills: [mkpsi-orchestrator, mkpsi-output-verifier, mkpsi-manipulation-ethics-gate, mkpsi-demeanor-signal-downgrade, mkpsi-stranger-risk-pre-mortem, mkpsi-bayesian-base-rate-discipline]
disable-model-invocation: true
---

# Check whether a stranger is mismatched before reading behavior.

## R — Reading

> “Human beings are not transparent. But when is this kind of thinking most dangerous? When the people we observe are mismatched: when they do not behave the way we expect them to behave.”
>
> — Source: Chapter Seven, Amanda Knox; Chapter Eight, Brock Turner / Emily Doe; Chapter Twelve, Sandra Bland.

**Source mechanism:** - **Recognize:** Someone’s behavior violates the expected script for innocence, grief, fear, consent, respect, or danger.
- **Interpret:** The person may be mismatched: outward conduct and inner state do not align with the observer’s folk psychology.
- **Act:** Ask: What script am I expecting? What alternative contexts explain this conduct? What direct evidence would matter if I could not see their face?

**Evidence type:** source-specific candidate extraction; evidence grade must still be checked before rollout.

---

## I — Methodology skeleton (Interpretation)

- **Recognize:** Someone’s behavior violates the expected script for innocence, grief, fear, consent, respect, or danger.
- **Interpret:** The person may be mismatched: outward conduct and inner state do not align with the observer’s folk psychology.
- **Act:** Ask: What script am I expecting? What alternative contexts explain this conduct? What direct evidence would matter if I could not see their face?

Operationally, this means:

1. Identify the exact behavior, judgment, message, or design choice at stake.
2. Confirm the trigger matches this atomic mechanism rather than a broader MKPSI sibling.
3. Apply the source method as a concrete checklist, copy/design move, research protocol, or decision procedure.
4. State evidence level and avoid overclaiming from cases, lab studies, memoir, or historical examples.
5. Ship only with an ethical boundary and a test/verification plan.

---

## A1 — Application in the source

### Case 1: Amanda Knox’s odd behavior after Meredith Kercher’s murder was treated as suspic
- **Problem:** Amanda Knox’s odd behavior after Meredith Kercher’s murder was treated as suspicious because it violated grief expectations.
- **Mechanism:** The source example shows the named mechanism changing perception, judgment, motivation, or behavior in a specific context.
- **Result/evidence:** Use as source evidence, not universal proof; preserve the conditions that made the example work.
- **Transfer rule:** Apply only when the user's context matches the mechanism and can be tested with guardrails.

### Case 2: Bernie Madoff appeared like an honest, low-key mensch despite being a fraud.
- **Problem:** Bernie Madoff appeared like an honest, low-key mensch despite being a fraud.
- **Mechanism:** The second source example gives a cross-check against turning one anecdote into a rule.
- **Result/evidence:** Treat as corroborating evidence or boundary evidence depending on the example.
- **Transfer rule:** If this case conflicts with the user's context, route to `/mkpsi-orchestrator` or `/mkpsi-output-verifier`.

---

## A2 — Future Trigger

### User needs this skill when

1. “That’s not how an innocent/victim/scared/honest person acts,” or “he seemed so normal.”
2. The user needs an executable artifact, intervention, research protocol, or decision check — not a book summary.
3. The user can provide enough context to define audience, behavior, evidence, and constraints.

### Language signals

- "That’s not how an innocent person acts"
- "if she were scared, she would…"
- "he seemed so normal"
- "real victims don’t…"

### Distinction from siblings

- Use `/mkpsi-orchestrator` when multiple MKPSI mechanisms may apply or routing is unclear.
- Use `/mkpsi-output-verifier` after this skill produces an artifact or plan.
- Use `/mkpsi-manipulation-ethics-gate` first for hidden influence, vulnerable users, shame/fear/status exploitation, defaults, scarcity, authority, or sensitive data.
- Sibling confusion risks: - Not `mkpsi-benefit-of-doubt`: mismatch check can increase or decrease suspicion after evidence review.
- Not `mkpsi-cultural-context`: culture is one source of mismatch, not the only one.

---

## E — Execution steps

1. **Apply the source method: - **Recognize:** Someone’s behavior violates the expected script for innocence, grief, fear, consent, respect, or danger. - **Interpret:** The person may be mismatched: outward conduct and inner state do not align with the observer’s folk psychology. - **Act:** Ask: What script am I expecting? What alternative contexts explain this conduct? What direct evidence would matter if I could not see their face?**
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

- **Selected mechanism:** `mkpsi-mismatch-risk-check` — Check whether a stranger is mismatched before reading behavior.
- **Trigger fit:** why this skill applies and which sibling skills were intentionally not used.
- **Evidence level:** field/lab/case/memoir/historical/hypothesis/unsupported.
- **Concrete artifact:** copy, UX change, research protocol, decision checklist, experiment, or plan.
- **Ethical boundary:** what must not be faked, hidden, pressured, inferred, or overclaimed.
- **Test plan:** baseline, primary metric, guardrail metric, sample/duration, stop/decision rule.

---

## B — Boundary

### Do not use this skill when

- Do not use mismatch as an excuse to ignore explicit statements, consent boundaries, threats, or hard evidence.
- The user only wants a book summary or author biography.
- The artifact affects high-risk contexts — minors, addiction, debt/financial hardship, health/legal/financial decisions, crisis/mental health, political persuasion, employment/housing/credit eligibility, or consent/privacy flows — unless the intervention clearly advances user welfare and preserves informed choice.
- The mechanism would require fake evidence, fake norms, fake scarcity, invented motives, invented founder stories, hidden fees, hidden defaults, or non-consensual sensitive inference.

### Source-specific misuse risks

- Not `mkpsi-benefit-of-doubt`: mismatch check can increase or decrease suspicion after evidence review.
- Not `mkpsi-cultural-context`: culture is one source of mismatch, not the only one.

### Author/source blind spots

- Effects vary by audience, culture, channel, and stakes.
- Some source examples are case-based, historical, memoir-derived, or lab-derived; grade evidence before rollout.
- Modern privacy, dark-pattern, AI-personalization, and platform risks can make old persuasion tactics more harmful.

---

## Related skills

- depends-on: `/mkpsi-orchestrator` when routing is unclear; `/mkpsi-manipulation-ethics-gate` for sensitive influence; `/mkpsi-output-verifier` for final QA
- contrasts-with: see sibling-confusion notes above
- composes-with: /mkpsi-orchestrator, /mkpsi-output-verifier, /mkpsi-manipulation-ethics-gate, /mkpsi-demeanor-signal-downgrade, /mkpsi-stranger-risk-pre-mortem, /mkpsi-bayesian-base-rate-discipline

---

## Audit information

- **Validation passed:** V1 ✓ / V2 ✓ / V3 ✓ (P1.)
- **Test pass rate:** designed; see `test-prompts.json`
- **Distillation date:** 2026-07-21
