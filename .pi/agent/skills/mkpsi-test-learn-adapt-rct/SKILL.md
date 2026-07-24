---
name: mkpsi-test-learn-adapt-rct
description: |
  Use when: Stakeholders argue from theory, taste, anecdote, precedent, or confidence about what will 
  influence behavior. Trigger phrases: we don’t know which version works, pilot before rollout, contro
  l group, randomized, existing management data, scale or scrap.. NOT for: Randomization must be ethic
  al, legally permitted, and fair. Do not withhold proven essential services. Predefine primary outcom
  es and guard against p-hacking or post-hoc storytelling.
source_book: |
  MKPSI behavioral persuasion corpus — Sutherland, Halpern, Knight, Martin/Goldstein/Cialdini, Gladwel
  l, Shotton, Packard, Kahneman, Lancaster
source_chapter: |
  Chapter 10, “What works? The Rise of Experimental Government”; BIT rapid RCTs; “test, learn and adap
  t”; APPL(E)S “Experimentation”.
tags: [mkpsi-v2, governance, p0]
related_skills: [mkpsi-orchestrator, mkpsi-output-verifier, mkpsi-manipulation-ethics-gate, mkpsi-balance-short-and-long-metrics, mkpsi-mr-validity-ladder]
disable-model-invocation: true
---

# Turn persuasion guesses into low-cost randomized learning loops.

## R — Reading

> “If it is results we’re after, our leaders – and all of us – need a different strategy. We, they and their advisers, need to get used to saying, ‘I don’t know – but I know how we can find out.’ We can test, learn and adapt.”
>
> — Source: Chapter 10, “What works? The Rise of Experimental Government”; BIT rapid RCTs; “test, learn and adapt”; APPL(E)S “Experimentation”.

**Source mechanism:** - **Recognize:** Stakeholders are arguing from theory, precedent, confidence, politics, or anecdotes.
- **Intervene:** Define success metric, randomize eligible units, include control/current-practice arm, run cheaply using existing admin data, adapt from results.
- **Assess:** Estimate impact, confidence, heterogeneity, costs, operational feasibility, and scale/no-scale decision.

**Evidence type:** source-specific candidate extraction; evidence grade must still be checked before rollout.

---

## I — Methodology skeleton (Interpretation)

- **Recognize:** Stakeholders are arguing from theory, precedent, confidence, politics, or anecdotes.
- **Intervene:** Define success metric, randomize eligible units, include control/current-practice arm, run cheaply using existing admin data, adapt from results.
- **Assess:** Estimate impact, confidence, heterogeneity, costs, operational feasibility, and scale/no-scale decision.

Operationally, this means:

1. Identify the exact behavior, judgment, message, or design choice at stake.
2. Confirm the trigger matches this atomic mechanism rather than a broader MKPSI sibling.
3. Apply the source method as a concrete checklist, copy/design move, research protocol, or decision procedure.
4. State evidence level and avoid overclaiming from cases, lab studies, memoir, or historical examples.
5. Ship only with an ethical boundary and a test/verification plan.

---

## A1 — Application in the source

### Case 1: 1. HMRC tax letters were ideal early RCTs because letters were cheap and payment
- **Problem:** 1. HMRC tax letters were ideal early RCTs because letters were cheap and payment systems already tracked outcomes.
- **Mechanism:** The source example shows the named mechanism changing perception, judgment, motivation, or behavior in a specific context.
- **Result/evidence:** Use as source evidence, not universal proof; preserve the conditions that made the example work.
- **Transfer rule:** Apply only when the user's context matches the mechanism and can be tested with guardrails.

### Case 2: 2. Growth vouchers were set up as a true RCT, randomly turning down some qualifi
- **Problem:** 2. Growth vouchers were set up as a true RCT, randomly turning down some qualified businesses and testing online vs face-to-face advice before scaling.
- **Mechanism:** The second source example gives a cross-check against turning one anecdote into a rule.
- **Result/evidence:** Treat as corroborating evidence or boundary evidence depending on the example.
- **Transfer rule:** If this case conflicts with the user's context, route to `/mkpsi-orchestrator` or `/mkpsi-output-verifier`.

