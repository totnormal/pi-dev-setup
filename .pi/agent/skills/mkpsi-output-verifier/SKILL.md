---
name: mkpsi-output-verifier
description: |
  Use when: Any MKPSI plan, skill output, experiment, message, or tactic is ready for review. Trigger 
  phrases: Any MKPSI plan, skill output, experiment, message, or tactic is ready for review. NOT for: 
  Verifies, does not invent new tactics; cannot approve illegal, deceptive, or harmful uses.
source_book: |
  MKPSI behavioral persuasion corpus — Sutherland, Halpern, Knight, Martin/Goldstein/Cialdini, Gladwel
  l, Shotton, Packard, Kahneman, Lancaster
source_chapter: |
  Packard Ch. 22–23; Halpern Ch. 10; Shotton replicability/Goodhart chapters; Kahneman calibration cha
  pters.
tags: [mkpsi-v2, governance, p0]
related_skills: [mkpsi-orchestrator, mkpsi-manipulation-ethics-gate, mkpsi-test-learn-adapt-rct, mkpsi-mr-validity-ladder]
disable-model-invocation: true
---

# Verify MKPSI outputs for atomicity, evidence, ethics, and testability.

## R — Reading

> “What you see is all there is.”
>
> — Source: Packard Ch. 22–23; Halpern Ch. 10; Shotton replicability/Goodhart chapters; Kahneman calibration chapters.

**Source mechanism:** Grade mechanism fit, evidence, ethics, backfire, and test plan; fail unsafe or unsupported outputs.

**Evidence type:** source-specific candidate extraction; evidence grade must still be checked before rollout.

---

## I — Methodology skeleton (Interpretation)

Grade mechanism fit, evidence, ethics, backfire, and test plan; fail unsafe or unsupported outputs.

Operationally, this means:

1. Identify the exact behavior, judgment, message, or design choice at stake.
2. Confirm the trigger matches this atomic mechanism rather than a broader MKPSI sibling.
3. Apply the source method as a concrete checklist, copy/design move, research protocol, or decision procedure.
4. State evidence level and avoid overclaiming from cases, lab studies, memoir, or historical examples.
5. Ship only with an ethical boundary and a test/verification plan.

---

## A1 — Application in the source

### Case 1: Kahneman
- **Problem:** Kahneman: WYSIATI shows coherent stories from incomplete evidence can feel true; verifier must surface missing evidence.
- **Mechanism:** The source example shows the named mechanism changing perception, judgment, motivation, or behavior in a specific context.
- **Result/evidence:** Use as source evidence, not universal proof; preserve the conditions that made the example work.
- **Transfer rule:** Apply only when the user's context matches the mechanism and can be tested with guardrails.

### Case 2: Halpern
- **Problem:** Halpern: TEST/RCT discipline turns policy and persuasion guesses into controlled learning before scale.
- **Mechanism:** The second source example gives a cross-check against turning one anecdote into a rule.
- **Result/evidence:** Treat as corroborating evidence or boundary evidence depending on the example.
- **Transfer rule:** If this case conflicts with the user's context, route to `/mkpsi-orchestrator` or `/mkpsi-output-verifier`.

---

## A2 — Future Trigger

### User needs this skill when

1. Any MKPSI plan, skill output, experiment, message, or tactic is ready for review.
2. The user needs an executable artifact, intervention, research protocol, or decision check — not a book summary.
3. The user can provide enough context to define audience, behavior, evidence, and constraints.

### Language signals

- "Any MKPSI plan"
- "skill output"
- "experiment"
- "message"
- "or tactic is ready for review"

### Distinction from siblings

- Use `/mkpsi-orchestrator` when multiple MKPSI mechanisms may apply or routing is unclear.
- Use `/mkpsi-output-verifier` after this skill produces an artifact or plan.
- Use `/mkpsi-manipulation-ethics-gate` first for hidden influence, vulnerable users, shame/fear/status exploitation, defaults, scarcity, authority, or sensitive data.
- Sibling confusion risks: Mandatory after all skills; especially with `mkpsi-test-learn-adapt-rct`, `mkpsi-mr-validity-ladder`, and `mkpsi-manipulation-ethics-gate`.

