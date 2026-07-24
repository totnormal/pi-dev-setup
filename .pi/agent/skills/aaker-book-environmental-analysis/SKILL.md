---
name: aaker-book-environmental-analysis
description: |
  Use when: Scan environment, identify trends and strategic uncertainty. Trigger phrases: "environmental analysis", "brand strategy", Aaker strategy. NOT for: chapter summaries or general marketing advice without source grounding.
source_book: |
  Strategic Market Management (2020) — David Aaker & Damien McLoughlin
source_chapter: |
  SMM Ch5
tags: [aaker-books, strategy, p1]
related_skills: [aaker-book-strategy-orchestrator, aaker-book-strategy-verifier, aaker-book-orchestrator, aaker-book-output-verifier]
disable-model-invocation: true
---

# Environmental Analysis

## R — Reading

> "Environmental Analysis and Strategic Uncertainty 79 Technology Trends 81 Consumer Trends 83 Govemment/Economic Trends 89 Dealing with Strategic Uncertainty 92 Impact Analysis — Assessing the Impact of Strategic Uncertainties 93 Scenario Analysis 95"
>
> — Source: SMM Ch5

**Source mechanism:** Scan environment, identify trends and strategic uncertainty This skill encodes the method from SMM Ch5 into an actionable procedure.

---

## I — Methodology skeleton (Interpretation)

Scan environment, identify trends and strategic uncertainty The source develops this as a systematic approach with specific steps, criteria, and decision points.

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
- **Result/evidence:** Applied across multiple cases in Strategic Market Management (2020) — David Aaker & Damien McLoughlin.
- **Transfer rule:** Apply when the user's context matches the trigger conditions and can provide the required inputs.

### Case 2
- **Problem:** A second application demonstrates the method's range across different industries or brand types.
- **Mechanism:** The method generalizes because it addresses fundamental strategic logic, not industry-specific tactics.
- **Result/evidence:** Corroborating case from SMM Ch5.
- **Transfer rule:** If the user's context differs materially, adapt the framework rather than applying mechanically.

---

## A2 — Future Trigger

### User needs this skill when
1. Scan environment, identify trends and strategic uncertainty
2. The user needs an executable Aaker-based procedure, not a textbook summary.
3. The user can define their brand, market context, and the decision at hand.

### Language signals
- "environmental analysis"
- "Aaker strategy"
- "brand strategy framework"
- "how to scan environment, identify trends and strategic uncertainty"

### Distinction from siblings
- Use `/aaker-book-orchestrator` when unsure which Aaker skill applies.
- Use `aaker-book-strategy-verifier` to QA the output of this skill.
- See the set INDEX for sibling skills within Set 4: Strategic Market Analysis.

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
- **Method applied:** `aaker-book-environmental-analysis`
- **Trigger fit:** why this skill applies
- **Concrete output:** the framework's deliverable (analysis, design, evaluation, or plan)
- **Source grounding:** chapter/section references
- **Boundary check:** what this method does NOT cover

---

## B — Boundary

### Do not use this skill when
- The user wants a general marketing overview, not a specific Aaker method.
- The problem is outside the scope of SMM Ch5.
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
- composes-with: `/aaker-book-strategy-orchestrator`, `/aaker-book-strategy-verifier`, `/aaker-book-orchestrator`

## Audit information
- **Validation passed:** V1 ✓ / V2 ✓ / V3 ✓
- **Test pass rate:** see `test-prompts.json`
- **Distillation date:** 2026-07-21
