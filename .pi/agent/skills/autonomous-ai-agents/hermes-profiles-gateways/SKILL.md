---
name: hermes-profiles-gateways
disable-model-invocation: true
description: "Manage multiple Hermes profiles with per-platform gateway routing — isolate working directories, credentials, and configs for different gateway platforms (Telegram, Discord, Slack, etc.) on the same machine."
version: 1.1.0
author: Agent
created_by: agent
metadata:
  hermes:
    tags: [hermes, profiles, gateway, multi-profile, telegram, discord, configuration]
    related_skills: [hermes-agent, hermes-account-management]
---

# Hermes Profiles & Gateways

Configure multiple Hermes profiles so different gateway platforms (Telegram, Discord, Slack, etc.) run with their own working directory, API keys, memory, and skills — while CLI sessions use the default profile.

## When to Use

- A gateway platform (Telegram, Discord) needs a different working directory than CLI sessions
- Multiple bots on the same platform need separate credentials (requires unique bot tokens per profile)
- You want to isolate agent state (memory, skills, sessions) per platform
- You want different models/providers per platform

## How Profiles and Gateways Interact

Each profile has its own:
- `config.yaml` — model, toolsets, terminal.cwd, gateway settings
- `.env` — API keys and bot tokens
- `memories/` — persistent memory
- `skills/` — installed skills
- Gateway service — one systemd/launchd unit per profile

The **default profile** runs CLI sessions. Gateway platforms can be routed to **named profiles** by starting that profile's gateway service.

## Setup: Route a Gateway Platform to a Named Profile

### 1. Create the target directory

```bash
mkdir -p /path/to/your/project/telegram
```

### 2. Create a new profile, cloning config from default

```bash
hermes profile create telegram --clone --description "Telegram gateway with separate working directory"
```

This copies `config.yaml`, `.env`, `SOUL.md`, and skills from the default profile — including the Telegram bot token and all API keys.

### 3. Set the working directory in the new profile

```bash
# Use the wrapper alias (created by profile create):
telegram config set terminal.cwd /absolute/path/to/telegram/folder

# Or without alias:
# hermes -p telegram config set terminal.cwd /absolute/path/to/telegram/folder
```

### 4. Stop the default gateway (it held the bot token)

```bash
hermes gateway stop
```

### 5. Start the profile-specific gateway

```bash
# Install as a managed service (one-time):
telegram gateway install

# Start / stop / status:
telegram gateway start
telegram gateway stop
telegram gateway status
```

The profile gateway runs with `--profile telegram` and owns the Telegram bot token exclusively.

### 6. Verify

```bash
telegram gateway status
# Look for: --profile telegram in the ProgramArguments
```

## Management Commands

| Action | Default profile | Named profile (`telegram`) |
|--------|----------------|---------------------------|
| Start gateway | `hermes gateway start` | `telegram gateway start` |
| Stop gateway | `hermes gateway stop` | `telegram gateway stop` |
| Gateway status | `hermes gateway status` | `telegram gateway status` |
| Config set | `hermes config set ...` | `telegram config set ...` |
| Gateway install | `hermes gateway install` | `telegram gateway install` |
| View logs | `tail -f ~/.hermes/logs/gateway.log` | `tail -f ~/.hermes/profiles/telegram/logs/gateway.log` |

The wrapper script (`telegram` in this example) is created at `~/.local/bin/telegram` and is a shorthand for `hermes -p telegram`.

## Profile Management

```bash
hermes profile list                  # List all profiles + gateway state
hermes profile create NAME           # Create empty
hermes profile create NAME --clone   # Clone from active profile
hermes profile create NAME --clone-from SOURCE  # Clone from specific profile
hermes profile delete NAME           # Delete
hermes profile use NAME              # Set as sticky default
```

## Pitfalls

