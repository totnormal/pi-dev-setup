---
name: mkpsi-hidden-need-value-map
description: |
  Use when: Rational feature is not enough to explain desire or resistance. Trigger phrases: feature d
  oesn’t sell,, what emotional job,, hidden need,, why this product matters,, security/status/power/ro
  ots.. NOT for: Use only needs the product can genuinely satisfy; avoid amplifying anxiety to create 
  demand; avoid targeting children or protected vulnerabilities.
source_book: |
  MKPSI behavioral persuasion corpus — Sutherland, Halpern, Knight, Martin/Goldstein/Cialdini, Gladwel
  l, Shotton, Packard, Kahneman, Lancaster
source_chapter: |
  Ch. 7 “Marketing Eight Hidden Needs”; Ch. 6 “Rx for Our Secret Distresses”
tags: [mkpsi-v2, general, p2]
related_skills: [mkpsi-orchestrator, mkpsi-output-verifier, mkpsi-manipulation-ethics-gate, mkpsi-find-real-why, mkpsi-guilt-permission-frame, mkpsi-reframe-with-meaning]
disable-model-invocation: true
---

# Convert features into explicit hidden-need hypotheses.

## R — Reading

> “Once the need was identified, and certified to be compelling, they began building the promise of its fulfillment into their sales presentations of such unlikely products as air conditioners, cake mixes, and motorboats.”
>
> — Source: Ch. 7 “Marketing Eight Hidden Needs”; Ch. 6 “Rx for Our Secret Distresses”

**Source mechanism:** - **Recognize:** A rational feature is not enough to explain or increase desire.
- **Interpret:** The product may be bought as emotional security, reassurance of worth, ego gratification, creative outlet, love object, power, roots, or immortality/control.
- **Act:** Map each feature to a hidden-need hypothesis, choose the strongest ethical promise, then rewrite the offer to deliver that need visibly and truthfully.

**Evidence type:** source-specific candidate extraction; evidence grade must still be checked before rollout.

---

## I — Methodology skeleton (Interpretation)

- **Recognize:** A rational feature is not enough to explain or increase desire.
- **Interpret:** The product may be bought as emotional security, reassurance of worth, ego gratification, creative outlet, love object, power, roots, or immortality/control.
- **Act:** Map each feature to a hidden-need hypothesis, choose the strongest ethical promise, then rewrite the offer to deliver that need visibly and truthfully.

Operationally, this means:

1. Identify the exact behavior, judgment, message, or design choice at stake.
2. Confirm the trigger matches this atomic mechanism rather than a broader MKPSI sibling.
3. Apply the source method as a concrete checklist, copy/design move, research protocol, or decision procedure.
4. State evidence level and avoid overclaiming from cases, lab studies, memoir, or historical examples.
5. Ship only with an ethical boundary and a test/verification plan.

---

## A1 — Application in the source

### Case 1: Home freezers were interpreted as “food in the home represents security, warmth,
- **Problem:** Home freezers were interpreted as “food in the home represents security, warmth, and safety.”
- **Mechanism:** The source example shows the named mechanism changing perception, judgment, motivation, or behavior in a specific context.
- **Result/evidence:** Use as source evidence, not universal proof; preserve the conditions that made the example work.
- **Transfer rule:** Apply only when the user's context matches the mechanism and can be tested with guardrails.

### Case 2: Cake mixes improved when makers left the housewife fresh eggs/milk to add, prese
- **Problem:** Cake mixes improved when makers left the housewife fresh eggs/milk to add, preserving a creative outlet.
- **Mechanism:** The second source example gives a cross-check against turning one anecdote into a rule.
- **Result/evidence:** Treat as corroborating evidence or boundary evidence depending on the example.
- **Transfer rule:** If this case conflicts with the user's context, route to `/mkpsi-orchestrator` or `/mkpsi-output-verifier`.

---

## A2 — Future Trigger

### User needs this skill when

