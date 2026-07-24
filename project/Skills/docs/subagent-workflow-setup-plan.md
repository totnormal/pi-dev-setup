# Clean-Main-Context Subagent Workflow — Setup Plan

> **Status:** PLANNING (awaiting user choice before execution)
> **Date:** 2026-06-12

**Goal:** Configure pi so the main context window holds only thinking/planning/architecting/progress-tracking, while all "worker" execution happens in child subagent or tmux sessions outside the main window.

**Architecture:** Use `pi-subagents` (native orchestration — already downloaded, agents already defined) as the primary engine. Optionally add `pi-tmux-subagents` for attachable tmux-backed sessions. The parent session orchestrates; children execute and return only compact results.

**Tech Stack:** pi 0.79.1, tmux 3.6b, pi-subagents 0.27.0 (downloaded), existing agent defs in `~/.pi/agent/agents/`.

---

## 1. Current State Audit (done)

| Check | Result |
|-------|--------|
| pi version | `0.79.1` ✓ |
| tmux | `3.6b` at `/opt/homebrew/bin/tmux` ✓ |
| `pi-subagents` package | v0.27.0 in `~/.pi/agent/npm/node_modules/` ✓ downloaded |
| `pi-subagents` registered? | **NO** — not in `settings.json` `packages[]` → extension is dormant |
| `pi-tmux-subagents` | **Not installed** |
| `pi-intercom` | **Not installed** |
| Agent defs `~/.pi/agent/agents/*.md` | **Exist**: `scout`, `planner`, `reviewer`, `worker`, `docs-scout` + `sdd-*` suite (SDD workflow) |
| `~/.pi/agent/agents/config.json` | Absent (would use defaults) |
| defaultProvider / defaultModel | `kilo` / `kilo-auto/free` |

**Key finding:** You have *agent definitions* ready but the *engine that runs them* (`pi-subagents`) is not registered. That's why pi currently does NOT spawn subagents — the capability is installed-but-dormant.

---

## 2. The Decision (needs your input)

### Option A — `pi-subagents` (native, RECOMMENDED)
- **Already downloaded.** One command to register.
- Agents (`scout`, `planner`, `reviewer`, `worker`) already defined in your `agents/` dir.
- Children are isolated pi sessions with their own context — main window stays clean.
- Feature-rich: chains, parallel runs, async/background, forked context, worktree isolation, model overrides per agent.
- Optional `pi-intercom` lets children ask the parent questions mid-task.
- **Trade-off:** children are NOT visible tmux panes; you interact via the parent's `subagent` tool / slash commands.

### Option B — `pi-tmux-subagents` (tmux-backed)
- Real tmux sessions you can `tmux attach` to and watch live.
- Markdown-defined agents (`scout`, `worker`, `delegate` built-in) from `~/.pi/agent/agents/*.md`.
- Good for long-running or inspectable worker tasks.
- **Trade-off:** newer (v0.1.1, 289 dl/mo), leaner feature set than pi-subagents, separate orchestration model.

### Option C — Both
- `pi-subagents` as the primary orchestration engine; `pi-tmux-subagents` for specific tasks you want to attach to and watch.
- Two different `tmux_subagent` / `subagent` tools coexist (different tool names, no conflict).

**My recommendation:** Start with **Option A** (`pi-subagents`) — it's 90% already in place. Add Option B later only if you specifically want attachable panes.

---

## 3. Implementation Plan (Option A — pi-subagents)

### Task 1: Register the dormant package

**Files:**
- Modify: `~/.pi/agent/settings.json` (the `packages[]` array)

- [ ] **Step 1:** Add `"npm:pi-subagents"` to the `packages[]` array in `~/.pi/agent/settings.json`.

```jsonc
  "packages": [
    "npm:pi-subagents",          // <-- add this line near the top
    "npm:pi-hermes-memory",
    // ... existing entries
  ]
```

- [ ] **Step 2:** Verify it loads — restart pi and run in-session:

```
/subagents-doctor
```
Expected: green health-check output listing the engine, intercom (absent/optional), and discovered agents.

- [ ] **Step 3:** Confirm agent discovery:

```
Show me the available subagents.
```
Expected: list including `scout`, `planner`, `reviewer`, `worker`, `delegate`, `oracle` (builtins) + your custom `sdd-*` and `docs-scout`.

