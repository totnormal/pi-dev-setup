---
disable-model-invocation: true
name: gstack
description: "Gstack Unified Development Workflow. Single skill for: QA, plan reviews, design, security, shipping, deployment,. Keywords: gstack."
---

# gstack — Unified Development Workflow

## Extended Details

Single skill for: QA, plan reviews, design, security, shipping, deployment,
debugging, and all development lifecycle stages.

## Preamble (run first — all gstack workflows)

```bash
_UPD=$(~/.codex/skills/gstack/bin/gstack-update-check 2>/dev/null || .agents/skills/gstack/bin/gstack-update-check 2>/dev/null || ROOT=$(git rev-parse --show-toplevel 2>/dev/null) && [ -n "$ROOT" ] && "$ROOT/../../../docs/gstack/bin/gstack-update-check" 2>/dev/null || true)
[ -n "$_UPD" ] && echo "$_UPD" || true
mkdir -p ~/.gstack/sessions
touch ~/.gstack/sessions/"$PPID"
_SESSIONS=$(find ~/.gstack/sessions -mmin -120 -type f 2>/dev/null | wc -l | tr -d ' ')
find ~/.gstack/sessions -mmin +120 -type f -delete 2>/dev/null || true
_CONTRIB=$(~/.codex/skills/gstack/bin/gstack-config get gstack_contributor 2>/dev/null || true)
_PROACTIVE=$(~/.codex/skills/gstack/bin/gstack-config get proactive 2>/dev/null || echo "true")
_BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")
echo "BRANCH: $_BRANCH"
echo "PROACTIVE: $_PROACTIVE"
source <(~/.codex/skills/gstack/bin/gstack-repo-mode 2>/dev/null) || true
REPO_MODE=${REPO_MODE:-unknown}
echo "REPO_MODE: $REPO_MODE"
_LAKE_SEEN=$([ -f ~/.gstack/.completeness-intro-seen ] && echo "yes" || echo "no")
echo "LAKE_INTRO: $_LAKE_SEEN"
_TEL=$(~/.codex/skills/gstack/bin/gstack-config get telemetry 2>/dev/null || true)
_TEL_PROMPTED=$([ -f ~/.gstack/.telemetry-prompted ] && echo "yes" || echo "no")
_TEL_START=$(date +%s)
_SESSION_ID="$$-$(date +%s)"
echo "TELEMETRY: ${_TEL:-off}"
echo "TEL_PROMPTED: $_TEL_PROMPTED"
```

If `PROACTIVE` is `"false"`: do NOT suggest skills. Only invoke when user explicitly asks.
If `UPGRADE_AVAILABLE <old> <new>`: follow inline upgrade flow.
If `LAKE_INTRO` is `no`: Boil the Lake principle — completeness is near-free with AI.

## Core Principles (apply to ALL workflows)

### Completeness — Boil the Lake
AI makes the marginal cost of completeness near-zero. Present options with effort scales:
`Human team time / CC+gstack time`. Compression: boilerplate 100x, features 30x, bugs 20x,
architecture 5x, research 3x. "Good enough" is wrong instinct when "complete" costs
minutes more with AI.

### Repo Ownership — See Something, Say Something
`REPO_MODE` = "solo": investigate + offer to fix proactively.
`REPO_MODE` = "collaborative"/"unknown": flag issues for user decision.
Never let noticed issues silently pass.

### AskUserQuestion Format
1. **Re-ground**: Project + branch + current task (1-2 sentences)
2. **Simplify**: Plain English, no jargon, concrete examples
3. **Recommend**: `RECOMMENDATION: Choose [X] because [reason]` + `Completeness: X/10`
4. **Options**: Lettered with effort scales `(human: ~X / CC: ~Y)`

### Completion Status Protocol
- **DONE**: All steps completed, evidence for each claim
- **DONE_WITH_CONCERNS**: Completed but with issues to know about
- **BLOCKED**: Cannot proceed. State blocking factor and attempts.
- **NEEDS_CONTEXT**: Missing information. State exactly what's needed.
- If 3 failed attempts → STOP and escalate.
- If security-sensitive change and uncertain → STOP and escalate.

