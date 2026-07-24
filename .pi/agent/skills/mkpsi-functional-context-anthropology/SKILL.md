---
name: mkpsi-functional-context-anthropology
description: |
  Use when: investigating why people buy/use/choose something, and the obvious functional explanations feel incomplete. Trigger phrases: "why do they really buy," "what's the deeper meaning," "I don't understand the motivation." NOT for: Do not over-psychologize genuinely simple functional choices.
source_book: |
  The Strategy of Desire — Ernest Dichter (1960)
source_chapter: |
  Ch. 2 §1 "The Functional Principle: Cultural Anthropology"
tags: [mkpsi-v2, research, p2]
related_skills: [mkpsi-orchestrator, mkpsi-output-verifier, mkpsi-product-symbolic-meaning-decode, mkpsi-find-real-why, mkpsi-rationality-fetish-suspicion, mkpsi-depth-interview-motive-trace]
disable-model-invocation: true
---

# Understand behavior in its full cultural, biological, and social context before investigating the specific decision.

## R — Reading

> "Motivations seldom consist of lists of reasons arranged in a linear manner. Motivations are complicated structures best compared to machines with many moving parts, where every part has a particular influence on the next."
>
> — Source: Ch. 2 §1 "The Functional Principle: Cultural Anthropology"

**Source mechanism:** - **Recognize:** You cannot understand a specific purchase/behavior in isolation — it exists within a web of cultural, biological, social, and historical connections.
- **Interpret:** Much "motivational research" fails because it investigates a superficial characteristic without first understanding the functional/cultural context. Apply cultural anthropology: see the behavior in its natural setting.
- **Act:** Map the full functional context: what biological need does the product serve? What cultural meaning does it carry? What social role does it play? Only then investigate the specific brand/feature choice.

**Evidence type:** source-specific candidate extraction; evidence grade must still be checked before rollout.

---

## I — Methodology skeleton (Interpretation)

- **Recognize:** You cannot understand a specific purchase/behavior in isolation — it exists within a web of cultural, biological, social, and historical connections.
- **Interpret:** Much "motivational research" fails because it investigates a superficial characteristic without first understanding the functional/cultural context. Apply cultural anthropology: see the behavior in its natural setting.
- **Act:** Map the full functional context: what biological need does the product serve? What cultural meaning does it carry? What social role does it play? Only then investigate the specific brand/feature choice.

Operationally, this means:

1. Identify the exact behavior, judgment, message, or design choice at stake.
2. Confirm the trigger matches this atomic mechanism rather than a broader MKPSI sibling.
3. Apply the source method as a concrete checklist, copy/design move, research protocol, or decision procedure.
4. State evidence level and avoid overclaiming from cases, lab studies, memoir, or historical examples.
5. Ship only with an ethical boundary and a test/verification plan.

---

## A1 — Application in the source

### Case 1: Why do people prefer one soap over another? Obvious answers: odor, appearance, cleaning power.
- **Problem:** Why do people prefer one soap over another? Obvious answers: odor, appearance, cleaning power.
- **Mechanism:** The source example shows the named mechanism changing perception, judgment, motivation, or behavior in a specific context.
- **Result/evidence:** Dichter found soap preference depends on the "personality" of the soap AND its biomechanical fit: the human thumb opposes to grip, creating a zone of palm sensitivity. Dove's shape fits the palm perfectly — this was a major unconscious appeal that no survey would have revealed. Treat as corroborating evidence, not universal proof.
- **Transfer rule:** Apply only when the user's context matches the mechanism and can be tested with guardrails.

### Case 2: Engineers rejected Duraluminum vats as "not sturdy" despite technical proof they were as strong as steel.
- **Problem:** Engineers rejected Duraluminum vats as "not sturdy" despite technical proof they were as strong as steel.
- **Mechanism:** The second source example gives a cross-check against turning one anecdote into a rule.
- **Result/evidence:** The functional context: weight = value/strength is a deep cultural-biological belief ("cave-man beliefs"). Being light felt weak. The functional principle revealed that the resistance was irrational but culturally deep-rooted — you can't argue it away with specs. Treat as corroborating or boundary evidence.
- **Transfer rule:** If this case conflicts with the user's context, route to `/mkpsi-orchestrator` or `/mkpsi-output-verifier`.

