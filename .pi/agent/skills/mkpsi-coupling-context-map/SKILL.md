---
name: mkpsi-coupling-context-map
description: |
  Use when: “They would just do it somewhere else,” “that’s who they are,” “blocking method won’t matt
  er.” Trigger phrases: They would just do it somewhere else, criminals always move, that’s just who s
  he was, blocking the method won’t matter.. NOT for: Do not reduce people to environments or deny age
  ncy. For self-harm, involve qualified crisis resources.
source_book: |
  MKPSI behavioral persuasion corpus — Sutherland, Halpern, Knight, Martin/Goldstein/Cialdini, Gladwel
  l, Shotton, Packard, Kahneman, Lancaster
source_chapter: |
  Part Five: Coupling; Chapter Ten, “Sylvia Plath”; Chapter Eleven, Kansas City experiments.
tags: [mkpsi-v2, research, p1]
related_skills: [mkpsi-orchestrator, mkpsi-output-verifier, mkpsi-manipulation-ethics-gate, mkpsi-add-good-friction-to-harmful-impulses, mkpsi-haystack-search-sweet-spot, mkpsi-target-choice-contexts-not-personas]
disable-model-invocation: true
---

# Map place, moment, means, and friction before blaming character.

## R — Reading

> “Coupling is the idea that behaviors are linked to very specific circumstances and conditions… If suicide is coupled, then it isn’t simply the act of depressed people. It’s the act of depressed people at a particular moment of extreme vulnerability and in combination with a particular, readily available lethal means.”
>
> — Source: Part Five: Coupling; Chapter Ten, “Sylvia Plath”; Chapter Eleven, Kansas City experiments.

**Source mechanism:** - **Recognize:** People explain a behavior as inevitable, dispositional, or transferable across contexts.
- **Interpret:** The behavior may be tightly coupled to specific places, times, tools, peer settings, or availability.
- **Act:** Build a context map: person state, place, time, means, friction, social environment, substitutes, and prevention leverage points.

**Evidence type:** source-specific candidate extraction; evidence grade must still be checked before rollout.

---

## I — Methodology skeleton (Interpretation)

- **Recognize:** People explain a behavior as inevitable, dispositional, or transferable across contexts.
- **Interpret:** The behavior may be tightly coupled to specific places, times, tools, peer settings, or availability.
- **Act:** Build a context map: person state, place, time, means, friction, social environment, substitutes, and prevention leverage points.

Operationally, this means:

1. Identify the exact behavior, judgment, message, or design choice at stake.
2. Confirm the trigger matches this atomic mechanism rather than a broader MKPSI sibling.
3. Apply the source method as a concrete checklist, copy/design move, research protocol, or decision procedure.
4. State evidence level and avoid overclaiming from cases, lab studies, memoir, or historical examples.
5. Ship only with an ethical boundary and a test/verification plan.

---

## A1 — Application in the source

### Case 1: British suicide rates fell when lethal town gas was replaced by natural gas rath
- **Problem:** British suicide rates fell when lethal town gas was replaced by natural gas rather than fully displacing to other methods.
- **Mechanism:** The source example shows the named mechanism changing perception, judgment, motivation, or behavior in a specific context.
- **Result/evidence:** Use as source evidence, not universal proof; preserve the conditions that made the example work.
- **Transfer rule:** Apply only when the user's context matches the mechanism and can be tested with guardrails.

### Case 2: Golden Gate Bridge jumpers prevented from jumping rarely killed themselves elsew
- **Problem:** Golden Gate Bridge jumpers prevented from jumping rarely killed themselves elsewhere.
- **Mechanism:** The second source example gives a cross-check against turning one anecdote into a rule.
- **Result/evidence:** Treat as corroborating evidence or boundary evidence depending on the example.
- **Transfer rule:** If this case conflicts with the user's context, route to `/mkpsi-orchestrator` or `/mkpsi-output-verifier`.

---

## A2 — Future Trigger

### User needs this skill when

1. “They would just do it somewhere else,” “that’s who they are,” “blocking method won’t matter.”
2. The user needs an executable artifact, intervention, research protocol, or decision check — not a book summary.
3. The user can provide enough context to define audience, behavior, evidence, and constraints.

### Language signals

- "They would just do it somewhere else"
- "criminals always move"
- "that’s just who she was"
- "blocking the method won’t matter."

### Distinction from siblings

- Use `/mkpsi-orchestrator` when multiple MKPSI mechanisms may apply or routing is unclear.
- Use `/mkpsi-output-verifier` after this skill produces an artifact or plan.
- Use `/mkpsi-manipulation-ethics-gate` first for hidden influence, vulnerable users, shame/fear/status exploitation, defaults, scarcity, authority, or sensitive data.
- Sibling confusion risks: - Not `mkpsi-environment-only`: individual motives still matter.
- Not `mkpsi-choice-architecture`: coupling includes high-stakes, place-bound behavior beyond product UX.

---

## E — Execution steps

1. **Apply the source method: - **Recognize:** People explain a behavior as inevitable, dispositional, or transferable across contexts. - **Interpret:** The behavior may be tightly coupled to specific places, times, tools, peer settings, or availability. - **Act:** Build a context map: person state, place, time, means, friction, social environment, substitutes, and prevention leverage points.**
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

- **Selected mechanism:** `mkpsi-coupling-context-map` — Map place, moment, means, and friction before blaming character.
- **Trigger fit:** why this skill applies and which sibling skills were intentionally not used.
- **Evidence level:** field/lab/case/memoir/historical/hypothesis/unsupported.
- **Concrete artifact:** copy, UX change, research protocol, decision checklist, experiment, or plan.
- **Ethical boundary:** what must not be faked, hidden, pressured, inferred, or overclaimed.
- **Test plan:** baseline, primary metric, guardrail metric, sample/duration, stop/decision rule.

---

## B — Boundary

### Do not use this skill when

- Do not reduce people to environments or deny agency. For self-harm, involve qualified crisis resources.
- The user only wants a book summary or author biography.
- The artifact affects high-risk contexts — minors, addiction, debt/financial hardship, health/legal/financial decisions, crisis/mental health, political persuasion, employment/housing/credit eligibility, or consent/privacy flows — unless the intervention clearly advances user welfare and preserves informed choice.
- The mechanism would require fake evidence, fake norms, fake scarcity, invented motives, invented founder stories, hidden fees, hidden defaults, or non-consensual sensitive inference.

### Source-specific misuse risks

- Not `mkpsi-environment-only`: individual motives still matter.
- Not `mkpsi-choice-architecture`: coupling includes high-stakes, place-bound behavior beyond product UX.

### Author/source blind spots

- Effects vary by audience, culture, channel, and stakes.
- Some source examples are case-based, historical, memoir-derived, or lab-derived; grade evidence before rollout.
- Modern privacy, dark-pattern, AI-personalization, and platform risks can make old persuasion tactics more harmful.

---

## Related skills

- depends-on: `/mkpsi-orchestrator` when routing is unclear; `/mkpsi-manipulation-ethics-gate` for sensitive influence; `/mkpsi-output-verifier` for final QA
- contrasts-with: see sibling-confusion notes above
- composes-with: /mkpsi-orchestrator, /mkpsi-output-verifier, /mkpsi-manipulation-ethics-gate, /mkpsi-add-good-friction-to-harmful-impulses, /mkpsi-haystack-search-sweet-spot, /mkpsi-target-choice-contexts-not-personas

---

## Audit information

- **Validation passed:** V1 ✓ / V2 ✓ / V3 ✓ (P1.)
- **Test pass rate:** designed; see `test-prompts.json`
- **Distillation date:** 2026-07-21
