---
name: mkpsi-aspiration-scale-trajectory
description: |
  Use when: demographics or income brackets don't explain behavior, or when two people with identical profiles behave differently. Trigger phrases: "they have the same income but buy differently," "demographics don't explain it," "where are they in life." NOT for: Do not assume aspiration without evidence of direction.
source_book: |
  The Strategy of Desire — Ernest Dichter (1960)
source_chapter: |
  Ch. 2 §2 "The Dynamic Principle: The Aspiration Scale"
tags: [mkpsi-v2, research, segmentation, p2]
related_skills: [mkpsi-orchestrator, mkpsi-output-verifier, mkpsi-functional-context-anthropology, mkpsi-find-real-why, mkpsi-values-to-task-appeal]
disable-model-invocation: true
---

# Map consumers by their life-direction and aspiration trajectory, not their static demographic state.

## R — Reading

> "Whether or not a person belongs to a particular social group may be less important than whether he is happy in this group, whether he feels he is there only temporarily, whether he has just reached this group or is on his way out, up, or down."
>
> — Source: Ch. 2 §2 "The Dynamic Principle: The Aspiration Scale"

**Source mechanism:** - **Recognize:** Static demographics (income, age, social class) are poor predictors because they ignore DIRECTION. Two people with identical incomes behave differently if one is ascending and the other is descending.
- **Interpret:** Human motivations are dynamic — they develop over a lifetime and repeat phylogenetic patterns. Where someone is HEADED matters more than where they ARE.
- **Act:** Map consumers on an aspiration scale: are they arriving, ascending, stable, descending, or leaving their current social/economic position? Position products as vehicles for the desired trajectory.

**Evidence type:** source-specific candidate extraction; evidence grade must still be checked before rollout.

---

## I — Methodology skeleton (Interpretation)

- **Recognize:** Static demographics (income, age, social class) are poor predictors because they ignore DIRECTION. Two people with identical incomes behave differently if one is ascending and the other is descending.
- **Interpret:** Human motivations are dynamic — they develop over a lifetime and repeat phylogenetic patterns. Where someone is HEADED matters more than where they ARE.
- **Act:** Map consumers on an aspiration scale: are they arriving, ascending, stable, descending, or leaving their current social/economic position? Position products as vehicles for the desired trajectory.

Operationally, this means:

1. Identify the exact behavior, judgment, message, or design choice at stake.
2. Confirm the trigger matches this atomic mechanism rather than a broader MKPSI sibling.
3. Apply the source method as a concrete checklist, copy/design move, research protocol, or decision procedure.
4. State evidence level and avoid overclaiming from cases, lab studies, memoir, or historical examples.
5. Ship only with an ethical boundary and a test/verification plan.

---

## A1 — Application in the source

### Case 1: Static income data didn't predict car-buying behavior.
- **Problem:** Static income data didn't predict car-buying behavior.
- **Mechanism:** The source example shows the named mechanism changing perception, judgment, motivation, or behavior in a specific context.
- **Result/evidence:** Dichter found that knowing what car a person PREVIOUSLY owned (their trajectory) predicted the next purchase better than current income. Whether earning power had CHANGED mattered more than the absolute amount. Treat as corroborating evidence, not universal proof.
- **Transfer rule:** Apply only when the user's context matches the mechanism and can be tested with guardrails.

### Case 2: Social group membership didn't predict product preferences.
- **Problem:** Social group membership didn't predict product preferences.
- **Mechanism:** The second source example gives a cross-check against turning one anecdote into a rule.
- **Result/evidence:** Two people in the same social class behave differently if one is happily established, one is temporarily passing through, one is ascending, or one fears decline. The aspiration scale captures direction, not position. Treat as corroborating or boundary evidence.
- **Transfer rule:** If this case conflicts with the user's context, route to `/mkpsi-orchestrator` or `/mkpsi-output-verifier`.

---

## A2 — Future Trigger

### User needs this skill when

