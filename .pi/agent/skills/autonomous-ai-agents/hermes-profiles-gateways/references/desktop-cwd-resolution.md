# Desktop App CWD Resolution — Source-Level Details

Discovered while debugging why `terminal.cwd` in `config.yaml` did not affect new Cmd+N sessions in the Hermes desktop app (June 2026).

## Source Files

These paths are relative to `~/.hermes/hermes-agent/apps/desktop/`:

| File | Relevant code |
|------|--------------|
| `electron/main.cjs` | `resolveHermesCwd()` (~line 2183), `readDefaultProjectDir()` (~line 2244), `writeDefaultProjectDir()` (~line 2264), `sanitizeWorkspaceCwd()` (~line 2214) |
| `electron/main.cjs` | IPC handlers for `hermes:setting:defaultProjectDir:*` (~line 5782) |
| `electron/preload.cjs` | `getDefaultProjectDir`, `setDefaultProjectDir`, `pickDefaultProjectDir` (lines 49-51) |
| `src/store/session.ts` | `$currentCwd` atom (line 220), `ensureDefaultWorkspaceCwd()` (line 48), `syncConfiguredDefaultProjectDir()` (line 30), `applyConfiguredDefaultProjectDir()` (line 84), `workspaceCwdForNewSession()` (line 270) |

## `resolveHermesCwd()` — Candidate Chain (main.cjs ~line 2183)

```javascript
function resolveHermesCwd() {
  const candidates = [
    readDefaultProjectDir(),          // #1 — ~/Library/Application Support/Hermes/project-dir.json
    process.env.HERMES_DESKTOP_CWD,   // #2 — env var override
    IS_PACKAGED ? null : process.env.INIT_CWD,   // #3 — dev only
    IS_PACKAGED ? null : process.cwd(),           // #4 — dev only
    !IS_PACKAGED ? SOURCE_REPO_ROOT : null,       // #5 — dev only
    app.getPath('home')               // #6 — final fallback
  ]

  for (const candidate of candidates) {
    if (!candidate) continue
    const resolved = path.resolve(String(candidate))
    if (isPackagedInstallPath(resolved)) continue  // skip the app bundle dir
    if (directoryExists(resolved)) return resolved
  }

  return app.getPath('home')  // never null
}
```

## `project-dir.json` File Format

Path: `~/Library/Application Support/Hermes/project-dir.json`

```json
{
  "dir": "/absolute/path/to/working/directory"
}
```

The file is read/written by the Electron main process via `readDefaultProjectDir()` / `writeDefaultProjectDir()`.

## Renderer-Side CWD State (`src/store/session.ts`)

The renderer maintains its own CWD state that syncs from the main process:

1. **`$currentCwd`** atom — initialized from `getRememberedWorkspaceCwd()` (reads `localStorage` key `hermes.desktop.workspace-cwd`)
2. **`ensureDefaultWorkspaceCwd()`** — called on boot:
   - Reads `configuredDefaultProjectDir` (from `project-dir.json` via IPC)
   - If set: uses it, calls `sanitizeWorkspaceCwd()` (which calls `resolveHermesCwd()` internally if the path is invalid)
   - If not set: falls back to `getRememberedWorkspaceCwd()` (localStorage)
3. **`workspaceCwdForNewSession()`** — returns `getConfiguredDefaultProjectDir() || getRememberedWorkspaceCwd() || $currentCwd.get().trim()`
4. **`setCurrentCwd(cwd)`** — writes to both atom and localStorage

## Debugging Steps When Desktop CWD Is Wrong

1. Check if `project-dir.json` exists:
   ```bash
   cat ~/Library/Application\ Support/Hermes/project-dir.json
   ```

2. Check the localStorage value (in DevTools console of the Hermes desktop app):
   ```javascript
   localStorage.getItem('hermes.desktop.workspace-cwd')
   ```

3. Check what `resolveHermesCwd()` returns (look at desktop log):
   ```bash
   cat ~/.hermes/logs/desktop.log | grep -i cwd
   ```

4. Check if `terminal.cwd` in config.yaml is correct:
   ```bash
   hermes config show | grep -A2 "Working dir"
   ```

5. Ensure the directory actually exists:
   ```bash
   ls -d "/path/to/sessions"
   ```

## Relevant Context

- `IS_PACKAGED` is `true` in the production macOS app bundle, so candidates 3-5 are null
- `isPackagedInstallPath()` filters out paths inside the `.app` bundle to prevent writing files into the application package
- `userData` on macOS resolves to `~/Library/Application Support/Hermes/` by default (can be overridden via `HERMES_DESKTOP_USER_DATA_DIR`)