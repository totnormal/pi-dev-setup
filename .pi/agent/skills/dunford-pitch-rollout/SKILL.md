---
name: dunford-pitch-rollout
description: |
  Use when a team has a new sales pitch/deck/demo and needs to validate, train, standardize, and maintain it. Do not use during initial positioning. Triggers: rollout, test pitch, sales enablement, certify reps, pitch drift.
source_book: |
  Sales Pitch — April Dunford
source_chapter: |
  Testing and Launching the Sales Pitch
tags: [sales, enablement, rollout]
related_skills: []
disable-model-invocation: true
---

# Test and Roll Out the Sales Pitch

## R — Original Passage (Reading)

> We don’t know if we have the best story possible, but we know if it’s better than the old one.
>
> — April Dunford, Testing and Launching the Sales Pitch

---

## I — Methodology Skeleton (Interpretation)

Dunford treats pitch deployment as a controlled change, not a big-bang rollout. Test with one respected rep, observe real calls, iterate lightly, and validate when that rep chooses the new pitch over the old one. Then train, certify, recertify, and assign ownership so the story does not drift.

---

## A1 — Application in the Book (Past Application)

Dunford recommends one respected salesperson for the pilot because sales adoption is hard and reps are biased toward what they already know. If the test fails, inspect sales involvement and positioning quality rather than endlessly tweaking slides.

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
- Use this skill when the problem is specifically about **Test and Roll Out the Sales Pitch**.
- Use `dunford-output-verifier` after producing the artifact to double-check quality.

---

## E — Execution Steps

1. **Step 1**
   - Choose one respected rep and train them on the new pitch flow.
   - Completion standard: this step produces a concrete, inspectable note, list, decision, or revision.

2. **Step 2**
   - Run the pitch with real qualified prospects while creators observe.
   - Completion standard: this step produces a concrete, inspectable note, list, decision, or revision.

3. **Debrief after each call**
   - Debrief after each call: confusion, excitement, objections, timing.
   - Completion standard: this step produces a concrete, inspectable note, list, decision, or revision.

4. **Step 4**
   - Validate only when the rep believes the new pitch is better than the old one.
   - Completion standard: this step produces a concrete, inspectable note, list, decision, or revision.

5. **Verification layer**
   - Verification layer: separate small wording fixes from core strategy problems; if the core fails, revisit positioning.
   - Completion standard: this step produces a concrete, inspectable note, list, decision, or revision.

---

## B — Boundary

### Do not use this skill when

- Do not roll out broadly before testing.
- Do not let every rep invent a different first-call story.
- Do not expect standardization to mean robotic delivery.

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
