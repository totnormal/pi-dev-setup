# Automated Security Tools Reference

## SAST (Static Application Security Testing)

Scans source code for vulnerabilities without executing it.

| Language | Tool | Integration |
|----------|------|-------------|
| JavaScript/TypeScript | ESLint + security plugins, SonarQube, Snyk Code | CI/CD |
| Python | Bandit, Semgrep, Snyk Code | CI/CD |
| Java | SpotBugs + Find Security Bugs, SonarQube | CI/CD |
| Go | Gosec, Semgrep | CI/CD |
| Ruby | Brakeman | CI/CD |
| Multi-language | Semgrep, CodeQL, Checkmarx | CI/CD |

**Usage**:
```bash
# Semgrep example
semgrep --config=auto --json --output=semgrep.json src/

# Bandit (Python)
bandit -r src/ -f json -o bandit.json
```

## SCA (Software Composition Analysis)

Scans dependencies for known vulnerabilities (CVEs).

| Ecosystem | Tool |
|-----------|------|
| JavaScript | npm audit, yarn audit, Snyk, OWASP Dependency-Check |
| Python | pip-audit, safety, Snyk |
| Java | OWASP Dependency-Check, Snyk, Maven Enforcer |
| Go | govulncheck, Snyk |
| Rust | cargo-audit |
| Multi-language | Syft + Grype, Trivy, Snyk |

**Usage**:
```bash
# npm audit (built-in)
npm audit --json > npm-audit.json

# Snyk (cross-platform)
snyk test --json > snyk.json

# Trivy (SBOM + vuln scan)
trivy fs --format json --output trivy.json .
```

## DAST (Dynamic Application Security Testing)

Scans running applications for vulnerabilities.

| Tool | Use Case |
|------|----------|
| OWASP ZAP | Free, great for beginners, CI/CD integration |
| Burp Suite | Professional pentesters (Burp Professional) |
| Nikto | Web server scanning |
| Nuclei | Template-based vuln scanning |

**Usage**:
```bash
# ZAP baseline scan (CI/CD)
zap-baseline.py -t https://app.example.com -g gen.conf -r zap-report.html

# Nuclei
nuclei -u https://app.example.com -templates ./nuclei-templates/ -json
```

## Secrets Scanning

Detect committed secrets (API keys, passwords).

| Tool | Features |
|------|----------|
| Gitleaks | Fast, offline, 100+ detectors |
| TruffleHog | Entropy + keyword detection |
| GitGuardian | Commercial with monitoring |
| detect-secrets | Airbnb's tool, baseline mode |

**Usage**:
```bash
# Gitleaks
gitleaks detect --source ./ --report-format json --report-path gitleaks.json

# Commit-time hook (pre-commit)
detect-secrets-hook --baseline .secrets.baseline
```

## Container Security

| Tool | Purpose |
|------|---------|
| Trivy | Vulnerability scanning in images |
| Grype | Another scanner (by Anchore) |
| Docker Scout | Docker's built-in scanner |
| Snyk Container | Container + IaC scanning |

**Usage**:
```bash
trivy image --format json myapp:latest > trivy-image.json
```

## CI/CD Integration Example

```yaml
# GitHub Actions
name: Security Scan
on: [push, pull_request]
jobs:
  sast:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Semgrep
        run: semgrep --config=auto --json > semgrep.json
      - name: Upload SARIF
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: semgrep.json
  sca:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Trivy
        run: trivy fs --format sarif --output trivy.sarif .
      - name: Upload SARIF
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: trivy.sarif
```

## Recommended Toolchain by Language

### JavaScript/TypeScript (Node.js + React)
- SAST: ESLint (security plugin), Snyk Code, Semgrep
- SCA: `npm audit`, Snyk, Trivy
- Secrets: gitleaks, trufflehog
- Container: Trivy

### Python (Django/Flask)
- SAST: Bandit, Semgrep
- SCA: `pip-audit`, Snyk, safety
- Secrets: gitleaks, detect-secrets
- DAST: OWASP ZAP

### Java (Spring Boot)
- SAST: SpotBugs + Find Security Bugs, SonarQube, Checkmarx
- SCA: OWASP Dependency-Check, Maven Enforcer, Snyk
- Container: Trivy

### Go
- SAST: Gosec, Semgrep, staticcheck
- SCA: `govulncheck`, Snyk, Trivy
- Secrets: gitleaks

## False Positive Management

```bash
# Semgrep: ignore specific rule
semgrep --config=auto --exclude-rule=... --skip-scanning ...

# Create baseline (only new issues)
bandit -r src/ -f json --baseline baseline.json -o bandit.json

# In CI, fail only on HIGH severity:
trivy fs --severity HIGH,CRITICAL .
```

## Resources

- OWASP Cheat Sheet Series: https://cheatsheetseries.owasp.org/
- Awesome Security Tools: https://github.com/h2hconsec/awesome-security-tools
- NIST SSDF (Secure Software Development Framework)
