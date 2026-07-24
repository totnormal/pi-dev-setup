---
name: strix
description: "Stress-test applications and codebases for risks, errors, edge cases, and runtime issues using the strix CLI tool. strix identifies failure modes, concurrency bugs, memory issues, and security risks."
disable-model-invocation: true
---

# Strix — Code Stress-Testing & Risk Analysis

Uses [strix](https://github.com/strix-tools/strix) to stress-test applications, identify failure modes, race conditions, memory issues, security vulnerabilities, and runtime errors.

## When to Use

- Before deploying new code to production
- When investigating mysterious crashes or hangs
- To validate error handling and edge cases
- For security review of critical code paths
- When performance testing under load

## Prerequisites

- `strix` CLI installed (`~/.strix/bin/strix`)
- Target application should be buildable/runnable

## Procedure

1. **Scope** — define what to test (module, endpoint, binary)
2. **Configure** — set stress parameters (concurrency, duration, input variations)
3. **Run analysis** — `strix analyze <target>` for static analysis
4. **Stress test** — `strix stress <target>` for runtime stress testing
5. **Review findings** — categorize by severity (critical/high/medium/low)
6. **Fix/verify** — apply fixes and re-test

## Common Commands

```bash
strix analyze ./src           # Static analysis
strix stress ./server         # Runtime stress test
strix fuzz ./parser           # Fuzz testing
strix report                  # Generate HTML report
```

## Pitfalls

- Stress testing can crash services — use staging/pre-prod environments
- Some tests may take minutes to complete
- strix must be on PATH or at ~/.strix/bin/strix

## Verification

- strix exits with code 0 (all clear) or >0 (issues found)
- Report generated with categorized findings
- Critical/high findings documented and addressed