### Task 2: (Optional) Add `pi-intercom` for two-way comms

**Files:**
- Modify: `~/.pi/agent/settings.json` (add `"npm:pi-intercom"` to `packages[]`)

- [ ] **Step 1:** Add `"npm:pi-intercom"` to `packages[]`.
- [ ] **Step 2:** Restart pi; re-run `/subagents-doctor`.
- [ ] **Step 3:** Test — ask a child to escalate:

```
Run worker on a trivial task in the background. If it needs a decision, have it ask me through intercom.
```
Expected: child gets a `contact_supervisor` tool; blocking questions surface in the parent session.

### Task 3: Configure orchestration defaults (optional tuning)

**Files:**
- Create: `~/.pi/agent/extensions/subagent/config.json`

- [ ] **Step 1:** Optionally set async-by-default so workers don't block the main window:

```json
{
  "asyncByDefault": true,
  "parallel": { "maxTasks": 8, "concurrency": 4 }
}
```

- [ ] **Step 2:** Restart pi. Confirm behavior: a `worker` task returns immediately to background and notifies on completion.

### Task 4: Verify the clean-context workflow end-to-end

- [ ] **Step 1:** In a small repo, run a scout → planner → worker → reviewer chain via natural language:

```
Use scout to map the auth flow, then have planner turn that into a plan.
```
Expected: main window shows only orchestration + compact summaries; full context stays in the child sessions.

- [ ] **Step 2:** Run a parallel review to confirm fan-out:

```
Run parallel reviewers: one for correctness, one for tests, one for complexity.
```
Expected: 3 children, grouped result returned to parent only.

- [ ] **Step 3:** Confirm main-window token usage stayed low (check `/session`).

---

## 4. Implementation Plan (Option B — pi-tmux-subagents), if chosen

### Task 5: Install + register

- [ ] **Step 1:** `pi install npm:pi-tmux-subagents`
- [ ] **Step 2:** Restart pi. Confirm tool available: ask "list tmux subagents".
- [ ] **Step 3:** Test a tmux-backed worker:

```
tmux_subagent({ agent: "scout", task: "list src files", background: true })
```
Expected: child runs in a tmux session `pi-agent-hub-<id>`; result written to `jobs/<id>/result.md`; attach command returned.

---

## 5. Recommended parent-side workflow patterns

Once active, drive everything from the main window with plain language (no slash commands needed):

| Want | Say |
|------|-----|
| Recon before deciding | "Use scout to investigate X, report back." |
| Plan a change | "Have planner turn that into an implementation plan." |
| Implement approved plan | "Have worker implement this plan, then run reviewers and apply feedback." |
| Second opinion | "Ask oracle to challenge this approach." |
| Parallel review | "Run reviewers for correctness, tests, and complexity." |
| Background execution | "Run this in the background." |
| See running work | "Show active async runs." |

Core loop the parent should follow: **clarify → planner → worker → fresh reviewers → worker**. The parent never edits code directly; it orchestrates.

---

## 6. Pitfalls / Notes

- `pi-subagents` is downloaded but dormant — the single most important step is **registering it in `settings.json`** (Task 1). Without that, none of this works.
- Built-in agents inherit the **default model** (`kilo-auto/free`). For heavier roles (worker/reviewer), consider pinning a stronger model via `subagents.agentOverrides.<name>.model` in settings.
- `context: "fork"` (default for planner/worker/oracle) requires the parent session to be **persisted**. Don't run orchestration with `--no-session`.
- Parallel workers editing the same checkout can clobber each other — use `worktree: true` for parallel implementation tasks.
- Restart pi after any `settings.json` change — extensions load at process start.
- `pi list` / `pi config` are interactive TUIs; don't run them in non-interactive tooling — edit JSON directly.

---

## 7. Execution Handoff

Plan saved to `docs/subagent-workflow-setup-plan.md`.

**Next decision required from you:**
1. **Option A only** (pi-subagents — recommended) → I execute Tasks 1–4.
2. **Option C (both)** → I execute Tasks 1–5.
3. **Option B only** (tmux-backed) → I execute Task 5 only.

Tell me which, and I'll proceed. No installs or settings edits will happen until you confirm.
