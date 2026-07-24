---
name: mkpsi-stranger-risk-pre-mortem
description: |
  Use when: Must judge a stranger under uncertainty and face-to-face confidence is high. Trigger phras
  es: I met them and feel good, look them in the eye, we know what happened, this is routine, they’re 
  a stranger but I can tell.. NOT for: Use to slow consequential judgments, not to avoid necessary dec
  isions. Respect privacy and proportionality.
source_book: |
  MKPSI behavioral persuasion corpus — Sutherland, Halpern, Knight, Martin/Goldstein/Cialdini, Gladwel
  l, Shotton, Packard, Kahneman, Lancaster
source_chapter: |
  Introduction; Chapter Two, Hitler/Chamberlain; Chapters Six–Nine; Chapter Twelve conclusion.
tags: [mkpsi-v2, bias, p1]
related_skills: [mkpsi-orchestrator, mkpsi-output-verifier, mkpsi-manipulation-ethics-gate, mkpsi-truth-default-trigger-ledger, mkpsi-demeanor-signal-downgrade, mkpsi-coupling-context-map]
disable-model-invocation: true
---

# Pre-mortem high-stakes stranger interpretation.

## R — Reading

> “We have no choice but to talk to strangers… Yet at this most necessary of tasks we are inept. We think we can transform the stranger, without cost or sacrifice, into the familiar and the known, and we can’t.”
>
> — Source: Introduction; Chapter Two, Hitler/Chamberlain; Chapters Six–Nine; Chapter Twelve conclusion.

**Source mechanism:** - **Recognize:** You must judge a stranger under uncertainty: hire, partner, investigate, trust, accuse, admit, detain, or negotiate.
- **Interpret:** Three predictable failure modes may interact: truth-default, transparency illusion, and coupling blindness.
- **Act:** Pre-mortem the decision: What if we trusted too much? Read demeanor wrong? Ignored context? Used a contaminating evidence protocol? What reversible next step reduces risk?

**Evidence type:** source-specific candidate extraction; evidence grade must still be checked before rollout.

---

## I — Methodology skeleton (Interpretation)

- **Recognize:** You must judge a stranger under uncertainty: hire, partner, investigate, trust, accuse, admit, detain, or negotiate.
- **Interpret:** Three predictable failure modes may interact: truth-default, transparency illusion, and coupling blindness.
- **Act:** Pre-mortem the decision: What if we trusted too much? Read demeanor wrong? Ignored context? Used a contaminating evidence protocol? What reversible next step reduces risk?

Operationally, this means:

1. Identify the exact behavior, judgment, message, or design choice at stake.
2. Confirm the trigger matches this atomic mechanism rather than a broader MKPSI sibling.
3. Apply the source method as a concrete checklist, copy/design move, research protocol, or decision procedure.
4. State evidence level and avoid overclaiming from cases, lab studies, memoir, or historical examples.
5. Ship only with an ethical boundary and a test/verification plan.

---

## A1 — Application in the source

### Case 1: Chamberlain’s face-to-face meetings with Hitler gave false confidence; reading d
- **Problem:** Chamberlain’s face-to-face meetings with Hitler gave false confidence; reading documents may have been more useful than reading demeanor.
- **Mechanism:** The source example shows the named mechanism changing perception, judgment, motivation, or behavior in a specific context.
- **Result/evidence:** Use as source evidence, not universal proof; preserve the conditions that made the example work.
- **Transfer rule:** Apply only when the user's context matches the mechanism and can be tested with guardrails.

### Case 2: Sandra Bland’s stop combined non-defaulting suspicion, transparency errors, and 
- **Problem:** Sandra Bland’s stop combined non-defaulting suspicion, transparency errors, and coupling blindness about place/time.
- **Mechanism:** The second source example gives a cross-check against turning one anecdote into a rule.
- **Result/evidence:** Treat as corroborating evidence or boundary evidence depending on the example.
- **Transfer rule:** If this case conflicts with the user's context, route to `/mkpsi-orchestrator` or `/mkpsi-output-verifier`.

