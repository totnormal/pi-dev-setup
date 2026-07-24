---
name: dunford-positioning-context
description: |
  Use when a user says customers do not understand what a product is, compare it to the wrong alternatives, or asks how to make value obvious. Do not use for copy polishing or generic branding if market context is already clear. Triggers: positioning, context, frame of reference, customers don’t get it, wrong category.
source_book: |
  Obviously Awesome — April Dunford
source_chapter: |
  Introduction; Positioning as Context
tags: [positioning, context, market-category]
related_skills: []
disable-model-invocation: true
---

# Positioning as Context

## R — Original Passage (Reading)

> Positioning is the act of deliberately defining how you are the best at something that a defined market cares a lot about.
>
> — April Dunford, Introduction; Positioning as Context

---

## I — Methodology Skeleton (Interpretation)

Positioning is not a slogan. It is the act of choosing the context customers will use to understand what the product is, who it is for, what alternatives it competes with, and why its value matters. The same product can look worthless in one context and obviously valuable in another. The agent’s job is to detect the current frame, test whether it makes the product’s strengths obvious, and propose a better frame when needed.

---

## A1 — Application in the Book (Past Application)

Dunford uses Joshua Bell playing violin in a subway as the central analogy: the performance did not change, but the subway context made people treat world-class music like background noise. She also describes repositioning a database as a data warehouse, which made prospects stop comparing it to Oracle and start understanding its analytical value.

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
- Use this skill when the problem is specifically about **Positioning as Context**.
- Use `dunford-output-verifier` after producing the artifact to double-check quality.

---

## E — Execution Steps

1. **Identify the current context customers are likely using**
   - Identify the current context customers are likely using: category, assumed competitors, expected features, pricing assumptions, and buyer identity.
   - Completion standard: this step produces a concrete, inspectable note, list, decision, or revision.

2. **Step 2**
   - List the product’s strongest differentiated value and ask whether the current context makes that value obvious or hides it.
   - Completion standard: this step produces a concrete, inspectable note, list, decision, or revision.

3. **Step 3**
   - Generate 2–4 alternative frames of reference and score each by clarity, credibility, competitive advantage, and fit for best-fit customers.
   - Completion standard: this step produces a concrete, inspectable note, list, decision, or revision.

4. **Step 4**
   - Recommend the strongest context and explain what assumptions it should trigger in customers.
   - Completion standard: this step produces a concrete, inspectable note, list, decision, or revision.

5. **Verification layer**
   - Verification layer: check that the proposed context changes customer assumptions, not merely wording; reject contexts that sound trendy but do not make differentiated value clearer.
   - Completion standard: this step produces a concrete, inspectable note, list, decision, or revision.

---

## B — Boundary

### Do not use this skill when

- Do not use when the user only needs surface copy editing after strategy is fixed.
- Do not use to invent value the product cannot deliver.
- Be careful with products that have no customer evidence yet; treat conclusions as positioning hypotheses.

### Common failure modes from Dunford's books

- Treating positioning as copywriting rather than strategic context.
- Talking about features before clarifying alternatives and value.
- Using generic trends, generic problems, or generic proof.
- Letting the buyer infer the purchase criteria alone.

### Verification requirement

Before finalizing any output from this skill, run the local verification step included above. For larger artifacts, also invoke or manually apply `dunford-output-verifier`.

---

## Related skills

- None explicitly required; use `dunford-output-verifier` for final QA.

---

## Audit Information

- Verification passed: V1 ✓ / V2 ✓ / V3 ✓
- Test pass target: >=80%, with all should-not-trigger cases passing
- Distilled: 2026-07-21