1. Rational feature is not enough to explain desire or resistance.
2. The user needs an executable artifact, intervention, research protocol, or decision check — not a book summary.
3. The user can provide enough context to define audience, behavior, evidence, and constraints.

### Language signals

- "feature doesn’t sell,"
- "what emotional job,"
- "hidden need,"
- "why this product matters,"
- "security/status/power/roots."

### Distinction from siblings

- Use `/mkpsi-orchestrator` when multiple MKPSI mechanisms may apply or routing is unclear.
- Use `/mkpsi-output-verifier` after this skill produces an artifact or plan.
- Use `/mkpsi-manipulation-ethics-gate` first for hidden influence, vulnerable users, shame/fear/status exploitation, defaults, scarcity, authority, or sensitive data.
- Sibling confusion risks: - Not benefit-writing alone; it requires a specific psychological need hypothesis.
- Overlaps with Jobs-to-be-Done, but Packard’s frame emphasizes subconscious need and symbolic promise.
- Can be confused with exploitative vulnerability targeting; must include ethical delivery.

---

## E — Execution steps

1. **Apply the source method: - **Recognize:** A rational feature is not enough to explain or increase desire. - **Interpret:** The product may be bought as emotional security, reassurance of worth, ego gratification, creative outlet, love object, power, roots, or immortality/control. - **Act:** Map each feature to a hidden-need hypothesis, choose the strongest ethical promise, then rewrite the offer to deliver that need visibly and truthfully.**
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

- **Selected mechanism:** `mkpsi-hidden-need-value-map` — Convert features into explicit hidden-need hypotheses.
- **Trigger fit:** why this skill applies and which sibling skills were intentionally not used.
- **Evidence level:** field/lab/case/memoir/historical/hypothesis/unsupported.
- **Concrete artifact:** copy, UX change, research protocol, decision checklist, experiment, or plan.
- **Ethical boundary:** what must not be faked, hidden, pressured, inferred, or overclaimed.
- **Test plan:** baseline, primary metric, guardrail metric, sample/duration, stop/decision rule.

---

## B — Boundary

### Do not use this skill when

- Use only needs the product can genuinely satisfy; avoid amplifying anxiety to create demand; avoid targeting children or protected vulnerabilities.
- The user only wants a book summary or author biography.
- The artifact affects high-risk contexts — minors, addiction, debt/financial hardship, health/legal/financial decisions, crisis/mental health, political persuasion, employment/housing/credit eligibility, or consent/privacy flows — unless the intervention clearly advances user welfare and preserves informed choice.
- The mechanism would require fake evidence, fake norms, fake scarcity, invented motives, invented founder stories, hidden fees, hidden defaults, or non-consensual sensitive inference.

### Source-specific misuse risks

- Not benefit-writing alone; it requires a specific psychological need hypothesis.
- Overlaps with Jobs-to-be-Done, but Packard’s frame emphasizes subconscious need and symbolic promise.
- Can be confused with exploitative vulnerability targeting; must include ethical delivery.

### Author/source blind spots

- Effects vary by audience, culture, channel, and stakes.
- Some source examples are case-based, historical, memoir-derived, or lab-derived; grade evidence before rollout.
- Modern privacy, dark-pattern, AI-personalization, and platform risks can make old persuasion tactics more harmful.

---

## Related skills

- depends-on: `/mkpsi-orchestrator` when routing is unclear; `/mkpsi-manipulation-ethics-gate` for sensitive influence; `/mkpsi-output-verifier` for final QA
- contrasts-with: see sibling-confusion notes above
- composes-with: /mkpsi-orchestrator, /mkpsi-output-verifier, /mkpsi-manipulation-ethics-gate, /mkpsi-find-real-why, /mkpsi-guilt-permission-frame, /mkpsi-reframe-with-meaning

---

## Audit information

- **Validation passed:** V1 ✓ / V2 ✓ / V3 ✓ (P2.)
- **Test pass rate:** designed; see `test-prompts.json`
- **Distillation date:** 2026-07-21
