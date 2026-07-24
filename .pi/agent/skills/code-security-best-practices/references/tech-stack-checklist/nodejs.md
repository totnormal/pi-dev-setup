# Node.js / Express Security Checklist

## Core Dependencies

- [ ] Use LTS version of Node.js (not EOL versions)
- [ ] Dependencies audited: `npm audit` or Snyk
- [ ] No `eval()`, `Function()`, `setTimeout(string)` with user input
- [ ] No `child_process.exec()` with unsanitized input

## Input Validation

- [ ] Use validation library: Joi, express-validator, Zod
```javascript
// Example with Joi
const schema = Joi.object({
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(0).max(120)
});
```

- [ ] JSON schema validation for API inputs
- [ ] TypeScript type checking as second layer (not primary defense)

## Authentication & Session

- [ ] Use established auth library: Passport.js, NextAuth, Lucia
- [ ] bcrypt (cost≥12) for password hashing
```javascript
const hash = await bcrypt.hash(password, 12);
```
- [ ] Session cookies: `httpOnly: true, secure: true, sameSite: 'lax'`
- [ ] Rate limiting on `/login`, `/logout`, `/password-reset`
```javascript
const limiter = rateLimit({ windowMs: 15*60*1000, max: 5 });
app.use('/login', limiter);
```
- [ ] CSRF protection: csurf or double-submit cookie pattern
- [ ] MFA available for admin/sensitive operations

## Authorization

- [ ] Access control on every route (not just frontend)
- [ ] Authorization middleware separate from business logic
```javascript
app.get('/admin', requireAdmin, handler);
```
- [ ] Row-level security or ownership checks in DB queries
- [ ] No `if (req.user.role === 'admin')` scattered inline

## Injection Prevention

- [ ] SQL: Use parameterized queries with mysql2/pg, not string concatenation
```javascript
// BAD
const query = `SELECT * FROM users WHERE id = ${id}`;
// GOOD
const query = 'SELECT * FROM users WHERE id = $1';
db.query(query, [id]);
```
- [ ] NoSQL: use ORM/ODM (Mongoose, Prisma) that handles escaping
- [ ] Avoid `where: { $where: <user input> }` in MongoDB
- [ ] Template injection: validate user templates, use allowlist of functions

## HTTP Security Headers

Use `helmet` middleware:
```javascript
const helmet = require('helmet');
app.use(helmet());
// Sets: Content-Security-Policy, X-Frame-Options, HSTS, etc.
```

Verify headers:
- `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- `Content-Security-Policy` (appropriate for app)
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY` or `SAMEORIGIN`
- `X-XSS-Protection: 1; mode=block` (legacy, but OK)

## File Uploads

- [ ] Validate file type (MIME, magic bytes, not just extension)
- [ ] Rename files to random UUID, not user-provided name
- [ ] Store outside web root or serve via signed URLs
- [ ] Scan for viruses (ClamAV)
- [ ] Limit file size
- [ ] Prevent directory traversal: sanitize paths

## Dependency Security

- [ ] Use `npm ci` (not `npm install`) for reproducible builds
- [ ] Pin exact versions in package-lock.json (check into Git)
- [ ] No `npm install <package>` without audit first
- [ ] Dependabot or Renovate enabled for automated updates
- [ ] SBOM generated (Syft): `syft packages:./ -o spdx-json > sbom.spdx.json`

## Error Handling

- [ ] Production errors: generic messages, no stack traces
- [ ] Development errors: detailed (express error handler)
- [ ] All errors logged (with request ID, user ID)
- [ ] No sensitive data in error messages (query params, body)

## Environment & Secrets

- [ ] `.env` file excluded from Git (`.env` in .gitignore)
- [ ] All secrets from `process.env` (never hardcoded)
- [ ] Use secret manager in production (AWS Secrets Manager, HashiCorp Vault)
- [ ] Validate required env vars on startup (fail fast)

## API Security

- [ ] All endpoints: authentication + authorization
- [ ] Rate limiting (global and per-endpoint)
- [ ] Request size limits: `app.use(express.json({ limit: '1mb' }))`
- [ ] CORS configured with specific origin allowlist (not `*` with credentials)
- [ ] GraphQL: depth limiting, query complexity analysis
- [ ] REST: proper HTTP verbs (GET read-only, POST create, etc.)

## WebSockets / Real-time (Socket.io)

- [ ] Authentication at connection time (not just first message)
- [ ] Validate all incoming events (schema validation)
- [ ] Rate limit events per connection
- [ ] Origin header validated (prevent cross-origin WS)
- [ ] Proper cleanup on disconnect

## Child Processes / System Commands

- [ ] Avoid `exec()`, use `execFile()` with array arguments
- [ ] If unavoidable, strict input validation (allowlist only)
```javascript
const allowed = ['ls', 'cat', 'grep'];
if (!allowed.includes(userCommand)) throw new Error('Invalid');
execFile(userCommand, ['-la', '/tmp']);
```

## OWASP Top 10 Quick Checks

- **A01 – Broken Access Control**: Verify ownership on all `/resource/:id` routes
- **A02 – Cryptographic Failures**: TLS 1.2+, no hardcoded secrets, bcrypt passwords
- **A03 – Injection**: All SQL parameterized, input validated
- **A04 – Insecure Design**: Threat modeling done? Business logic validated server-side?
- **A05 – Misconfiguration**: `debug=false`, sample apps removed, default creds changed
- **A06 – Vulnerable Components**: `npm audit` clean, no high/critical CVEs
- **A07 – Authentication Failures**: MFA optional?, rate limiting, secure cookies
- **A08 – Data Integrity**: Code signing?, Tamper detection?
- **A09 – Logging Failures**: Audit logging?, centralized?
- **A10 – SSRF**: URL validation, private IP blocking?

## References

- OWASP Node.js Security Cheat Sheet
- Express Security Best Practices
- Snyk Node.js Security Best Practices (2025)
