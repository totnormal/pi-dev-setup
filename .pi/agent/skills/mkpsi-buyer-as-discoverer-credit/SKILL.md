---
name: mkpsi-buyer-as-discoverer-credit
description: |
  Use when: messaging/advertising claims too much credit for the product's benefits, the buyer feels talked-down-to, or a sales process makes the buyer feel manipulated rather than clever. Trigger phrases: "they feel pushed," "our ads are too boastful," "the buyer resists being sold." NOT for: Do not fake buyer agency in manipulative ways.
source_book: |
  The Strategy of Desire — Ernest Dichter (1960)
source_chapter: |
  Ch. 8 "The Psycho-Economic Age" — "Buying is an Expression of Creativeness"
tags: [mkpsi-v2, persuasion, messaging, p2]
related_skills: [mkpsi-orchestrator, mkpsi-output-verifier, mkpsi-insight-as-persuasion-mirror, mkpsi-gratuitous-choice, mkpsi-self-image-symbol-fit]
disable-model-invocation: true
---

# Let the buyer feel like the creative discoverer of the choice — never steal the credit for their decision.

## R — Reading

> "Every time we go out and shop, we are trying to express our own creativeness. The advertiser makes the mistake of wanting credit for himself at the expense of commercial success."
>
> — Source: Ch. 8 "The Psycho-Economic Age" — "Buying is an Expression of Creativeness"

**Source mechanism:** - **Recognize:** Buying is a creative act — the buyer wants to feel like the clever discoverer, not the passive recipient of a sales pitch.
- **Interpret:** When advertising or sales messaging claims too much credit ("our product is brilliant"), it triggers resentment because it steals the buyer's sense of agency and discovery.
- **Act:** Frame the product/choice so the buyer gets the credit for their cleverness, foresight, and taste. Let them feel they discovered it, not that they were sold.

**Evidence type:** source-specific candidate extraction; evidence grade must still be checked before rollout.

---

## I — Methodology skeleton (Interpretation)

- **Recognize:** Buying is a creative act — the buyer wants to feel like the clever discoverer, not the passive recipient of a sales pitch.
- **Interpret:** When advertising or sales messaging claims too much credit ("our product is brilliant"), it triggers resentment because it steals the buyer's sense of agency and discovery.
- **Act:** Frame the product/choice so the buyer gets the credit for their cleverness, foresight, and taste. Let them feel they discovered it, not that they were sold.

Operationally, this means:

1. Identify the exact behavior, judgment, message, or design choice at stake.
2. Confirm the trigger matches this atomic mechanism rather than a broader MKPSI sibling.
3. Apply the source method as a concrete checklist, copy/design move, research protocol, or decision procedure.
4. State evidence level and avoid overclaiming from cases, lab studies, memoir, or historical examples.
5. Ship only with an ethical boundary and a test/verification plan.

---

## A1 — Application in the source

### Case 1: A life insurance company ran ads dramatizing the benefits of insurance as an institution. Readers resented them.
- **Problem:** A life insurance company ran ads dramatizing the benefits of insurance as an institution. Readers resented them.
- **Mechanism:** The source example shows the named mechanism changing perception, judgment, motivation, or behavior in a specific context.
- **Result/evidence:** The resentment: "Do they think they're the only smart ones? I selected the plan — the credit is MINE." Dichter advised letting the reader feel proud of their own foresight and ingenuity in choosing insurance. Treat as corroborating evidence, not universal proof.
- **Transfer rule:** Apply only when the user's context matches the mechanism and can be tested with guardrails.

### Case 2: Chrysler showrooms struggled to close sales.
- **Problem:** Chrysler showrooms struggled to close sales.
- **Mechanism:** The second source example gives a cross-check against turning one anecdote into a rule.
- **Result/evidence:** When a large mirror was placed so the buyer could see themselves sitting in the car, sales improved. The buyer saw how smart their choice looked — the drama of self-discovery, not the drama of the product. Treat as corroborating or boundary evidence.
- **Transfer rule:** If this case conflicts with the user's context, route to `/mkpsi-orchestrator` or `/mkpsi-output-verifier`.

---

## A2 — Future Trigger

### User needs this skill when

