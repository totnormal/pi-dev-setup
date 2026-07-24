---
name: mkpsi-target-choice-contexts-not-personas
description: |
  Use when: Plan assumes fixed persona traits explain behavior. Trigger phrases: target audience,, per
  sona,, they just don’t care,, busy commuters,, where/when should we reach them,, contextual targetin
  g,. NOT for: Use when behavior plausibly varies by situation. Do not use as an excuse to ignore audi
  ence economics, eligibility, category entry, or legal targeting limits.
source_book: |
  MKPSI behavioral persuasion corpus — Sutherland, Halpern, Knight, Martin/Goldstein/Cialdini, Gladwel
  l, Shotton, Packard, Kahneman, Lancaster
source_chapter: |
  Introduction; Bias 1: The Fundamental Attribution Error; Bias 8: Mood; Bias 16: The Curse of Knowled
  ge.
tags: [mkpsi-v2, research, p1]
related_skills: [mkpsi-orchestrator, mkpsi-output-verifier, mkpsi-manipulation-ethics-gate, mkpsi-coupling-context-map, mkpsi-key-moment-disruption-window]
disable-model-invocation: true
---

# Target the choice context, not only the audience persona.

## R — Reading

> “The most important finding from this experiment is that contextual factors are often more influential than personality in determining behaviour.”
>
> — Source: Introduction; Bias 1: The Fundamental Attribution Error; Bias 8: Mood; Bias 16: The Curse of Knowledge.

**Source mechanism:** - **Recognize:** A plan assumes fixed consumer traits explain behavior: “our target is X,” “they are selfish/loyal/rational,” “this segment always…”
- **Intervene:** Map the moment, location, time pressure, mood, dwell time, and task state around the desired choice; buy or design for the contexts where the behavior is easiest.
- **Assess:** Compare behavior by context cell, not just demographic cell; prioritize incremental response, attention time, recall, and conversion lift.

**Evidence type:** source-specific candidate extraction; evidence grade must still be checked before rollout.

---

## I — Methodology skeleton (Interpretation)

- **Recognize:** A plan assumes fixed consumer traits explain behavior: “our target is X,” “they are selfish/loyal/rational,” “this segment always…”
- **Intervene:** Map the moment, location, time pressure, mood, dwell time, and task state around the desired choice; buy or design for the contexts where the behavior is easiest.
- **Assess:** Compare behavior by context cell, not just demographic cell; prioritize incremental response, attention time, recall, and conversion lift.

Operationally, this means:

1. Identify the exact behavior, judgment, message, or design choice at stake.
2. Confirm the trigger matches this atomic mechanism rather than a broader MKPSI sibling.
3. Apply the source method as a concrete checklist, copy/design move, research protocol, or decision procedure.
4. State evidence level and avoid overclaiming from cases, lab studies, memoir, or historical examples.
5. Ship only with an ethical boundary and a test/verification plan.

---

## A1 — Application in the source

### Case 1: Darley and Batson’s seminarians helped mainly when not hurried
- **Problem:** Darley and Batson’s seminarians helped mainly when not hurried: 63% stopped in low-hurry vs 10% in high-hurry, regardless of religious motive.
- **Mechanism:** The source example shows the named mechanism changing perception, judgment, motivation, or behavior in a specific context.
- **Result/evidence:** Use as source evidence, not universal proof; preserve the conditions that made the example work.
- **Transfer rule:** Apply only when the user's context matches the mechanism and can be tested with guardrails.

### Case 2: Shotton’s NHS Give Blood test changed broad copy to city-specific “blood stocks 
- **Problem:** Shotton’s NHS Give Blood test changed broad copy to city-specific “blood stocks are low in Basildon/Brentwood/Birmingham,” improving cost per donation by 10%.
- **Mechanism:** The second source example gives a cross-check against turning one anecdote into a rule.
- **Result/evidence:** Treat as corroborating evidence or boundary evidence depending on the example.
- **Transfer rule:** If this case conflicts with the user's context, route to `/mkpsi-orchestrator` or `/mkpsi-output-verifier`.

