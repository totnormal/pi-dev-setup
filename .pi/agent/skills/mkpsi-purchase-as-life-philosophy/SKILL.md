---
name: mkpsi-purchase-as-life-philosophy
description: |
  Use when: economic anxiety suppresses purchasing, a category is in recession, or buyers need permission to spend on non-essentials. Trigger phrases: "they're afraid to spend," "the economy is making them cautious," "how do we get them to buy in uncertain times," "it feels frivolous." NOT for: Do not exploit economic anxiety manipulatively or push vulnerable buyers into unaffordable purchases.
source_book: |
  The Strategy of Desire — Ernest Dichter (1960)
source_chapter: |
  Ch. 8 "The Psycho-Economic Age"
tags: [mkpsi-v2, persuasion, economic-context, p2]
related_skills: [mkpsi-orchestrator, mkpsi-output-verifier, mkpsi-guilt-permission-frame, mkpsi-values-to-task-appeal, mkpsi-buyer-as-discoverer-credit]
disable-model-invocation: true
---

# Frame the purchase as an act of optimism and a declaration about the future — buying is a life philosophy, not just a transaction.

## R — Reading

> "Each time we buy a new car or suit, we base our decision on a philosophy of life. Buying is more than a commercial function — it is a declaration of faith in the future."
>
> — Source: Ch. 8 "The Psycho-Economic Age"

**Source mechanism:** - **Recognize:** Purchasing decisions are acts of optimism or pessimism about the future. When buyers delay, it's often not about money but about worldview.
- **Interpret:** Our economy runs on "psychological surplus" — 50% could get by without cars, 80% without TVs. The real driver of discretionary spending is a positive philosophy of life, not functional need.
- **Act:** Before selling the product, sell the positive philosophy. Frame the purchase as confidence in the future, a declaration that "things will be good." Give the buyer permission to be optimistic.

**Evidence type:** source-specific candidate extraction; evidence grade must still be checked before rollout.

---

## I — Methodology skeleton (Interpretation)

- **Recognize:** Purchasing decisions are acts of optimism or pessimism about the future. When buyers delay, it's often not about money but about worldview.
- **Interpret:** Our economy runs on "psychological surplus" — 50% could get by without cars, 80% without TVs. The real driver of discretionary spending is a positive philosophy of life, not functional need.
- **Act:** Before selling the product, sell the positive philosophy. Frame the purchase as confidence in the future, a declaration that "things will be good." Give the buyer permission to be optimistic.

Operationally, this means:

1. Identify the exact behavior, judgment, message, or design choice at stake.
2. Confirm the trigger matches this atomic mechanism rather than a broader MKPSI sibling.
3. Apply the source method as a concrete checklist, copy/design move, research protocol, or decision procedure.
4. State evidence level and avoid overclaiming from cases, lab studies, memoir, or historical examples.
5. Ship only with an ethical boundary and a test/verification plan.

---

## A1 — Application in the source

### Case 1: A car buyer postpones purchase "because I fear a depression."
- **Problem:** A car buyer postpones purchase "because I fear a depression."
- **Mechanism:** The source example shows the named mechanism changing perception, judgment, motivation, or behavior in a specific context.
- **Result/evidence:** Dichter: the salesman must sell a positive philosophy of life BEFORE selling the car. "Things are going to be good, not bad." The purchase becomes an act of confidence, not a gamble. Treat as corroborating evidence, not universal proof.
- **Transfer rule:** Apply only when the user's context matches the mechanism and can be tested with guardrails.

### Case 2: Economic fatalism — Americans had absorbed Marxist-style dialectical materialism, believing mysterious economic forces control their destiny.
- **Problem:** Economic fatalism — Americans had absorbed Marxist-style dialectical materialism, believing mysterious economic forces control their destiny.
- **Mechanism:** The second source example gives a cross-check against turning one anecdote into a rule.
- **Result/evidence:** Dichter argued this fatalism suppresses spending. The antidote: reframe buying as an assertion of individual agency — "it is ours to mold the future." The President urging citizens to buy to assure prosperity was "on sound psychological ground." Treat as corroborating or boundary evidence.
- **Transfer rule:** If this case conflicts with the user's context, route to `/mkpsi-orchestrator` or `/mkpsi-output-verifier`.

---

## A2 — Future Trigger

