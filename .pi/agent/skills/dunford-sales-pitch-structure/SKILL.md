---
name: dunford-sales-pitch-structure
description: |
  Use when building or auditing a first-call B2B sales pitch from positioning. Do not use for investor decks, recruitment stories, or pure product docs. Triggers: sales deck, pitch, first call, demo flow, sales narrative, help buyers buy.
source_book: |
  Sales Pitch — April Dunford
source_chapter: |
  The Sales Pitch Structure
tags: [sales, pitch, story]
related_skills: 
  - slug: dunford-sales-insight
    relation: composes-with
  - slug: dunford-alternatives-mapping
    relation: composes-with
  - slug: dunford-perfect-world
    relation: composes-with
  - slug: dunford-value-demo
    relation: composes-with
  - slug: dunford-proof-matching
    relation: composes-with
  - slug: dunford-objections-ask
    relation: composes-with
  - slug: dunford-positioning-components
    relation: depends-on
disable-model-invocation: true
---

# Two-Phase Eight-Step Sales Pitch Structure

## R — Original Passage (Reading)

> The goal of a great sales pitch is to help customers understand all their choices, the trade-offs between each, and when to pick your solution.
>
> — April Dunford, The Sales Pitch Structure

---

## I — Methodology Skeleton (Interpretation)

Dunford’s sales pitch has two phases. The Setup teaches market context through Insight, Alternatives, and Perfect World. The Follow-through introduces the product and demonstrates differentiated value with proof, objection handling, and a clear ask. The structure exists to help buyers make a confident decision, not to pressure them.

---

## A1 — Application in the Book (Past Application)

Dunford contrasts a Help Scout feature walkthrough with a guided market conversation: shared inbox vs traditional help desk vs Help Scout’s loyalty-and-growth approach. The latter helps prospects understand choices before seeing the product.

---

## A2 — Trigger Scenarios (Future Trigger)

### Use this skill when

- The user’s request matches the description in the frontmatter.
- The user is trying to make a product, market, buyer, value, demo, or sales story clearer using April Dunford’s positioning/sales-pitch method.
- The user needs an actionable artifact, not just a summary of the books.

### Language signals

- “positioning”, “category”, “alternatives”, “differentiated value”, “sales pitch”, “demo”, “buyer guide”, “why pick us”, “customers don’t get it”
- “How do we explain this?”, “What market are we in?”, “Our demo is too feature-heavy”, “Help buyers choose”, “Our pitch isn’t working”

### Distinction from adjacent Dunford skills

- Use `dunford-positioning-to-sales` when the user wants the whole workflow.
- Use this skill when the problem is specifically about **Two-Phase Eight-Step Sales Pitch Structure**.
- Use `dunford-output-verifier` after producing the artifact to double-check quality.

---

## E — Execution Steps

1. **Gather positioning inputs**
   - Gather positioning inputs: alternatives, unique capabilities, differentiated value, best-fit customer, category, proof.
   - Completion standard: this step produces a concrete, inspectable note, list, decision, or revision.

2. **Draft Setup**
   - Draft Setup: Insight → Alternatives → Perfect World.
   - Completion standard: this step produces a concrete, inspectable note, list, decision, or revision.

3. **Draft Follow-through**
   - Draft Follow-through: Introduction → Differentiated Value → Proof → Objections → Ask.
   - Completion standard: this step produces a concrete, inspectable note, list, decision, or revision.

4. **Step 4**
   - Mark where discovery questions happen and where demo/slides/script support each step.
   - Completion standard: this step produces a concrete, inspectable note, list, decision, or revision.

5. **Verification layer**
   - Verification layer: check that the pitch answers “why pick us over alternatives?” and does not collapse into a product walkthrough.
   - Completion standard: this step produces a concrete, inspectable note, list, decision, or revision.

---

## B — Boundary

### Do not use this skill when

- Do not use for investor vision narratives; those sell the future.
- Do not use if positioning is weak; fix positioning first.
- Do not let Setup consume the meeting; value is the centerpiece.

### Common failure modes from Dunford's books

- Treating positioning as copywriting rather than strategic context.
- Talking about features before clarifying alternatives and value.
- Using generic trends, generic problems, or generic proof.
- Letting the buyer infer the purchase criteria alone.

### Verification requirement

Before finalizing any output from this skill, run the local verification step included above. For larger artifacts, also invoke or manually apply `dunford-output-verifier`.

---

## Related skills

- composes-with: `dunford-sales-insight`
- composes-with: `dunford-alternatives-mapping`
- composes-with: `dunford-perfect-world`
- composes-with: `dunford-value-demo`
- composes-with: `dunford-proof-matching`
- composes-with: `dunford-objections-ask`
- depends-on: `dunford-positioning-components`

---

## Audit Information

- Verification passed: V1 ✓ / V2 ✓ / V3 ✓
- Test pass target: >=80%, with all should-not-trigger cases passing
- Distilled: 2026-07-21
