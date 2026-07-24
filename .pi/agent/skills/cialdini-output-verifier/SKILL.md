---
name: cialdini-output-verifier
description: |
  Use after producing any Cialdini-based persuasion artifact, strategy, landing-page rewrite, email, sales script, onboarding flow, pitch, or influence audit to QA whether the output used the selected `cialdini-*` mechanisms correctly and ethically. Trigger phrases: “verify this Cialdini output”, “QA the persuasion plan”, “check for manipulation”, “is this using Cialdini correctly”, “final persuasion review”. NOT for choosing which skill to use initially; use `cialdini-skill-router` for routing.
source_book: |
  Influence + Pre-Suasion — Robert B. Cialdini
source_chapter: |
  Ethics, counterfeit triggers, and principle-specific boundaries across Influence + Pre-Suasion
_tags: [persuasion, qa, verifier, ethics, dark-patterns]
related_skills: [cialdini-skill-router, cialdini-ethical-influence-screen, cialdini-influence-system, cialdini-reciprocity-design, cialdini-commitment-design, cialdini-social-proof-calibration, cialdini-trust-stack, cialdini-scarcity-loss-frame, cialdini-presuasion-attention-design, cialdini-unity-builder]
disable-model-invocation: true
---

# Cialdini Output Verifier

## R — Reading

> “The highest achievers spent more time crafting what they did and said before making a request.”
>
> — Robert B. Cialdini, *Pre-Suasion*, Chapter 1

> “The rule says that we should try to repay, in kind, what another person has provided us.”
>
> — Robert B. Cialdini, *Influence*, Chapter 2

---

## I — Methodology skeleton (Interpretation)

This is the final QA skill for the Cialdini suite. It checks whether a produced persuasion output is:

1. **Correctly routed** — the chosen Cialdini mechanisms match the real persuasion bottleneck.
2. **Evidence-based** — proof, authority, scarcity, unity, and reciprocity claims are truthful and specific.
3. **Ethically bounded** — the output preserves autonomy, avoids counterfeit triggers, and does not exploit vulnerability.
4. **Executable** — recommendations are concrete enough to implement in copy, UX, sales, onboarding, or negotiation.
5. **Testable** — the output includes a measurable next experiment or validation step.

The verifier should not rewrite from scratch unless the output fails. It should grade, flag risks, and provide targeted fixes.

---

## A1 — Application in the source

### Case 1: Counterfeit influence triggers
- **Problem**: Cialdini shows that influence shortcuts can be activated by fake or shallow cues: canned laughter, authority symbols, unwanted gifts, artificial limits.
- **Methodology use**: A valid output must distinguish real evidence from counterfeit triggers.
- **Result**: The verifier rejects fake reviews, fake scarcity, fake credentials, fake intimacy, and hidden pressure.

### Case 2: Reactance against pressure
- **Problem**: Scarcity and restriction can intensify desire, but heavy-handed pressure can also make people resist to defend freedom.
- **Methodology use**: A valid output should create informed urgency while preserving choice.
- **Result**: The verifier checks for panic language, repeated urgency cues, or opt-out/cancellation friction.

### Case 3: Pre-suasion as relevant attention, not hidden manipulation
- **Problem**: Pre-suasive openers can shift attention before the request.
- **Methodology use**: A valid opener must focus the audience on a genuinely relevant decision criterion.
- **Result**: The verifier flags irrelevant fear/sex/status primes and asks for explicit relevance.

---

## A2 — Future Trigger

### User needs this skill when

1. A `cialdini-*` skill has already produced copy, strategy, or recommendations.
2. The user asks whether a persuasion artifact is ethical, credible, or too manipulative.
3. The user wants final QA before publishing a landing page, email, sales script, deck, onboarding flow, or campaign.
4. The router has selected/applied sibling skills and needs a final verifier step.

### Language signals

- “verify this Cialdini output”
- “QA the persuasion plan”
- “check for manipulation”
- “is this ethical?”
- “is this using Cialdini correctly?”
- “final persuasion review”
- “would this trigger reactance?”

