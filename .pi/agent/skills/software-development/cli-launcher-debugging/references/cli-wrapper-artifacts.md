# CLI Launcher Debugging — Artifacts from `pi` Command

## Session Detail

- **Wrapper:** `~/.pi/bin/pi`
- **Bug 1:** Missing `pi-coding-agent/dist/cli.js` after package rename `@mariozechner` → `@earendil-works`
- **Fix:** Added `~/node_modules/@mariozechner/pi-coding-agent/dist/cli.js` to the shim's candidate loop
- **Verified:** `pi --version` → `0.73.1`

### Candidate loop audited
```text
~/.hermes/node/lib/node_modules/@earendil-works/pi-coding-agent/dist/cli.js
~/.bun/install/global/node_modules/@earendil-works/pi-coding-agent/dist/cli.js
~/.bun/install/global/node_modules/@mariozechner/pi-coding-agent/dist/cli.js
~/.npm-global/lib/node_modules/@earendil-works/pi-coding-agent/dist/cli.js
~/.npm-global/lib/node_modules/@mariozechner/pi-coding-agent/dist/cli.js
~/node_modules/@mariozechner/pi-coding-agent/dist/cli.js   ← added
```

## npm-global/bin Symlink Behavior

- `~/.npm-global/bin/pi` is a symlink pointing at `../lib/node_modules/@mariozechner/pi-coding-agent/dist/cli.js`
- This symlink can become stale after package rename/uninstall; symlink existence does not guarantee target exists
- The shell wrapper (`~/.pi/bin/pi`) is what the user runs via PATH, not this npm-global symlink

## PATH / Shim Shadowing

- `~/.pi/bin` is placed before `~/.npm-global/bin` in PATH via `~/.zshrc`
- `type -a pi` is the correct check to see which entry wins
- `which pi` is also useful but `type -a` reveals aliases/functions in addition to the binary

## Bug 2 (Pending)

After fixing the candidate list, `pi` launches but then runs repeated npm installs and hangs with a spinner (`⠼`). This is an interactive install prompt or a hang inside the wrapped `cli.js`, not a PATH error. Separate investigation required.