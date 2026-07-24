# Shared tmux Access for Gateway Sessions

## Problem

The Hermes gateway runs as a background `launchd`/`systemd` service in a different process context than the user's interactive terminal. This means `tmux` sessions created in the user's Terminal.app/iTerm2 are **invisible** to the gateway, and vice versa.

Both environments default to different tmux socket paths:
- Interactive shell: `/private/tmp/tmux-<UID>/default`
- Gateway service: whatever its environment inherits (often no socket)

## Solution: Shared TMUX_TMPDIR

Configure **both** the user's shell and the gateway service to use the same `TMUX_TMPDIR`.

### 1. Create a dedicated socket directory

```bash
mkdir -p /tmp/tmux-hermes-shared
chmod 700 /tmp/tmux-hermes-shared
```

### 2. Update the gateway's launchd plist

Add `TMUX_TMPDIR` to `EnvironmentVariables`:

```xml
<key>EnvironmentVariables</key>
<dict>
    <!-- ... existing vars ... -->
    <key>TMUX_TMPDIR</key>
    <string>/tmp/tmux-hermes-shared</string>
</dict>
```

Then reload:
```bash
launchctl unload ~/Library/LaunchAgents/ai.hermes.gateway-<profile>.plist
launchctl load ~/Library/LaunchAgents/ai.hermes.gateway-<profile>.plist
```

### 3. Start the shared tmux session

```bash
TMUX_TMPDIR=/tmp/tmux-hermes-shared tmux new-session -d -s hermes-shared -x 120 -y 40 'bash'
```

### 4. Access from user's shell

Add to `~/.zshrc` (or `~/.bashrc`):
```bash
export TMUX_TMPDIR="/tmp/tmux-hermes-shared"
```

Then use normal `tmux` commands:
```bash
tmux attach -t hermes-shared      # interactive attach
tmux send-keys -t hermes-shared 'cmd' Enter  # send command
tmux capture-pane -t hermes-shared -p        # capture output
```

### 5. Access from Hermes (gateway or CLI)

Create a helper script that knows the exact socket path:

```bash
#!/usr/bin/env bash
# ~/.local/bin/hermes-tmux-helper

SOCKET="/private/tmp/tmux-hermes-shared/tmux-501/default"
SESSION="hermes-shared"
export TMUX=""

case "$1" in
    capture) tmux -S "$SOCKET" capture-pane -t "$SESSION" -p ;;
    send)    shift; tmux -S "$SOCKET" send-keys -t "$SESSION" "$*" Enter ;;
    list)    tmux -S "$SOCKET" list-sessions ;;
    *) echo "Usage: hermes-tmux-helper [capture|send \"cmd\"|list]" ;;
esac
```

Make executable and test:
```bash
chmod +x ~/.local/bin/hermes-tmux-helper
hermes-tmux-helper send 'echo hello' && hermes-tmux-helper capture
```

From Hermes chat:
```
Use hermes-tmux-helper send 'cd ~/project && npm test' then capture
```

## Verification

Both directions must work:
- **User → Gateway**: `hermes-tmux-helper send 'cmd'` appears in `tmux attach -t hermes-shared`
- **Gateway → User**: Hermes (via Telegram) runs `hermes-tmux-helper send 'cmd'`, user sees output in attached session

## Key Details

| Aspect | Value |
|--------|-------|
| Socket directory | `/tmp/tmux-hermes-shared` (persists across reboots on macOS) |
| Actual socket | `/private/tmp/tmux-hermes-shared/tmux-501/default` |
| Session name | `hermes-shared` |
| Helper script | `~/.local/bin/hermes-tmux-helper` |
| User wrapper | `~/.local/bin/hermes-tmux` (simpler `tmux` alias with TMUX_TMPDIR) |

## Why This Works

`TMUX_TMPDIR` controls where tmux creates its server socket. By pointing both the user's shell and the gateway service at the same directory, they share the **same tmux server process** and thus the same sessions.

The gateway service (running as the same user via `launchd` `LimitLoadToSessionType: Aqua,Background`) has access to `/tmp/tmux-hermes-shared` and can connect to the socket.

## Pitfalls

- **Socket path is UID-specific**: `/tmp/tmux-hermes-shared/tmux-501/default` — the `501` is the user's UID. Hardcode in helper script or discover dynamically.
- **Gateway must restart after plist change**: `launchctl unload/load` or `hermes gateway restart` (if using wrapper)
- **`TMUX` env var must be unset** in helper scripts: `export TMUX=""` prevents tmux from refusing to connect to "nested" sessions
- **History expansion (`!`)** in bash: Use single quotes in `send-keys` to avoid `!` triggering history expansion
- **Directory recreated on reboot**: `/tmp` is cleared on macOS reboot. Add a `@reboot` cron job or login item to recreate the directory and session if persistence across reboots is needed.

## Alternative: tmux -L (Named Socket)

Instead of `TMUX_TMPDIR`, use `tmux -L hermes-shared` to create a named server. Both environments must use the same `-L` name. Less convenient for interactive use (requires `-L` on every command), but avoids polluting `TMUX_TMPDIR`.

```bash
# User
tmux -L hermes-shared new-session -d -s shared

# Gateway (in plist, add to command or via wrapper)
# tmux -L hermes-shared send-keys -t shared 'cmd' Enter
```