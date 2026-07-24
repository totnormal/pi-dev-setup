---
name: mkpsi-upgrade-presentation-to-upgrade-experience
description: |
  Use when: Product is good but experienced as ordinary due to packaging, serve, setting, naming, or l
  ow expectation cues. Trigger phrases: presentation,, serve,, packaging,, premium cue,, descriptive n
  aming,, taste perception,. NOT for: Beware unintended category associations: “eco,” “low alcohol,” o
  r “sugar free” may imply weaker performance. Test negative expectations before launch.
source_book: |
  MKPSI behavioral persuasion corpus — Sutherland, Halpern, Knight, Martin/Goldstein/Cialdini, Gladwel
  l, Shotton, Packard, Kahneman, Lancaster
source_chapter: |
  Bias 11: Expectancy Theory; Bias 21: Veblen Goods.
tags: [mkpsi-v2, value, p2]
related_skills: [mkpsi-orchestrator, mkpsi-output-verifier, mkpsi-manipulation-ethics-gate, mkpsi-design-placebo-cues, mkpsi-costly-signal-trust, mkpsi-reduce-pain-of-payment]
disable-model-invocation: true
---

# Improve expected quality through presentation and sensory cues.

## R — Reading

> “Expectations can generate as much value as the actual product.”
>
> — Source: Bias 11: Expectancy Theory; Bias 21: Veblen Goods.

**Source mechanism:** - **Recognize:** The product is good but experienced as ordinary because serve, packaging, naming, setting, or copy creates low expectations.
- **Intervene:** Upgrade presentation cues: serveware, packaging, naming, descriptors, branded glassware, premium context, or proof cues.
- **Assess:** Test perceived taste/quality, willingness to pay, repeat, and whether cues help or hurt disliked/known brands.

**Evidence type:** source-specific candidate extraction; evidence grade must still be checked before rollout.

---

## I — Methodology skeleton (Interpretation)

- **Recognize:** The product is good but experienced as ordinary because serve, packaging, naming, setting, or copy creates low expectations.
- **Intervene:** Upgrade presentation cues: serveware, packaging, naming, descriptors, branded glassware, premium context, or proof cues.
- **Assess:** Test perceived taste/quality, willingness to pay, repeat, and whether cues help or hurt disliked/known brands.

Operationally, this means:

1. Identify the exact behavior, judgment, message, or design choice at stake.
2. Confirm the trigger matches this atomic mechanism rather than a broader MKPSI sibling.
3. Apply the source method as a concrete checklist, copy/design move, research protocol, or decision procedure.
4. State evidence level and avoid overclaiming from cases, lab studies, memoir, or historical examples.
5. Ship only with an ethical boundary and a test/verification plan.

---

## A1 — Application in the source

### Case 1: Wansink’s identical brownies were rated “OK” on napkins, “good” on paper plates,
- **Problem:** Wansink’s identical brownies were rated “OK” on napkins, “good” on paper plates, and “excellent” on china; willingness to pay rose from 53c to $1.27.
- **Mechanism:** The source example shows the named mechanism changing perception, judgment, motivation, or behavior in a specific context.
- **Result/evidence:** Use as source evidence, not universal proof; preserve the conditions that made the example work.
- **Transfer rule:** Apply only when the user's context matches the mechanism and can be tested with guardrails.

### Case 2: Descriptive cafeteria labels like “Succulent Italian Seafood Filet” boosted tast
- **Problem:** Descriptive cafeteria labels like “Succulent Italian Seafood Filet” boosted taste ratings 7% and appeal 13% vs plain labels.
- **Mechanism:** The second source example gives a cross-check against turning one anecdote into a rule.
- **Result/evidence:** Treat as corroborating evidence or boundary evidence depending on the example.
- **Transfer rule:** If this case conflicts with the user's context, route to `/mkpsi-orchestrator` or `/mkpsi-output-verifier`.

---

## A2 — Future Trigger

