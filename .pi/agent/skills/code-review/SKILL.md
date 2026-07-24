---
name: code-review
description: "MUST USE for cross-model code review of code you did NOT write: incoming PRs, subagent/entwurf output, AI-generated configs, LLM-produced refactors, vendor drops, copy-pasted snippets. Core rule: the reviewer model must differ from the writer model (writer Claude -> judge GPT/DeepSeek/Gemini, and vice versa) because a model will rationalize its own output. Three stages: triage -> cross-model semantic review against a 6-point rubric (correctness, security, spec_fidelity, regressions, error_handling, maintainability) -> optional multi-model consensus for high-stakes/prod/security diffs. Use when the user says 'review this', 'review this PR', 'review this diff', 'is this code correct', 'check this output', or when 'looks fine to me' is not an acceptable verdict. SKIP trivial diffs (typos, dep bumps, formatting) and your own freshly-written tested code."
disable-model-invocation: true
---

# Code Review — Standalone Cross-Model Verification

Kill single-model blind spots. The distinctive rule: **the reviewer model must
differ from the writer model.** Everything else is structured rubric + triage.

## When to SKIP

- Trivial diffs (typos, dependency bumps, formatting) — mechanical check only.
- Your own code, freshly written, passing tests, obviously correct.
- Generated output already validated via `spec-first-planning` Stage 3.

---

## Stage A — Triage (fast, single pass, any model)

Establish what the change is before judging it. Produce:

- **Intent summary** — one sentence on what this diff is trying to do.
- **Spec match** — does it claim to implement a spec/issue/seed? List the
  acceptance criteria and mark each addressed / missing / extra.
- **Mechanical status** — build, typecheck, existing tests. Run them; do not assume.
- **Blast radius** — what breaks if wrong? (prod config? user data? auth path?
  or isolated utility?)

If Stage A surfaces an obvious bug or spec violation, stop and report. Do not
review deeper code that fails its basic contract.

**Gate to Stage B:** intent clear, mechanical checks pass, no contract violation.

---

## Stage B — Semantic Review (the core: cross-model judge)

The writer ≠ reviewer rule is non-negotiable here.

### Setup

- **Judge model = a different family than the writer.** If you don't know the
  writer family, assume the default and pick a contrasting judge.
  - Writer Anthropic (Claude) → judge OpenAI (GPT) or DeepSeek/Gemini.
  - Writer OpenAI → judge Claude or Gemini/DeepSeek.
  - Writer DeepSeek/Gemini → judge Claude or GPT.
- In Pi, run the judge as a subagent or `entwurf` with an explicit `model:`
  override so the family difference is guaranteed, not hoped for.

### Rubric (judge against these, not vibes)

1. **Correctness** — does it do what the intent summary claims? Edge cases?
2. **Security** — injection, auth bypass, secret leakage, unsafe interpolation,
   least-privilege violations.
3. **Spec fidelity** — each acceptance criterion met? Drift or scope creep?
   (N/A if no spec.)
4. **Regressions** — breaks invariants or existing behavior elsewhere?
5. **Error handling** — failure modes covered? Silent failures?
6. **Maintainability** — readable, tested, not clever-for-no-reason.

### Required output from the judge

```yaml
semantic_review:
  judge_model:        # the different-family model used
  criteria:
    correctness:      pass|fail — reason
    security:         pass|fail — reason
    spec_fidelity:    pass|fail — reason (N/A if no spec)
    regressions:      pass|fail — reason
    error_handling:   pass|fail — reason
    maintainability:  pass|fail — reason
  findings:           # ordered by severity, each: {severity, file, line, issue, suggested_fix}
  verdict:            approve|request_changes|block
```

**Any `fail` or `block` → back to author with findings. Do not merge on a
single-model "probably fine".**

---

## Stage C — Multi-Model Consensus (high-stakes only)

Reserve for diffs where Stage A flagged blast radius as high (prod, security,
data, auth) AND the change can't be fully covered by tests.

- 2–3 different model families each run Stage B's rubric independently.
- **Unanimous approve → ship. Split verdict → escalate to the human (Andrei).**
  Do not auto-resolve a split by majority vote on high-stakes code.
- Cost guardrail: if Stage B is clean and blast radius contained, stop at Stage B.

### Consensus output

```yaml
consensus_review:
  models:             # list of judge models used
  verdicts:           # per-model: {model, verdict, key_disagreement}
  unanimous:          true|false
  resolution:         ship|escalate
  dissent_summary:    # what they disagreed about, if anything
```

---

## Final verdict (emit to the human)

```yaml
code_review_verdict:
  change:             # one-line intent summary from Stage A
  blast_radius:       contained|high
  triage:             pass|fail — reason
  semantic:           approve|request_changes|block — judge_model
  consensus:          ship|escalate|skipped — models
  blocking_findings:  # severity-ordered, with file:line and fix
  recommendation:     merge|revise|escalate_to_human
```

---

## Integration with the existing stack

- **Subagents / entwurf:** delegate Stage B/C judges with explicit `model:`
  overrides. Cleanest way to guarantee writer ≠ reviewer in Pi.
- **`spec-first-planning`:** if the code under review came from a seed, pull the
  seed's acceptance criteria as the Stage B `spec_fidelity` rubric — don't
  re-derive intent from the diff.
- **Mechanical stage belongs to CI/local, not here:** this skill starts at
  triage. If mechanical checks aren't green, fail Stage A and stop.

## Self-anneal

If a real review misses a category (e.g. performance, accessibility, i18n), add
it to the Stage B rubric. Don't add hypothetical items — every addition is
judge-model cost on every review.
