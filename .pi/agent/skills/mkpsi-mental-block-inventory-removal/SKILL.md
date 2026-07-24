---
name: mkpsi-mental-block-inventory-removal
description: |
  Use when: a rational argument fails to persuade despite being correct, and the resistance seems irrational or emotional. Trigger phrases: "they know it's better but won't switch," "logically it makes sense but," "there's an invisible barrier." NOT for: Do not remove legitimate safety/ethical concerns; do not dismantle informed consent.
source_book: |
  The Strategy of Desire — Ernest Dichter (1960)
source_chapter: |
  Ch. 3 "Command or Persuasion" §4 "Removal of Mental Blocks"
tags: [mkpsi-v2, persuasion, p2]
related_skills: [mkpsi-orchestrator, mkpsi-output-verifier, mkpsi-manipulation-ethics-gate, mkpsi-guilt-permission-frame, mkpsi-find-real-why, mkpsi-rationality-fetish-suspicion]
disable-model-invocation: true
---

# Systematically identify and dismantle the specific psychological barriers preventing action.

## R — Reading

> "Even as social scientists we have difficulty in freeing ourselves of preconceived notions, superstitions, and fears. We often fail to solve a simple problem if we have been conditioned to look for a complicated way."
>
> — Source: Ch. 3 "Command or Persuasion" §4 "Removal of Mental Blocks"

**Source mechanism:** - **Recognize:** When a correct rational argument fails to persuade, the barrier is a mental block — a preconceived notion, superstition, fear, ego-preservation need, or status anxiety.
- **Interpret:** Mental blocks are not logical objections; they are psychological defenses. They cannot be argued away; they must be reframed or bypassed.
- **Act:** Inventory ALL blocks (not just the obvious one), then for each: reframe the comparison basis, remove the threat to ego/status, or provide a new mental model that makes the block irrelevant.

**Evidence type:** source-specific candidate extraction; evidence grade must still be checked before rollout.

---

## I — Methodology skeleton (Interpretation)

- **Recognize:** When a correct rational argument fails to persuade, the barrier is a mental block — a preconceived notion, superstition, fear, ego-preservation need, or status anxiety.
- **Interpret:** Mental blocks are not logical objections; they are psychological defenses. They cannot be argued away; they must be reframed or bypassed.
- **Act:** Inventory ALL blocks (not just the obvious one), then for each: reframe the comparison basis, remove the threat to ego/status, or provide a new mental model that makes the block irrelevant.

Operationally, this means:

1. Identify the exact behavior, judgment, message, or design choice at stake.
2. Confirm the trigger matches this atomic mechanism rather than a broader MKPSI sibling.
3. Apply the source method as a concrete checklist, copy/design move, research protocol, or decision procedure.
4. State evidence level and avoid overclaiming from cases, lab studies, memoir, or historical examples.
5. Ship only with an ethical boundary and a test/verification plan.

---

## A1 — Application in the source

### Case 1: A Brazilian truck manufacturer couldn't convince construction companies to buy one 10-ton truck instead of two 7.5-ton trucks (same price). The logical argument was sound.
- **Problem:** A Brazilian truck manufacturer couldn't convince construction companies to buy one 10-ton truck instead of two 7.5-ton trucks (same price). The logical argument was sound.
- **Mechanism:** The source example shows the named mechanism changing perception, judgment, motivation, or behavior in a specific context.
- **Result/evidence:** The mental block: "more vehicles = more capacity" in a fast-growing nation. Dichter reframed the comparison: the larger truck covers 3x the miles, does 3x the work, and is lighter. "Pay twice as much for 3x the work = a bargain." The block was removed by changing the comparison basis. Treat as corroborating evidence, not universal proof.
- **Transfer rule:** Apply only when the user's context matches the mechanism and can be tested with guardrails.

### Case 2: People couldn't accept that the Southern Hemisphere might be equal to the Northern because "what's on top seems superior."
- **Problem:** People couldn't accept that the Southern Hemisphere might be equal to the Northern because "what's on top seems superior."
- **Mechanism:** The second source example gives a cross-check against turning one anecdote into a rule.
- **Result/evidence:** Dichter suggested printing a globe with the South on top — a simple inversion that breaks the spatial-status mental block. Treat as corroborating or boundary evidence.
- **Transfer rule:** If this case conflicts with the user's context, route to `/mkpsi-orchestrator` or `/mkpsi-output-verifier`.

