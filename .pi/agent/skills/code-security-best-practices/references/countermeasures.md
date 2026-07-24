# Countermeasures Reference: Threat → Mitigation Mapping

Quick reference linking common threats to specific mitigations.

## Access Control Threats

| Threat | Mitigation |
|--------|------------|
| IDOR (Insecure Direct Object Reference) | Ownership checks in all queries; UUIDs instead of sequential IDs |
| JWT Tampering | Use RS256 (asymmetric); validate algorithm; store roles server-side |
| Privilege Escalation | RBAC with server-side checks; `requireAdmin` middleware; least privilege |
| Broken Function Level Authorization | Consistent authorization library/middleware; deny-by-default |

## Injection Threats

| Threat | Mitigation |
|--------|------------|
| SQL Injection | Parameterized queries; ORMs; never string concatenation |
| NoSQL Injection | Use Mongoose/ODM; validate input types; avoid `$where` |
| Command Injection | Avoid `exec()`; use `execFile` with allowlist |
| Template Injection | Disable auto-escaping override; avoid rendering user templates |
| XSS | Contextual output encoding; CSP; DOMPurify for HTML |
| XXE | Disable external entities in XML parsers |

## Cryptographic Threats

| Threat | Mitigation |
|--------|------------|
| Plaintext Data | AES-256 encryption at rest; TLS 1.2+ in transit |
| Weak Hashing (MD5/SHA1) | bcrypt/argon2/scrypt for passwords |
| Hardcoded Secrets | Environment variables; secret manager |
| Improper TLS | Disable SSLv2/3, TLS 1.0/1.1; valid certificates; `secure: true` cookies |
| Key Management | Use KMS; rotate keys; separate duties |

## SSRF Threats

| Threat | Mitigation |
|--------|------------|
| Cloud Metadata Access | Block 169.254.169.254; restrict IMDS (AWS: `HttpTokens=required`) |
| Internal Port Scanning | Private IP allowlist/blocklist; DNS resolution check |
| DNS Rebinding | Validate resolved IPs; connection timeout |
|Redirect Bypass | Disable redirects; validate final destination |

## Authentication Threats

| Threat | Mitigation |
|--------|------------|
| Credential Stuffing | Rate limiting; MFA; breached password detection |
| Weak Passwords | Password policy: min 13 chars, complexity |
| Session Fixation | Regenerate session on login; `httpOnly` cookies |
| Session Hijacking | Secure cookies; session timeout; IP/user-agent binding |
| Password Reset Abuse | Random tokens (256-bit); single-use; 1hr expiry; rate limited |

## Design Threats

| Threat | Mitigation |
|--------|------------|
| Race Conditions | Atomic operations; database constraints; optimistic locking |
| Business Logic Flaws | Server-side validation; threat modeling; unit tests for edge cases |
| Trust Boundary Violation | Never trust client-side data; re-fetch from DB |
| Anti-Automation Bypass | Rate limiting; CAPTCHA; device fingerprinting |

## Configuration Threats

| Threat | Mitigation |
|--------|------------|
| Default Credentials | Change all defaults; disable sample accounts |
| Verbose Errors | Generic errors in production; detailed only in development |
| Unnecessary Features | Disable debug mode; remove sample apps; disable unused HTTP methods |
| Missing Security Headers | Helmet/security middleware; set CSP, HSTS, X-Frame-Options |

## Supply Chain Threats

| Threat | Mitigation |
|--------|------------|
| CVE Exploitation | SCA scanning; patch within 7 days for critical CVEs |
| Abandoned Libraries | SBOM; evaluate maintenance status before adoption |
| Typosquatting | Use official package registry; verify downloads count |
| Compromised CI/CD | Signed commits; protected branches; build logs sanitized |

## Logging Threats

| Threat | Mitigation |
|--------|------------|
| Insufficient Logging | Log all auth events, privilege changes, input validation failures |
| Sensitive Data in Logs | Mask PII/secrets; structured logging with sensitive field filtering |
| Log Tampering | WORM storage; log signing; centralized immutable storage |
| No Monitoring | SIEM; alerting on critical events; regular review |
