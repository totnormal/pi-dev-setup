---
name: mkpsi-residual-impression-audit
description: |
  Use when: Audience remembers/reacts to something other than intended claim; negative claim or image 
  may backfire. Trigger phrases: unintended message,, why did this backfire,, negative claim,, bad ass
  ociation,, the image distracts,, residual impression.. NOT for: Prioritize truth and clarity; do not
   use the audit to make deception harder to notice; test vulnerable groups separately when stakes are
   high.
source_book: |
  MKPSI behavioral persuasion corpus — Sutherland, Halpern, Knight, Martin/Goldstein/Cialdini, Gladwel
  l, Shotton, Packard, Kahneman, Lancaster
source_chapter: |
  Ch. 14 “Coping with Our Pesky Inner Ear”; Ch. 4 “. . . And the Hooks Are Lowered”
tags: [mkpsi-v2, research, p2]
related_skills: [mkpsi-orchestrator, mkpsi-output-verifier, mkpsi-manipulation-ethics-gate, mkpsi-indirect-association-probe, mkpsi-metaphor-frame-audit, mkpsi-avoid-negative-social-proof]
disable-model-invocation: true
---

# Audit messages for unintended psychological leftovers.

## R — Reading

> “These experts began testing messages not only for their literal content but also for the ‘residual impression’ they were actually leaving on prospects.”
>
> — Source: Ch. 14 “Coping with Our Pesky Inner Ear”; Ch. 4 “. . . And the Hooks Are Lowered”

**Source mechanism:** - **Recognize:** The audience remembers or reacts to something other than the intended claim.
- **Interpret:** Visual details, metaphors, context, show mood, and negative claims may create a stronger hidden message.
- **Act:** Ask what the ad accidentally teaches; test recall, associations, and emotional residue; remove cues that evoke fear, waste, shame, irritation, crashes, feet-in-soup, or self-punishment.

**Evidence type:** source-specific candidate extraction; evidence grade must still be checked before rollout.

---

## I — Methodology skeleton (Interpretation)

- **Recognize:** The audience remembers or reacts to something other than the intended claim.
- **Interpret:** Visual details, metaphors, context, show mood, and negative claims may create a stronger hidden message.
- **Act:** Ask what the ad accidentally teaches; test recall, associations, and emotional residue; remove cues that evoke fear, waste, shame, irritation, crashes, feet-in-soup, or self-punishment.

Operationally, this means:

1. Identify the exact behavior, judgment, message, or design choice at stake.
2. Confirm the trigger matches this atomic mechanism rather than a broader MKPSI sibling.
3. Apply the source method as a concrete checklist, copy/design move, research protocol, or decision procedure.
4. State evidence level and avoid overclaiming from cases, lab studies, memoir, or historical examples.
5. Ship only with an ethical boundary and a test/verification plan.

---

## A1 — Application in the source

### Case 1: A refrigerator ad with an open door made women focus on waste/spoilage rather th
- **Problem:** A refrigerator ad with an open door made women focus on waste/spoilage rather than automatic defrosting.
- **Mechanism:** The source example shows the named mechanism changing perception, judgment, motivation, or behavior in a specific context.
- **Result/evidence:** Use as source evidence, not universal proof; preserve the conditions that made the example work.
- **Transfer rule:** Apply only when the user's context matches the mechanism and can be tested with guardrails.

### Case 2: “Less irritating” Philip Morris messaging caused people to complete “When I thin
- **Problem:** “Less irritating” Philip Morris messaging caused people to complete “When I think of Philip Morris…” with “irritation.”
- **Mechanism:** The second source example gives a cross-check against turning one anecdote into a rule.
- **Result/evidence:** Treat as corroborating evidence or boundary evidence depending on the example.
- **Transfer rule:** If this case conflicts with the user's context, route to `/mkpsi-orchestrator` or `/mkpsi-output-verifier`.

---

## A2 — Future Trigger

