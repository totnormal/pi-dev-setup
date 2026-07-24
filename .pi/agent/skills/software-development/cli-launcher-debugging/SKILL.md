---
name: cli-launcher-debugging
disable-model-invocation: true
description: "Debug local CLI launcher shims and wrapper scripts: missing binary errors, PATH ordering, global-install symlinks, npm-global/bin, and first-launch install hangs."
version: 1.0.0
license: MIT
platforms: [linux, macos, windows]
---

# CLI Launcher Debugging

## When to Load

Use when a command fails immediately with:
- `ERROR: cannot find ...`
- `command not found`
- Wrapper shim errors after installs/uninstalls/path changes

Use this ESPECIALLY when:
- The wrapped tool is installed but the shim says it cannot find it
- A global `npm install -g` or `bun install -g` changed where the binary lives
- PATH or shell rc files have multiple entries for the same tool
- First launch after install triggers package installers and then hangs

## First Principles

1. A wrapper shim is code: read it before editing it.
2. `which` and the shim content can disagree about where execution will actually start.
3. Global install symlinks under `~/.npm-global/bin` or `/usr/local/bin` are just files — they can point at missing targets or the wrong package name.
4. A successful first launch can still hang if the wrapped CLI runs install scripts or prompts interactively.

## Diagnostic Protocol

### 1. Read the actual launcher
```bash
cat "$(which <cmd>)"
```
Identify hard-coded candidate paths, package names, and version-manager assumptions.

### 2. Check the real install locations
```bash
find <home> -path "*/node_modules/<pkg>/dist/cli.js" 2>/dev/null
find <home> -path "*/node_modules/.bin/<cmd>" 2>/dev/null
```
Do not assume `bin` symlinks match what the wrapper is searching.

### 3. Test the concrete path
```bash
node "<absolute path to cli.js>" --version
```
If this works, the issue is PATH / candidate-list mismatch, not the package.

### 4. Distinguish "missing" from "hanging"
- "Cannot find cli.js" means the wrapper never started the real binary.
- Spinner / npm install output means the wrapper found it, and the binary itself is now blocking.
- These are different bugs — fix the first before chasing the second.

## Common Pitfalls

| Pitfall | Why | Fix |
|---------|-----|------|
| Editing the wrong shim | `which` returns one path; shell alias/function shadows it | `type -a <cmd>` |
| Assuming npm-global/bin is current | `npm ls -g` shows what npm thinks is installed, but the symlink may still target an older/renamed package | Inspect with `ls -la` |
| Package rename breaks hard-coded lists | `@mariozechner` → `@earendil-works`; candidate loops miss new scopes | Update candidate lists, then re-verify with the real path |
| First-run install hangs | Wrapper fixed, binary now enters interactive install | Check for npm/pnpm/bun install prompts, non-interactive flags, or preapproved install scripts |

## Fix Pattern

When the shim searches candidate paths:
1. Add the actual verified path to the candidate loop (reversible, idempotent).
2. Verify with `<cmd> --version`.
3. Only then investigate hangs from the wrapped binary — do not conflate the two.

## Cross-References

See `references/cli-wrapper-artifacts.md` for the `pi` debug findings (`~/.pi/bin/pi`, `~/node_modules/@mariozechner/pi-coding-agent/dist/cli.js`, `~/.npm-global/bin/pi` symlink behavior after rename).