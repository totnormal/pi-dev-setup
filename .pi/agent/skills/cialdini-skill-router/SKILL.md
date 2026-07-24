---
name: cialdini-skill-router
description: |
  Use when a user asks for Cialdini-based persuasion help and you need to decide which skills from the local `cialdini-*` suite are relevant, load/apply only those skills, and synthesize their outputs into one ethical influence plan. Trigger phrases: “which Cialdini skills apply”, “use Cialdini on this”, “audit this persuasion funnel”, “make this more persuasive”, “apply Influence and Pre-Suasion”. NOT for standalone summaries of Cialdini’s books or non-actionable book discussion.
source_book: |
  Influence + Pre-Suasion — Robert B. Cialdini
source_chapter: |
  Meta-synthesis across Influence ch.1–7 and Pre-Suasion ch.1–14
_tags: [persuasion, skill-router, influence, marketing, sales, ethics]
related_skills: [cialdini-ethical-influence-screen, cialdini-output-verifier, cialdini-influence-system, cialdini-reciprocity-design, cialdini-commitment-design, cialdini-social-proof-calibration, cialdini-trust-stack, cialdini-scarcity-loss-frame, cialdini-presuasion-attention-design, cialdini-unity-builder]
disable-model-invocation: true
---

# Cialdini Skill Router

## R — Reading

> “The highest achievers spent more time crafting what they did and said before making a request.”
>
> — Robert B. Cialdini, *Pre-Suasion*, Chapter 1

> “Once we have made a choice or taken a stand, we will encounter personal and interpersonal pressures to behave consistently with that commitment.”
>
> — Robert B. Cialdini, *Influence*, Chapter 3

---

## I — Methodology skeleton (Interpretation)

This is the meta-skill for the Cialdini suite. Its job is not to apply every persuasion principle at once. Its job is to:

1. Understand the user’s persuasion context: audience, desired action, current asset, evidence, constraints, and ethical risk.
2. Always run an ethics gate first.
3. Diagnose the main bottleneck in the persuasion situation.
4. Select the smallest useful subset of sibling `cialdini-*` skills.
5. Read/apply those sibling skills before producing advice.
6. Synthesize a single plan that names each influence mechanism, its evidence basis, implementation steps, and safety constraints.
7. Run/apply `cialdini-output-verifier` at the end to QA the result before final delivery.

The router should prefer **1–3 sibling skills**. More than three is usually a sign that the user needs a staged strategy, not a pile of tactics.

---

## A1 — Application in the source

### Case 1: The best persuaders prepare the ground before the ask
- **Problem**: Cialdini expected top influence professionals to spend most time refining the request itself.
- **Methodology use**: He observed that top performers instead spent more time shaping what happened before the request.
- **Result**: The agent should not jump straight to copy tweaks; it should first decide whether the issue is attention, trust, proof, urgency, commitment, reciprocity, or unity.

### Case 2: Influence principles are shortcuts, not decorations
- **Problem**: Cialdini’s principles can be treated as a checklist of tricks.
- **Methodology use**: Each principle works only when a particular cue is relevant to the decision context.
- **Result**: The router must match the principle to the bottleneck and reject irrelevant or fake triggers.

---

## A2 — Future Trigger

### User needs this skill when

1. They ask broadly for persuasion help without naming a specific Cialdini mechanism.
2. They provide a landing page, sales deck, email, onboarding flow, negotiation script, fundraising pitch, or CTA and ask to improve conversion/trust/action.
3. They ask which Cialdini principles or `cialdini-*` skills apply.
4. They ask for an ethical influence audit or a persuasion strategy across multiple touchpoints.

### Language signals

- “which Cialdini skills apply?”
- “use Cialdini on this”
- “make this more persuasive”
- “increase conversion ethically”
- “apply Influence / Pre-Suasion”
- “persuasion audit”
- “what principle is missing here?”

### With adjacent skills

- `cialdini-influence-system` is the conceptual umbrella; this router is the operational dispatcher.
- `cialdini-ethical-influence-screen` is always consulted first when a behavior-change tactic is requested.
- Use sibling skills only after selecting them from the routing matrix below.

---

## E — Execution steps

When activated, follow this procedure:

1. **Parse the influence task**
   - Identify: audience, desired behavior, current artifact/context, offered value, proof available, constraints, and risk level.
   - If any are missing, ask concise clarification questions unless the next step is still obvious.

2. **Apply the ethics gate first**
   - Load/apply `cialdini-ethical-influence-screen` whenever the request involves changing behavior, increasing conversion, creating urgency, using proof, or changing attention.
   - Reject or reframe requests involving fake scarcity, fake social proof, fake authority, hidden opt-outs, coercion, or vulnerable-audience exploitation.