### With adjacent skills

- Use `cialdini-skill-router` before this when the relevant mechanisms are unclear.
- Use `cialdini-ethical-influence-screen` for a focused ethics gate before work begins.
- Use this verifier after one or more sibling skills have produced an output.

---

## E — Execution steps

When activated, verify the output in this order:

1. **Identify the claimed mechanism(s)**
   - List every Cialdini skill/principle used: pre-suasion, reciprocity, commitment, social proof, trust/authority/liking, scarcity, unity.
   - Done when: each recommendation maps to one explicit mechanism or is marked “non-Cialdini/general.”

2. **Check routing fit**
   - Ask: does this mechanism address the actual bottleneck, or was it added because it sounds persuasive?
   - Done when: each mechanism has a one-line fit justification.

3. **Run the counterfeit-trigger audit**
   - Social proof: are testimonials/logos/stats real, similar, and specific?
   - Authority: are credentials relevant and substantiated?
   - Scarcity: is the limit/deadline real and explained?
   - Reciprocity: is the gift/value genuinely useful without trapping the recipient?
   - Unity: is shared identity real, non-exclusionary, and non-coercive?
   - Pre-suasion: is the opener relevant to the decision criterion?
   - Done when: every cue is classified as real / needs substantiation / reject.

4. **Check autonomy and vulnerability**
   - Look for hidden opt-outs, cancellation friction, shame, fear, panic, identity pressure, or targeting vulnerable groups.
   - Done when: risks are labeled low / medium / high with fixes.

5. **Check execution quality**
   - Recommendations must be specific enough to implement: exact copy, placement, sequence, UX element, script line, or experiment.
   - Done when: vague advice is replaced with concrete implementation guidance.

6. **Check measurement**
   - Require one next test: A/B test, conversion metric, trust metric, qualitative user test, sales-call observation, or retention/follow-through metric.
   - Done when: the output includes success metric, guardrail metric, and test duration/sample if possible.

7. **Return the verifier verdict**
   - Use this format:
     - **Verdict**: Pass / Pass with fixes / Fail
     - **Selected mechanisms**: list
     - **What works**: bullets
     - **Required fixes**: bullets
     - **Manipulation/dark-pattern risks**: bullets
     - **Measurement plan**: one concrete test
     - **Final approved version**: only include if fixes are small; otherwise ask to revise and rerun verifier.

---

## B — Boundary

### Do not use this skill when

- The user has not produced or requested a Cialdini-based artifact yet and primarily needs routing; use `cialdini-skill-router`.
- The task is a book summary, citation lookup, or biography question.
- The user asks for help evading legal/compliance requirements.
- The artifact’s core offer is false or harmful; fail it rather than polishing it.

### Failure modes warned by the source

- Fake social proof: reviews, logos, “everyone is doing it,” or popularity claims without evidence.
- Fake scarcity: artificial countdowns, invented limited seats, false waitlists.
- Fake authority: irrelevant credentials, status symbols, or overconfident tone without proof.
- Manipulative reciprocity: gifts that create unwanted debt.
- Commitment traps: sunk-cost escalation, hidden lock-in, cancellation friction.
- Unity abuse: fake intimacy, tribalism, out-group hostility, pressure rituals.
- Pre-suasion abuse: irrelevant primes that bias instead of clarify.

### Author blind spots / era limits

- Modern algorithmic personalization, privacy law, consent design, and dark-pattern regulation require stricter safeguards than many original examples.
- Empirical influence effects vary by audience, culture, channel, and offer quality; verify in context.
- Ethical persuasion requires product/value truth, not only correct technique.

---

## Related skills

- depends-on: `cialdini-ethical-influence-screen`
- contrasts-with: `cialdini-skill-router` (router chooses skills; verifier QA-checks outputs)
- composes-with: all `cialdini-*` execution skills

---

## Audit information

- **Validation passed**: V1 ✓ / V2 ✓ / V3 ✓
- **Test pass rate**: designed; see `test-prompts.json`
- **Distillation date**: 2026-07-21