---

## A2 — Future Trigger

### User needs this skill when

1. "Why do they really buy," "what's the deeper meaning," "I don't understand the motivation."
2. The user needs to map the cultural/biological/social context before investigating the specific feature/brand choice.
3. The user can describe the product, the behavior, and the cultural setting.

### Language signals

See description trigger phrases.

### Distinction from siblings

- Use `/mkpsi-orchestrator` when multiple MKPSI mechanisms may apply or routing is unclear.
- Use `/mkpsi-output-verifier` after this skill produces an artifact or plan.
- Use `/mkpsi-manipulation-ethics-gate` first for hidden influence, vulnerable users, or sensitive contexts.
- This is the FOUNDATIONAL research posture that precedes product-symbolic-meaning-decode (which decodes specific symbols). Use this first to understand the context, then decode the symbols.
- Related to `mkpsi-find-real-why` but is about mapping the CONTEXT, not finding the specific motive.

---

## E — Execution steps

1. **Describe the behavior/purchase in its literal, functional terms (what is being bought, how, when).**
   - Done when: the final output contains this specific artifact/check, not generic advice.

2. **Map the biological context: what bodily function, sensory experience, or physical need does the product involve? (e.g., soap touches skin; tools fit the hand).**
   - Done when: the final output contains this specific artifact/check, not generic advice.

3. **Map the cultural-anthropological context: what historical, tribal, or symbolic meaning does this category carry? (e.g., weight = value; fur = trophy).**
   - Done when: the final output contains this specific artifact/check, not generic advice.

4. **Map the social context: what role does this purchase play in family, status, identity, community?**
   - Done when: the final output contains this specific artifact/check, not generic advice.

5. **Only now investigate the specific brand/feature preference — with the context mapped, hidden drivers become visible.**
   - Done when: the final output contains this specific artifact/check, not generic advice.

6. **Design experiments (behavioral, not survey) to test whether the contextual driver predicts actual behavior.**
   - Done when: the final output contains this specific artifact/check, not generic advice.

### Required output fields

- **Selected mechanism:** `mkpsi-functional-context-anthropology` — Understand behavior in its full cultural, biological, and social context before investigating the specific decision.
- **Trigger fit:** why this skill applies and which sibling skills were intentionally not used.
- **Evidence level:** field/lab/case/memoir/historical/hypothesis/unsupported.
- **Concrete artifact:** copy, UX change, research protocol, decision checklist, experiment, or plan.
- **Ethical boundary:** what must not be faked, hidden, pressured, inferred, or overclaimed.
- **Test plan:** baseline, primary metric, guardrail metric, sample/duration, stop/decision rule.

---

## B — Boundary

### Do not use this skill when

- Do not over-psychologize genuinely simple functional choices (buying salt because you need salt).
- Do not substitute cultural speculation for behavioral evidence — the functional context generates hypotheses that must be tested.
- Cultural meanings shift across demographics and geographies — validate with the specific audience.
- The user only wants a book summary or author biography.
- The artifact affects high-risk contexts — minors, addiction, debt/financial hardship, health/legal/financial decisions, crisis/mental health, political persuasion, employment/housing/credit eligibility, or consent/privacy flows — unless the intervention clearly advances user welfare and preserves informed choice.

### Source-specific misuse risks

- Dichter's anthropological framing is mid-century Western; modern multicultural contexts require updated cultural mapping.
- The "biological" explanations (palm sensitivity, cave-man beliefs) are plausible but not always empirically validated — treat as hypotheses.

---

## Related skills

- depends-on: `/mkpsi-orchestrator` when routing is unclear; `/mkpsi-manipulation-ethics-gate` for sensitive influence; `/mkpsi-output-verifier` for final QA
- contrasts-with: see sibling-confusion notes above
- composes-with: `mkpsi-orchestrator`, `mkpsi-output-verifier`, `mkpsi-product-symbolic-meaning-decode`, `mkpsi-find-real-why`, `mkpsi-rationality-fetish-suspicion`, `mkpsi-depth-interview-motive-trace`

---

## Audit information

- **Validation passed:** V1 ✓ / V2 ✓ / V3 ✓ (P2.)
- **Test pass rate:** designed; see `test-prompts.json`
- **Distillation date:** 2026-07-21