### User needs this skill when

1. Product is good but experienced as ordinary due to packaging, serve, setting, naming, or low expectation cues.
2. The user needs an executable artifact, intervention, research protocol, or decision check — not a book summary.
3. The user can provide enough context to define audience, behavior, evidence, and constraints.

### Language signals

- "presentation,"
- "serve,"
- "packaging,"
- "premium cue,"
- "descriptive naming,"
- "taste perception,"
- "placebo,"
- "expectations."

### Distinction from siblings

- Use `/mkpsi-orchestrator` when multiple MKPSI mechanisms may apply or routing is unclear.
- Use `/mkpsi-output-verifier` after this skill produces an artifact or plan.
- Use `/mkpsi-manipulation-ethics-gate` first for hidden influence, vulnerable users, shame/fear/status exploitation, defaults, scarcity, authority, or sensitive data.
- Sibling confusion risks: - Veblen price signaling uses price itself as a quality cue; expectancy can use any cue.
- Pratfall admits flaws; expectancy usually upgrades cues.

---

## E — Execution steps

1. **Apply the source method: - **Recognize:** The product is good but experienced as ordinary because serve, packaging, naming, setting, or copy creates low expectations. - **Intervene:** Upgrade presentation cues: serveware, packaging, naming, descriptors, branded glassware, premium context, or proof cues. - **Assess:** Test perceived taste/quality, willingness to pay, repeat, and whether cues help or hurt disliked/known brands.**
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

- **Selected mechanism:** `mkpsi-upgrade-presentation-to-upgrade-experience` — Improve expected quality through presentation and sensory cues.
- **Trigger fit:** why this skill applies and which sibling skills were intentionally not used.
- **Evidence level:** field/lab/case/memoir/historical/hypothesis/unsupported.
- **Concrete artifact:** copy, UX change, research protocol, decision checklist, experiment, or plan.
- **Ethical boundary:** what must not be faked, hidden, pressured, inferred, or overclaimed.
- **Test plan:** baseline, primary metric, guardrail metric, sample/duration, stop/decision rule.

---

## B — Boundary

### Do not use this skill when

- Beware unintended category associations: “eco,” “low alcohol,” or “sugar free” may imply weaker performance. Test negative expectations before launch.
- The user only wants a book summary or author biography.
- The artifact affects high-risk contexts — minors, addiction, debt/financial hardship, health/legal/financial decisions, crisis/mental health, political persuasion, employment/housing/credit eligibility, or consent/privacy flows — unless the intervention clearly advances user welfare and preserves informed choice.
- The mechanism would require fake evidence, fake norms, fake scarcity, invented motives, invented founder stories, hidden fees, hidden defaults, or non-consensual sensitive inference.

### Source-specific misuse risks

- Veblen price signaling uses price itself as a quality cue; expectancy can use any cue.
- Pratfall admits flaws; expectancy usually upgrades cues.

### Author/source blind spots

- Effects vary by audience, culture, channel, and stakes.
- Some source examples are case-based, historical, memoir-derived, or lab-derived; grade evidence before rollout.
- Modern privacy, dark-pattern, AI-personalization, and platform risks can make old persuasion tactics more harmful.

---

## Related skills

- depends-on: `/mkpsi-orchestrator` when routing is unclear; `/mkpsi-manipulation-ethics-gate` for sensitive influence; `/mkpsi-output-verifier` for final QA
- contrasts-with: see sibling-confusion notes above
- composes-with: /mkpsi-orchestrator, /mkpsi-output-verifier, /mkpsi-manipulation-ethics-gate, /mkpsi-design-placebo-cues, /mkpsi-costly-signal-trust, /mkpsi-reduce-pain-of-payment

---

## Audit information

- **Validation passed:** V1 ✓ / V2 ✓ / V3 ✓ (P2.)
- **Test pass rate:** designed; see `test-prompts.json`
- **Distillation date:** 2026-07-21