### Telemetry (run last — after workflow completes)
```bash
_TEL_END=$(date +%s)
_TEL_DUR=$(( _TEL_END - _TEL_START ))
rm -f ~/.gstack/analytics/.pending-"$_SESSION_ID" 2>/dev/null || true
~/.codex/skills/gstack/bin/gstack-telemetry-log \
  --skill "SKILL_NAME" --duration "$_TEL_DUR" --outcome "OUTCOME" \
  --used-browse "USED_BROWSE" --session-id "$_SESSION_ID" 2>/dev/null &
```
Replace SKILL_NAME, OUTCOME (success/error/abort), USED_BROWSE (true/false).

## Browse Setup (run before any browse/QA command)
```bash
_ROOT=$(git rev-parse --show-toplevel 2>/dev/null)
B=""
[ -n "$_ROOT" ] && [ -x "$_ROOT/../../../docs/gstack/browse/dist/browse" ] && B="$_ROOT/../../../docs/gstack/browse/dist/browse"
[ -n "$_ROOT" ] && [ -x "$_ROOT/.agents/skills/gstack/browse/dist/browse" ] && B="$_ROOT/.agents/skills/gstack/browse/dist/browse"
[ -z "$B" ] && B=~/.codex/skills/gstack/browse/dist/browse
if [ -x "$B" ]; then
  echo "READY: $B"
else
  echo "NEEDS_SETUP: Browse binary not found. Run: cd ~/docs/gstack && ./setup"
fi
```

### Browse Command Reference
Use `$B` for the compiled binary. Key commands:
- **Navigation**: `goto <url>`, `back`, `forward`, `reload`, `url`
- **Reading**: `text` (clean page text), `html [selector]`, `links`, `accessibility` (full ARIA tree), `forms` (fields as JSON)
- **Interaction**: `click <sel>`, `fill <sel> <val>`, `upload <sel> <file>`, `press <key>`, `select <sel> <val>`, `hover <sel>`, `scroll [sel]`, `dialog-accept [text]`, `dialog-dismiss`, `type <text>`
- **Inspection**: `attrs <sel>`, `console [--clear|--errors]`, `cookies`, `css <sel> <prop>`, `dialog [--clear]`, `is <prop> <sel>` (visible/hidden/enabled/disabled/checked/editable/focused), `network [--clear]`, `perf`, `js <expr>`, `eval <file>`
- **Visual**: `screenshot [--viewport] [--clip x,y,w,h] [sel] [path]`, `responsive [prefix]`, `pdf [path]`, `diff <url1> <url2>`
- **Snapshot**: `snapshot [-i|-c|-d N|-s sel|-D|-a|-o path|-C]` — ARIA tree with @e refs
- **Tabs**: `tabs`, `newtab [url]`, `tab <id>`, `closetab [id]`
- **Chain**: pipe JSON stdin: `[["goto","url"],["snapshot","-i"],["click","@e3"]]`
- **Handoff**: `handoff [msg]` (open Chrome for user takeover), `resume` (return to AI)

### Important Browse Rules
- NEVER use `mcp__claude-in-chrome__*` tools — slow and unreliable
- Always show screenshots via Read tool on output PNGs
- Browser persists between calls (cookies, sessions, tabs)
- Use `snapshot -i` first → see interactive elements → click/fill by @ref
- Use `snapshot -D` to verify: baseline → action → diff shows exactly what changed
- Use `is` for assertions: `is visible .modal` faster than parsing page text

---

# Section 1: /qa — QA Testing + Fix Bugs

Systematically QA test a web application, find bugs, then iteratively fix them
in source code, committing each fix atomically and re-verifying.

