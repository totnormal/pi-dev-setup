---
name: dunford-output-verifier
description: |
  Use at the end of any Dunford-style positioning, category, value-proposition, sales-pitch, demo, or buyer-guide output to self-check quality. Do not use as the primary creation skill. Triggers: verify, audit, check, QA, double-check, final review.
source_book: |
  Obviously Awesome — April Dunford; Sales Pitch — April Dunford
source_chapter: |
  Quality synthesis layer requested by user
tags: [verification, quality, positioning, sales]
related_skills: []
disable-model-invocation: true
---

# Verify Dunford Positioning and Sales Outputs

## R — Original Passage (Reading)

> If we fail at positioning, we fail at marketing and sales. If we fail at marketing and sales, the entire business fails.
>
> — April Dunford, Quality synthesis layer requested by user

---

## I — Methodology Skeleton (Interpretation)

This is the verification layer added on top of the Dunford skill set. It checks whether the output follows Dunford’s causality: real alternatives → unique attributes → provable value → best-fit customers → category/context → buyer-guiding story. It catches generic claims, feature dumps, ungrounded trends, missing proof, and asks that do not advance buying.

---

## A1 — Application in the Book (Past Application)

This combines the failure modes from both books: positioning statements that assume the answer, categories that trigger bad assumptions, generic insights, demos organized around features, proof mismatches, and pitch rollout drift.

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
- Use this skill when the problem is specifically about **Verify Dunford Positioning and Sales Outputs**.
- Use `dunford-output-verifier` after producing the artifact to double-check quality.

---

## E — Execution Steps

1. **Check naming/language**
   - Check naming/language: all generated skills/artifacts are English and any skill names begin with `dunford-`.
   - Completion standard: this step produces a concrete, inspectable note, list, decision, or revision.

2. **Check positioning chain**
   - Check positioning chain: alternatives, unique attributes, value, best-fit customers, category, and trend (if any) are present and connected.
   - Completion standard: this step produces a concrete, inspectable note, list, decision, or revision.

3. **Check sales chain**
   - Check sales chain: insight, alternatives, perfect world, introduction, differentiated value, proof, objections, and ask are present when relevant.
   - Completion standard: this step produces a concrete, inspectable note, list, decision, or revision.

4. **Check specificity**
   - Check specificity: remove claims any competitor could make, segments that are not identifiable, and trends not tied to value.
   - Completion standard: this step produces a concrete, inspectable note, list, decision, or revision.

5. **Check evidence**
   - Check evidence: every value claim has proof or is marked as a hypothesis.
   - Completion standard: this step produces a concrete, inspectable note, list, decision, or revision.

6. **Check trigger boundaries**
   - Check trigger boundaries: each skill/artifact says when not to use it and avoids overlap with adjacent dunford skills.
   - Completion standard: this step produces a concrete, inspectable note, list, decision, or revision.

7. **Step 7**
   - Return PASS / REVISE with concrete fixes, then apply revisions if operating as an agent.
   - Completion standard: this step produces a concrete, inspectable note, list, decision, or revision.

---

## B — Boundary

### Do not use this skill when

- Do not rubber-stamp; this verifier should fail weak outputs.
- Do not require sales-pitch sections for a pure positioning artifact unless relevant.
- Do not require final certainty when the product lacks customers; label hypotheses instead.

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