### User needs this skill when

1. "They're afraid to spend," "the economy is making them cautious," "how do we get them to buy in uncertain times," "it feels frivolous."
2. The user needs to address the psychological/economic anxiety beneath the purchasing reluctance.
3. The user can describe the category, the economic context, and the buyer's emotional state.

### Language signals

See description trigger phrases.

### Distinction from siblings

- Use `/mkpsi-orchestrator` when multiple MKPSI mechanisms may apply or routing is unclear.
- Use `/mkpsi-output-verifier` after this skill produces an artifact or plan.
- Use `/mkpsi-manipulation-ethics-gate` first for hidden influence, vulnerable users, or sensitive contexts.
- Related to `mkpsi-guilt-permission-frame` (which removes moral guilt) but this is about economic OPTIMISM, not moral permission.
- Related to `mkpsi-values-to-task-appeal` (which maps values to tasks) but this is specifically about framing the purchase as a FUTURE-ORIENTED act of confidence.

---

## E — Execution steps

1. **Identify the economic/emotional context: is the buyer anxious, pessimistic, waiting for "signs"?**
   - Done when: the final output contains this specific artifact/check, not generic advice.

2. **Diagnose the barrier: is it truly financial, or is it a worldview of caution/fatalism?**
   - Done when: the final output contains this specific artifact/check, not generic advice.

3. **Frame the purchase as optimism: position it as confidence in the future, an investment in better times, a declaration that "things will be good."**
   - Done when: the final output contains this specific artifact/check, not generic advice.

4. **Give permission to be optimistic: normalize discretionary spending as rational and forward-looking, not frivolous.**
   - Done when: the final output contains this specific artifact/check, not generic advice.

5. **Connect the product to the buyer's desired future self — not just the functional need, but the life they're building.**
   - Done when: the final output contains this specific artifact/check, not generic advice.

6. **Test whether optimism-framed messaging outperforms fear/scarcity messaging in the specific context.**
   - Done when: the final output contains this specific artifact/check, not generic advice.

### Required output fields

- **Selected mechanism:** `mkpsi-purchase-as-life-philosophy` — Frame the purchase as an act of optimism and a declaration about the future — buying is a life philosophy, not just a transaction.
- **Trigger fit:** why this skill applies and which sibling skills were intentionally not used.
- **Evidence level:** field/lab/case/memoir/historical/hypothesis/unsupported.
- **Concrete artifact:** copy, UX change, research protocol, decision checklist, experiment, or plan.
- **Ethical boundary:** what must not be faked, hidden, pressured, inferred, or overclaimed.
- **Test plan:** baseline, primary metric, guardrail metric, sample/duration, stop/decision rule.

---

## B — Boundary

### Do not use this skill when

- Do not exploit economic anxiety to push vulnerable buyers into unaffordable purchases.
- Do not use this to justify irresponsible lending or overconsumption.
- Optimism framing must be authentic — if the economic outlook is genuinely dire, false optimism is dishonest and backfires.
- The user only wants a book summary or author biography.
- The artifact affects high-risk contexts — minors, addiction, debt/financial hardship, health/legal/financial decisions, crisis/mental health, political persuasion, employment/housing/credit eligibility, or consent/privacy flows — unless the intervention clearly advances user welfare and preserves informed choice.

### Source-specific misuse risks

- Dichter's context was post-war American affluence; modern economic precarity (gig economy, debt, inequality) requires more nuanced framing.
- The "psychological surplus" argument can be used to justify overconsumption — ethical boundaries matter.
- Optimism messaging can feel tone-deaf during genuine crises (pandemic, recession, inflation).

---

## Related skills

- depends-on: `/mkpsi-orchestrator` when routing is unclear; `/mkpsi-manipulation-ethics-gate` for sensitive influence; `/mkpsi-output-verifier` for final QA
- contrasts-with: see sibling-confusion notes above
- composes-with: `mkpsi-orchestrator`, `mkpsi-output-verifier`, `mkpsi-guilt-permission-frame`, `mkpsi-values-to-task-appeal`, `mkpsi-buyer-as-discoverer-credit`

---

## Audit information

- **Validation passed:** V1 ✓ / V2 ✓ / V3 ✓ (P2.)
- **Test pass rate:** designed; see `test-prompts.json`
- **Distillation date:** 2026-07-21
