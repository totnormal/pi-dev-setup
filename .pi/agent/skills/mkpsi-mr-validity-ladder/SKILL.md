---
name: mkpsi-mr-validity-ladder
description: |
  Use when: “Interviews say,” “motivation research says,” “small sample insight,” “customers told us,”
   or any unvalidated psychological hypothesis. Trigger phrases: motivation research says,, insight fr
  om interviews,, small sample,, before scaling,, validate the hypothesis,, is this real?. NOT for: Re
  quire stronger proof for high-stakes categories; do not present speculative psychodynamic interpreta
  tions as facts; report uncertainty and failed validations.
source_book: |
  MKPSI behavioral persuasion corpus — Sutherland, Halpern, Knight, Martin/Goldstein/Cialdini, Gladwel
  l, Shotton, Packard, Kahneman, Lancaster
source_chapter: |
  Ch. 22 “The Question of Validity”; Ch. 4 “. . . And the Hooks Are Lowered”
tags: [mkpsi-v2, governance, p0]
related_skills: [mkpsi-orchestrator, mkpsi-output-verifier, mkpsi-manipulation-ethics-gate, mkpsi-depth-interview-motive-trace, mkpsi-indirect-association-probe, mkpsi-hidden-need-value-map, mkpsi-find-real-why]
disable-model-invocation: true
---

# Treat qualitative motive insights as clues to validate before scaling.

## R — Reading

> “By 1957, the thinking of the most responsible practitioners of motivational research seemed to be that M.R. is most useful as a starting point, or as a clue spotter, and that the findings of M.R should be validated by other methods whenever possible.”
>
> — Source: Ch. 22 “The Question of Validity”; Ch. 4 “. . . And the Hooks Are Lowered”

**Source mechanism:** - **Recognize:** A persuasive idea comes from depth interviews, projective tests, expert intuition, or a small sample.
- **Interpret:** Treat it as a clue, not a conclusion.
- **Act:** Move up a validation ladder: exploratory probe → structured survey → controlled creative test → behavioral field test → ongoing harm/accuracy monitoring.

**Evidence type:** source-specific candidate extraction; evidence grade must still be checked before rollout.

---

## I — Methodology skeleton (Interpretation)

- **Recognize:** A persuasive idea comes from depth interviews, projective tests, expert intuition, or a small sample.
- **Interpret:** Treat it as a clue, not a conclusion.
- **Act:** Move up a validation ladder: exploratory probe → structured survey → controlled creative test → behavioral field test → ongoing harm/accuracy monitoring.

Operationally, this means:

1. Identify the exact behavior, judgment, message, or design choice at stake.
2. Confirm the trigger matches this atomic mechanism rather than a broader MKPSI sibling.
3. Apply the source method as a concrete checklist, copy/design move, research protocol, or decision procedure.
4. State evidence level and avoid overclaiming from cases, lab studies, memoir, or historical examples.
5. Ship only with an ethical boundary and a test/verification plan.

---

## A1 — Application in the source

### Case 1: Packard praises Herta Herzog’s four-stage process
- **Problem:** Packard praises Herta Herzog’s four-stage process: conventional prospect spotting, depth probing, large structured questionnaires, then ad testing in selected areas.
- **Mechanism:** The source example shows the named mechanism changing perception, judgment, motivation, or behavior in a specific context.
- **Result/evidence:** Use as source evidence, not universal proof; preserve the conditions that made the example work.
- **Transfer rule:** Apply only when the user's context matches the mechanism and can be tested with guardrails.

### Case 2: Critics warned against calling “the initial idea a conclusion” and against over-
- **Problem:** Critics warned against calling “the initial idea a conclusion” and against over-reliance on small samples and intuitive practitioners.
- **Mechanism:** The second source example gives a cross-check against turning one anecdote into a rule.
- **Result/evidence:** Treat as corroborating evidence or boundary evidence depending on the example.
- **Transfer rule:** If this case conflicts with the user's context, route to `/mkpsi-orchestrator` or `/mkpsi-output-verifier`.

---

