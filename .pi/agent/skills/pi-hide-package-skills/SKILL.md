---
disable-model-invocation: true
name: "pi-hide-package-skills"
description: "Auto-hide npm-package skills from the pi system prompt (only skill-dispatcher visible) and keep them durable across pi updates."
version: 2
created: "2026-06-14"
updated: "2026-06-14"
---
## When to Use
Use when package skills (from npm: packages in settings.json) are leaking into the pi system prompt after a `pi update`, OR when setting up the "only skill-dispatcher visible, everything else on-demand" architecture. Symptoms: the session-start banner shows many skills loaded, and the system prompt's available_skills includes pi-subagents, pi-intercom, context-mode/ctx-*, pi-hermes-memory skills, etc.

## Procedure
## Procedure

**Default behavior:** only `skill-dispatcher` (native) + `pi-subagents` (baked into the allowlist) are visible in the system prompt; all other package skills are hidden but invokable via `/skill:name`.

1. **Diagnose / fix a leak:** `bash ~/.pi/agent/npm/disable-package-skills.sh` reports what it hides/unhides. Run it directly to fix a leak after an update.
2. **Runs automatically** after every `pi update` via `reapply-patches.sh` (the `scripts.postinstall` in `~/.pi/agent/npm/package.json`). No manual re-run needed.
3. **Always-visible skills (allowlist):** `pi-subagents` is baked into the default allowlist — it is ALWAYS visible (subagent delegation is core workflow). The allowlist is **bidirectional**: the script actively STRIPS the `disable-model-invocation` flag from allowlisted skills, so even if an update re-adds it, the next run removes it again. To add more always-visible package skills: `export DISABLE_PACKAGE_SKILLS_ALLOWLIST="name1 name2"` (MERGES with baked-in `pi-subagents`, does not replace).
4. **Verify:** restart pi — the system prompt `<available_skills>` should show only `skill-dispatcher` + `pi-subagents` (+ any allowlisted). Hidden skills remain invokable via `/skill:name` and loadable on-demand by skill-dispatcher (catalog.tsv scans the filesystem directly).
5. **Corruption recovery:** if a file ever gets doubled frontmatter (from a prior buggy run), just re-run the script — its self-healing repair strips the corrupt leading block and re-inserts/strips the flag cleanly.
## Pitfalls
- Do NOT use settings.json `"skills": []` for skills you want to keep invokable via /skill:name — that fully disables them (enabled:false). The frontmatter `disable-model-invocation: true` approach preserves on-demand invocation; that's why we patch node_modules files rather than disabling via config.
- npm install overwrites node_modules, wiping the flag — the postinstall automation is what makes this durable. If you ever bypass postinstall (e.g. manual npm install with --ignore-scripts), re-run disable-package-skills.sh manually.
- The script edits files under node_modules — if a package is reinstalled mid-session, the edit is lost until the next postinstall. Run the script once more if a skill reappears.
- Beware grep patterns starting with `---` (treated as options) — use `grep -e` or `--`. The current script uses python3 for this reason.

## Verification
1. `bash ~/.pi/agent/npm/disable-package-skills.sh` exits 0 and reports `noop=N` on a second consecutive run (idempotency).
2. A sample package skill file (e.g. pi-subagents/SKILL.md) has exactly ONE frontmatter block with `disable-model-invocation: true` as line 2 and the original description intact.
3. `grep -rn 'disable-model-invocation: true' ~/.pi/agent/npm/node_modules/*/skills/*/SKILL.md | wc -l` is non-zero and matches the count of package skills.
4. After restarting pi, the system prompt `<available_skills>` contains only skill-dispatcher (+ any allowlisted entries), not pi-subagents/pi-intercom/context-mode/ctx-*/hermes-memory skills.
5. `bash -n ~/.pi/agent/npm/reapply-patches.sh` and `bash -n ~/.pi/agent/npm/disable-package-skills.sh` both pass syntax check.