### User needs this skill when

1. Audience remembers/reacts to something other than intended claim; negative claim or image may backfire.
2. The user needs an executable artifact, intervention, research protocol, or decision check — not a book summary.
3. The user can provide enough context to define audience, behavior, evidence, and constraints.

### Language signals

- "unintended message,"
- "why did this backfire,"
- "negative claim,"
- "bad association,"
- "the image distracts,"
- "residual impression."

### Distinction from siblings

- Use `/mkpsi-orchestrator` when multiple MKPSI mechanisms may apply or routing is unclear.
- Use `/mkpsi-output-verifier` after this skill produces an artifact or plan.
- Use `/mkpsi-manipulation-ethics-gate` first for hidden influence, vulnerable users, shame/fear/status exploitation, defaults, scarcity, authority, or sensitive data.
- Sibling confusion risks: - Not legal claim review; it checks psychological leftovers.
- Not standard copyediting; it tests what people infer and remember.
- Not anti-creativity; surprising images are allowed if residue supports intent.

---

## E — Execution steps

1. **Apply the source method: - **Recognize:** The audience remembers or reacts to something other than the intended claim. - **Interpret:** Visual details, metaphors, context, show mood, and negative claims may create a stronger hidden message. - **Act:** Ask what the ad accidentally teaches; test recall, associations, and emotional residue; remove cues that evoke fear, waste, shame, irritation, crashes, feet-in-soup, or self-punishment.**
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

- **Selected mechanism:** `mkpsi-residual-impression-audit` — Audit messages for unintended psychological leftovers.
- **Trigger fit:** why this skill applies and which sibling skills were intentionally not used.
- **Evidence level:** field/lab/case/memoir/historical/hypothesis/unsupported.
- **Concrete artifact:** copy, UX change, research protocol, decision checklist, experiment, or plan.
- **Ethical boundary:** what must not be faked, hidden, pressured, inferred, or overclaimed.
- **Test plan:** baseline, primary metric, guardrail metric, sample/duration, stop/decision rule.

---

## B — Boundary

### Do not use this skill when

- Prioritize truth and clarity; do not use the audit to make deception harder to notice; test vulnerable groups separately when stakes are high.
- The user only wants a book summary or author biography.
- The artifact affects high-risk contexts — minors, addiction, debt/financial hardship, health/legal/financial decisions, crisis/mental health, political persuasion, employment/housing/credit eligibility, or consent/privacy flows — unless the intervention clearly advances user welfare and preserves informed choice.
- The mechanism would require fake evidence, fake norms, fake scarcity, invented motives, invented founder stories, hidden fees, hidden defaults, or non-consensual sensitive inference.

### Source-specific misuse risks

- Not legal claim review; it checks psychological leftovers.
- Not standard copyediting; it tests what people infer and remember.
- Not anti-creativity; surprising images are allowed if residue supports intent.

### Author/source blind spots

- Effects vary by audience, culture, channel, and stakes.
- Some source examples are case-based, historical, memoir-derived, or lab-derived; grade evidence before rollout.
- Modern privacy, dark-pattern, AI-personalization, and platform risks can make old persuasion tactics more harmful.

---

## Related skills

- depends-on: `/mkpsi-orchestrator` when routing is unclear; `/mkpsi-manipulation-ethics-gate` for sensitive influence; `/mkpsi-output-verifier` for final QA
- contrasts-with: see sibling-confusion notes above
- composes-with: /mkpsi-orchestrator, /mkpsi-output-verifier, /mkpsi-manipulation-ethics-gate, /mkpsi-indirect-association-probe, /mkpsi-metaphor-frame-audit, /mkpsi-avoid-negative-social-proof

---

## Audit information

- **Validation passed:** V1 ✓ / V2 ✓ / V3 ✓ (P2.)
- **Test pass rate:** designed; see `test-prompts.json`
- **Distillation date:** 2026-07-21
