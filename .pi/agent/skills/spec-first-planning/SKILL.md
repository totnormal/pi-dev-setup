---
name: spec-first-planning
description: "MUST USE before writing any implementation prompt for a greenfield feature, new script, fuzzy-requirements task, or generated code you can't fully verify. Runs a quantified ambiguity gate (weighted clarity score, must hit <=0.20) that blocks premature coding, then produces an immutable seed spec, then a 3-stage verification pass (mechanical -> cross-model semantic -> multi-model consensus). Use when the user says 'plan this', 'spec out', 'design before coding', 'write the implementation prompt', 'requirements are unclear', or before any PLANNING session. Framework-free, stolen from Ouroboros. SKIP for bug fixes with known cause, ops/cron/VPS tasks, or templated work where acceptance criteria are already obvious."
disable-model-invocation: true
---

# Spec-First Planning — Ambiguity Gate + Verification

Kill rework by forcing clarity before code. Two mechanical gates: an ambiguity
score that blocks premature implementation, and a 3-stage verification pass.

## When to SKIP (do not impose overhead)

Impose the gate only when rework risk is real. Skip when:
- Bug fixes with a known root cause
- Operational tasks (cron sync, VPS restarts, config tweaks)
- Acceptance criteria are already obvious from the request
- Templated pipelines (client minisites, boilerplate)

If unsure, default to running the gate — it's cheap and surfaces assumptions.

---

## Phase 1 — Ambiguity Gate

Score the task on each dimension 0.0–1.0. Be honest; over-scoring defers pain
to the PR. Brownfield = touching existing code (add the context dimension).

### Greenfield weights

| Dimension | Weight |
|---|---|
| Goal Clarity — is the goal specific? | 40% |
| Constraint Clarity — are limits/stack/scope defined? | 30% |
| Success Criteria — are outcomes measurable? | 30% |

### Brownfield weights

| Dimension | Weight |
|---|---|
| Goal Clarity | 35% |
| Constraint Clarity | 25% |
| Success Criteria | 25% |
| Context Clarity — is the existing codebase understood? | 15% |

### Math

```
Ambiguity = 1 - Σ(clarity_i × weight_i)
```

**Threshold: Ambiguity ≤ 0.20 before writing the implementation prompt.**

Above 0.20 → do NOT proceed. Surface the clarifying questions that raise the
lowest-satisfaction dimension. Re-score. Repeat until ≤ 0.20.

If the gate fails >3 rounds, the task is probably two tasks — split it.
If brownfield context_clarity < 0.5, stop and READ THE CODEBASE before
re-scoring; don't guess a number into a 15% slot and hide the risk.

### Worked example (greenfield)

```
Goal:       0.9 × 0.40 = 0.36
Constraint: 0.8 × 0.30 = 0.24
Success:    0.7 × 0.30 = 0.21
                          ─────
Weighted clarity         = 0.81
Ambiguity = 1 − 0.81     = 0.19  ✅ proceed
```

### Scoring block (emit this in the planning response)

```yaml
ambiguity_gate:
  goal_clarity:        # 0.0-1.0 + one-line justification
  constraint_clarity:  # 0.0-1.0 + one-line justification
  success_criteria:    # 0.0-1.0 + one-line justification
  context_clarity:     # brownfield only
  weighted_clarity:    # computed
  ambiguity:           # = 1 − weighted_clarity
  gate: pass|fail
  open_questions:      # bullet list; must be empty when pass
```

---

## Phase 2 — Seed Spec

Only after the gate passes. The seed is an immutable contract for the
implementation session. Required fields:

- **Goal** — one sentence.
- **Constraints** — stack, scope boundaries, invariants that must not break.
- **Acceptance Criteria** — numbered, each independently checkable.
- **Out of scope** — explicit non-goals.
- **Files to touch / create** — best guess; implementation session may revise.

Store at the project's planning location (e.g. Omnee `.omni/<block>/prompts/*.md`,
or `.tmp/<task>-seed.md` for one-offs). Do not edit the seed mid-implementation.
If intent changes, write a new seed and note the delta — auditability is the point.

---

## Phase 3 — 3-Stage Verification

Run in order. Stop at the first failing stage; do not cascade.

### Stage 1 — Mechanical (free, deterministic)

Always run. Zero LLM cost.

- Typecheck/build/lint/tests for the stack (`tsc --noEmit`, `swift build`,
  `ruff`, `pytest`, etc.)
- Unit tests for new logic
- Diff review against the seed's acceptance criteria, line by line

Pass = all green. No "I'll fix it later" exceptions.

### Stage 2 — Semantic (one cross-model judge)

Use when Stage 1 passes but behavior is hard to verify mechanically (prompt
output quality, copy tone, UX flow, subtle logic).

- Judge = a DIFFERENT model family than the writer (writer Anthropic → judge
  OpenAI/Gemini/DeepSeek, and vice versa). Never let a model judge its own output.
- Rubric = the seed's acceptance criteria, as a checklist.
- Output: per-criterion pass/fail + one-line reason. Any fail → back to impl.

In Pi, delegate the judge to a subagent or `entwurf` with an explicit model
override to guarantee a different family.

### Stage 3 — Multi-Model Consensus (high-stakes only)

Reserve for: generated configs touching prod, security-adjacent code, or output
no human will read before it ships. Expensive — don't reach for it casually.

- 2–3 different model families (e.g. Claude, GPT, Gemini/DeepSeek), each judges
  the same rubric independently.
- **Pass = unanimous. Split verdict = escalate to the human; do not auto-merge.**

### Verification log (append to seed)

```yaml
verification:
  mechanical: { status, command, output_summary }
  semantic:   { status, judge_model, failed_criteria }
  consensus:  { status, models: [...], dissent }
  verdict:    ship|revise|escalate
```

---

## Edge cases

- **No cheap judge model available for Stage 2:** skip to Stage 3 with 2 models,
  or fall back to mechanical + human review. Never fake semantic with the writer
  model — it will confirm itself.
- **Implementation session claims the seed is wrong:** do not silently edit the
  seed. Write the delta explicitly, re-score ambiguity, re-issue.
- **Gate keeps failing >3 rounds:** split the task.

## Self-anneal

If a real failure exposes a missing dimension (e.g. "reversibility" for infra
changes), add it here and rebalance weights to sum to 1.0. Do not add
hypothetical dimensions. This skill is a living doc.
