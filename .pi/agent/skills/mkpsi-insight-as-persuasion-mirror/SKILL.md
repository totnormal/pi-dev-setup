---
name: mkpsi-insight-as-persuasion-mirror
description: |
  Use when: the audience resists because they feel misunderstood, judged, or psychologically distant. Trigger phrases: "they don't get it," "we're talking past each other," "how do we build trust," "they're defensive." NOT for: Do not fabricate insight or pretend to know more than you do; do not use psychological diagnosis as a manipulation tool.
source_book: |
  The Strategy of Desire — Ernest Dichter (1960)
source_chapter: |
  Ch. 3 "Command or Persuasion" §3 "Insight as a Tool of Communication"
tags: [mkpsi-v2, persuasion, p2]
related_skills: [mkpsi-orchestrator, mkpsi-output-verifier, mkpsi-manipulation-ethics-gate, mkpsi-depth-interview-motive-trace, mkpsi-find-real-why, mkpsi-empathic-playback-we-pronouns]
disable-model-invocation: true
---

# Demonstrate insight into the audience's hidden motive to build trust and dissolve resistance.

## R — Reading

> "The shorter the psychological distance, the more successful we are in bringing about insight and willingness to act in a desired direction. Co-operation depends on mutual understanding and respect."
>
> — Source: Ch. 3 "Command or Persuasion" §3 "Insight as a Tool of Communication"

**Source mechanism:** - **Recognize:** The audience is psychologically distant, defensive, or resistant because they feel unseen or misunderstood.
- **Interpret:** Resistance shrinks when the persuader demonstrates genuine insight into the audience's real (often irrational) motive — this creates the feeling of being understood.
- **Act:** Mirror back the hidden motive accurately in messaging/interaction, signaling "I understand what really drives you," which builds trust and opens the audience to persuasion.

**Evidence type:** source-specific candidate extraction; evidence grade must still be checked before rollout.

---

## I — Methodology skeleton (Interpretation)

- **Recognize:** The audience is psychologically distant, defensive, or resistant because they feel unseen or misunderstood.
- **Interpret:** Resistance shrinks when the persuader demonstrates genuine insight into the audience's real (often irrational) motive — this creates the feeling of being understood.
- **Act:** Mirror back the hidden motive accurately in messaging/interaction, signaling "I understand what really drives you," which builds trust and opens the audience to persuasion.

Operationally, this means:

1. Identify the exact behavior, judgment, message, or design choice at stake.
2. Confirm the trigger matches this atomic mechanism rather than a broader MKPSI sibling.
3. Apply the source method as a concrete checklist, copy/design move, research protocol, or decision procedure.
4. State evidence level and avoid overclaiming from cases, lab studies, memoir, or historical examples.
5. Ship only with an ethical boundary and a test/verification plan.

---

## A1 — Application in the source

### Case 1: People judge nations not by superiority but by uniqueness. A Brussels Fair study of ~500 people showed that true understanding results in strengthening differences rather than demanding sameness.
- **Problem:** People judge nations not by superiority but by uniqueness. A Brussels Fair study of ~500 people showed that true understanding results in strengthening differences rather than demanding sameness.
- **Mechanism:** The source example shows the named mechanism changing perception, judgment, motivation, or behavior in a specific context.
- **Result/evidence:** Demonstrating insight into what makes the audience unique — rather than lecturing them on what they should change — builds co-operation. Treat as corroborating evidence, not universal proof.
- **Transfer rule:** Apply only when the user's context matches the mechanism and can be tested with guardrails.

### Case 2: Arthur Godfrey was more believable than polished announcers because his imperfect, self-deprecating style let the audience identify with him.
- **Problem:** Arthur Godfrey was more believable than polished announcers because his imperfect, self-deprecating style let the audience identify with him.
- **Mechanism:** The second source example gives a cross-check against turning one anecdote into a rule.
- **Result/evidence:** Insight communication works best when it bridges the psychological distance through relatable imperfection, not authority. Treat as corroborating or boundary evidence.
- **Transfer rule:** If this case conflicts with the user's context, route to `/mkpsi-orchestrator` or `/mkpsi-output-verifier`.

---

## A2 — Future Trigger

### User needs this skill when