3. **Diagnose the primary bottleneck**

   | Bottleneck | Symptoms in user request | Route to |
   |---|---|---|
   | Audience is not attending to the right criterion | “frame this”, “opening”, “before the ask”, “prime”, wrong evaluation lens | `cialdini-presuasion-attention-design` |
   | They have no reason to give back / respond | “lead magnet”, “free sample”, “give before asking”, “concession” | `cialdini-reciprocity-design` |
   | They express interest but do not follow through | “activation”, “habit”, “no-show”, “make it stick”, “small yes” | `cialdini-commitment-design` |
   | They are uncertain whether others like them trust it | “reviews”, “testimonials”, “logos”, “case studies”, “popular” | `cialdini-social-proof-calibration` |
   | They do not trust the source | “credibility”, “authority”, “expert”, “likeable”, “founder story”, “bio” | `cialdini-trust-stack` |
   | They do not feel urgency / cost of delay | “deadline”, “limited seats”, “waitlist”, “loss”, “FOMO” | `cialdini-scarcity-loss-frame` |
   | They need belonging or shared identity | “community”, “membership”, “we/us”, “movement”, “ritual”, “cohort” | `cialdini-unity-builder` |
   | The whole system needs diagnosis | multiple bottlenecks, unclear mechanism, full funnel/pitch audit | `cialdini-influence-system` plus selected siblings |

4. **Select the smallest sibling set**
   - Default: choose 1 primary skill + `cialdini-ethical-influence-screen`.
   - Choose up to 2 supporting skills when the artifact truly spans multiple bottlenecks.
   - If more than 3 skills seem relevant, create a phased plan: “Phase 1 attention/trust; Phase 2 proof/commitment; Phase 3 urgency/unity.”

5. **Load/apply sibling skill content**
   - If operating in a file-enabled environment, read the selected sibling `SKILL.md` files from the same `cialdini-*` skill directory set before giving the final plan.
   - If direct loading is not available, apply the sibling by name using its routing definition above and state which skills would have been invoked.

6. **Synthesize the answer**
   - Draft the persuasion artifact/plan with:
     1. **Selected skills** — list primary/supporting skills and why.
     2. **Ethics screen** — allowed / risky / reject, with reason.
     3. **Diagnosis** — core persuasion bottleneck.
     4. **Recommendations** — concrete copy/UX/script/sequence changes grouped by selected skill.
     5. **Risks / anti-patterns** — what not to do.
     6. **Next test** — one measurable experiment or qualitative validation.

7. **Run/apply `cialdini-output-verifier` before final delivery**
   - Check routing fit, counterfeit-trigger risk, autonomy/vulnerability risk, execution specificity, and measurement plan.
   - If verifier verdict is **Pass**, deliver the result.
   - If **Pass with fixes**, apply the fixes and mention them briefly.
   - If **Fail**, do not ship the artifact as-is; explain why and provide an ethical revised direction.

---

## B — Boundary

### Do not use this skill when

- The user only wants a summary, biography, citation, or historical explanation of Cialdini.
- The request is purely translation/proofreading with no persuasion design.
- The user asks for deception, fake proof, fake scarcity, hidden manipulation, or coercive pressure; use the ethics screen to refuse/reframe.
- The user already names a precise sibling skill and does not need routing.

### Failure modes warned by the source

- Treating influence triggers as magic words rather than evidence-backed contextual cues.
- Applying several principles simultaneously until the message feels manipulative.
- Using counterfeit signals: fake authority, fake testimonials, artificial deadlines, invented commonality.
- Ignoring reactance: too much pressure can make people resist to protect autonomy.

### Author blind spots / era limits

- Modern platforms can automate and personalize influence at a scale Cialdini’s original field examples did not fully address.
- The books focus on interpersonal and marketing influence; they do not fully solve product value, market selection, regulatory compliance, or privacy consent.
- Lab/field effects must be tested in the user’s actual audience and culture.

---

## Related skills

- depends-on: `cialdini-ethical-influence-screen`
- contrasts-with: direct use of any single sibling skill when the mechanism is already obvious
- composes-with: `cialdini-influence-system`, `cialdini-reciprocity-design`, `cialdini-commitment-design`, `cialdini-social-proof-calibration`, `cialdini-trust-stack`, `cialdini-scarcity-loss-frame`, `cialdini-presuasion-attention-design`, `cialdini-unity-builder`, `cialdini-output-verifier`

---

## Audit information

- **Validation passed**: V1 ✓ / V2 ✓ / V3 ✓
- **Test pass rate**: designed; see `test-prompts.json`
- **Distillation date**: 2026-07-21
