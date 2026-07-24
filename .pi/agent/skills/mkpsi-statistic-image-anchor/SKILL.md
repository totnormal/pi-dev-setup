---
name: mkpsi-statistic-image-anchor
description: |
  Use when: “We have the data,” spreadsheet/statistical proof is not landing, too many numbers. Trigge
  r phrases: We have the data, include the stats, prove it with numbers, the spreadsheet says…. NOT fo
  r: Do not cherry-pick comparisons that materially mislead; include context when decisions require pr
  ecision. - **Validation notes:** - **V1:** Reduce to one primary number. - **V2:** Add familiar comp
  arison and optional story. - **V3:** Test recall of both
source_book: |
  MKPSI behavioral persuasion corpus — Sutherland, Halpern, Knight, Martin/Goldstein/Cialdini, Gladwel
  l, Shotton, Packard, Kahneman, Lancaster
source_chapter: |
  Chapter 23, “Think of a Number”; “Finding persuasive points of comparison”; “Less is more”
tags: [mkpsi-v2, bias, p1]
related_skills: [mkpsi-orchestrator, mkpsi-output-verifier, mkpsi-manipulation-ethics-gate, mkpsi-three-drug-story-arc, mkpsi-benefits-before-costs-ordering]
disable-model-invocation: true
---

# Turn statistics into vivid comparisons and human-scale images.

## R — Reading

> “Use numbers only to create powerful impressions and images.”
- **Atomic executable skill:** Replace a raw statistic dump with one vivid number, a comparison anchor, and, if possible, a human story.
- **RIA skeleton:**
  - **Recognize:** Message contains too many numbers or assumes numerical literacy will persuade.
  - **Intervene:** Choose one number; compare it to a familiar object/cost/scale; attach a human example.
  - **Assess:** Audience remembers the scale and why it matters.
- **2 source examples:**
  1. TV licence fee as “40p a day, the price of a tin of beans” versus “£3.6 billion… enough for 250 new schools.”
  2. A single startling statistic, e.g. “24,000 children die every day from malnutrition,” can explode like a grenade.
- **Trigger phrases:** “We have the data”; “include the stats”; “prove it with numbers”; “the spreadsheet says…”
- **Sibling confusion risks:** Related to perspective framing, but specifically handles quantitative claims.
- **Boundaries:** Do not cherry-pick comparisons that materially mislead; include context when decisions require precision.
- **Validation notes:**
  - **V1:** Reduce to one primary number.
  - **V2:** Add familiar comparison and optional story.
  - **V3:** Test recall of both number and implied scale.”
>
> — Source: Chapter 23, “Think of a Number”; “Finding persuasive points of comparison”; “Less is more”
- **Quote (<=100 words):** “Use numbers only to create powerful impressions and images.”
- **Atomic executable skill:** Replace a raw statistic dump with one vivid number, a comparison anchor, and, if possible, a human story.
- **RIA skeleton:**
  - **Recognize:** Message contains too many numbers or assumes numerical literacy will persuade.
  - **Intervene:** Choose one number; compare it to a familiar object/cost/scale; attach a human example.
  - **Assess:** Audience remembers the scale and why it matters.
- **2 source examples:**
  1. TV licence fee as “40p a day, the price of a tin of beans” versus “£3.6 billion… enough for 250 new schools.”
  2. A single startling statistic, e.g. “24,000 children die every day from malnutrition,” can explode like a grenade.
- **Trigger phrases:** “We have the data”; “include the stats”; “prove it with numbers”; “the spreadsheet says…”
- **Sibling confusion risks:** Related to perspective framing, but specifically handles quantitative claims.
- **Boundaries:** Do not cherry-pick comparisons that materially mislead; include context when decisions require precision.
- **Validation notes:**
  - **V1:** Reduce to one primary number.
  - **V2:** Add familiar comparison and optional story.
  - **V3:** Test recall of both number and implied scale.

**Source mechanism:** - **Recognize:** Message contains too many numbers or assumes numerical literacy will persuade.
  - **Intervene:** Choose one number; compare it to a familiar object/cost/scale; attach a human example.
  - **Assess:** Audience remembers the scale and why it matters.
- **2 source examples:**
  1. TV licence fee as “40p a day, the price of a tin of beans” versus “£3.6 billion… enough for 250 new schools.”
  2. A single startling statistic, e.g. “24,000 children die every day from malnutrition,” can explode like a grenade.
- **Trigger phrases:** “We have the data”; “include the stats”; “prove it with numbers”; “the spreadsheet says…”
- **Sibling confusion risks:** Related to perspective framing

**Evidence type:** source-specific candidate extraction; evidence grade must still be checked before rollout.

---

## I — Methodology skeleton (Interpretation)

- **Recognize:** Message contains too many numbers or assumes numerical literacy will persuade.
  - **Intervene:** Choose one number; compare it to a familiar object/cost/scale; attach a human example.
  - **Assess:** Audience remembers the scale and why it matters.
- **2 source examples:**
  1. TV licence fee as “40p a day, the price of a tin of beans” versus “£3.6 billion… enough for 250 new schools.”
  2. A single startling statistic, e.g. “24,000 children die every day from malnutrition,” can explode like a grenade.
- **Trigger phrases:** “We have the data”; “include the stats”; “prove it with numbers”; “the spreadsheet says…”
- **Sibling confusion risks:** Related to perspective framing, but specifically handles quantitative claims.
- **Boundaries:** Do not cherry-pick comparisons that materially mislead; include context when decisions require precision.
- **Validation notes:**
  - **V1:** Reduce to one primary number.
  - **V2:** Add familiar comparison and optional story.
  - **V3:** Test recall of both number and implied scale.

Operationally, this means:

