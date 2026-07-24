---
name: dunford-proof-matching
description: |
  Use when a pitch makes value claims but lacks believable evidence, or when choosing case studies/logos/metrics for a prospect. Do not use for generic testimonial collection. Triggers: proof, case study, credibility, evidence, claims.
source_book: |
  Sales Pitch — April Dunford
source_chapter: |
  Step 6: Proof
tags: [sales, proof, credibility]
related_skills: []
disable-model-invocation: true
---

# Match Proof to Value and Prospect Situation

## R — Original Passage (Reading)

> Buyers have learned that just because the company says it can do something does not make it so.
>
> — April Dunford, Step 6: Proof

---

## I — Methodology Skeleton (Interpretation)

Proof turns claims into credible reasons to believe. Dunford allows many forms: case studies, third-party validation, certifications, metrics, customer quotes, analyst reviews, research, and awards. The best proof matches both the value theme and the prospect’s situation.

---

## A1 — Application in the Book (Past Application)

Dunford advises showing a banking case study to a bank and manufacturing proof to a manufacturer when possible. Customer statements count as proof in ways vendor claims do not.

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
- Use this skill when the problem is specifically about **Match Proof to Value and Prospect Situation**.
- Use `dunford-output-verifier` after producing the artifact to double-check quality.

---

## E — Execution Steps

1. **Step 1**
   - List every value claim in the pitch.
   - Completion standard: this step produces a concrete, inspectable note, list, decision, or revision.

2. **Step 2**
   - Attach the strongest available proof type to each claim.
   - Completion standard: this step produces a concrete, inspectable note, list, decision, or revision.

3. **Step 3**
   - Prefer proof from similar customers, roles, industries, use cases, or previous status quo.
   - Completion standard: this step produces a concrete, inspectable note, list, decision, or revision.

4. **Step 4**
   - If proof is missing, mark the claim as risky or soften it.
   - Completion standard: this step produces a concrete, inspectable note, list, decision, or revision.

5. **Verification layer**
   - Verification layer: distinguish vendor assertion from external/customer evidence and check that proof supports the exact value being claimed.
   - Completion standard: this step produces a concrete, inspectable note, list, decision, or revision.

---

## B — Boundary

### Do not use this skill when

- Do not overclaim beyond the proof.
- Do not use irrelevant logos as proof of a specific outcome.
- Do not bury critical proof after the buyer has already lost trust.

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
