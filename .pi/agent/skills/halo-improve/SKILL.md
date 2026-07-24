---
disable-model-invocation: true
name: halo-improve
description: Automatically analyze pi agent traces with HALO and apply harness optimizations
triggers:
  - "improve pi"
  - "improve the harness"
  - "optimize pi"
  - "halo analysis"
  - "run halo"
---

# HALO Harness Improvement Pipeline

When the user asks to "improve pi" or "improve the harness", execute this pipeline autonomously:

## Pipeline

### Step 1: Snapshot
```bash
cd ~/.pi/agent && git add -A && git commit -m "pre-halo snapshot $(date +%Y-%m-%d-%H%M)" || true
```

### Step 2: Convert traces
```bash
python3 ~/Documents/Playground/halo/pi-to-halo-v3.py /tmp/pi_traces_latest.jsonl
```
Verify: all tool spans have real names (not "unknown"), error detection is clean.

### Step 3: Run HALO
```bash
export OPENAI_API_KEY="$OPENROUTER_API_KEY"
export OPENAI_BASE_URL="https://openrouter.ai/api/v1"
/Library/Frameworks/Python.framework/Versions/3.13/bin/halo \
  /tmp/pi_traces_latest.jsonl \
  -m openai/gpt-5.2 \
  -p "Analyze these pi agent traces. Find systemic harness failure patterns. For each: affected tools, error types, frequency, and concrete prompt/config fixes. Focus on patterns that recur across many sessions." \
  --max-depth 2 --max-turns 20 \
  --reasoning-effort high \
  2>&1 | tee /tmp/halo-output-latest.txt
```
Timeout: 600s. Non-fatal 401 errors from OpenRouter tracing are expected.

### Step 4: Apply fixes
Parse HALO's output for actionable changes. Edit only these files:
- `~/.pi/agent/agents/*.md` — system prompts
- `~/.pi/agent/settings.json` — pi configuration
- `~/.pi/bin/pi` — startup shim

For each finding:
1. Skip converter false positives (npm deprecation warnings, "node-domexception" matching)
2. Apply prompt/config/environment fixes
3. Document what changed

### Step 5: Commit
```bash
cd ~/.pi/agent && git add -A && git commit -m "HALO improvements: $(date +%Y-%m-%d) — [summary]"
```

## Safety
- Git snapshot before every run — `git checkout HEAD~1` to revert
- Only edit user config files, never pi core
- For pi core changes, create idempotent patch scripts in `~/.pi/agent/patches/`

## Known false positives to ignore
- npm deprecation warnings flagged as errors
- "node-domexception" matching "exception" pattern
- Build output with exit code 0 but stderr warnings
- "Failed: 0" in web_search output