1. "They have the same income but buy differently," "demographics don't explain it," "where are they in life."
2. The user needs to segment by trajectory/aspiration, not static state.
3. The user can describe the audience's current position and perceived direction.

### Language signals

See description trigger phrases.

### Distinction from siblings

- Use `/mkpsi-orchestrator` when multiple MKPSI mechanisms may apply or routing is unclear.
- Use `/mkpsi-output-verifier` after this skill produces an artifact or plan.
- Use `/mkpsi-manipulation-ethics-gate` first for hidden influence, vulnerable users, or sensitive contexts.
- Distinct from `mkpsi-values-to-task-appeal` (which maps values to tasks) — this is about mapping life-DIRECTION, not values.
- Distinct from `mkpsi-self-image-symbol-fit` (which fits messaging to self-image) — this is about the TRAJECTORY the consumer is on, not their current identity.

---

## E — Execution steps

1. **Identify the audience's current social/economic/life position (the static state).**
   - Done when: the final output contains this specific artifact/check, not generic advice.

2. **Determine their perceived direction: ascending, stable, descending, arriving, departing? Use interviews or behavioral signals (recent promotion, new home, career change, children leaving).**
   - Done when: the final output contains this specific artifact/check, not generic advice.

3. **Map the aspiration: what position are they trying to reach? What does the desired future look like?**
   - Done when: the final output contains this specific artifact/check, not generic advice.

4. **Position the product/behavior as a vehicle for the trajectory — not as a static status marker, but as a step toward the aspired position.**
   - Done when: the final output contains this specific artifact/check, not generic advice.

5. **Segment by trajectory: ascending buyers need different messaging than stable or descending buyers, even with identical demographics.**
   - Done when: the final output contains this specific artifact/check, not generic advice.

6. **Test whether trajectory-based segmentation predicts behavior better than demographic segmentation.**
   - Done when: the final output contains this specific artifact/check, not generic advice.

### Required output fields

- **Selected mechanism:** `mkpsi-aspiration-scale-trajectory` — Map consumers by their life-direction and aspiration trajectory, not their static demographic state.
- **Trigger fit:** why this skill applies and which sibling skills were intentionally not used.
- **Evidence level:** field/lab/case/memoir/historical/hypothesis/unsupported.
- **Concrete artifact:** copy, UX change, research protocol, decision checklist, experiment, or plan.
- **Ethical boundary:** what must not be faked, hidden, pressured, inferred, or overclaimed.
- **Test plan:** baseline, primary metric, guardrail metric, sample/duration, stop/decision rule.

---

## B — Boundary

### Do not use this skill when

- Do not assume aspiration without evidence — verify direction through interviews or behavioral data.
- Not all behavior is driven by aspiration; some is genuinely habitual or functional.
- Aspiration scales are culturally specific — what "ascending" means varies across cultures.
- The user only wants a book summary or author biography.
- The artifact affects high-risk contexts — minors, addiction, debt/financial hardship, health/legal/financial decisions, crisis/mental health, political persuasion, employment/housing/credit eligibility, or consent/privacy flows — unless the intervention clearly advances user welfare and preserves informed choice.

### Source-specific misuse risks

- Dichter's aspiration scale was developed for mid-century American consumers; modern mobility patterns and identity politics complicate the model.
- The phylogenetic claim (individuals repeat racial development) is dated and should not be taken literally.

---

## Related skills

- depends-on: `/mkpsi-orchestrator` when routing is unclear; `/mkpsi-manipulation-ethics-gate` for sensitive influence; `/mkpsi-output-verifier` for final QA
- contrasts-with: see sibling-confusion notes above
- composes-with: `mkpsi-orchestrator`, `mkpsi-output-verifier`, `mkpsi-functional-context-anthropology`, `mkpsi-find-real-why`, `mkpsi-values-to-task-appeal`

---

## Audit information

- **Validation passed:** V1 ✓ / V2 ✓ / V3 ✓ (P2.)
- **Test pass rate:** designed; see `test-prompts.json`
- **Distillation date:** 2026-07-21