---

## A2 — Future Trigger

### User needs this skill when

1. Must judge a stranger under uncertainty and face-to-face confidence is high.
2. The user needs an executable artifact, intervention, research protocol, or decision check — not a book summary.
3. The user can provide enough context to define audience, behavior, evidence, and constraints.

### Language signals

- "I met them and feel good"
- "look them in the eye"
- "we know what happened"
- "this is routine"
- "they’re a stranger but I can tell."

### Distinction from siblings

- Use `/mkpsi-orchestrator` when multiple MKPSI mechanisms may apply or routing is unclear.
- Use `/mkpsi-output-verifier` after this skill produces an artifact or plan.
- Use `/mkpsi-manipulation-ethics-gate` first for hidden influence, vulnerable users, shame/fear/status exploitation, defaults, scarcity, authority, or sensitive data.
- Sibling confusion risks: - Not `mkpsi-due-diligence-checklist`: this is a cognitive failure-mode scan, not a complete investigation.
- Not `mkpsi-rapport-building`: rapport can help, but can also create false confidence.

---

## E — Execution steps

1. **Apply the source method: - **Recognize:** You must judge a stranger under uncertainty: hire, partner, investigate, trust, accuse, admit, detain, or negotiate. - **Interpret:** Three predictable failure modes may interact: truth-default, transparency illusion, and coupling blindness. - **Act:** Pre-mortem the decision: What if we trusted too much? Read demeanor wrong? Ignored context? Used a contaminating evidence protocol? What reversible ne**
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

- **Selected mechanism:** `mkpsi-stranger-risk-pre-mortem` — Pre-mortem high-stakes stranger interpretation.
- **Trigger fit:** why this skill applies and which sibling skills were intentionally not used.
- **Evidence level:** field/lab/case/memoir/historical/hypothesis/unsupported.
- **Concrete artifact:** copy, UX change, research protocol, decision checklist, experiment, or plan.
- **Ethical boundary:** what must not be faked, hidden, pressured, inferred, or overclaimed.
- **Test plan:** baseline, primary metric, guardrail metric, sample/duration, stop/decision rule.

---

## B — Boundary

### Do not use this skill when

- Use to slow consequential judgments, not to avoid necessary decisions. Respect privacy and proportionality.
- The user only wants a book summary or author biography.
- The artifact affects high-risk contexts — minors, addiction, debt/financial hardship, health/legal/financial decisions, crisis/mental health, political persuasion, employment/housing/credit eligibility, or consent/privacy flows — unless the intervention clearly advances user welfare and preserves informed choice.
- The mechanism would require fake evidence, fake norms, fake scarcity, invented motives, invented founder stories, hidden fees, hidden defaults, or non-consensual sensitive inference.

### Source-specific misuse risks

- Not `mkpsi-due-diligence-checklist`: this is a cognitive failure-mode scan, not a complete investigation.
- Not `mkpsi-rapport-building`: rapport can help, but can also create false confidence.

### Author/source blind spots

- Effects vary by audience, culture, channel, and stakes.
- Some source examples are case-based, historical, memoir-derived, or lab-derived; grade evidence before rollout.
- Modern privacy, dark-pattern, AI-personalization, and platform risks can make old persuasion tactics more harmful.

---

## Related skills

- depends-on: `/mkpsi-orchestrator` when routing is unclear; `/mkpsi-manipulation-ethics-gate` for sensitive influence; `/mkpsi-output-verifier` for final QA
- contrasts-with: see sibling-confusion notes above
- composes-with: /mkpsi-orchestrator, /mkpsi-output-verifier, /mkpsi-manipulation-ethics-gate, /mkpsi-truth-default-trigger-ledger, /mkpsi-demeanor-signal-downgrade, /mkpsi-coupling-context-map

---

## Audit information

- **Validation passed:** V1 ✓ / V2 ✓ / V3 ✓ (P1.)
- **Test pass rate:** designed; see `test-prompts.json`
- **Distillation date:** 2026-07-21
