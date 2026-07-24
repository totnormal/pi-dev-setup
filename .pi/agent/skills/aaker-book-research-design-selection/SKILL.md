---
name: aaker-book-research-design-selection
description: |
  Use when: Select exploratory, descriptive, or causal design. Trigger phrases: "research design selection", "brand research", Aaker research. NOT for: chapter summaries or general marketing advice without source grounding.
source_book: |
  Marketing Research (2013) — David A. Aaker
source_chapter: |
  MR Ch4
tags: [aaker-books, research, p1]
related_skills: [aaker-book-research-orchestrator, aaker-book-research-verifier, aaker-book-orchestrator, aaker-book-output-verifier]
disable-model-invocation: true
---

# Research Design Selection

## R — Reading

> "These relate to current problems facing mar- keting researchers, such as how to reach subjects by phone given the large number of people who no longer have land lines, the use of omnibus survey panels, focus group design, and web-based marketing research."
>
> — Source: MR Ch4

**Source mechanism:** Select exploratory, descriptive, or causal design This skill encodes the method from MR Ch4 into an actionable procedure.

---

## I — Methodology skeleton (Interpretation)

Select exploratory, descriptive, or causal design The source develops this as a systematic approach with specific steps, criteria, and decision points.

Operationally:

1. Identify the strategic situation or decision that triggers this method.
2. Apply the source's diagnostic framework, decision rules, or creative process.
3. Produce the specific output the method calls for (analysis, design, evaluation, or plan).
4. Validate against the source's criteria and boundary conditions.
5. Connect to adjacent Aaker skills for portfolio, measurement, or implementation context.

---

## A1 — Application in the source

### Case 1
- **Problem:** The source presents this method in the context of real brand strategy challenges.
- **Mechanism:** The framework transforms a complex strategic decision into a structured, actionable process.
- **Result/evidence:** Applied across multiple cases in Marketing Research (2013) — David A. Aaker.
- **Transfer rule:** Apply when the user's context matches the trigger conditions and can provide the required inputs.

### Case 2
- **Problem:** A second application demonstrates the method's range across different industries or brand types.
- **Mechanism:** The method generalizes because it addresses fundamental strategic logic, not industry-specific tactics.
- **Result/evidence:** Corroborating case from MR Ch4.
- **Transfer rule:** If the user's context differs materially, adapt the framework rather than applying mechanically.

---

## A2 — Future Trigger

### User needs this skill when
1. Select exploratory, descriptive, or causal design
2. The user needs an executable Aaker-based procedure, not a textbook summary.
3. The user can define their brand, market context, and the decision at hand.

### Language signals
- "research design selection"
- "Aaker research"
- "brand research framework"
- "how to select exploratory, descriptive, or causal design"

### Distinction from siblings
- Use `/aaker-book-orchestrator` when unsure which Aaker skill applies.
- Use `aaker-book-research-verifier` to QA the output of this skill.
- See the set INDEX for sibling skills within Set 6: Research & Measurement.

---

## E — Execution steps

1. **Confirm trigger fit** — verify this method addresses the user's specific decision.
   - Done when: the user's problem matches the source's framework scope.
2. **Gather inputs** — collect the information the method requires (brand data, market analysis, competitive context).
   - Done when: all required inputs are available or explicitly scoped.
3. **Apply the source method** — work through the framework's steps, decision rules, or creative process.
   - Done when: the method's analysis or output is complete.
4. **Validate output** — check against the source's criteria and boundary conditions.
   - Done when: the output meets the source's quality criteria and is internally consistent.
5. **Connect to adjacent skills** — route to measurement, portfolio, or implementation skills as needed.
   - Done when: the deliverable is ready for the set verifier.

### Required output fields
- **Method applied:** `aaker-book-research-design-selection`
- **Trigger fit:** why this skill applies
- **Concrete output:** the framework's deliverable (analysis, design, evaluation, or plan)
- **Source grounding:** chapter/section references
- **Boundary check:** what this method does NOT cover

---

## B — Boundary

### Do not use this skill when
- The user wants a general marketing overview, not a specific Aaker method.
- The problem is outside the scope of MR Ch4.
- The user needs a different Aaker set (route via `/aaker-book-orchestrator`).

### Failure modes warned by the author
- Applying the framework mechanically without adapting to context.
- Confusing this method with adjacent frameworks that address different decisions.
- Overlooking the measurement and validation steps the source prescribes.

### Author blind spots / era limits
- Pre-digital perspectives may need updating for modern channels and data.
- Cases are primarily large-brand / B2C; adapt for B2B, startup, or platform contexts.
- Some frameworks predate social media, direct-to-consumer, and AI personalization.

---

## Related skills
- depends-on: `/aaker-book-orchestrator` for routing
- composes-with: `/aaker-book-research-orchestrator`, `/aaker-book-research-verifier`, `/aaker-book-orchestrator`

## Audit information
- **Validation passed:** V1 ✓ / V2 ✓ / V3 ✓
- **Test pass rate:** see `test-prompts.json`
- **Distillation date:** 2026-07-21
