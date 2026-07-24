---
name: mkpsi-simplify-message-to-one-clear-action
description: |
  Use when: Action is buried in legalese, long copy, information pages, or multiple requests. Trigger 
  phrases: the legal team wrote it, details are on the back, users should read carefully, we gave them
   all the information, the link goes to the information page.. NOT for: Preserve legally required dis
  closures and material risks, but separate them from the primary action instruction. Do not oversimpl
  ify complex choices into misleading certainty.
source_book: |
  MKPSI behavioral persuasion corpus — Sutherland, Halpern, Knight, Martin/Goldstein/Cialdini, Gladwel
  l, Shotton, Packard, Kahneman, Lancaster
source_chapter: |
  Chapter 3, “Easy”; “Simplify, reduce hassle and take out friction”; plain English letters and direct
   links.
tags: [mkpsi-v2, general, p1]
related_skills: [mkpsi-orchestrator, mkpsi-output-verifier, mkpsi-manipulation-ethics-gate, mkpsi-salience-personalize-reminder, mkpsi-remove-hassle-before-adding-incentives, mkpsi-benefits-before-costs-ordering]
disable-model-invocation: true
---

# Strip communications to one plain-language request.

## R — Reading

> “We found that tax letters written in plain English, with a clear, simple request at the beginning, could often be 200–300 per cent more effective than the originals we compared them with.”
>
> — Source: Chapter 3, “Easy”; “Simplify, reduce hassle and take out friction”; plain English letters and direct links.

**Source mechanism:** - **Recognize:** Recipients ignore, misunderstand, or reread official/business messages; action details are buried.
- **Intervene:** Put the request, deadline, and action path at the top; cut legalese; reduce text; link directly to the target action.
- **Assess:** Measure response, completion, comprehension, and error rates.

**Evidence type:** source-specific candidate extraction; evidence grade must still be checked before rollout.

---

## I — Methodology skeleton (Interpretation)

- **Recognize:** Recipients ignore, misunderstand, or reread official/business messages; action details are buried.
- **Intervene:** Put the request, deadline, and action path at the top; cut legalese; reduce text; link directly to the target action.
- **Assess:** Measure response, completion, comprehension, and error rates.

Operationally, this means:

1. Identify the exact behavior, judgment, message, or design choice at stake.
2. Confirm the trigger matches this atomic mechanism rather than a broader MKPSI sibling.
3. Apply the source method as a concrete checklist, copy/design move, research protocol, or decision procedure.
4. State evidence level and avoid overclaiming from cases, lab studies, memoir, or historical examples.
5. Ship only with an ethical boundary and a test/verification plan.

---

## A1 — Application in the source

### Case 1: 1. Plain-English tax letters with a clear request at the beginning were often 20
- **Problem:** 1. Plain-English tax letters with a clear request at the beginning were often 200–300% more effective than originals.
- **Mechanism:** The source example shows the named mechanism changing perception, judgment, motivation, or behavior in a specific context.
- **Result/evidence:** Use as source evidence, not universal proof; preserve the conditions that made the example work.
- **Transfer rule:** Apply only when the user's context matches the mechanism and can be tested with guardrails.

### Case 2: 2. Changing an HMRC web link to take people directly to the tax form, saving one
- **Problem:** 2. Changing an HMRC web link to take people directly to the tax form, saving one click, increased form completion by 22%.
- **Mechanism:** The second source example gives a cross-check against turning one anecdote into a rule.
- **Result/evidence:** Treat as corroborating evidence or boundary evidence depending on the example.
- **Transfer rule:** If this case conflicts with the user's context, route to `/mkpsi-orchestrator` or `/mkpsi-output-verifier`.

---

## A2 — Future Trigger

### User needs this skill when

1. Action is buried in legalese, long copy, information pages, or multiple requests.
2. The user needs an executable artifact, intervention, research protocol, or decision check — not a book summary.
3. The user can provide enough context to define audience, behavior, evidence, and constraints.

### Language signals

- "the legal team wrote it"
- "details are on the back"
- "users should read carefully"
- "we gave them all the information"
- "the link goes to the information page."

### Distinction from siblings

- Use `/mkpsi-orchestrator` when multiple MKPSI mechanisms may apply or routing is unclear.
- Use `/mkpsi-output-verifier` after this skill produces an artifact or plan.
- Use `/mkpsi-manipulation-ethics-gate` first for hidden influence, vulnerable users, shame/fear/status exploitation, defaults, scarcity, authority, or sensitive data.
- Sibling confusion risks: - Not `mkpsi-salience-personalize-reminder`: simplification reduces cognitive load; salience captures attention.
- Not `mkpsi-machine-readable-choice-engine`: this is human-readable simplification, not data portability.

---

## E — Execution steps

1. **Apply the source method: - **Recognize:** Recipients ignore, misunderstand, or reread official/business messages; action details are buried. - **Intervene:** Put the request, deadline, and action path at the top; cut legalese; reduce text; link directly to the target action. - **Assess:** Measure response, completion, comprehension, and error rates.**
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

- **Selected mechanism:** `mkpsi-simplify-message-to-one-clear-action` — Strip communications to one plain-language request.
- **Trigger fit:** why this skill applies and which sibling skills were intentionally not used.
- **Evidence level:** field/lab/case/memoir/historical/hypothesis/unsupported.
- **Concrete artifact:** copy, UX change, research protocol, decision checklist, experiment, or plan.
- **Ethical boundary:** what must not be faked, hidden, pressured, inferred, or overclaimed.
- **Test plan:** baseline, primary metric, guardrail metric, sample/duration, stop/decision rule.

---

## B — Boundary

### Do not use this skill when

- Preserve legally required disclosures and material risks, but separate them from the primary action instruction. Do not oversimplify complex choices into misleading certainty.
- The user only wants a book summary or author biography.
- The artifact affects high-risk contexts — minors, addiction, debt/financial hardship, health/legal/financial decisions, crisis/mental health, political persuasion, employment/housing/credit eligibility, or consent/privacy flows — unless the intervention clearly advances user welfare and preserves informed choice.
- The mechanism would require fake evidence, fake norms, fake scarcity, invented motives, invented founder stories, hidden fees, hidden defaults, or non-consensual sensitive inference.

### Source-specific misuse risks

- Not `mkpsi-salience-personalize-reminder`: simplification reduces cognitive load; salience captures attention.
- Not `mkpsi-machine-readable-choice-engine`: this is human-readable simplification, not data portability.

### Author/source blind spots

- Effects vary by audience, culture, channel, and stakes.
- Some source examples are case-based, historical, memoir-derived, or lab-derived; grade evidence before rollout.
- Modern privacy, dark-pattern, AI-personalization, and platform risks can make old persuasion tactics more harmful.

---

## Related skills

- depends-on: `/mkpsi-orchestrator` when routing is unclear; `/mkpsi-manipulation-ethics-gate` for sensitive influence; `/mkpsi-output-verifier` for final QA
- contrasts-with: see sibling-confusion notes above
- composes-with: /mkpsi-orchestrator, /mkpsi-output-verifier, /mkpsi-manipulation-ethics-gate, /mkpsi-salience-personalize-reminder, /mkpsi-remove-hassle-before-adding-incentives, /mkpsi-benefits-before-costs-ordering

---

## Audit information

- **Validation passed:** V1 ✓ / V2 ✓ / V3 ✓ (P1.)
- **Test pass rate:** designed; see `test-prompts.json`
- **Distillation date:** 2026-07-21
