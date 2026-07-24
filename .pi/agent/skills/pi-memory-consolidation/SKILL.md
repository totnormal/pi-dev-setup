---
name: "pi-memory-consolidation"
description: "Truly consolidate pi-hermes-memory when \"memory is at capacity\" — prune orphan SQLite rows so the search index matches the canonical Markdown."
version: 4
created: "2026-06-20"
updated: "2026-06-22"
---
## When to Use
Use when asked to "consolidate memory", "memory is at capacity", review/merge/dedupe memory entries, or when memory_search returns stale duplicate/orphan entries that no longer exist in the Markdown source of truth. The memory tool's remove/replace only edits Markdown; the SQLite search index (sessions.db) is never pruned automatically.

## Procedure
1. Understand the two stores: Markdown is source of truth — global failure memory at ~/.pi/agent/pi-hermes-memory/failures.md (entries separated by a line containing just §, i.e. split on '\n§\n'); MEMORY.md (target=memory) and USER.md (target=user) sit beside it. The search index is ~/.pi/agent/pi-hermes-memory/sessions.db, table `memories` (columns: id, project, target, category, content, failure_reason, tool_state, corrected_to, created, last_referenced) with auto-maintained FTS table `memory_fts`. memory_search reads the SQLite store.
2. Diagnose divergence: count rows per target in sessions.db (`SELECT target, COUNT(*) FROM memories GROUP BY target`) and compare against the Markdown entry count. Extra SQLite rows whose content isn't in the MD are orphans.
3. Decide the canonical set. Prefer the existing Markdown (it is usually already consolidated into a few broad grab-bag entries). If the MD itself is bloated, consolidate it FIRST via the memory tool (replace/add) so MD becomes the desired end state.
4. Back up both files: `cp sessions.db sessions.db.bak-<ts>` and `cp failures.md failures.md.bak-<ts>`.
5. Reconcile the SQLite target to exactly mirror the MD: delete all rows for that target then re-import the MD entries. Replicate pi-hermes-memory's parser: strip trailing `<!-- created=..., last=... -->` into created/last_referenced columns; category from leading `[category]` tag (must be in {failure,correction,insight,preference,convention,tool-quirk}); parse `Failed:` / `Tool state:` / `Corrected to:` segments split on ' — '; store content = metadata-stripped text INCLUDING the [category] tag, project=NULL for global. Python's builtin sqlite3 handles parameters + triggers (which rebuild memory_fts) cleanly — no need for better-sqlite3 or escaping.
6. Scope deletes by target (and project IS NULL for global) so you don't wipe project-scoped rows. Verify integrity: PRAGMA integrity_check; COUNT(memories) == COUNT(memory_fts); target row count == MD entry count.
7. Confirm with memory_search that only the canonical entries remain. NOTE: memory_search renders a doubled category tag (e.g. '[tool-quirk] [tool-quirk] ...') because the stored content includes the tag and the renderer prepends it again — this is cosmetic/pre-existing, not a bug you introduced.

## Pitfalls
- **A LOOPING full-wipe consolidator makes persistence impossible (observed 2026-06-22):** unlike a one-shot peer, a looping agent (e.g. a hermes/cron consolidation loop, or another open pi session running the same "consolidate memory" task) re-runs DELETE+reimport from its own MD every ~60s. Symptom: your MD writes are clobbered within seconds AND your SQLite edits are wiped on the next cycle (row ids keep climbing as it re-imports). You CANNOT win this race. Resolution: (1) STOP doing full-MD-overwrites and full-target reimports — they only add churn and the tagged/untagged duplicate pairs you create persist until the peer's next wipe. (2) At most do SURGICAL dedup (DELETE exact-duplicate rows by id, keep the categorized version) — but expect it to be undone. (3) Save your richer/detailed consolidated MD to a DIFFERENTLY-NAMED file in the same dir (e.g. `failures.consolidated.proposed.md`) — the peer only rewrites `failures.md`, so a different name is safe. (4) Confirm the pre-change backup (made with `PRAGMA wal_checkpoint(TRUNCATE)` first, both sessions.db + -wal) holds all original rows, then YIELD and report — tell the user to stop the concurrent consolidator before applying the proposed file. (5) Watch for the peer to transition from full-wipe to ADDITIVE phase (ids stable, new rows appended) — that's the safe moment to apply a final write, but verify with a marker check immediately before reimport.
## Verification
1. PRAGMA integrity_check returns 'ok'.
2. SELECT COUNT(*) FROM memories WHERE target='failure' equals the number of entries in failures.md (split on '\n§\n').
3. SELECT COUNT(*) FROM memories equals SELECT COUNT(*) FROM memory_fts (FTS in sync).
4. memory_search for the topic returns only the canonical consolidated entries, with no duplicate/orphan variants.