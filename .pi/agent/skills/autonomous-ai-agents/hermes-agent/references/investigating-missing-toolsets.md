# Investigating Missing Toolsets

When a toolset is referenced in documentation but appears to not exist, follow this investigation pattern:

## Common Sources of References

1. **`toolsets.py`** — Primary toolset definitions (TOOLSETS dict, _HERMES_CORE_TOOLS)
2. **`hermes_cli/tools_config.py`** — CONFIGURABLE_TOOLSETS list (what users toggle in `hermes tools`) and _DEFAULT_OFF_TOOLSETS
3. **`tools/delegate_tool.py`** — _EXCLUDED_TOOLSET_NAMES (toolsets excluded from delegation)
4. **`cron/scheduler.py`** — Comments about default toolsets for cron jobs
5. **Test files** — Often reflect the documented behavior

## Investigation Steps

```bash
# 1. Check if toolset exists in toolsets.py
grep -n '"rl":' ~/.hermes/hermes-agent/toolsets.py

# 2. Check all referencing files
grep -r '"rl"' ~/.hermes/hermes-agent --include="*.py" --include="*.md"
grep -r "'rl'" ~/.hermes/hermes-agent --include="*.py" --include="*.md"

# 3. Check if there are any tools with toolset="rl"
grep -r 'toolset.*"rl"' ~/.hermes/hermes-agent --include="*.py"
```

## Resolution Patterns

- **If toolset is documented but unused**: Remove from documentation, note optional skills that provide related functionality
- **If toolset should exist**: Add it to `toolsets.py` alongside similar toolsets (e.g., `moa` uses `mixture_of_agents` tool)
- **If references are outdated comments**: Update comments to match actual `_DEFAULT_OFF_TOOLSETS` values
- **If it's an exclusion list artifact**: Remove from `_EXCLUDED_TOOLSET_NAMES` or `_DEFAULT_OFF_TOOLSETS` if it doesn't exist

## Pitfall: Optional Skills vs Toolsets

Skills (like `slime-rl-training`) provide knowledge/workflow documentation but don't necessarily register tools. Don't assume a skill implies a toolset exists.