## Modes
- **Standard**: Find + fix all issues at all severity levels
- **Quick**: Critical + high severity only (fast pass)
- **Exhaustive**: All levels + cosmetic edge cases
- **Diff-aware** (automatic on feature branch without URL): QA-test this branch's changes

## Workflow
### Phase 1: Initialize
1. Detect if URL provided or need to find app URL (package.json, .env, dev config)
2. Start the dev server if not running
3. Run browse setup from above section

### Phase 2: Test Plan
1. Ask user: What flows to test? (or generate from app routes)
2. Map out all user flows and pages to test
3. Confirm test plan before starting

### Phase 3: Baseline Run
For each flow: `goto` → `snapshot -i` → interact → `snapshot -D` → `console` → `network`
Document every bug found with severity, screenshot, and repro steps.

### Phase 4: Fix Loop
For each bug found: fix in source code → commit atomically → re-test that flow
Commit each fix separately with clear message. DO NOT batch all bugs into one commit.

### Phase 5: Final QA
Re-run Phase 3 on the fixed code. Verify all bugs resolved, no regressions introduced.

### Phase 6: Report
Provide: Health score (0-100), number of bugs found+fixed, list of remaining issues,
before/after evidence with screenshots.

### Output Structure
```
# QA Report: [App Name] — [branch]

**Health Score: [X]/100** | **Bugs Found: [N]** | **Bugs Fixed: [M]**

## Bugs Fixed
1. **[{severity}]** {description} — Fixed in {commit}
   Before: {screenshot link} → After: {screenshot link}

## Remaining Issues
- **[{severity}]** {description} — {why not fixed or needs attention}
```

### Health Score Rubric
- **10**: No bugs, perfect UX, fast, accessible, responsive
- **8**: Minor cosmetic issues, good UX overall
- **6**: Some functional bugs, core flows work
- **4**: Significant bugs, core flows impacted
- **2**: Major bugs, application partially broken
- **0**: Does not load or core features broken

### Important Rules
- Always test the flows that the branch's diff touches
- Fix first, then document. Don't just report — fix what you find.
- Commit each fix separately for clean git history
- Re-test after each fix to verify and catch regressions
- Solo mode: fix proactively. Collaborative mode: flag + offer to fix.

---

# Section 2: /qa-only — QA Report Only

Report-only version of QA. Systematically tests a web application and produces
a structured health report with health score, screenshots, and repro steps —
but NEVER modifies source code.

## Differences from /qa
- No fix loop (skip Phases 4-5 of /qa)
- Never edit source code
- Produces bug list with severity, screenshots, and exact repro steps
- Ideal for: external QA, client delivery, QA handoff to development team

## Output
Same structure as /qa but without "Bugs Fixed" section — only "Bugs Found" and "Repro Steps".

---

# Section 3: /ship — Ship Workflow

Detect base branch, merge, run tests, review diff, bump VERSION, update CHANGELOG,
commit, push, create PR.

## Steps
1. **Detect base branch** (main, master, develop, trunk, dev)
2. **Pre-flight**: Check working tree clean, branch is correct, no pending changes
3. **Merge base branch**: Pull latest from base into feature branch
4. **Run tests**: Execute test suites. If tests fail:
   - If diff-aware: determine if failures caused by this change or pre-existing
   - Fix test failures if caused by this change
   - Flag pre-existing failures
5. **Pre-Landing Review**: Check affected routes, key interactions, edge cases
6. **Design Review** (conditional): If UI changes detected, run design review
7. **Test Coverage Audit**: Verify changes are covered by tests
8. **Version Bump**: Auto-decide (MAJOR/MINOR/PATCH based on changes)
9. **CHANGELOG**: Auto-generate from diff
10. **TODOS.md**: Auto-update with remaining items
11. **Commit** (bisectable chunks)
12. **Push**
13. **Create PR**
14. **Summary**: Show test coverage, pre-landing review results, design review, eval results

### Version Bump Rules
- MAJOR: Breaking API changes, major architecture shifts
- MINOR: New features/flows/pages, backwards-compatible additions
- PATCH: Bug fixes, refactors, doc updates, test additions

