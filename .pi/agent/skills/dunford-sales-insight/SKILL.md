---
name: dunford-sales-insight
description: |
  Use when a sales pitch opens with generic problems/trends and needs a differentiated market insight. Do not use for thought-leadership content unrelated to the product’s unique value. Triggers: insight, point of view, problem inside the problem, sales opener.
source_book: |
  Sales Pitch — April Dunford
source_chapter: |
  Step 1: Insight
tags: [sales, insight, positioning]
related_skills: 
  - slug: dunford-value-themes
    relation: depends-on
disable-model-invocation: true
---

# Build the Market Insight

## R — Original Passage (Reading)

> Your unique insight into the market is what leads you to build a product that is different and better than the alternatives.
>
> — April Dunford, Step 1: Insight

---

## I — Methodology Skeleton (Interpretation)

Insight is the opening market point of view that makes your differentiated value matter. It is not a generic trend. Work backward from the unique value: what must best-fit buyers understand or believe before they see that value as important? That statement frames the rest of the pitch.

---

## A1 — Application in the Book (Past Application)

LevelJump’s insight is not “sales teams need training.” It is that sales enablement should be measured by sales outcomes such as time to first deal and quota attainment. That insight points directly to LevelJump’s Salesforce-native differentiated value.

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
- Use this skill when the problem is specifically about **Build the Market Insight**.
- Use `dunford-output-verifier` after producing the artifact to double-check quality.

---

## E — Execution Steps

1. **Step 1**
   - Start with differentiated value and best-fit customer.
   - Completion standard: this step produces a concrete, inspectable note, list, decision, or revision.

2. **Ask**
   - Ask: what do these buyers need to know to understand why this value matters?
   - Completion standard: this step produces a concrete, inspectable note, list, decision, or revision.

3. **Step 3**
   - Draft the “problem inside the problem” as a concise market point of view.
   - Completion standard: this step produces a concrete, inspectable note, list, decision, or revision.

4. **Step 4**
   - Add one discovery question that tests whether the buyer agrees or relates.
   - Completion standard: this step produces a concrete, inspectable note, list, decision, or revision.

5. **Verification layer**
   - Verification layer: reject insights that any competitor could use unchanged or that are merely broad trends like “AI is accelerating.”
   - Completion standard: this step produces a concrete, inspectable note, list, decision, or revision.

---

## B — Boundary

### Do not use this skill when

- Do not make Insight long; it should set direction quickly.
- Do not use research theater if the insight is simple.
- Do not start with company history or product features.

### Common failure modes from Dunford's books

- Treating positioning as copywriting rather than strategic context.
- Talking about features before clarifying alternatives and value.
- Using generic trends, generic problems, or generic proof.
- Letting the buyer infer the purchase criteria alone.

### Verification requirement

Before finalizing any output from this skill, run the local verification step included above. For larger artifacts, also invoke or manually apply `dunford-output-verifier`.

---

## Related skills

- depends-on: `dunford-value-themes`

---

## Audit Information

- Verification passed: V1 ✓ / V2 ✓ / V3 ✓
- Test pass target: >=80%, with all should-not-trigger cases passing
- Distilled: 2026-07-21
