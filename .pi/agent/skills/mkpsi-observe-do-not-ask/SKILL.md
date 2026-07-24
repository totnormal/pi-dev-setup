---
name: mkpsi-observe-do-not-ask
description: |
  Use when: “Survey says,” “customers say,” “purchase intent,” “focus group,” “claimed motivation.” Tr
  igger phrases: customers say,, survey says,, purchase intent,, claimed motivation,, focus group,, po
  st-rationalization,. NOT for: Observed data also has bias and sampling problems. Respect consent, pr
  ivacy, and data protection law.
source_book: |
  MKPSI behavioral persuasion corpus — Sutherland, Halpern, Knight, Martin/Goldstein/Cialdini, Gladwel
  l, Shotton, Packard, Kahneman, Lancaster
source_chapter: |
  Bias 7: The Danger of Claimed Data; Bias 22: The Replicability Crisis.
tags: [mkpsi-v2, research, p1]
related_skills: [mkpsi-orchestrator, mkpsi-output-verifier, mkpsi-manipulation-ethics-gate, mkpsi-depth-interview-motive-trace, mkpsi-test-learn-adapt-rct, mkpsi-target-choice-contexts-not-personas]
disable-model-invocation: true
---

# Replace claimed motivation with observed behavior evidence.

## R — Reading

> “Direct questioning is unsatisfactory because of lying and confabulation. A more accurate alternative is to observe behaviour.”
>
> — Source: Bias 7: The Danger of Claimed Data; Bias 22: The Replicability Crisis.

**Source mechanism:** - **Recognize:** Strategy depends on survey claims about why people bought, what influenced them, or what they would do.
- **Intervene:** Use behavioral cells, masked tests, found data, search data, receipts, live experiments, or third-person questioning to reduce social desirability and confabulation.
- **Assess:** Triangulate observed behavior against claims; trust patterns that repeat across methods.

**Evidence type:** source-specific candidate extraction; evidence grade must still be checked before rollout.

---

## I — Methodology skeleton (Interpretation)

- **Recognize:** Strategy depends on survey claims about why people bought, what influenced them, or what they would do.
- **Intervene:** Use behavioral cells, masked tests, found data, search data, receipts, live experiments, or third-person questioning to reduce social desirability and confabulation.
- **Assess:** Triangulate observed behavior against claims; trust patterns that repeat across methods.

Operationally, this means:

1. Identify the exact behavior, judgment, message, or design choice at stake.
2. Confirm the trigger matches this atomic mechanism rather than a broader MKPSI sibling.
3. Apply the source method as a concrete checklist, copy/design move, research protocol, or decision procedure.
4. State evidence level and avoid overclaiming from cases, lab studies, memoir, or historical examples.
5. Ship only with an ethical boundary and a test/verification plan.

---

## A1 — Application in the source

### Case 1: Adrian North’s wine-aisle music test
- **Problem:** Adrian North’s wine-aisle music test: French music produced 77% French wine sales; German music produced 73% German wine sales, but only 2% spontaneously credited music.
- **Mechanism:** The source example shows the named mechanism changing perception, judgment, motivation, or behavior in a specific context.
- **Result/evidence:** Use as source evidence, not universal proof; preserve the conditions that made the example work.
- **Transfer rule:** Apply only when the user's context matches the mechanism and can be tested with guardrails.

### Case 2: Shotton’s New Look dating-site bag test found volunteers holding New Look bags w
- **Problem:** Shotton’s New Look dating-site bag test found volunteers holding New Look bags were rated 20–25% less good-looking than when holding Topman bags.
- **Mechanism:** The second source example gives a cross-check against turning one anecdote into a rule.
- **Result/evidence:** Treat as corroborating evidence or boundary evidence depending on the example.
- **Transfer rule:** If this case conflicts with the user's context, route to `/mkpsi-orchestrator` or `/mkpsi-output-verifier`.

---

## A2 — Future Trigger

### User needs this skill when

1. “Survey says,” “customers say,” “purchase intent,” “focus group,” “claimed motivation.”
2. The user needs an executable artifact, intervention, research protocol, or decision check — not a book summary.
3. The user can provide enough context to define audience, behavior, evidence, and constraints.

### Language signals

- "customers say,"
- "survey says,"
- "purchase intent,"
- "claimed motivation,"
- "focus group,"
- "post-rationalization,"
- "found data."

### Distinction from siblings

- Use `/mkpsi-orchestrator` when multiple MKPSI mechanisms may apply or routing is unclear.
- Use `/mkpsi-output-verifier` after this skill produces an artifact or plan.
- Use `/mkpsi-manipulation-ethics-gate` first for hidden influence, vulnerable users, shame/fear/status exploitation, defaults, scarcity, authority, or sensitive data.
- Sibling confusion risks: - Not anti-research; it is anti-naive claimed-data reliance.
- Replicability sibling concerns evidence quality; this skill concerns data source and method.

---

## E — Execution steps

1. **Apply the source method: - **Recognize:** Strategy depends on survey claims about why people bought, what influenced them, or what they would do. - **Intervene:** Use behavioral cells, masked tests, found data, search data, receipts, live experiments, or third-person questioning to reduce social desirability and confabulation. - **Assess:** Triangulate observed behavior against claims; trust patterns that repeat across methods.**
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

- **Selected mechanism:** `mkpsi-observe-do-not-ask` — Replace claimed motivation with observed behavior evidence.
- **Trigger fit:** why this skill applies and which sibling skills were intentionally not used.
- **Evidence level:** field/lab/case/memoir/historical/hypothesis/unsupported.
- **Concrete artifact:** copy, UX change, research protocol, decision checklist, experiment, or plan.
- **Ethical boundary:** what must not be faked, hidden, pressured, inferred, or overclaimed.
- **Test plan:** baseline, primary metric, guardrail metric, sample/duration, stop/decision rule.

---

## B — Boundary

### Do not use this skill when

- Observed data also has bias and sampling problems. Respect consent, privacy, and data protection law.
- The user only wants a book summary or author biography.
- The artifact affects high-risk contexts — minors, addiction, debt/financial hardship, health/legal/financial decisions, crisis/mental health, political persuasion, employment/housing/credit eligibility, or consent/privacy flows — unless the intervention clearly advances user welfare and preserves informed choice.
- The mechanism would require fake evidence, fake norms, fake scarcity, invented motives, invented founder stories, hidden fees, hidden defaults, or non-consensual sensitive inference.

### Source-specific misuse risks

- Not anti-research; it is anti-naive claimed-data reliance.
- Replicability sibling concerns evidence quality; this skill concerns data source and method.

### Author/source blind spots

- Effects vary by audience, culture, channel, and stakes.
- Some source examples are case-based, historical, memoir-derived, or lab-derived; grade evidence before rollout.
- Modern privacy, dark-pattern, AI-personalization, and platform risks can make old persuasion tactics more harmful.

---

## Related skills

- depends-on: `/mkpsi-orchestrator` when routing is unclear; `/mkpsi-manipulation-ethics-gate` for sensitive influence; `/mkpsi-output-verifier` for final QA
- contrasts-with: see sibling-confusion notes above
- composes-with: /mkpsi-orchestrator, /mkpsi-output-verifier, /mkpsi-manipulation-ethics-gate, /mkpsi-depth-interview-motive-trace, /mkpsi-test-learn-adapt-rct, /mkpsi-target-choice-contexts-not-personas

---

## Audit information

- **Validation passed:** V1 ✓ / V2 ✓ / V3 ✓ (P1.)
- **Test pass rate:** designed; see `test-prompts.json`
- **Distillation date:** 2026-07-21
