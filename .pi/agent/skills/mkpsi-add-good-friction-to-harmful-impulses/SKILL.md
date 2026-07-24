---
name: mkpsi-add-good-friction-to-harmful-impulses
description: |
  Use when: Behavior is impulsive, addictive, automatic, risky, or hard to reverse. Trigger phrases: p
  eople regret it later, one-click purchase of risky product, autopilot behavior, cooling-off period, 
  make them pause.. NOT for: Avoid paternalistic overreach on ordinary preferences. Check substitution
   effects: people may shift to another harmful route. Never add friction to essential access such as 
  benefits, healthcare, or cancellation rights.
source_book: |
  MKPSI behavioral persuasion corpus — Sutherland, Halpern, Knight, Martin/Goldstein/Cialdini, Gladwel
  l, Shotton, Packard, Kahneman, Lancaster
source_chapter: |
  Chapter 3, “Easy”; “Putting a bump in the road”; suicide, gambling, credit, and speed bumps.
tags: [mkpsi-v2, choice, p1]
related_skills: [mkpsi-orchestrator, mkpsi-output-verifier, mkpsi-manipulation-ethics-gate, mkpsi-remove-hassle-before-adding-incentives, mkpsi-coupling-context-map]
disable-model-invocation: true
---

# Add small bumps before irreversible or harmful impulses.

## R — Reading

> “Sometimes the answer may be more friction – at least when we are trying to encourage people not to do something, or to pause for thought before doing something that they might later regret.”
>
> — Source: Chapter 3, “Easy”; “Putting a bump in the road”; suicide, gambling, credit, and speed bumps.

**Source mechanism:** - **Recognize:** The target behavior is impulsive, automatic, addictive, risky, or hard to reverse.
- **Intervene:** Insert delay, cooling-off, packaging friction, confirmation, physical barrier, or forced pause at the moment of impulse.
- **Assess:** Measure harm reduction, substitution, user burden, and equity impacts.

**Evidence type:** source-specific candidate extraction; evidence grade must still be checked before rollout.

---

## I — Methodology skeleton (Interpretation)

- **Recognize:** The target behavior is impulsive, automatic, addictive, risky, or hard to reverse.
- **Intervene:** Insert delay, cooling-off, packaging friction, confirmation, physical barrier, or forced pause at the moment of impulse.
- **Assess:** Measure harm reduction, substitution, user burden, and equity impacts.

Operationally, this means:

1. Identify the exact behavior, judgment, message, or design choice at stake.
2. Confirm the trigger matches this atomic mechanism rather than a broader MKPSI sibling.
3. Apply the source method as a concrete checklist, copy/design move, research protocol, or decision procedure.
4. State evidence level and avoid overclaiming from cases, lab studies, memoir, or historical examples.
5. Ship only with an ethical boundary and a test/verification plan.

---

## A1 — Application in the source

### Case 1: 1. UK paracetamol pack-size limits were associated with about 70 fewer suicides 
- **Problem:** 1. UK paracetamol pack-size limits were associated with about 70 fewer suicides per year by paracetamol ingestion and fewer liver transplants.
- **Mechanism:** The source example shows the named mechanism changing perception, judgment, motivation, or behavior in a specific context.
- **Result/evidence:** Use as source evidence, not universal proof; preserve the conditions that made the example work.
- **Transfer rule:** Apply only when the user's context matches the mechanism and can be tested with guardrails.

### Case 2: 2. Speed bumps and textured road surfaces jolt inattentive drivers into slowing 
- **Problem:** 2. Speed bumps and textured road surfaces jolt inattentive drivers into slowing before residential areas or junctions.
- **Mechanism:** The second source example gives a cross-check against turning one anecdote into a rule.
- **Result/evidence:** Treat as corroborating evidence or boundary evidence depending on the example.
- **Transfer rule:** If this case conflicts with the user's context, route to `/mkpsi-orchestrator` or `/mkpsi-output-verifier`.

