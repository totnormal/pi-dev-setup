---
title: Node.js CLI Launcher Repair
name: node-cli-repair
disable-model-invocation: true
description: Repairs broken shell launcher scripts and startup hangs for Node.js CLI packages. Use when a command fails with `Cannot find ... cli.js`, resolves to the wrong binary, or hangs on npm install/update output instead of reaching the interactive UI.
---

# Node.js CLI Launcher Repair

## Trigger

- Shell command fails with a missing-binary or missing-package error.
- CLI starts but hangs printing npm output, `added N packages`, or deprecation warnings.
- User suspects stale launcher script, wrong install path, or incorrect `npm`/`bun` prefix.

## 1. Trace the launcher

1. `which <cmd>` to find the active entry point.
2. `file <path>` or `head` it to see whether it is a shim, wrapper, or symlink.
3. If it is a shim, read its candidate paths. The entry `Cannot find ... cli.js` means the shim’s loop did not match any existing path.

## 2. Locate the real node binary

Search the normal Node install roots:

- `~/node_modules/.bin/` (local project install, user-writable)
- `~/node_modules/<scope>/<pkg>/dist/cli.js` (package root)
- `~/npm-global/lib/node_modules/` (user global)
- `~/.bun/install/global/node_modules/` (bun global)
- `npm root -g` (system global install root, **often `/usr/local/lib/node_modules`, not user-writable**)

Then verify:

- Read `<root>/package.json` and check its `bin` field.
- Run `node <path>/dist/cli.js --version` to confirm the binary works.

## 3. Patch the launcher

If the shim has a candidate path list but the package lives elsewhere:

- Add the discovered path as a new candidate in the loop.
- Keep the list ordered; don’t remove prior candidates.
- Re-run `cmd --version` to confirm.

## 4. Diagnose startup hangs

Many modern Node.js CLIs (pi, omni-pi, end-pi, etc.) auto-check for updates or missing extensions on startup. They run `npm install` / `npm update` silently and stream the output before reaching the interactive UI.

Symptoms:

- CLI prints `added N packages`, npm warnings/deprecations, then hangs on a spinner.
- `ps aux | grep <cmd>` shows a Node process with high memory but no interactive prompt.

Recovery:

1. Kill the stuck process: `kill -9 <pid>`. Safe here because the process has already printed install output and is not making progress.
2. Check for an offline escape hatch:
   - Env flag: `PI_OFFLINE=1` (many tools honor this).
   - CLI flag: `--offline`.
3. Test: `PI_OFFLINE=1 <cmd> --version` should return instantly.
4. If the tool lacks an offline mode, check npm prefix writability with `npm root -g`. A prefix under `/usr/local` or `/opt` usually cannot be written by a normal user. Fix by setting a user-writable prefix:

   ```bash
   npm config set prefix ~/.npm-global
   ```

   Ensure `~/.npm-global/bin` is on `PATH`, then reinstall the CLI there.

## Pitfalls

- `~/node_modules` is not the same root as `npm root -g`. The shim may list one while the package is in the other.
- `npm root -g` resolves from `cwd`. Run it from the same directory where the command was invoked to get the correct prefix (it honors `NPM_CONFIG_PREFIX`).
- Some CLIs read `cwd` to resolve project-level `settings.json`. Missing packages in settings.json can trigger auto-install behavior.
- Killing hung npm installs can leave partial state. If it happens repeatedly, prefer the offline flag or prefix fix over repeated kills.

## Reference examples

- `references/pi-coding-agent-repair.md` — concrete paths and workarounds for the `pi` CLI.