---

## A2 — Future Trigger

### User needs this skill when

1. Stakeholders argue from theory, taste, anecdote, precedent, or confidence about what will influence behavior.
2. The user needs an executable artifact, intervention, research protocol, or decision check — not a book summary.
3. The user can provide enough context to define audience, behavior, evidence, and constraints.

### Language signals

- "we don’t know which version works"
- "pilot before rollout"
- "control group"
- "randomized"
- "existing management data"
- "scale or scrap."

### Distinction from siblings

- Use `/mkpsi-orchestrator` when multiple MKPSI mechanisms may apply or routing is unclear.
- Use `/mkpsi-output-verifier` after this skill produces an artifact or plan.
- Use `/mkpsi-manipulation-ethics-gate` first for hidden influence, vulnerable users, shame/fear/status exploitation, defaults, scarcity, authority, or sensitive data.
- Sibling confusion risks: - Not merely A/B copy testing: applies to policy, service design, incentives, operations, and eligibility rules.
- Not `mkpsi-what-works-evidence-toolkit`: this creates new evidence; toolkits collate evidence.

---

## E — Execution steps

1. **Apply the source method: - **Recognize:** Stakeholders are arguing from theory, precedent, confidence, politics, or anecdotes. - **Intervene:** Define success metric, randomize eligible units, include control/current-practice arm, run cheaply using existing admin data, adapt from results. - **Assess:** Estimate impact, confidence, heterogeneity, costs, operational feasibility, and scale/no-scale decision.**
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

- **Selected mechanism:** `mkpsi-test-learn-adapt-rct` — Turn persuasion guesses into low-cost randomized learning loops.
- **Trigger fit:** why this skill applies and which sibling skills were intentionally not used.
- **Evidence level:** field/lab/case/memoir/historical/hypothesis/unsupported.
- **Concrete artifact:** copy, UX change, research protocol, decision checklist, experiment, or plan.
- **Ethical boundary:** what must not be faked, hidden, pressured, inferred, or overclaimed.
- **Test plan:** baseline, primary metric, guardrail metric, sample/duration, stop/decision rule.

---

## B — Boundary

### Do not use this skill when

- Randomization must be ethical, legally permitted, and fair. Do not withhold proven essential services. Predefine primary outcomes and guard against p-hacking or post-hoc storytelling.
- The user only wants a book summary or author biography.
- The artifact affects high-risk contexts — minors, addiction, debt/financial hardship, health/legal/financial decisions, crisis/mental health, political persuasion, employment/housing/credit eligibility, or consent/privacy flows — unless the intervention clearly advances user welfare and preserves informed choice.
- The mechanism would require fake evidence, fake norms, fake scarcity, invented motives, invented founder stories, hidden fees, hidden defaults, or non-consensual sensitive inference.

### Source-specific misuse risks

- Not merely A/B copy testing: applies to policy, service design, incentives, operations, and eligibility rules.
- Not `mkpsi-what-works-evidence-toolkit`: this creates new evidence; toolkits collate evidence.

### Author/source blind spots

- Effects vary by audience, culture, channel, and stakes.
- Some source examples are case-based, historical, memoir-derived, or lab-derived; grade evidence before rollout.
- Modern privacy, dark-pattern, AI-personalization, and platform risks can make old persuasion tactics more harmful.

---

## Related skills

- depends-on: `/mkpsi-orchestrator` when routing is unclear; `/mkpsi-manipulation-ethics-gate` for sensitive influence; `/mkpsi-output-verifier` for final QA
- contrasts-with: see sibling-confusion notes above
- composes-with: /mkpsi-orchestrator, /mkpsi-output-verifier, /mkpsi-manipulation-ethics-gate, /mkpsi-balance-short-and-long-metrics, /mkpsi-mr-validity-ladder

---

## Audit information

- **Validation passed:** V1 ✓ / V2 ✓ / V3 ✓ (P0.)
- **Test pass rate:** designed; see `test-prompts.json`
- **Distillation date:** 2026-07-21
