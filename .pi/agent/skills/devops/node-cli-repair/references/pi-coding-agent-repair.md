# pi-coding-agent launcher repair notes

## Failure mode 1: `Cannot find pi-coding-agent cli.js`

The shim `~/.pi/bin/pi` lists these candidate paths for the binary:

- `~/.hermes/node/lib/node_modules/@earendil-works/pi-coding-agent/dist/cli.js`
- `~/.bun/install/global/node_modules/@earendil-works/pi-coding-agent/dist/cli.js`
- `~/.bun/install/global/node_modules/@mariozechner/pi-coding-agent/dist/cli.js`
- `~/.npm-global/lib/node_modules/@earendil-works/pi-coding-agent/dist/cli.js`
- `~/.npm-global/lib/node_modules/@mariozechner/pi-coding-agent/dist/cli.js`

If none exist, append the actual install path:

```bash
  /Users/<user>/node_modules/@mariozechner/pi-coding-agent/dist/cli.js \
```

to the `for _candidate in \` loop. Then verify:

```bash
pi --version
# expected: 0.73.1 (or current)
```

## Failure mode 2: CLI hangs printing npm output

When the launch succeeds but `pi` streams:

```
added N packages in Xs
npm warn ...
```

and then stalls on a spinner, the interactive mode has entered `checkForPackageUpdates()`. It iterates over every package in `~/.pi/agent/settings.json` and runs `npm view <pkg> version` or `npm install` to resolve missing packages.

Zombie processes:

```bash
ps aux | grep "[p]i " | grep -v grep
```

Kill stuck ones:

```bash
kill -9 <pid>
```

### Offline workaround

```bash
PI_OFFLINE=1 pi --version
# returns instantly
```

For permanent use, add to `~/.zshrc`:

```bash
export PI_OFFLINE=1
```

### npm prefix pitfall

```bash
npm root -g
# may return /usr/local/lib/node_modules  (not user-writable)
```

If the prefix under `/usr/local` is not writable, global installs will fail silently or prompt. Fix:

```bash
npm config set prefix ~/.npm-global
```

Ensure `~/.npm-global/bin` is on `PATH`.

## Relevant package files

- `~/.pi/agent/settings.json` lists configured packages for the project scope.
- `~/.pi/agent/npm/package.json` holds the actual dependency set installed under `~/.pi/agent/npm/node_modules/`.
- Shim path: `~/.pi/bin/pi`
- Actual binary in the failure reported here: `~/node_modules/@mariozechner/pi-coding-agent/dist/cli.js`