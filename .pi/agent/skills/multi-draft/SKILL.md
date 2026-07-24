---
name: multi-draft
description: "Generate multiple parallel drafts of a writing task (academic, creative, or professional) using different AI models in parallel git worktrees, then compare results. Use when you need different stylistic or structural takes on the same task."
disable-model-invocation: true
---

# Multi-Draft Writer

Generates multiple parallel drafts of a writing or creative task by spawning separate git worktrees, running each with a different model configuration, and collecting the results for comparison.

## When to Use

- Academic writing that needs different rhetorical approaches
- Creative writing (stories, essays) with different stylistic treatments
- Professional/business writing requiring multiple framing options
- Any task where seeing 2–5 independent drafts helps choose the best direction

## Procedure

1. **Confirm the task** — the prompt, constraints, length, audience, and tone
2. **Choose models** — specify which LLM providers/models to use per draft
3. **Create worktrees** — for each model, `git worktree add` a new branch from current HEAD
4. **Run each draft** — in each worktree, execute the same writing prompt with the assigned model
5. **Collect outputs** — gather all drafts into a comparison document
6. **Present** — show drafts side by side with model attribution, recommend the best

## Pitfalls

- Each worktree consumes disk space (full checkout); clean up with `git worktree prune`
- Model results vary in quality — not an A/B test, a creative exploration
- Use `git stash` before worktree creation to preserve uncommitted changes

## Verification

- N worktrees created, N drafts produced
- All drafts returned before timeout
- Comparison document lists each draft with source model
