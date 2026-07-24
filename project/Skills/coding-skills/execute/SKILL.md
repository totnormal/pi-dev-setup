---
name: execute
description: Runs a plan step-by-step with verification loops. Surgical changes, test-first where possible, clean up after yourself. Use when a plan exists and it's time to build.
disable-model-invocation: true
---

# Execute Skill

Runs plans with discipline: surgical changes, verification loops, and traceability. Combines Karpathy's coding principles with structured execution against a plan.

## When to Use

Trigger when:
- User says "execute this plan", "let's build it", "start implementation"
- A plan with steps and verification criteria exists
- User says "implement step N" or "do the next step"
- Fixing a bug with clear reproduction → just execute, no plan needed

Do NOT trigger when:
- No plan exists and task is complex → use `plan` skill first
- Still exploring → use `explore` skill
- Task is trivial (one-line fix) → just do it

## Process

### Phase 1: Setup

Before touching any code:

1. **Load the plan** — Read the plan file or recall the plan from conversation
2. **Identify current step** — Which step are we on?
3. **Check prerequisites** — Does the previous step's verification pass?
4. **State intent** — Briefly state what this step will do and why

### Phase 2: Execute the Step

Apply these rules for every change:

#### Surgical Changes (Karpathy Rule 3)
- Touch only what the step requires
- Match existing code style — don't reformat, don't add type hints, don't "improve" adjacent code
- If you notice dead code, mention it — don't delete it
- Clean up your own orphans (unused imports your changes created)

#### Simplicity First (Karpathy Rule 2)
- Minimum code that solves the step
- No speculative features, no abstractions for single-use code
- If you write 200 lines and it could be 50, rewrite it
- Ask yourself: "Would a senior engineer say this is overcomplicated?"

#### Test-First When Possible
- If the step adds functionality → write/identify the test first
- If the step fixes a bug → reproduce it with a test first
- If no test framework exists → at minimum, describe the manual verification

### Phase 3: Verify

**Every step MUST be verified before moving on.**

Run the step's verification checklist:
- [ ] All verification checks from the plan pass
- [ ] No regressions (existing tests still pass)
- [ ] Change is proportional to the step (no scope creep)

If verification fails:
1. Read the error carefully
2. Fix the specific issue (don't rewrite from scratch)
3. Re-verify
4. If stuck after 3 attempts → escalate to user with what you tried

### Phase 4: Report & Advance

After verification passes:

```markdown
## Step N: [Title] ✅

**Done:** [What was actually done]
**Changed files:** [List]
**Verification:** [What passed]
**Notes:** [Anything unexpected, decisions made]
**Next:** Step N+1: [Title]
```

If anything deviated from the plan:
- Note what changed and why
- Flag if it affects subsequent steps
- Update the plan if needed

### Phase 5: Loop

Continue to the next step. Repeat Phases 2-4 until:
- All steps are complete → run final success criteria
- User interrupts → report current status
- A blocker is hit → report blocker and wait for user input

## Execution Modes

### Sequential (default)
Execute steps in order, one at a time. Verify each before moving on.

### Parallel (when applicable)
If the plan identifies parallel steps, use `entwurf` to spawn subagents for independent work. Each subagent follows the same verification discipline.

### Single Step
User says "implement step 3 only" — execute just that step, verify, report.

## Error Handling

| Situation | Action |
|-----------|--------|
| Test fails | Fix → re-run → repeat up to 3x → escalate |
| Missing dependency | Install if safe, ask if uncertain |
| Step blocked by previous step | Report gap, suggest fix |
| Scope creep during step | Flag it, don't implement it |
| Plan turns out to be wrong | Stop, explain why, suggest replan |

## Quality Gates

Before marking any step complete:
- [ ] Code compiles / runs without errors
- [ ] Step-specific verification checks pass
- [ ] No unrelated changes in the diff
- [ ] Existing tests still pass
- [ ] Changes are traceable to the plan step

## Pitfalls

- Don't skip verification to go faster. Failed verification → fix → re-verify. Always.
- Don't batch multiple steps. One step at a time with verification between.
- Don't refactor unrelated code "while you're here". Stay surgical.
- Don't interpret "execute" as "think less". If something seems wrong with the plan, say so.
- Don't keep looping forever. If stuck after 3 tries, stop and ask for help.
- Don't forget to update the plan when reality diverges from it.