- **Cloning doesn't isolate credentials automatically.** After `--clone`, the new profile has the same bot token as the source. You must stop the source gateway before starting the clone's gateway, or get a new token.
- **`--clone` copies `.env` verbatim.** After cloning, edit the new profile's `.env` at `~/.hermes/profiles/<name>/.env` if you need different API keys.
- **`terminal.cwd` must be an absolute path.** Relative paths like `.` resolve relative to the gateway process startup directory, which varies by profile.
- **Gateways don't reload config on the fly.** After changing `terminal.cwd` in a profile's config.yaml, restart the profile's gateway.
- **Wrapper alias may not be on PATH immediately.** The `telegram` wrapper lands in `~/.local/bin/` — add it to your shell's PATH if it isn't already.
- **Desktop app has its own CWD, separate from `terminal.cwd` in config.yaml.** The Hermes desktop GUI app's default working directory is NOT controlled by `terminal.cwd`. It uses its own `project-dir.json` file. See the "Desktop App CWD" section below.
- **Telegram duplicate gateway conflict** - If both the main gateway (`hermes gateway run`) and a separate profile gateway (`telegram gateway run`) run simultaneously with the same bot token, Telegram's `getUpdates` returns `Conflict: terminated by other getUpdates request`, blocking all message deliveries. Check logs for `Telegram polling conflict` warnings. Fix: ensure only one gateway runs total. Kill duplicates: `pkill -f "gateway.*run"` before starting a profile-specific gateway.

## Desktop App CWD (project-dir.json)

The Hermes desktop GUI app (macOS app, Cmd+N new session) resolves the default working directory independently from `terminal.cwd` in `config.yaml`. This is a frequent confusion point: changing `terminal.cwd` in the default profile's `config.yaml` does NOT affect where new Cmd+N sessions land.

### Resolution chain (`resolveHermesCwd()`)

The desktop app checks these candidates in order, using the first that exists and is not the packaged install path:

1. **`~/Library/Application Support/Hermes/project-dir.json`** — user-configurable default (set via Settings → Sessions → Default project directory, or by writing this file directly)
2. **`$HERMES_DESKTOP_CWD`** — environment variable override
3. **`$INIT_CWD`** — (dev/unpackaged only)
4. **`process.cwd()`** — (dev/unpackaged only)
5. **User home directory** — final fallback

### Setting the desktop app default CWD

**Method A — Settings UI (recommended):** Open Hermes desktop → Settings → Sessions → "Default project directory" → pick the folder.

**Method B — Write the file directly** (useful when you're already in terminal):

```bash
cat > "/Users/$USER/Library/Application Support/Hermes/project-dir.json" <<'EOF'
{
  "dir": "/absolute/path/to/your/project/sessions"
}
EOF
```

This takes effect after restarting the Hermes desktop app.

### Why two CWDs?

- **`terminal.cwd`** (in `config.yaml`) — controls where the Hermes terminal tool starts commands within a session. Applies to CLI and gateway sessions equally.
- **`project-dir.json`** (desktop app) — controls where new desktop session tabs (Cmd+N) are created. Only the desktop app reads this.

If a desktop session still opens in the wrong directory after setting `project-dir.json`, there may be a stale `localStorage` value (`hermes.desktop.workspace-cwd`). The file takes priority, but restarting the app is required for the renderer to re-read it.

## Important Constraints

### Bot Tokens Are Unique Per Profile

**Two profiles CANNOT share the same bot token.** If two gateways try to use the same Telegram/Discord/Slack token, the second one fails to start. Either:

- **Option A — Move**: Stop the default gateway, start the profile-specific gateway (same token, one active at a time)
- **Option B — Split**: Create a second bot token via BotFather (`/newbot`) so both gateways run simultaneously

### Gateway Changes Require Restart

Config changes (`terminal.cwd`, credentials, platform enable/disable) take effect on gateway restart — not mid-session.

```bash
telegram gateway restart
```

### Service Files

Each profile installs its own uniquely-named service:

| Platform | Path |
|----------|------|
| macOS | `~/Library/LaunchAgents/ai.hermes.gateway-<profile>.plist` |
| Linux | `~/.config/systemd/user/hermes-gateway-<profile>.service` |

The default profile keeps historical names: `ai.hermes.gateway.plist` / `hermes-gateway.service`.

## Related

- `skill_view(name="hermes-agent")` — full Hermes config reference, CLI commands, profile commands
- [Multi-Profile Gateways docs](https://hermes-agent.nousresearch.com/docs/user-guide/multi-profile-gateways)
- [Telegram docs](https://hermes-agent.nousresearch.com/docs/user-guide/messaging/telegram)
- `references/shared-tmux-gateway-access.md` — shared tmux socket setup for gateway ↔ interactive terminal access