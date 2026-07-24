---
disable-model-invocation: true
name: "fix-third-party-proxy-compat-warning"
description: "Fix pi-cache-optimizer warnings about missing compat fields (supportsLongCacheRetention, sendSessionAffinityHeaders) for third-party GPT/OpenAI-compatible proxy providers in ~/.pi/agent/models.json"
version: 2
created: "2026-06-02"
updated: "2026-06-02"
---
## When to Use
When pi-cache-optimizer warns that a third-party GPT/OpenAI-compatible proxy provider lacks `supportsLongCacheRetention` and/or `sendSessionAffinityHeaders` in its compat config. This happens on every new model/provider addition. The warning format is: 'X is a third-party GPT/OpenAI-compatible proxy but merged compat lacks supportsLongCacheRetention and sendSessionAffinityHeaders.'

## Procedure
**Proactive (preferred):** Run the universal auto-fix script `fix_compat_defaults.py` in the pi-acp project root:
```bash
python3 fix_compat_defaults.py --apply
```
This seats `sendSessionAffinityHeaders: true` as a safe default for every third-party OpenAI-compatible provider already in `models.json`, and for any new provider added later. Run before starting Pi, or restart Pi after applying changes.

**Reactive (when the warning already appears):**
1. Identify the provider key from the warning message (e.g., 'zai', 'qwen', etc.) — it's the string before the slash in the model name or shown in the provider path.
2. Open `~/.pi/agent/models.json`.
3. Navigate to `providers["<provider_key>"] -> compat` (at the same level as baseUrl/apiKey/models). If `compat` doesn't exist, create it.
4. Add the safe default: `"sendSessionAffinityHeaders": true`.
5. Only add `"supportsLongCacheRetention": true` if you've confirmed the upstream proxy explicitly supports OpenAI long prompt cache retention. If unsure, omit it.
6. Save the file. Restart Pi. The warning should disappear on next run.
7. If the channel returns 400 `Unsupported parameter: prompt_cache_retention` after enabling `supportsLongCacheRetention`, remove that field.
## Pitfalls
- Don't enable supportsLongCacheRetention unless the upstream proxy explicitly supports it — otherwise you'll get 400 errors about 'prompt_cache_retention'.
- The compat object goes at the same level as baseUrl/apiKey/models inside the provider config, not nested deeper.
- This warning will reappear for EVERY new third-party proxy provider added — that's why this skill exists. Apply it proactively when adding new providers.
- sendSessionAffinityHeaders is the safe default that should almost always be enabled for third-party proxies.

## Verification
1. Run the command that triggered the warning again and confirm the pi-cache-optimizer warning no longer appears.
2. Verify the models.json is valid JSON (no trailing commas, proper quoting).