1. Identify the exact behavior, judgment, message, or design choice at stake.
2. Confirm the trigger matches this atomic mechanism rather than a broader MKPSI sibling.
3. Apply the source method as a concrete checklist, copy/design move, research protocol, or decision procedure.
4. State evidence level and avoid overclaiming from cases, lab studies, memoir, or historical examples.
5. Ship only with an ethical boundary and a test/verification plan.

---

## A1 — Application in the source

### Case 1: 1. TV licence fee as “40p a day, the price of a tin of beans” versus “£3.6 billi
- **Problem:** 1. TV licence fee as “40p a day, the price of a tin of beans” versus “£3.6 billion… enough for 250 new schools.”
- **Mechanism:** The source example shows the named mechanism changing perception, judgment, motivation, or behavior in a specific context.
- **Result/evidence:** Use as source evidence, not universal proof; preserve the conditions that made the example work.
- **Transfer rule:** Apply only when the user's context matches the mechanism and can be tested with guardrails.

### Case 2: 2. A single startling statistic, e.g. “24,000 children die every day from malnut
- **Problem:** 2. A single startling statistic, e.g. “24,000 children die every day from malnutrition,” can explode like a grenade.
- **Mechanism:** The second source example gives a cross-check against turning one anecdote into a rule.
- **Result/evidence:** Treat as corroborating evidence or boundary evidence depending on the example.
- **Transfer rule:** If this case conflicts with the user's context, route to `/mkpsi-orchestrator` or `/mkpsi-output-verifier`.

---

## A2 — Future Trigger

### User needs this skill when

1. “We have the data,” spreadsheet/statistical proof is not landing, too many numbers.
2. The user needs an executable artifact, intervention, research protocol, or decision check — not a book summary.
3. The user can provide enough context to define audience, behavior, evidence, and constraints.

### Language signals

- "We have the data"
- "include the stats"
- "prove it with numbers"
- "the spreadsheet says…"

### Distinction from siblings

- Use `/mkpsi-orchestrator` when multiple MKPSI mechanisms may apply or routing is unclear.
- Use `/mkpsi-output-verifier` after this skill produces an artifact or plan.
- Use `/mkpsi-manipulation-ethics-gate` first for hidden influence, vulnerable users, shame/fear/status exploitation, defaults, scarcity, authority, or sensitive data.
- Sibling confusion risks: Related to perspective framing, but specifically handles quantitative claims.
- **Boundaries:** Do not cherry-pick comparisons that materially mislead; include context when decisions require precision.
- **Validation notes:**
  - **V1:** Reduce to one primary number.
  - **V2:** Add familiar comparison and optional story.
  - **V3:** Test recall of both number and implied scale.

---

## E — Execution steps

1. **Apply the source method: - **Recognize:** Message contains too many numbers or assumes numerical literacy will persuade. - **Intervene:** Choose one number; compare it to a familiar object/cost/scale; attach a human example. - **Assess:** Audience remembers the scale and why it matters. - **2 source examples:** 1. TV licence fee as “40p a day, the price of a tin of beans” versus “£3.6 billion… enough for 250 new schools.” 2. A single startli**
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

- **Selected mechanism:** `mkpsi-statistic-image-anchor` — Turn statistics into vivid comparisons and human-scale images.
- **Trigger fit:** why this skill applies and which sibling skills were intentionally not used.
- **Evidence level:** field/lab/case/memoir/historical/hypothesis/unsupported.
- **Concrete artifact:** copy, UX change, research protocol, decision checklist, experiment, or plan.
- **Ethical boundary:** what must not be faked, hidden, pressured, inferred, or overclaimed.
- **Test plan:** baseline, primary metric, guardrail metric, sample/duration, stop/decision rule.

---

## B — Boundary

### Do not use this skill when

- Do not cherry-pick comparisons that materially mislead; include context when decisions require precision.
- **Validation notes:**
  - **V1:** Reduce to one primary number.
  - **V2:** Add familiar comparison and optional story.
  - **V3:** Test recall of both number and implied scale.
- The user only wants a book summary or author biography.
- The artifact affects high-risk contexts — minors, addiction, debt/financial hardship, health/legal/financial decisions, crisis/mental health, political persuasion, employment/housing/credit eligibility, or consent/privacy flows — unless the intervention clearly advances user welfare and preserves informed choice.
- The mechanism would require fake evidence, fake norms, fake scarcity, invented motives, invented founder stories, hidden fees, hidden defaults, or non-consensual sensitive inference.

### Source-specific misuse risks

Related to perspective framing, but specifically handles quantitative claims.
- **Boundaries:** Do not cherry-pick comparisons that materially mislead; include context when decisions require precision.
- **Validation notes:**
  - **V1:** Reduce to one primary number.
  - **V2:** Add familiar comparison and optional story.
  - **V3:** Test recall of both number and implied scale.

### Author/source blind spots

- Effects vary by audience, culture, channel, and stakes.
- Some source examples are case-based, historical, memoir-derived, or lab-derived; grade evidence before rollout.
- Modern privacy, dark-pattern, AI-personalization, and platform risks can make old persuasion tactics more harmful.

---

## Related skills

- depends-on: `/mkpsi-orchestrator` when routing is unclear; `/mkpsi-manipulation-ethics-gate` for sensitive influence; `/mkpsi-output-verifier` for final QA
- contrasts-with: see sibling-confusion notes above
- composes-with: /mkpsi-orchestrator, /mkpsi-output-verifier, /mkpsi-manipulation-ethics-gate, /mkpsi-three-drug-story-arc, /mkpsi-benefits-before-costs-ordering

---

## Audit information

- **Validation passed:** V1 ✓ / V2 ✓ / V3 ✓ (P1.)
- **Test pass rate:** designed; see `test-prompts.json`
- **Distillation date:** 2026-07-21