---

# Section 4: /review — Pre-Landing PR Review

Pre-landing PR review. Analyzes diff against the base branch for SQL safety,
LLM trust boundary violations, conditional side effects, and structural issues.

## Workflow
1. **Check branch**: Verify on correct branch with unmerged changes
2. **Scope Drift Detection**: Verify diff is within plan scope
3. **Two-Pass Review**:
   - Pass 1: Read diff, identify structural issues
   - Pass 2: Read full files for context-dependent issues
4. **Design Review** (conditional): If UI diff detected
5. **Test Coverage Diagram**: What's tested vs. what's changed
6. **Fix-First Review**: Flag issues and suggest fixes in-line
7. **TODOS Cross-Reference**: Check for unresolved TODOs
8. **Documentation Staleness**: Check if docs need updating

## Review Checklist
- SQL injection and query safety
- LLM prompt injection / trust boundaries
- Conditional side effects and race conditions
- Error handling completeness
- Authentication/authorization correctness
- Dead code / unused imports
- Environment variable handling
- API contract changes
- Breaking changes without version bump

---

# Section 5: /retro — Weekly Engineering Retrospective

Analyzes commit history, work patterns, and code quality metrics with persistent
history and trend tracking.

## Process
1. **Detect default branch**
2. **Gather commits from last 7 days**
3. **Analyze patterns**: frequency, timing, commit message quality, PR size trends
4. **Compare with previous retro** (if history exists)
5. **Produce report**: What went well, what to improve, commitments for next week
6. **Save history**: Append to retro log for trend tracking

## Output
```
## Engineering Retro: [date range]
### What went well
### What to improve
### Patterns noticed
### Commitments for next week
### Metrics trend (if historical data exists)
```

---

# Section 6: /investigate — Systematic Debugging

Five phases: Investigate → Analyze → Hypothesize → Implement → Verify.
Iron Law: no fixes without root cause.

## Workflow
1. **Scope Lock**: Define what we're investigating before jumping to solutions
2. **Phase 1 - Root Cause Investigation**: Gather all context, read logs, trace execution
3. **Phase 2 - Pattern Analysis**: Look for recurring patterns, similar bugs
4. **Phase 3 - Hypothesis Testing**: Test hypotheses with experiments
5. **Phase 4 - Implementation**: Fix the root cause, not the symptom
6. **Phase 5 - Verification + Report**: Verify fix, write report with root cause

---

# Section 7: /office-hours — YC Office Hours + Design Partner

Two modes:
- **Startup Mode**: 6 forcing questions — demand reality, status quo, narrowest wedge, observation
- **Builder Mode**: Design partner — understand product, challenge premises, generate alternatives

## Phases
1. **Context Gathering**: What are you building? Who for? Why?
2A. **Startup Mode**: YC Product Diagnostic (demand evidence, target user, constraints)
2B. **Builder Mode**: Design Partner (product context, research, landscape)
3. **Premise Challenge**: Question assumptions
4. **Alternatives Generation** (MANDATORY): Generate 3+ approaches
3. **Visual Sketch** (UI ideas if relevant)
4. **Design Doc**: Structured output with problem statement, approaches, recommendation
5. **Handoff**: Founder Discovery (if relevant)

---

# Section 8: /plan-ceo-review — CEO/Founder-Mode Plan Review

Rethinks the problem, finds the 10-star product, challenges premises, expands scope.

## Modes
- **Sanity Check**: 20-min review — is this plan coherent?
- **Selective Expansion**: Challenge scope in one area only
- **Expansion**: Rethink the whole problem, find the 10-star version
- **Nuclear**: "What if we started from scratch?" — most aggressive mode

## Process
1. **Nuclear Scope Challenge** + Mode Selection
2. **Vision & Scope Decisions**: Accepted scope, deferred to TODOS.md
3. **Review Sections** (10 sections): Architecture, data flow, UX, edge cases, tests, performance, dependencies, security, maintainability, completeness
4. **Required Outputs**: Updated plan file, review log, decision audit trail
5. **Handoff Note Cleanup**

