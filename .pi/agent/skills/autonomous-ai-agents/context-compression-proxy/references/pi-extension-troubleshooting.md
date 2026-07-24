# Pi CLI Extension Troubleshooting

## Common Error: Missing @earendil-works Modules

When Pi starts and extensions fail with errors like:
```
Error: Failed to load extension ".../index.ts": Cannot find module '@earendil-works/pi-ai'
Error: Failed to load extension ".../index.ts": Cannot find module '@earendil-works/pi-tui'
```

### Root Cause
Extensions in `~/.pi/agent/extensions/` or npm packages (pi-btw, pi-subagents, etc.) import from `@earendil-works/*` packages that aren't on the Node module resolution path.

### Fix Pattern

**1. Update the Pi launcher to find the CLI**
The `~/.pi/bin/pi` launcher searches for `pi-coding-agent/dist/cli.js` in hardcoded paths. If using fnm-managed Node, add the correct path:

```bash
# In ~/.pi/bin/pi, add to the candidate paths list:
for _candidate in \
  /path/to/node_modules/pi-btw/node_modules/@earendil-works/pi-coding-agent/dist/cli.js \
  ...
```

**2. Create symlink for shared modules** (preferred fix)
If packages like `pi-btw` already have `@earendil-works` in their node_modules:

```bash
# Create symlink so all extensions can resolve @earendil-works
ln -sfn ~/.local/share/fnm/node-versions/*/installation/lib/node_modules/pi-btw/node_modules/@earendil-works \
  ~/.local/share/fnm/node-versions/*/installation/lib/node_modules/@earendil-works
```

**3. Verify the CLI works**
```bash
~/.pi/bin/pi --version
# Should return version without loading extensions
```

## Extension Loading Paths

- **Local extensions**: `~/.pi/agent/extensions/**/index.ts`
- **Npm extensions**: `node_modules/pi-*/node_modules/@earendil-works/pi-coding-agent/dist/**/*.js`
- **Extension sources**: Configured in `~/.pi/agent/settings.json` under `packages` array

## Key Files

- `~/.pi/bin/pi` - Launcher script (edit to add CLI path)
- `~/.pi/agent/settings.json` - Package sources and extension filters
- `~/.pi/agent/extensions/` - Local extension directory
- `node_modules/pi-*/node_modules/@earendil-works/` - Shared deps per package
- `node_modules/@earendil-works/` - Top-level symlink target (if created)