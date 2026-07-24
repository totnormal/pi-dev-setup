---
name: plan
description: Turns discovery briefs and ideas into actionable step-by-step plans with verification criteria. Use after exploration, before execution.
disable-model-invocation: true
---

# Plan Skill

Transforms exploration outputs into concrete, verifiable execution plans. Every step has a clear deliverable and a check that proves it worked.

## When to Use

Trigger when:
- User says "let's plan this", "create a plan", "how do we build this"
- Discovery brief is ready and decision is "proceed"
- User asks "what are the steps for...", "break this down"
- Before starting implementation work

Do NOT trigger when:
- Still exploring → use `explore` skill
- Plan exists and user is ready to execute → use `execute` skill
- Task is trivial (< 3 steps) → just do it, no plan needed

## Process

### Phase 1: Scope the Plan

From the discovery brief or user input, extract:

1. **Goal** — One sentence: what we're building/doing
2. **Constraints** — Time, tech, budget, existing systems
3. **Dependencies** — What must exist before we start
4. **Out of scope** — What we're explicitly NOT doing

If no discovery brief exists, ask: "Do you want me to explore this first, or do you have enough clarity to plan directly?"

### Phase 2: Break Down

Decompose into **ordered steps**, each with:

```markdown
## Step N: [Clear imperative verb + noun]

**What:** [1 sentence what this step does]
**Why:** [Why this step matters / what it unblocks]
**Deliverable:** [Concrete output: file, test passing, URL, etc.]

### Verification
- [ ] [Specific check that proves this step is done]
- [ ] [Additional check if needed]

### Dependencies
- Requires: [Previous step or external dependency]
- Unblocks: [Next step(s)]

### Estimated effort
[Quick gut check: minutes / hours / days]

### Notes
[Any gotchas, alternatives, or decisions deferred]
```

### Phase 3: Sequence & Prioritize

Order steps by dependency chain. Apply these rules:

1. **Test-first steps first** — If a step can be verified by a test, write the test as part of the step
2. **Riskiest steps early** — If a step might fail, do it before building on top of it
3. **Value-first** — If the first 20% of steps deliver 80% of value, flag that as "MVP path"
4. **Parallel opportunities** — Mark steps that can run concurrently

### Phase 4: Define Success

Write explicit **Plan Success Criteria**:

```markdown
## Plan Success Criteria

The plan is complete when:
1. [Measurable outcome #1]
2. [Measurable outcome #2]
3. [Measurable outcome #3]

The plan fails if:
- [Failure condition #1]
- [Failure condition #2]
```

Strong criteria: "API returns 200 for all test cases", "Page loads in < 2s on mobile"
Weak criteria: "It works", "Looks good", "Feels right"

### Phase 5: Present Plan

Output format:

```markdown
# Plan: [Goal]

## Overview
[2-3 sentences: what we're doing and why]

## Context
- **Constraints:** [key constraints]
- **Out of scope:** [what we're not doing]
- **Assumptions:** [what we're assuming]

## Steps

### Step 1: [Title]
...

### Step 2: [Title]
...

[etc.]

## Success Criteria
[From Phase 4]

## MVP Path (if applicable)
Steps [1-N] deliver core value. Steps [N+1-end] are enhancement.

## Risks & Mitigations
| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| [Risk] | H/M/L | [What to do] |
```

## Quality Gates

Before delivering:
- [ ] Every step has a concrete deliverable (not just "work on X")
- [ ] Every step has at least one verification check
- [ ] Steps are ordered by dependency
- [ ] Success criteria are measurable
- [ ] Total step count is proportional to complexity (not 20 steps for a simple task)
- [ ] MVP path is identified for plans with > 5 steps

## Pitfalls

- Don't over-plan. If the task is small, 3 steps is enough.
- Don't under-plan. If the task is complex, skipping steps costs more later.
- Don't make every step dependent on the previous one — find parallelism.
- Don't confuse "plan" with "design". This is about what to do, not how to architect.
- Don't skip verification criteria. A step without a check is a step you can't confirm.