---

## A2 — Future Trigger

### User needs this skill when

1. Behavior is impulsive, addictive, automatic, risky, or hard to reverse.
2. The user needs an executable artifact, intervention, research protocol, or decision check — not a book summary.
3. The user can provide enough context to define audience, behavior, evidence, and constraints.

### Language signals

- "people regret it later"
- "one-click purchase of risky product"
- "autopilot behavior"
- "cooling-off period"
- "make them pause."

### Distinction from siblings

- Use `/mkpsi-orchestrator` when multiple MKPSI mechanisms may apply or routing is unclear.
- Use `/mkpsi-output-verifier` after this skill produces an artifact or plan.
- Use `/mkpsi-manipulation-ethics-gate` first for hidden influence, vulnerable users, shame/fear/status exploitation, defaults, scarcity, authority, or sensitive data.
- Sibling confusion risks: - Opposite of `mkpsi-remove-hassle-before-adding-incentives`.
- Not punishment: the aim is reflective interruption, not pain or moralizing.

---

## E — Execution steps

1. **Apply the source method: - **Recognize:** The target behavior is impulsive, automatic, addictive, risky, or hard to reverse. - **Intervene:** Insert delay, cooling-off, packaging friction, confirmation, physical barrier, or forced pause at the moment of impulse. - **Assess:** Measure harm reduction, substitution, user burden, and equity impacts.**
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

- **Selected mechanism:** `mkpsi-add-good-friction-to-harmful-impulses` — Add small bumps before irreversible or harmful impulses.
- **Trigger fit:** why this skill applies and which sibling skills were intentionally not used.
- **Evidence level:** field/lab/case/memoir/historical/hypothesis/unsupported.
- **Concrete artifact:** copy, UX change, research protocol, decision checklist, experiment, or plan.
- **Ethical boundary:** what must not be faked, hidden, pressured, inferred, or overclaimed.
- **Test plan:** baseline, primary metric, guardrail metric, sample/duration, stop/decision rule.

---

## B — Boundary

### Do not use this skill when

- Avoid paternalistic overreach on ordinary preferences. Check substitution effects: people may shift to another harmful route. Never add friction to essential access such as benefits, healthcare, or cancellation rights.
- The user only wants a book summary or author biography.
- The artifact affects high-risk contexts — minors, addiction, debt/financial hardship, health/legal/financial decisions, crisis/mental health, political persuasion, employment/housing/credit eligibility, or consent/privacy flows — unless the intervention clearly advances user welfare and preserves informed choice.
- The mechanism would require fake evidence, fake norms, fake scarcity, invented motives, invented founder stories, hidden fees, hidden defaults, or non-consensual sensitive inference.

### Source-specific misuse risks

- Opposite of `mkpsi-remove-hassle-before-adding-incentives`.
- Not punishment: the aim is reflective interruption, not pain or moralizing.

### Author/source blind spots

- Effects vary by audience, culture, channel, and stakes.
- Some source examples are case-based, historical, memoir-derived, or lab-derived; grade evidence before rollout.
- Modern privacy, dark-pattern, AI-personalization, and platform risks can make old persuasion tactics more harmful.

---

## Related skills

- depends-on: `/mkpsi-orchestrator` when routing is unclear; `/mkpsi-manipulation-ethics-gate` for sensitive influence; `/mkpsi-output-verifier` for final QA
- contrasts-with: see sibling-confusion notes above
- composes-with: /mkpsi-orchestrator, /mkpsi-output-verifier, /mkpsi-manipulation-ethics-gate, /mkpsi-remove-hassle-before-adding-incentives, /mkpsi-coupling-context-map

---

## Audit information

- **Validation passed:** V1 ✓ / V2 ✓ / V3 ✓ (P1.)
- **Test pass rate:** designed; see `test-prompts.json`
- **Distillation date:** 2026-07-21