---

## E — Execution steps

1. **Collect minimum inputs: original request, candidate artifact, target behavior, audience/high-risk status, claimed mechanisms, evidence, context, and metrics.**
   - Done when: the final output contains this specific artifact/check, not generic advice.
2. **Map each recommendation to a `/mkpsi-*` skill and evidence grade: field, lab, case, hypothesis, or unsupported.**
   - Done when: the final output contains this specific artifact/check, not generic advice.
3. **Run hard-fail checks for fake evidence/norms/scarcity/authority, hidden defaults, coercion, vulnerable exploitation, hidden fees, or non-consensual targeting.**
   - Done when: the final output contains this specific artifact/check, not generic advice.
4. **Audit backfire risks: reactance, negative norms, Goodhart, trust erosion, privacy, weak-brand pratfall, cultural mismatch.**
   - Done when: the final output contains this specific artifact/check, not generic advice.
5. **Return PASS / PASS WITH FIXES / FAIL with exact corrections and a test-plan audit.**
   - Done when: the final output contains this specific artifact/check, not generic advice.

### Required output fields

- **Selected mechanism:** `mkpsi-output-verifier` — Verify MKPSI outputs for atomicity, evidence, ethics, and testability.
- **Trigger fit:** why this skill applies and which sibling skills were intentionally not used.
- **Evidence level:** field/lab/case/memoir/historical/hypothesis/unsupported.
- **Concrete artifact:** copy, UX change, research protocol, decision checklist, experiment, or plan.
- **Ethical boundary:** what must not be faked, hidden, pressured, inferred, or overclaimed.
- **Test plan:** baseline, primary metric, guardrail metric, sample/duration, stop/decision rule.

---

## B — Boundary

### Do not use this skill when

- Verifies, does not invent new tactics; cannot approve illegal, deceptive, or harmful uses.
- The user only wants a book summary or author biography.
- The artifact affects high-risk contexts — minors, addiction, debt/financial hardship, health/legal/financial decisions, crisis/mental health, political persuasion, employment/housing/credit eligibility, or consent/privacy flows — unless the intervention clearly advances user welfare and preserves informed choice.
- The mechanism would require fake evidence, fake norms, fake scarcity, invented motives, invented founder stories, hidden fees, hidden defaults, or non-consensual sensitive inference.

### Source-specific misuse risks

Mandatory after all skills; especially with `mkpsi-test-learn-adapt-rct`, `mkpsi-mr-validity-ladder`, and `mkpsi-manipulation-ethics-gate`.

### Author/source blind spots

- Effects vary by audience, culture, channel, and stakes.
- Some source examples are case-based, historical, memoir-derived, or lab-derived; grade evidence before rollout.
- Modern privacy, dark-pattern, AI-personalization, and platform risks can make old persuasion tactics more harmful.

---

### Dichter motivation-research QA addendum

For outputs using the Dichter-derived skills, additionally check:

1. Has the "rationality fetish" suspicion been applied — are accepted rational explanations challenged with behavioral evidence, not just surveys?
2. Is the product's symbolic meaning decoded from evidence (depth interviews, behavioral experiments), not invented from the persuader's imagination?
3. Are mental blocks inventoried comprehensively (guilt, fear, ego, status, superstition) rather than assumed to be a single barrier?
4. When insight is used as a persuasion mirror, is it based on genuine research, not fabricated diagnosis?
5. Does the output avoid exploiting identity/status/inadequacy anxieties manipulatively? Dichter's methods are powerful and carry ethical weight.

---

## Related skills

- depends-on: `/mkpsi-orchestrator` when routing is unclear; `/mkpsi-manipulation-ethics-gate` for sensitive influence; `/mkpsi-output-verifier` for final QA
- contrasts-with: see sibling-confusion notes above
- composes-with: /mkpsi-orchestrator, /mkpsi-manipulation-ethics-gate, /mkpsi-test-learn-adapt-rct, /mkpsi-mr-validity-ladder

---

## Audit information

- **Validation passed:** V1 ✓ / V2 ✓ / V3 ✓ (P0.)
- **Test pass rate:** designed; see `test-prompts.json`
- **Distillation date:** 2026-07-21
