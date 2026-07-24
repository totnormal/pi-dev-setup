---
name: dunford-positioning-components
description: |
  Use when defining or auditing product positioning from scratch: competitive alternatives, unique attributes, value, best-fit customers, market category, and optional trends. Do not use for sales pitch structure; use dunford-sales-pitch-structure after positioning inputs exist.
source_book: |
  Obviously Awesome — April Dunford
source_chapter: |
  The Five (Plus One) Components of Effective Positioning
tags: [positioning, strategy, canvas]
related_skills: 
  - slug: dunford-positioning-context
    relation: composes-with
  - slug: dunford-best-fit-customers
    relation: composes-with
  - slug: dunford-competitive-alternatives
    relation: composes-with
  - slug: dunford-value-themes
    relation: composes-with
  - slug: dunford-market-category
    relation: composes-with
  - slug: dunford-positioning-style-selector
    relation: composes-with
  - slug: dunford-trend-layering
    relation: composes-with
disable-model-invocation: true
---

# Five Plus One Positioning Components

## R — Original Passage (Reading)

> We can break down positioning into five components (plus an optional bonus component) that come together to define what we do, why we are special, which customers we can best serve and the market we intend to win.
>
> — April Dunford, The Five (Plus One) Components of Effective Positioning

---

## I — Methodology Skeleton (Interpretation)

Dunford’s core move is to decompose positioning into interdependent parts. Start with what customers would use if you did not exist, then isolate what you uniquely have, translate that into provable customer value, identify who cares most, choose the market category that makes the value obvious, and optionally layer a relevant trend. The order matters because each component constrains the next.

---

## A1 — Application in the Book (Past Application)

Dunford’s database example shows the full chain: customers were not comparing it to databases but to data warehouses/business-intelligence tools; its unique attribute was fast analysis; the value was faster answers from large data; the best buyers had time-sensitive analysis needs; the better category was data warehouse.

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
- Use this skill when the problem is specifically about **Five Plus One Positioning Components**.
- Use `dunford-output-verifier` after producing the artifact to double-check quality.

---

## E — Execution Steps

1. **Collect the six fields**
   - Collect the six fields: alternatives, unique attributes, value, best-fit customers, market category, relevant trends.
   - Completion standard: this step produces a concrete, inspectable note, list, decision, or revision.

2. **Force the dependency order**
   - Force the dependency order: alternatives → attributes → value → customer characteristics → category → trends.
   - Completion standard: this step produces a concrete, inspectable note, list, decision, or revision.

3. **Step 3**
   - For each value claim, attach proof or mark it as unproven.
   - Completion standard: this step produces a concrete, inspectable note, list, decision, or revision.

4. **Step 4**
   - Draft a one-page positioning canvas that shows how the components connect.
   - Completion standard: this step produces a concrete, inspectable note, list, decision, or revision.

5. **Verification layer**
   - Verification layer: check that every unique attribute is unique against the stated alternatives and every value theme maps to a best-fit customer characteristic.
   - Completion standard: this step produces a concrete, inspectable note, list, decision, or revision.

---

## B — Boundary

### Do not use this skill when

- Do not start from desired category or tagline; that reverses the method.
- Do not treat “easy to use” or “great support” as proof unless backed by evidence.
- If no happy customers exist, keep the output as a hypothesis, not a final position.

### Common failure modes from Dunford's books

- Treating positioning as copywriting rather than strategic context.
- Talking about features before clarifying alternatives and value.
- Using generic trends, generic problems, or generic proof.
- Letting the buyer infer the purchase criteria alone.

### Verification requirement

Before finalizing any output from this skill, run the local verification step included above. For larger artifacts, also invoke or manually apply `dunford-output-verifier`.

---

## Related skills

- composes-with: `dunford-positioning-context`
- composes-with: `dunford-best-fit-customers`
- composes-with: `dunford-competitive-alternatives`
- composes-with: `dunford-value-themes`
- composes-with: `dunford-market-category`
- composes-with: `dunford-positioning-style-selector`
- composes-with: `dunford-trend-layering`

---

## Audit Information

- Verification passed: V1 ✓ / V2 ✓ / V3 ✓
- Test pass target: >=80%, with all should-not-trigger cases passing
- Distilled: 2026-07-21