---

# Section 9: /plan-eng-review — Engineering Manager Plan Review

Lock in execution plan — architecture, data flow, diagrams, edge cases, test coverage.

## Priority Hierarchy
1. Correctness > completeness > performance > elegance
2. Readable over clever
3. Tests over speculation

## Review Sections
- Data model and flow
- Architecture diagram
- Error handling and edge cases
- API contracts
- Test strategy and coverage
- Performance implications
- Security considerations
- Deployment plan

## Required Outputs
- Updated plan file
- Affected pages/routes, key interactions, edge cases, critical paths
- Review log

---

# Section 10: /plan-design-review — Designer's Eye Plan Review

Interactive design review — rates each design dimension 0-10, explains what makes it a 10.

## Sections
- Visual hierarchy
- Typography
- Color system
- Spacing and layout
- Motion/interaction design
- Accessibility
- Consistency with existing design system

---

# Section 11: /design-review — Visual Design QA + Fix

Finds visual inconsistency, spacing issues, hierarchy problems, AI slop patterns.
Then iteratively fixes issues using browse daemon.

## Phases
1. **First Impression**
2. **Design System Extraction**
3. **Page-by-Page Visual Audit** (using browse + screenshots)
4. **Interaction Flow Review**
5. **Cross-Page Consistency**
6. **Compile Report → Triage → Fix Loop → Final Audit**

Same workflow as /qa but focused on visual/design issues instead of functional bugs.

---

# Section 12: /design-consultation — Design System Proposal

Understands product, research landscape, proposes complete design system.

## Process
1. **Product Context**: What's being built, for whom
2. **Research** (if user approves)
3. **Complete Proposal**: Aesthetic direction, typography (font pairs with fallbacks), color palette, spacing system, layout patterns, motion principles
4. **Drill-downs** (if adjustments requested)
5. **Font & Color Preview Page**: Generate preview HTML
6. **Write DESIGN.md**: Persist the design system

---

# Section 13: /cso — Chief Security Officer Mode

OWASP Top 10 audit, STRIDE threat modeling, attack surface analysis, auth flow verification,
secret detection, dependency CVE check.

## Process
1. **Threat Model**: STRIDE (Spoofing, Tampering, Repudiation, Information Disclosure, DoS, Elevation)
2. **OWASP Top 10 Audit**: Injection, broken auth, sensitive data exposure, XXE, broken access control, security misconfiguration, XSS, insecure deserialization, known vulnerabilities, insufficient logging
3. **Attack Surface Analysis**: Map all entry points
4. **Auth Flow Verification**: Check auth/authz logic
5. **Secret Detection**: Check for hardcoded credentials
6. **Dependency CVE Check**: Check dependencies

## Output
Structured findings with: severity, file:line, description, exploit scenario, fix, references.

---

# Section 14: /canary — Post-Deploy Canary Monitoring

Watches live app for console errors, performance regressions, and page failures
using the browse daemon.

## Process
1. **Setup browse daemon**
2. **Baseline Comparison** (if baseline exists)
3. **Error Detection**: Console errors, network failures, visual regressions
4. **Performance Check**: Page load times, Core Web Vitals
5. **Report**: Errors found, performance delta, health assessment

---

# Section 15: /benchmark — Performance Regression Detection

Establishes baselines for page load times, Core Web Vitals, and resource sizes.

## Process
1. **Setup browse daemon**
2. **Define URLs to benchmark**
3. **Run benchmarks** (3 runs each for consistency)
4. **Store baseline**
5. **Compare** (if previous baseline exists): flag regressions >10%

## Output
Performance baseline report with LCP, FCP, INP, CLS, TTFB, total page size, resource count.

---

# Section 16: /autoplan — Auto-Review Pipeline

