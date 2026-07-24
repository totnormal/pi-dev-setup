---
name: dunford-positioning-to-sales
description: |
  Use when the user wants a complete Dunford-style workflow from positioning to first-call sales pitch, buyer guide, or GTM story. This is the orchestrator skill: use it to route across the other dunford-* skills. Do not use for isolated copy edits.
source_book: |
  Obviously Awesome — April Dunford; Sales Pitch — April Dunford
source_chapter: |
  Combined synthesis
tags: [positioning, sales, orchestration]
related_skills: 
  - slug: dunford-positioning-components
    relation: depends-on
  - slug: dunford-sales-pitch-structure
    relation: depends-on
  - slug: dunford-output-verifier
    relation: composes-with
disable-model-invocation: true
---

# Orchestrate Positioning Into a Sales Story

## R — Original Passage (Reading)

> Great positioning is worthless if it can’t be turned into a pitch that the sales team can use to close business.
>
> — April Dunford, Combined synthesis

---

## I — Methodology Skeleton (Interpretation)

The two books form one operating system. Obviously Awesome defines the strategic context: alternatives, value, customers, category. Sales Pitch turns that positioning into a buyer-guiding story: insight, alternatives, perfect world, value, proof, objections, ask. The orchestrator ensures outputs move in the correct order and do not skip from product features directly to sales copy.

---

## A1 — Application in the Book (Past Application)

Dunford’s own sequence is explicit: after a positioning exercise, she recommends building a sales story before broad messaging because sales is where positioning gets tested against real buyer confusion and objections.

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
- Use this skill when the problem is specifically about **Orchestrate Positioning Into a Sales Story**.
- Use `dunford-output-verifier` after producing the artifact to double-check quality.

---

## E — Execution Steps

1. **Diagnose the user’s entry point**
   - Diagnose the user’s entry point: positioning unclear, pitch weak, demo feature-heavy, or rollout problem.
   - Completion standard: this step produces a concrete, inspectable note, list, decision, or revision.

2. **Step 2**
   - If positioning is unclear, run positioning components before any pitch work.
   - Completion standard: this step produces a concrete, inspectable note, list, decision, or revision.

3. **If positioning exists, map it to pitch**
   - If positioning exists, map it to pitch: Insight, Alternatives, Perfect World, Introduction, Value, Proof, Objections, Ask.
   - Completion standard: this step produces a concrete, inspectable note, list, decision, or revision.

4. **Produce the requested artifact**
   - Produce the requested artifact: positioning canvas, sales storyboard, demo outline, buyer guide, or verification report.
   - Completion standard: this step produces a concrete, inspectable note, list, decision, or revision.

5. **Verification layer**
   - Verification layer: run dunford-output-verifier at the end and revise any section that fails.
   - Completion standard: this step produces a concrete, inspectable note, list, decision, or revision.

---

## B — Boundary

### Do not use this skill when

- Do not use as a shortcut to skip atomic skills when the problem is narrow.
- Do not produce a pitch without alternatives and differentiated value.
- Do not treat investor narratives as customer sales pitches.

### Common failure modes from Dunford's books

- Treating positioning as copywriting rather than strategic context.
- Talking about features before clarifying alternatives and value.
- Using generic trends, generic problems, or generic proof.
- Letting the buyer infer the purchase criteria alone.

### Verification requirement

Before finalizing any output from this skill, run the local verification step included above. For larger artifacts, also invoke or manually apply `dunford-output-verifier`.

---

## Related skills

- depends-on: `dunford-positioning-components`
- depends-on: `dunford-sales-pitch-structure`
- composes-with: `dunford-output-verifier`

---

## Audit Information

- Verification passed: V1 ✓ / V2 ✓ / V3 ✓
- Test pass target: >=80%, with all should-not-trigger cases passing
- Distilled: 2026-07-21
