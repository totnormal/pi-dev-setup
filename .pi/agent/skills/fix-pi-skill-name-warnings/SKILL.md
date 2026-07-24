---
name: "fix-pi-skill-name-warnings"
description: "Fix Pi \"name contains invalid characters\" session-start warnings by slugifying SKILL.md name fields"
version: 3
created: "2026-06-29"
updated: "2026-06-29"
disable-model-invocation: true
---
## When to Use
Use when a Pi session starts with warnings like `name contains invalid characters (must be lowercase a-z, 0-9, hyphens only)` pointing at SKILL.md files. Common after cloning third-party skill collections (superpowers-skills, awesome-claude-skills-composio, claude-plugins-official-main) whose names use Title Case, spaces, or underscores.

## Procedure
## Procedure
1. Confirm the cause: Pi validates SKILL.md `name:` frontmatter against /^[a-z0-9-]+$/ (no spaces, underscores, uppercase, or leading/trailing/consecutive hyphens; max 64). Validation is in @earendil-works/pi-coding-agent/dist/core/skills.js (validateName). It's a WARNING only — skills still load.
2. Run the reusable slugifier bundled with this skill: `python3 ~/.pi/agent/pi-hermes-memory/skills/fix-pi-skill-name-warnings/fix-skill-names.py ~/.pi/agent/skills`. (Do NOT use `~/.pi/agent/tools/` — Pi deprecated that dir; a standalone .py there triggers a migration warning. The script lives next to this SKILL.md.) It walks every SKILL.md, slugifies invalid name values using Pi's own slugify() logic (lowercase, non-alnum runs -> single hyphen, trim/collapse hyphens), and edits only the frontmatter name line.
3. **After slugify, check for collisions** (new valid names may now collide). Pi uses "first wins" by readdir ASCII order. Add a root `.ignore` at `~/.pi/agent/skills/` listing stale/duplicate trees (Pi honors `.gitignore`/`.ignore`/`.fdignore`). Example entries:
   - `superpowers/skills.off/` — retired backup tree (2414 files)
   - `skills-registry.old-*/` — timestamped backups
   - `skills-registry/`, `superpowers-skills/`, `marketingskills/`, `testing/` — pure-duplicate collections
   - `awesome-claude-skills-composio/*_*/` — underscore-variant dirs (hyphen canonical wins)
4. Verify: re-scan with a loop that strips \r (CRLF files otherwise give false positives): `find ~/.pi/agent/skills -name SKILL.md | while read f; do n=$(grep -m1 '^name:' "$f" | tr -d '\r' | sed 's/^name:[[:space:]]*//'); echo "$n" | grep -qv '^[a-z0-za-z0-9-]\+$' && echo "$f: $n"; done`. Empty output = clean.
5. Note: files with NO frontmatter (start with `#` heading, no `---` block) show empty names but are a separate, harmless case — Pi falls back to the parent dir name and does not emit the invalid-characters warning. Do not chase those.
6. Note: do NOT use macOS `grep -P` (unsupported). Use `grep -q` with POSIX classes or Python.
## Pitfalls
## Pitfalls
- macOS grep lacks -P; use POSIX bracket expressions or Python.
- CRLF line endings make the raw name appear invalid in bash checks (trailing \r) but Pi's parser strips it — strip \r in verification to avoid false positives.
- These are git-cloned third-party collections; `git pull` will reintroduce bad names. Re-run the script after pulling.
- **Slugifying can CREATE collisions.** When two dirs held different *invalid* names (e.g. `Google Classroom Automation` in `google-classroom-automation/` AND `google_classroom-automation` in `google_classroom-automation/`), both slugify to `google-classroom-automation` and Pi then reports `name "..." collision` at session start. Pi uses "first wins" in readdir order (ASCII: `-` 0x2d < `_` 0x5f < lowercase; uppercase sorts before lowercase), so the hyphen-dir / uppercase-start path usually wins. Collisions are warnings only — the winner loads, losers are skipped.
- **Resolve collisions via `.ignore`, not by editing names.** Add a `.ignore` file at `~/.pi/agent/skills/` (Pi honors `.gitignore`/`.ignore`/`.fdignore` at any level) listing the stale/duplicate trees, e.g. `superpowers/skills.off/`. This also kills the "skill name collision" startup block. Pi only skips *leading-dot* dirs, so a dir named `skills.off` (suffix dot) or `X.old-...` IS scanned — rename to a leading dot or add to `.ignore`.
- Do NOT unilaterally pick winners among overlapping live collections (e.g. flat `axolot` vs `AI-Research-SKILLs/03-fine-tuning/axolot`, or composio hyphen vs underscore dirs). These are often *different versions* of the same skill, not junk — confirm with the user which is canonical before ignoring.
- Files with no frontmatter at all are NOT this problem — leave them.
## Verification
1. Re-run the verification scan (step 3) — no invalid names print.
2. Start a new Pi session — the 'name contains invalid characters' warning block is gone.
3. Spot-check: `head -3 ~/.pi/agent/skills/meta/sharing-skills/SKILL.md` shows `name: sharing-skills`.