---

## A2 — Future Trigger

### User needs this skill when

1. Plan assumes fixed persona traits explain behavior.
2. The user needs an executable artifact, intervention, research protocol, or decision check — not a book summary.
3. The user can provide enough context to define audience, behavior, evidence, and constraints.

### Language signals

- "target audience,"
- "persona,"
- "they just don’t care,"
- "busy commuters,"
- "where/when should we reach them,"
- "contextual targeting,"
- "moment of need."

### Distinction from siblings

- Use `/mkpsi-orchestrator` when multiple MKPSI mechanisms may apply or routing is unclear.
- Use `/mkpsi-output-verifier` after this skill produces an artifact or plan.
- Use `/mkpsi-manipulation-ethics-gate` first for hidden influence, vulnerable users, shame/fear/status exploitation, defaults, scarcity, authority, or sensitive data.
- Sibling confusion risks: - Not the same as `mkpsi-localize-appeals-to-reduce-diffusion`, which uses local specificity to create personal responsibility.
- Not the same as mood targeting; mood is one contextual variable, not the whole diagnosis.

---

## E — Execution steps

1. **Apply the source method: - **Recognize:** A plan assumes fixed consumer traits explain behavior: “our target is X,” “they are selfish/loyal/rational,” “this segment always…” - **Intervene:** Map the moment, location, time pressure, mood, dwell time, and task state around the desired choice; buy or design for the contexts where the behavior is easiest. - **Assess:** Compare behavior by context cell, not just demographic cell; prioritize incre**
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

- **Selected mechanism:** `mkpsi-target-choice-contexts-not-personas` — Target the choice context, not only the audience persona.
- **Trigger fit:** why this skill applies and which sibling skills were intentionally not used.
- **Evidence level:** field/lab/case/memoir/historical/hypothesis/unsupported.
- **Concrete artifact:** copy, UX change, research protocol, decision checklist, experiment, or plan.
- **Ethical boundary:** what must not be faked, hidden, pressured, inferred, or overclaimed.
- **Test plan:** baseline, primary metric, guardrail metric, sample/duration, stop/decision rule.

---

## B — Boundary

### Do not use this skill when

- Use when behavior plausibly varies by situation. Do not use as an excuse to ignore audience economics, eligibility, category entry, or legal targeting limits.
- The user only wants a book summary or author biography.
- The artifact affects high-risk contexts — minors, addiction, debt/financial hardship, health/legal/financial decisions, crisis/mental health, political persuasion, employment/housing/credit eligibility, or consent/privacy flows — unless the intervention clearly advances user welfare and preserves informed choice.
- The mechanism would require fake evidence, fake norms, fake scarcity, invented motives, invented founder stories, hidden fees, hidden defaults, or non-consensual sensitive inference.

### Source-specific misuse risks

- Not the same as `mkpsi-localize-appeals-to-reduce-diffusion`, which uses local specificity to create personal responsibility.
- Not the same as mood targeting; mood is one contextual variable, not the whole diagnosis.

### Author/source blind spots

- Effects vary by audience, culture, channel, and stakes.
- Some source examples are case-based, historical, memoir-derived, or lab-derived; grade evidence before rollout.
- Modern privacy, dark-pattern, AI-personalization, and platform risks can make old persuasion tactics more harmful.

---

## Related skills

- depends-on: `/mkpsi-orchestrator` when routing is unclear; `/mkpsi-manipulation-ethics-gate` for sensitive influence; `/mkpsi-output-verifier` for final QA
- contrasts-with: see sibling-confusion notes above
- composes-with: /mkpsi-orchestrator, /mkpsi-output-verifier, /mkpsi-manipulation-ethics-gate, /mkpsi-coupling-context-map, /mkpsi-key-moment-disruption-window

---

## Audit information

- **Validation passed:** V1 ✓ / V2 ✓ / V3 ✓ (P1.)
- **Test pass rate:** designed; see `test-prompts.json`
- **Distillation date:** 2026-07-21