1. "They don't get it," "we're talking past each other," "how do we build trust," "they're defensive."
2. The user needs an executable artifact — messaging, script, interaction design — not a summary of Dichter's theory.
3. The user can provide enough context about the audience's hidden motive (from prior research) to mirror it accurately.

### Language signals

"they don't understand," "psychological distance," "build trust," "they're defensive," "we need empathy," "show we get them."

### Distinction from siblings

- Use `/mkpsi-orchestrator` when multiple MKPSI mechanisms may apply or routing is unclear.
- Use `/mkpsi-output-verifier` after this skill produces an artifact or plan.
- Use `/mkpsi-manipulation-ethics-gate` first for hidden influence, vulnerable users, or sensitive contexts.
- Sibling confusion risks: Not the same as finding the hidden motive (use `mkpsi-find-real-why` or `mkpsi-depth-interview-motive-trace` first); this skill is about USING that finding in communication.
- Overlaps with `mkpsi-empathic-playback-we-pronouns` but is specifically about demonstrating insight into hidden/irrational motives, not just empathic language.

---

## E — Execution steps

1. **Obtain the hidden motive from prior research (depth interview, observation, or validated insight). Do not fabricate.**
   - Done when: the final output contains this specific artifact/check, not generic advice.

2. **Identify the psychological distance: what makes the audience feel misunderstood, judged, or defensive?**
   - Done when: the final output contains this specific artifact/check, not generic advice.

3. **Mirror the insight back accurately — in messaging, script, or interaction design — signaling genuine understanding of the real (possibly irrational) driver.**
   - Done when: the final output contains this specific artifact/check, not generic advice.

4. **Use relatable imperfection over authority: the audience trusts someone who "gets it" and is human, not a polished lecturer.**
   - Done when: the final output contains this specific artifact/check, not generic advice.

5. **Validate trust was built: test whether the audience response shifts from defensive to open.**
   - Done when: the final output contains this specific artifact/check, not generic advice.

6. **Attach evidence grade and ethical boundary.**
   - Done when: the final output contains this specific artifact/check, not generic advice.

### Required output fields

- **Selected mechanism:** `mkpsi-insight-as-persuasion-mirror` — Demonstrate insight into the audience's hidden motive to build trust and dissolve resistance.
- **Trigger fit:** why this skill applies and which sibling skills were intentionally not used.
- **Evidence level:** field/lab/case/memoir/historical/hypothesis/unsupported.
- **Concrete artifact:** copy, UX change, research protocol, decision checklist, experiment, or plan.
- **Ethical boundary:** what must not be faked, hidden, pressured, inferred, or overclaimed.
- **Test plan:** baseline, primary metric, guardrail metric, sample/duration, stop/decision rule.

---

## B — Boundary

### Do not use this skill when

- Do not fabricate insight or pretend to know the audience better than you do.
- Do not weaponize psychological diagnosis to manipulate vulnerable audiences.
- Do not assume insight = agreement; understanding the motive is not the same as endorsing it.
- The user only wants a book summary or author biography.
- The artifact affects high-risk contexts — minors, addiction, debt/financial hardship, health/legal/financial decisions, crisis/mental health, political persuasion, employment/housing/credit eligibility, or consent/privacy flows — unless the intervention clearly advances user welfare and preserves informed choice.

### Source-specific misuse risks

- Dichter's examples are mid-20th-century and culturally specific; insight mirroring must be adapted to modern, diverse audiences.
- "Insight" can feel patronizing if delivered as diagnosis rather than empathy; tone matters as much as accuracy.

---

## Related skills

- depends-on: `/mkpsi-orchestrator` when routing is unclear; `/mkpsi-manipulation-ethics-gate` for sensitive influence; `/mkpsi-output-verifier` for final QA
- contrasts-with: see sibling-confusion notes above
- composes-with: `mkpsi-orchestrator`, `mkpsi-output-verifier`, `mkpsi-manipulation-ethics-gate`, `mkpsi-depth-interview-motive-trace`, `mkpsi-find-real-why`, `mkpsi-empathic-playback-we-pronouns`

---

## Audit information

- **Validation passed:** V1 ✓ / V2 ✓ / V3 ✓ (P2.)
- **Test pass rate:** designed; see `test-prompts.json`
- **Distillation date:** 2026-07-21