---

## A2 — Future Trigger

### User needs this skill when

1. "They know it's better but won't switch," "logically it makes sense but," "there's an invisible barrier."
2. The user needs a systematic barrier inventory + removal strategy, not just a better rational argument.
3. The user can describe the audience, the desired action, and what rational arguments have already failed.

### Language signals

"logically it makes sense but," "invisible barrier," "they won't switch despite," "irrational resistance," "can't get past," "stuck."

### Distinction from siblings

- Use `/mkpsi-orchestrator` when multiple MKPSI mechanisms may apply or routing is unclear.
- Use `/mkpsi-output-verifier` after this skill produces an artifact or plan.
- Use `/mkpsi-manipulation-ethics-gate` first for hidden influence, vulnerable users, or sensitive contexts.
- Sibling confusion risks: Broader than `mkpsi-guilt-permission-frame` (which is specifically about moral guilt). Mental blocks include ego-preservation, status anxiety, superstition, fear of change, preconceived notions.
- Not the same as `mkpsi-find-real-why` (which finds the motive); this skill removes the BARRIER that blocks the motive from becoming action.

---

## E — Execution steps

1. **Identify the desired action and the rational argument that should work but doesn't.**
   - Done when: the final output contains this specific artifact/check, not generic advice.

2. **Inventory ALL mental blocks: list every possible irrational barrier (guilt, fear, ego, status, superstition, habit, identity threat, comparison bias).**
   - Done when: the final output contains this specific artifact/check, not generic advice.

3. **For each block, determine the reframing strategy: change the comparison basis, remove the ego/status threat, invert the assumption, or provide a new mental model.**
   - Done when: the final output contains this specific artifact/check, not generic advice.

4. **Draft the reframed argument that makes the block irrelevant — don't argue against it, bypass it.**
   - Done when: the final output contains this specific artifact/check, not generic advice.

5. **Test whether the reframed argument changes the audience's resistance.**
   - Done when: the final output contains this specific artifact/check, not generic advice.

6. **Attach evidence grade and ethical boundary.**
   - Done when: the final output contains this specific artifact/check, not generic advice.

### Required output fields

- **Selected mechanism:** `mkpsi-mental-block-inventory-removal` — Systematically identify and dismantle the specific psychological barriers preventing action.
- **Trigger fit:** why this skill applies and which sibling skills were intentionally not used.
- **Evidence level:** field/lab/case/memoir/historical/hypothesis/unsupported.
- **Concrete artifact:** copy, UX change, research protocol, decision checklist, experiment, or plan.
- **Ethical boundary:** what must not be faked, hidden, pressured, inferred, or overclaimed.
- **Test plan:** baseline, primary metric, guardrail metric, sample/duration, stop/decision rule.

---

## B — Boundary

### Do not use this skill when

- Do not remove legitimate safety, ethical, or legal concerns disguised as "mental blocks."
- Do not dismantle informed consent or pressure vulnerable audiences past valid hesitation.
- Some resistance is rational — verify the block is truly irrational before removing it.
- The user only wants a book summary or author biography.
- The artifact affects high-risk contexts — minors, addiction, debt/financial hardship, health/legal/financial decisions, crisis/mental health, political persuasion, employment/housing/credit eligibility, or consent/privacy flows — unless the intervention clearly advances user welfare and preserves informed choice.

### Source-specific misuse risks

- Dichter sometimes assumed all resistance is irrational; modern persuasion must distinguish genuine concerns from psychological blocks.
- Reframing can become manipulation if it hides real tradeoffs; the new comparison basis must be honest.

---

## Related skills

- depends-on: `/mkpsi-orchestrator` when routing is unclear; `/mkpsi-manipulation-ethics-gate` for sensitive influence; `/mkpsi-output-verifier` for final QA
- contrasts-with: see sibling-confusion notes above
- composes-with: `mkpsi-orchestrator`, `mkpsi-output-verifier`, `mkpsi-manipulation-ethics-gate`, `mkpsi-guilt-permission-frame`, `mkpsi-find-real-why`, `mkpsi-rationality-fetish-suspicion`

---

## Audit information

- **Validation passed:** V1 ✓ / V2 ✓ / V3 ✓ (P2.)
- **Test pass rate:** designed; see `test-prompts.json`
- **Distillation date:** 2026-07-21