1. "They feel pushed," "our ads are too boastful," "the buyer resists being sold," "we need the buyer to feel clever."
2. The user needs to shift messaging from product-boasting to buyer-empowering.
3. The user can describe the current messaging and the buyer's emotional response.

### Language signals

See description trigger phrases.

### Distinction from siblings

- Use `/mkpsi-orchestrator` when multiple MKPSI mechanisms may apply or routing is unclear.
- Use `/mkpsi-output-verifier` after this skill produces an artifact or plan.
- Use `/mkpsi-manipulation-ethics-gate` first for hidden influence, vulnerable users, or sensitive contexts.
- Related to `mkpsi-gratuitous-choice` (giving people choices builds agency) but this is specifically about CREDIT and DISCOVERY, not choice architecture.
- Related to `mkpsi-insight-as-persuasion-mirror` (showing understanding) but this is about making the buyer the hero, not showing you understand them.

---

## E — Execution steps

1. **Audit current messaging: does it credit the product/company or the buyer? Count "we/our" vs "you/your."**
   - Done when: the final output contains this specific artifact/check, not generic advice.

2. **Identify where the messaging steals the buyer's sense of discovery (e.g., "our revolutionary formula" vs "your smart choice").**
   - Done when: the final output contains this specific artifact/check, not generic advice.

3. **Reframe to give the buyer credit: position the choice as their clever discovery, good taste, or foresight.**
   - Done when: the final output contains this specific artifact/check, not generic advice.

4. **Create moments of self-discovery in the buying process (the mirror in the showroom, the "aha" of recognizing a need).**
   - Done when: the final output contains this specific artifact/check, not generic advice.

5. **Leave room for the buyer's creativity: don't over-specify the use case; let them project their own identity onto the choice.**
   - Done when: the final output contains this specific artifact/check, not generic advice.

6. **Test whether buyer-credit messaging improves conversion and reduces resistance.**
   - Done when: the final output contains this specific artifact/check, not generic advice.

### Required output fields

- **Selected mechanism:** `mkpsi-buyer-as-discoverer-credit` — Let the buyer feel like the creative discoverer of the choice — never steal the credit for their decision.
- **Trigger fit:** why this skill applies and which sibling skills were intentionally not used.
- **Evidence level:** field/lab/case/memoir/historical/hypothesis/unsupported.
- **Concrete artifact:** copy, UX change, research protocol, decision checklist, experiment, or plan.
- **Ethical boundary:** what must not be faked, hidden, pressured, inferred, or overclaimed.
- **Test plan:** baseline, primary metric, guardrail metric, sample/duration, stop/decision rule.

---

## B — Boundary

### Do not use this skill when

- Do not fake buyer agency manipulatively — the choice must be genuinely good for the buyer.
- Do not use this to disguise a bad product — clever framing can't compensate for a poor offering.
- Some B2B/technical contexts genuinely require product-spec messaging — balance buyer credit with functional proof.
- The user only wants a book summary or author biography.
- The artifact affects high-risk contexts — minors, addiction, debt/financial hardship, health/legal/financial decisions, crisis/mental health, political persuasion, employment/housing/credit eligibility, or consent/privacy flows — unless the intervention clearly advances user welfare and preserves informed choice.

### Source-specific misuse risks

- The "creativity" framing is culturally specific; some audiences prefer authority/expertise over discovery.
- Dichter's examples are mid-century consumer goods; modern digital buying journeys need adapted discovery moments.

---

## Related skills

- depends-on: `/mkpsi-orchestrator` when routing is unclear; `/mkpsi-manipulation-ethics-gate` for sensitive influence; `/mkpsi-output-verifier` for final QA
- contrasts-with: see sibling-confusion notes above
- composes-with: `mkpsi-orchestrator`, `mkpsi-output-verifier`, `mkpsi-insight-as-persuasion-mirror`, `mkpsi-gratuitous-choice`, `mkpsi-self-image-symbol-fit`

---

## Audit information

- **Validation passed:** V1 ✓ / V2 ✓ / V3 ✓ (P2.)
- **Test pass rate:** designed; see `test-prompts.json`
- **Distillation date:** 2026-07-21
