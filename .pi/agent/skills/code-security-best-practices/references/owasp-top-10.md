# OWASP Top 10 (2025 Edition) – Security Review Reference

This reference provides detailed attack patterns, vulnerable code examples, and secure implementations for each OWASP Top 10 category.

## Quick Reference Table

| Category | Risk Level | Common Attack Vectors | Primary Defense |
|----------|------------|----------------------|-----------------|
| A01 – Broken Access Control | HIGH | IDOR, JWT manipulation, privilege escalation | Enforce least privilege, server-side checks |
| A02 – Cryptographic Failures | HIGH | Plaintext data, weak algorithms, key exposure | Encryption everywhere, TLS 1.2+, proper key management |
| A03 – Injection | HIGH | SQL, NoSQL, OS command, LDAP injection | Parameterized queries, input validation, ORMs |
| A04 – Insecure Design | HIGH | Business logic flaws, missing controls | Secure design patterns, threat modeling |
| A05 – Security Misconfiguration | MEDIUM | Default credentials, verbose errors | Immutable infrastructure, hardening guides |
| A06 – Vulnerable Components | HIGH | Known CVEs, outdated dependencies | SBOM, automated scanning, patch management |
| A07 – Authentication Failures | HIGH | Credential stuffing, weak passwords | MFA, strong password policies, secure sessions |
| A08 – Data Integrity Failures | MEDIUM | Deserialization attacks, unsigned code | Code signing, integrity checks |
| A09 – Logging Failures | MEDIUM | Insufficient logs, log injection | Structured logging, centralized aggregation |
| A10 – SSRF | HIGH | Internal network scanning, metadata access | URL validation, network segmentation |

---

## Detailed Category Reference

### A01:2021 – Broken Access Control

**Description**: Violations of the principle of least privilege or by-pass of access control checks.

#### Attack Patterns

1. **Insecure Direct Object Reference (IDOR)**
   ```javascript
   // VULNERABLE: User can access any order by ID
   app.get('/order/:id', (req, res) => {
     const orderId = req.params.id;
     db.query(`SELECT * FROM orders WHERE id = ${orderId}`, (err, result) => {
       res.json(result);
     });
   });
   ```

2. **JWT None Algorithm Attack**
   Attacker modifies JWT header: {"alg": "none"}

3. **Horizontal Privilege Escalation**
   ```python
   # VULNERABLE: No ownership check
   @app.route('/api/profile', methods=['GET'])
   def get_profile():
       user_id = request.args.get('user_id')
       return get_user_data(user_id)  # Any user_id allowed
   ```

#### Secure Implementation Patterns

```javascript
// SECURE: Ownership check middleware
const requireOwnership = async (req, res, next) => {
  const orderId = req.params.id;
  const userId = req.user.id;
  const order = await db.orders.find({ id: orderId, user_id: userId });
  if (!order) return res.status(403).json({ error: 'Forbidden' });
  req.order = order;
  next();
};

// Use UUIDs instead of sequential integers
const orderId = crypto.randomUUID();
```

**Checklist**:
- [ ] All endpoints verify user authorization for the resource being accessed
- [ ] Use UUIDs or random tokens instead of sequential IDs where possible
- [ ] Implement deny-by-default: explicit allow lists for access
- [ ] Validate ownership on every data access, never trust client-side
- [ ] Log all access control failures
- [ ] Disable HTTP methods appropriately
- [ ] Rate limit sensitive operations

**(Continue with A02 through A10 in full file)**

## Full Category Coverage Reference

This section ensures all OWASP Top 10 (2021) categories are explicitly named for automated tooling.

### A06:2021 – Vulnerable and Outdated Components
Covered in:
- `owasp-top-10.md` (this document) – see section "A06:2021 – Vulnerable Components"
- `automated-tools.md` – SCA tools, dependency scanning
- `countermeasures.md` – Supply chain threats
- `tech-stack-checklist/` – Language-specific dependency auditing

Key guidance: Run `npm audit`, `pip-audit`, `snyk test`, `govulncheck` regularly; patch critical CVEs within 7 days; remove unused dependencies.

### A08:2021 – Software and Data Integrity Failures
Covered in:
- `owasp-top-10.md` – see section "A08:2021 – Data Integrity Failures"
- `secure-design.md` – integrity checks, code signing
- `countermeasures.md` – Integrity threats and mitigations
- `tech-stack-checklist/` – Deserialization guidance

Key guidance: Avoid deserialization of untrusted data; use code signing for CI/CD artifacts; verify integrity of downloaded components; maintain SBOM.

### A09:2021 – Security Logging and Monitoring Failures
Covered in:
- `owasp-top-10.md` – see section "A09:2021 – Logging Failures"
- `logging-monitoring.md` – comprehensive guide
- `countermeasures.md` – Logging threats table

Key guidance: Log all authentication events, privilege changes, input validation failures; use centralized logging; configure alerts; protect logs from tampering; ensure logs contain sufficient context (userId, IP, requestId).

### A10:2021 – Server-Side Request Forgery (SSRF)
Covered in:
- `owasp-top-10.md` – see section "A10:2021 – SSRF"
- `ssrf.md` – comprehensive SSRF defense guide
- `countermeasures.md` – SSRF threat mapping

Key guidance: Validate all URLs before server-side fetch; block private IP ranges and cloud metadata endpoints; use egress proxy; network segmentation; disable HTTP redirects.
