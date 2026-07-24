---
name: mkpsi-messenger-authority-fit
description: |
  Use when: Same advice/request is ignored from one sender but may work from expert, peer, proximal, o
  r personally connected sender. Trigger phrases: who should send this?, CEO email or peer email?, exp
  ert credibility, white coat, message from adviser.. NOT for: Do not fake endorsements, credentials, 
  proximity, or peer status. Avoid authority pressure when the recipient needs independent judgment.
source_book: |
  MKPSI behavioral persuasion corpus — Sutherland, Halpern, Knight, Martin/Goldstein/Cialdini, Gladwel
  l, Shotton, Packard, Kahneman, Lancaster
source_chapter: |
  MINDSPACE framework, “Messenger”; Chapter 4 conclusion, “messenger effect”; medical and payroll-givi
  ng examples.
tags: [mkpsi-v2, general, p1]
related_skills: [mkpsi-orchestrator, mkpsi-output-verifier, mkpsi-manipulation-ethics-gate, mkpsi-salience-personalize-reminder, mkpsi-ethos-pathos-logos-leadership-ladder]
disable-model-invocation: true
---

# Match the messenger to the behavior and audience.

## R — Reading

> “Messenger we are heavily influenced by who communicates information.”
>
> — Source: MINDSPACE framework, “Messenger”; Chapter 4 conclusion, “messenger effect”; medical and payroll-giving examples.

**Source mechanism:** - **Recognize:** The same instruction/advice is ignored from one sender but may matter from another.
- **Intervene:** Select a credible, warm, proximal, expert, peer, or personally connected messenger; show their identity when useful.
- **Assess:** Compare sender variants holding message content constant.

**Evidence type:** source-specific candidate extraction; evidence grade must still be checked before rollout.

---

## I — Methodology skeleton (Interpretation)

- **Recognize:** The same instruction/advice is ignored from one sender but may matter from another.
- **Intervene:** Select a credible, warm, proximal, expert, peer, or personally connected messenger; show their identity when useful.
- **Assess:** Compare sender variants holding message content constant.

Operationally, this means:

1. Identify the exact behavior, judgment, message, or design choice at stake.
2. Confirm the trigger matches this atomic mechanism rather than a broader MKPSI sibling.
3. Apply the source method as a concrete checklist, copy/design move, research protocol, or decision procedure.
4. State evidence level and avoid overclaiming from cases, lab studies, memoir, or historical examples.
5. Ship only with an ethical boundary and a test/verification plan.

---

## A1 — Application in the source

### Case 1: 1. Halpern notes vaccination advice from the Chief Medical Officer or senior doc
- **Problem:** 1. Halpern notes vaccination advice from the Chief Medical Officer or senior doctor is likelier to work than advice from a politician.
- **Mechanism:** The source example shows the named mechanism changing perception, judgment, motivation, or behavior in a specific context.
- **Result/evidence:** Use as source evidence, not universal proof; preserve the conditions that made the example work.
- **Transfer rule:** Apply only when the user's context matches the mechanism and can be tested with guardrails.

### Case 2: 2. Payroll giving
- **Problem:** 2. Payroll giving: colleague email produced 2.9% sign-up; adding the asker’s picture more than doubled sign-up to 6.4%.
- **Mechanism:** The second source example gives a cross-check against turning one anecdote into a rule.
- **Result/evidence:** Treat as corroborating evidence or boundary evidence depending on the example.
- **Transfer rule:** If this case conflicts with the user's context, route to `/mkpsi-orchestrator` or `/mkpsi-output-verifier`.

---

## A2 — Future Trigger

### User needs this skill when

1. Same advice/request is ignored from one sender but may work from expert, peer, proximal, or personally connected sender.
2. The user needs an executable artifact, intervention, research protocol, or decision check — not a book summary.
3. The user can provide enough context to define audience, behavior, evidence, and constraints.

### Language signals

- "who should send this?"
- "CEO email or peer email?"
- "expert credibility"
- "white coat"
- "message from adviser."

### Distinction from siblings

- Use `/mkpsi-orchestrator` when multiple MKPSI mechanisms may apply or routing is unclear.
- Use `/mkpsi-output-verifier` after this skill produces an artifact or plan.
- Use `/mkpsi-manipulation-ethics-gate` first for hidden influence, vulnerable users, shame/fear/status exploitation, defaults, scarcity, authority, or sensitive data.
- Sibling confusion risks: - Not `mkpsi-social-personal-touch-commitment`: messenger fit selects the source; personal touch may include wording and relationship.
- Not `mkpsi-salience-personalize-reminder`: sender credibility differs from attention cues.

---

## E — Execution steps

1. **Apply the source method: - **Recognize:** The same instruction/advice is ignored from one sender but may matter from another. - **Intervene:** Select a credible, warm, proximal, expert, peer, or personally connected messenger; show their identity when useful. - **Assess:** Compare sender variants holding message content constant.**
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

- **Selected mechanism:** `mkpsi-messenger-authority-fit` — Match the messenger to the behavior and audience.
- **Trigger fit:** why this skill applies and which sibling skills were intentionally not used.
- **Evidence level:** field/lab/case/memoir/historical/hypothesis/unsupported.
- **Concrete artifact:** copy, UX change, research protocol, decision checklist, experiment, or plan.
- **Ethical boundary:** what must not be faked, hidden, pressured, inferred, or overclaimed.
- **Test plan:** baseline, primary metric, guardrail metric, sample/duration, stop/decision rule.

---

## B — Boundary

### Do not use this skill when

- Do not fake endorsements, credentials, proximity, or peer status. Avoid authority pressure when the recipient needs independent judgment.
- The user only wants a book summary or author biography.
- The artifact affects high-risk contexts — minors, addiction, debt/financial hardship, health/legal/financial decisions, crisis/mental health, political persuasion, employment/housing/credit eligibility, or consent/privacy flows — unless the intervention clearly advances user welfare and preserves informed choice.
- The mechanism would require fake evidence, fake norms, fake scarcity, invented motives, invented founder stories, hidden fees, hidden defaults, or non-consensual sensitive inference.

### Source-specific misuse risks

- Not `mkpsi-social-personal-touch-commitment`: messenger fit selects the source; personal touch may include wording and relationship.
- Not `mkpsi-salience-personalize-reminder`: sender credibility differs from attention cues.

### Author/source blind spots

- Effects vary by audience, culture, channel, and stakes.
- Some source examples are case-based, historical, memoir-derived, or lab-derived; grade evidence before rollout.
- Modern privacy, dark-pattern, AI-personalization, and platform risks can make old persuasion tactics more harmful.

---

## Related skills

- depends-on: `/mkpsi-orchestrator` when routing is unclear; `/mkpsi-manipulation-ethics-gate` for sensitive influence; `/mkpsi-output-verifier` for final QA
- contrasts-with: see sibling-confusion notes above
- composes-with: /mkpsi-orchestrator, /mkpsi-output-verifier, /mkpsi-manipulation-ethics-gate, /mkpsi-salience-personalize-reminder, /mkpsi-ethos-pathos-logos-leadership-ladder

---

## Audit information

- **Validation passed:** V1 ✓ / V2 ✓ / V3 ✓ (P1.)
- **Test pass rate:** designed; see `test-prompts.json`
- **Distillation date:** 2026-07-21
