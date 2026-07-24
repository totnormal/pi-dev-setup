---
name: cialdini-influence-system
description: |
  Use when a user asks to improve persuasion, sales/marketing copy, onboarding, fundraising, negotiations, calls-to-action, credibility, or ethical influence and needs the right Cialdini lens selected. Trigger phrases: “make this more persuasive”, “increase conversion”, “influence users ethically”, “why won’t people say yes”, “persuasion strategy”. NOT for coercion, deception, dark patterns, or purely factual research.
source_book: |
  Influence + Pre-Suasion — Robert B. Cialdini
source_chapter: |
  Influence ch.1–7; Pre-Suasion ch.1–14
tags: [persuasion, influence, marketing, sales, ethics, router]
related_skills: [cialdini-ethical-influence-screen, cialdini-reciprocity-design, cialdini-commitment-design, cialdini-social-proof-calibration, cialdini-trust-stack, cialdini-scarcity-loss-frame, cialdini-presuasion-attention-design, cialdini-unity-builder]
disable-model-invocation: true
---

# Cialdini Influence System Router

## R — Reading

> “The highest achievers spent more time crafting what they did and said before making a request.”
>
> — Robert B. Cialdini, Influence ch.1–7; Pre-Suasion ch.1–14

---

## I — Methodology skeleton (Interpretation)

1. Cialdini is best used as a routing system, not as a bag of tricks.
2. First decide whether the task is ethically influenceable: true benefit, informed choice, no fabricated pressure.
3. Then diagnose which barrier is dominant: no attention, no trust, no proof, no urgency, no commitment, no relationship, or no reciprocity.
4. Select the smallest matching lever and make the influence mechanism explicit to the user.
5. Prefer truthful context design over manipulative copy decoration.

---

## A1 — Application in the source

### Case 1: Training-program infiltration
- **Problem**: Cialdini observed sales, fundraising, recruiting, PR, and advertising trainings to find repeated “yes” practices.
- **Methodology use**: He found top performers prepared the context before making the request.
- **Result**: Persuasion depends on what is focal before the ask, not just the ask itself.

### Case 2: Click-whirr shortcuts
- **Problem**: Fixed-action patterns and human judgment shortcuts work because they save effort.
- **Methodology use**: Cialdini treats each principle as a shortcut that can be useful or exploited.
- **Result**: The agent should identify the shortcut and its ethical constraints.

---

## A2 — Future Trigger

### User needs this skill when

1. A user wants a persuasion strategy but has not named the mechanism.
2. A user asks for conversion or compliance improvements and multiple Cialdini principles may apply.
3. A user asks to audit whether existing copy or a funnel is manipulative.

### Language signals

- "make this more persuasive"
- "increase conversion ethically"
- "which influence principle applies"
- "persuasion audit"
- "why won’t they say yes"

### Distinction from siblings

- Start with `cialdini-influence-system` when the right mechanism is unclear.
- Start with `cialdini-ethical-influence-screen` when the tactic may pressure, mislead, or exploit.
- Use this skill only for the mechanism named in its title; do not stack multiple Cialdini levers unless each is truthful and necessary.

---

## E — Execution steps

1. **Run cialdini-ethical-influence-screen first: identify target behavior, beneficiary, evidence truth, and possible coercion.**
   - Done when: the output names the evidence, the intended behavioral effect, and the ethical constraint.
2. **Diagnose the bottleneck: attention, trust, proof, urgency, commitment, reciprocity, or unity.**
   - Done when: the output names the evidence, the intended behavioral effect, and the ethical constraint.
3. **Route to one or two sibling skills only; avoid stacking every principle.**
   - Done when: the output names the evidence, the intended behavioral effect, and the ethical constraint.
4. **Return an influence plan with mechanism, copy/UX changes, risks, and a non-manipulative alternative.**
   - Done when: the output names the evidence, the intended behavioral effect, and the ethical constraint.

---

## B — Boundary

### Do not use this skill when

- Do not use to deceive, fake evidence, hide material facts, or pressure vulnerable groups.
- Do not optimize persuasion when the underlying offer is bad; recommend fixing value first.
- Do not combine all principles by default; overloading triggers reactance and distrust.

### Global Cialdini safety constraints

- Truthful evidence beats persuasion technique; if the evidence is weak, say so.
- Preserve meaningful choice; avoid hidden defaults, fake constraints, or social pressure that makes refusal unsafe.
- Name the influence mechanism in the answer so the user can judge it consciously.

---

## Related skills

- depends-on: cialdini-ethical-influence-screen (for safety review)
- contrasts-with: see `cialdini-influence-system`
- composes-with: cialdini-ethical-influence-screen, cialdini-reciprocity-design, cialdini-commitment-design, cialdini-social-proof-calibration, cialdini-trust-stack, cialdini-scarcity-loss-frame, cialdini-presuasion-attention-design, cialdini-unity-builder

---

## Audit information

- **Validation passed**: V1 ✓ / V2 ✓ / V3 ✓
- **Test pass rate**: designed; see `test-prompts.json`
- **Distillation date**: 2026-07-21