## A2 — Future Trigger

### User needs this skill when

1. “Interviews say,” “motivation research says,” “small sample insight,” “customers told us,” or any unvalidated psychological hypothesis.
2. The user needs an executable artifact, intervention, research protocol, or decision check — not a book summary.
3. The user can provide enough context to define audience, behavior, evidence, and constraints.

### Language signals

- "motivation research says,"
- "insight from interviews,"
- "small sample,"
- "before scaling,"
- "validate the hypothesis,"
- "is this real?"

### Distinction from siblings

- Use `/mkpsi-orchestrator` when multiple MKPSI mechanisms may apply or routing is unclear.
- Use `/mkpsi-output-verifier` after this skill produces an artifact or plan.
- Use `/mkpsi-manipulation-ethics-gate` first for hidden influence, vulnerable users, shame/fear/status exploitation, defaults, scarcity, authority, or sensitive data.
- Sibling confusion risks: - Not a persuasion tactic itself; it is a validation skill for other tactics.
- Not pure statistics; it integrates qualitative clue generation with quantitative/behavioral confirmation.
- Not a blocker to experimentation; it defines the next safest test.

---

## E — Execution steps

1. **Apply the source method: - **Recognize:** A persuasive idea comes from depth interviews, projective tests, expert intuition, or a small sample. - **Interpret:** Treat it as a clue, not a conclusion. - **Act:** Move up a validation ladder: exploratory probe → structured survey → controlled creative test → behavioral field test → ongoing harm/accuracy monitoring.**
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

- **Selected mechanism:** `mkpsi-mr-validity-ladder` — Treat qualitative motive insights as clues to validate before scaling.
- **Trigger fit:** why this skill applies and which sibling skills were intentionally not used.
- **Evidence level:** field/lab/case/memoir/historical/hypothesis/unsupported.
- **Concrete artifact:** copy, UX change, research protocol, decision checklist, experiment, or plan.
- **Ethical boundary:** what must not be faked, hidden, pressured, inferred, or overclaimed.
- **Test plan:** baseline, primary metric, guardrail metric, sample/duration, stop/decision rule.

---

## B — Boundary

### Do not use this skill when

- Require stronger proof for high-stakes categories; do not present speculative psychodynamic interpretations as facts; report uncertainty and failed validations.
- The user only wants a book summary or author biography.
- The artifact affects high-risk contexts — minors, addiction, debt/financial hardship, health/legal/financial decisions, crisis/mental health, political persuasion, employment/housing/credit eligibility, or consent/privacy flows — unless the intervention clearly advances user welfare and preserves informed choice.
- The mechanism would require fake evidence, fake norms, fake scarcity, invented motives, invented founder stories, hidden fees, hidden defaults, or non-consensual sensitive inference.

### Source-specific misuse risks

- Not a persuasion tactic itself; it is a validation skill for other tactics.
- Not pure statistics; it integrates qualitative clue generation with quantitative/behavioral confirmation.
- Not a blocker to experimentation; it defines the next safest test.

### Author/source blind spots

- Effects vary by audience, culture, channel, and stakes.
- Some source examples are case-based, historical, memoir-derived, or lab-derived; grade evidence before rollout.
- Modern privacy, dark-pattern, AI-personalization, and platform risks can make old persuasion tactics more harmful.

---

## Related skills

- depends-on: `/mkpsi-orchestrator` when routing is unclear; `/mkpsi-manipulation-ethics-gate` for sensitive influence; `/mkpsi-output-verifier` for final QA
- contrasts-with: see sibling-confusion notes above
- composes-with: /mkpsi-orchestrator, /mkpsi-output-verifier, /mkpsi-manipulation-ethics-gate, /mkpsi-depth-interview-motive-trace, /mkpsi-indirect-association-probe, /mkpsi-hidden-need-value-map, /mkpsi-find-real-why

---

## Audit information

- **Validation passed:** V1 ✓ / V2 ✓ / V3 ✓ (P0.)
- **Test pass rate:** designed; see `test-prompts.json`
- **Distillation date:** 2026-07-21
