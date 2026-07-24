---
name: mkpsi-peak-end-experience-design
description: |
  Use when: Satisfaction/review/repeat behavior depends on remembered completed experience. Trigger ph
  rases: final impression, checkout gift, last touch, peak-end, problem-freed, service recovery.. NOT 
  for: Do not manufacture problems to fix. Do not ignore baseline quality. Avoid manipulative endings 
  that mask serious harm.
source_book: |
  MKPSI behavioral persuasion corpus — Sutherland, Halpern, Knight, Martin/Goldstein/Cialdini, Gladwel
  l, Shotton, Packard, Kahneman, Lancaster
source_chapter: |
  Chapter 52, “saving the best ’til last”; Chapter 48, “error management.”
tags: [mkpsi-v2, choice, p1]
related_skills: [mkpsi-orchestrator, mkpsi-output-verifier, mkpsi-manipulation-ethics-gate, mkpsi-reduce-uncertainty-not-duration]
disable-model-invocation: true
---

# Design memorable peaks and the final moment of an experience.

## R — Reading

> “If you want to foster future collaboration with others, encourage greater customer loyalty, or simply get better feedback, while the advice would be to focus on the whole experience, you would be especially advised to make small changes that amplify the high points of the experience (or minimize the low points) and to enrich the very last thing that happens.”
>
> — Source: Chapter 52, “saving the best ’til last”; Chapter 48, “error management.”

**Source mechanism:** - **Recognize:** Satisfaction, memory, repeat behavior, or reviews depend on a completed experience.
- **Intervene:** Add a meaningful positive ending; fix service stumbles quickly and visibly; remove painful final frictions.
- **Assess:** Compare post-experience ratings, repeat purchase, referral, and review sentiment.

**Evidence type:** source-specific candidate extraction; evidence grade must still be checked before rollout.

---

## I — Methodology skeleton (Interpretation)

- **Recognize:** Satisfaction, memory, repeat behavior, or reviews depend on a completed experience.
- **Intervene:** Add a meaningful positive ending; fix service stumbles quickly and visibly; remove painful final frictions.
- **Assess:** Compare post-experience ratings, repeat purchase, referral, and review sentiment.

Operationally, this means:

1. Identify the exact behavior, judgment, message, or design choice at stake.
2. Confirm the trigger matches this atomic mechanism rather than a broader MKPSI sibling.
3. Apply the source method as a concrete checklist, copy/design move, research protocol, or decision procedure.
4. State evidence level and avoid overclaiming from cases, lab studies, memoir, or historical examples.
5. Ship only with an ethical boundary and a test/verification plan.

---

## A1 — Application in the source

### Case 1: **Recognize
- **Problem:** **Recognize:** Satisfaction, memory, repeat behavior, or reviews depend on a completed experience.
- **Mechanism:** The source example shows the named mechanism changing perception, judgment, motivation, or behavior in a specific context.
- **Result/evidence:** Use as source evidence, not universal proof; preserve the conditions that made the example work.
- **Transfer rule:** Apply only when the user's context matches the mechanism and can be tested with guardrails.

### Case 2: **Intervene
- **Problem:** **Intervene:** Add a meaningful positive ending; fix service stumbles quickly and visibly; remove painful final frictions.
- **Mechanism:** The second source example gives a cross-check against turning one anecdote into a rule.
- **Result/evidence:** Treat as corroborating evidence or boundary evidence depending on the example.
- **Transfer rule:** If this case conflicts with the user's context, route to `/mkpsi-orchestrator` or `/mkpsi-output-verifier`.

---

## A2 — Future Trigger

### User needs this skill when

1. Satisfaction/review/repeat behavior depends on remembered completed experience.
2. The user needs an executable artifact, intervention, research protocol, or decision check — not a book summary.
3. The user can provide enough context to define audience, behavior, evidence, and constraints.

### Language signals

- "final impression"
- "checkout gift"
- "last touch"
- "peak-end"
- "problem-freed"
- "service recovery."

### Distinction from siblings

- Use `/mkpsi-orchestrator` when multiple MKPSI mechanisms may apply or routing is unclear.
- Use `/mkpsi-output-verifier` after this skill produces an artifact or plan.
- Use `/mkpsi-manipulation-ethics-gate` first for hidden influence, vulnerable users, shame/fear/status exploitation, defaults, scarcity, authority, or sensitive data.
- Sibling confusion risks: - Not reciprocity alone; the timing and remembered ending are central.
- Not general customer service; it prioritizes peak and final moments over duration.

---

## E — Execution steps

1. **Apply the source method: - **Recognize:** Satisfaction, memory, repeat behavior, or reviews depend on a completed experience. - **Intervene:** Add a meaningful positive ending; fix service stumbles quickly and visibly; remove painful final frictions. - **Assess:** Compare post-experience ratings, repeat purchase, referral, and review sentiment.**
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

- **Selected mechanism:** `mkpsi-peak-end-experience-design` — Design memorable peaks and the final moment of an experience.
- **Trigger fit:** why this skill applies and which sibling skills were intentionally not used.
- **Evidence level:** field/lab/case/memoir/historical/hypothesis/unsupported.
- **Concrete artifact:** copy, UX change, research protocol, decision checklist, experiment, or plan.
- **Ethical boundary:** what must not be faked, hidden, pressured, inferred, or overclaimed.
- **Test plan:** baseline, primary metric, guardrail metric, sample/duration, stop/decision rule.

---

## B — Boundary

### Do not use this skill when

- Do not manufacture problems to fix. Do not ignore baseline quality. Avoid manipulative endings that mask serious harm.
- The user only wants a book summary or author biography.
- The artifact affects high-risk contexts — minors, addiction, debt/financial hardship, health/legal/financial decisions, crisis/mental health, political persuasion, employment/housing/credit eligibility, or consent/privacy flows — unless the intervention clearly advances user welfare and preserves informed choice.
- The mechanism would require fake evidence, fake norms, fake scarcity, invented motives, invented founder stories, hidden fees, hidden defaults, or non-consensual sensitive inference.

### Source-specific misuse risks

- Not reciprocity alone; the timing and remembered ending are central.
- Not general customer service; it prioritizes peak and final moments over duration.

### Author/source blind spots

- Effects vary by audience, culture, channel, and stakes.
- Some source examples are case-based, historical, memoir-derived, or lab-derived; grade evidence before rollout.
- Modern privacy, dark-pattern, AI-personalization, and platform risks can make old persuasion tactics more harmful.

---

## Related skills

- depends-on: `/mkpsi-orchestrator` when routing is unclear; `/mkpsi-manipulation-ethics-gate` for sensitive influence; `/mkpsi-output-verifier` for final QA
- contrasts-with: see sibling-confusion notes above
- composes-with: /mkpsi-orchestrator, /mkpsi-output-verifier, /mkpsi-manipulation-ethics-gate, /mkpsi-reduce-uncertainty-not-duration

---

## Audit information

- **Validation passed:** V1 ✓ / V2 ✓ / V3 ✓ (P1.)
- **Test pass rate:** designed; see `test-prompts.json`
- **Distillation date:** 2026-07-21