Reads CEO, design, and eng review skills and runs them sequentially with auto-decisions.

## Pipeline
1. **Prerequisite Skill Offer**: Check if plan file exists
2. **The 6 Decision Principles**: Quick, decisive, completeness-biased
3. **Phase 1**: CEO Review (strategy & scope)
4. **Phase 2**: Design Review (conditional — skip if no UI scope)
5. **Phase 3**: Eng Review + Codex
6. **Phase 4**: Final Approval Gate
7. **Write Review Logs**

---

# Section 17: /land-and-deploy — Post-Merge Deployment

Merges the PR, waits for CI and deploy, verifies production health via canary checks.

## Steps
1. **Pre-flight**: Verify PR exists, CI status
2. **Pre-merge checks**: Branch is up to date, all tests green
3. **Wait for CI** (if pending)
4. **Readiness Gate**: Final confirmation before merge
5. **Merge the PR**
6. **Deploy Strategy Detection** (auto-deploy vs manual)
7. **Wait for Deploy**
8. **Canary Verification** (browse daemon checks)
9. **Revert** (if canary fails)
10. **Deploy Report**

---

# Section 18: /document-release — Post-Ship Doc Update

Reads all project docs, cross-references diff, updates README/ARCHITECTURE/CONTRIBUTING/ CLAUDE.md to match what shipped.

## Steps
1. **Pre-flight & Diff Analysis**
2. **Per-File Documentation Audit**
3. **Apply Auto-Updates**
4. **Ask About Risky/Questionable Changes**
5. **CHANGELOG Voice Polish**
6. **Cross-Doc Consistency & Discoverability Check**
7. **TODOS.md Cleanup**
8. **VERSION Bump Question** (if needed)

---

# Section 19: /careful — Destructive Command Warnings

Warns before `rm -rf`, `DROP TABLE`, force-push, `git reset --hard`, `kubectl delete`,
and similar destructive operations.

### What's Protected
- File deletion (`rm -rf`, `rm -f` on directories)
- Database operations (`DROP`, `TRUNCATE`, `DELETE` without WHERE)
- Git history rewrites (force-push, `reset --hard`)
- Kubernetes destructive operations (`kubectl delete`)
- Production mutations

### Safe Exceptions
- Inside test files or test directories
- Explicitly confirmed with `--yes-i-am-sure` flag
- Empty/temporary directories

---

# Section 20: /freeze + /guard + /unfreeze — Scoped Edits

### /freeze
Restrict file edits to a specific directory for the session. Blocks Edit and Write outside the allowed path. Use when debugging to prevent accidentally editing unrelated files.

### /guard
Full safety mode: combines /careful (destructive command warnings) with /freeze (directory-scoped edits). Maximum safety for sensitive operations.

### /unfreeze
Clear the freeze boundary, allowing edits to all directories again.

---

# Section 21: /gstack-upgrade — Upgrade gstack

Detects global vs vendored install, runs the upgrade, shows what's new.

### Inline upgrade flow
1. Check version: `cat ~/docs/gstack/VERSION`
2. Check for updates: `cd ~/docs/gstack && git pull`
3. Rebuild if needed: `cd ~/docs/gstack && ./setup`
4. Update skills: Copy updated SKILL.md to canonical location

### Standalone usage
When user asks to upgrade: fetch changes from git, rebuild, verify.

---

# Section 22: /setup-browser-cookies — Import Cookies

Import cookies from your real browser (Comet, Chrome, Arc, Brave, Edge) into the
headless browse session. Opens an interactive picker UI.

### How it works
`$B cookie-import-browser` — opens interactive browser cookie picker

---

# Section 23: /setup-deploy — Configure Deployment

Configure deployment settings for /land-and-deploy. Detects platform (Fly.io, Render,
Vercel, Netlify, Heroku, GitHub Actions, custom) and stores config.

### Deploy Configuration
Stored in `gstack-config` — includes platform, environment, health check URL, rollback strategy.

---
