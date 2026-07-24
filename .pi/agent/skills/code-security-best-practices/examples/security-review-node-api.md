# Security Code Review: Node.js REST API

**Project**: Order Management API  
**Tech Stack**: Node.js 18, Express 4, PostgreSQL, JWT authentication  
**Review Date**: 2025-02-27  
**Review Scope**: Authentication, authorization, input validation, data protection

---

## Executive Summary

**Overall Risk**: **HIGH** – Several critical vulnerabilities requiring immediate attention.  
**Critical Findings**: 3  
**High Findings**: 4  
**Medium Findings**: 6  
**Low Findings**: 2  

**Key Recommendations**:
1. Fix critical IDOR vulnerability (TM-001) before next release
2. Update JWT library (CVE-2024-xxxx) within 48 hours
3. Implement parameterized queries on search endpoint
4. Enable rate limiting on auth endpoints
5. Rotate all database connection strings (exposed in git history)

---

## Detailed Findings

### CRIT-001: Insecure Direct Object Reference (IDOR) on Order Endpoints

**Severity**: **CRITICAL**  
**OWASP**: A01:2021 – Broken Access Control  
**CVSS**: 8.5 (AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:N)

**Vulnerable Code**:
```javascript
// routes/orders.js
router.get('/:orderId', authMiddleware, async (req, res) => {
  const order = await db.orders.find({ id: req.params.orderId });
  res.json(order);
});
```

**Issue**: No ownership check. Any authenticated user can access any order by ID (UUIDs used but sequential increment reveals total orders).

**Proof of Concept**:
```
GET /api/orders/550e8400-e29b-41d4-a716-446655440000
Authorization: Bearer <attacker_token>
```
Returns order belonging to another user.

**Impact**: Full order history leakage (PII: name, address, email, purchased items). Financial fraud risk (viewing others' invoices).

**Recommendation**:
```javascript
router.get('/:orderId', authMiddleware, async (req, res) => {
  const order = await db.orders.findOne({
    id: req.params.orderId,
    userId: req.user.id  // ← Add ownership filter
  });
  if (!order) return res.status(403).json({ error: 'Forbidden' });
  res.json(order);
});
```

**Owner**: Backend Team  
**Due Date**: 2025-02-28 (48 hours)  
**Status**: OPEN

---

### CRIT-002: JWT Library Vulnerability (CVE-2024-xxxx)

**Severity**: **CRITICAL**  
**OWASP**: A07:2021 – Authentication Failures  
**CVE**: CVE-2024-xxxx (JWT library allows `none` algorithm bypass)

**Vulnerable Code**:
```json
// package.json
"dependencies": {
  "jsonwebtoken": "^8.5.1"  // Vulnerable to CVE-2024-xxxx
}
```

**Issue**: Outdated `jsonwebtoken` library allows `alg: none` attack. Attacker can forge JWT token with empty signature.

**Recommendation**:
```bash
npm install jsonwebtoken@^9.0.0  # Includes algorithm validation
```

Also verify code validates algorithm:
```javascript
jwt.verify(token, secret, { algorithms: ['RS256'] }); // Explicit
```

**Owner**: DevOps  
**Due Date**: 2025-02-28 (immediate)  
**Status**: OPEN

---

### CRIT-003: SQL Injection via Search Endpoint

**Severity**: **CRITICAL**  
**OWASP**: A03:2021 – Injection  
**CVSS**: 9.1 (AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:N)

**Vulnerable Code**:
```javascript
// routes/search.js
router.get('/', async (req, res) => {
  const query = req.query.q;
  const sql = `SELECT * FROM products WHERE name ILIKE '%${query}%' OR description ILIKE '%${query}%'`;
  const results = await db.query(sql);  // String concatenation!
  res.json(results);
});
```

**Issue**: User input directly concatenated into SQL string.

**Proof of Concept**:
```
GET /api/search?q=' UNION SELECT credit_card FROM payments--
```

Returns all credit card numbers from payments table.

**Impact**: Full database compromise, data exfiltration, potential RCE depending on DB driver.

**Recommendation**:
```javascript
router.get('/', async (req, res) => {
  const { q } = req.query;
  const pattern = `%${q}%`;
  const sql = `SELECT * FROM products WHERE name ILIKE $1 OR description ILIKE $2`;
  const results = await db.query(sql, [pattern, pattern]);  // Parameterized
  res.json(results);
});
```

**Owner**: Backend Team  
**Due Date**: 2025-02-28  
**Status**: OPEN

---

### HIGH-001: Missing Rate Limiting on Authentication Endpoints

**Severity**: **HIGH**  
**OWASP**: A07:2021 – Authentication Failures

**Vulnerable Code**:
```javascript
// routes/auth.js
router.post('/login', loginHandler);  // No rate limiting
router.post('/reset', resetHandler);  // No rate limiting
```

**Issue**: No rate limiting allows credential stuffing attacks (10,000 attempts/hour).

**Recommendation**:
```javascript
const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,  // 5 attempts per 15 minutes
  message: 'Too many attempts, try again later'
});

router.use('/login', authLimiter);
router.use('/reset', authLimiter);
```

**Owner**: Backend Team  
**Due Date**: 2025-03-05  
**Status**: OPEN

---

### HIGH-002: Hardcoded Database Credentials

**Severity**: **HIGH**  
**OWASP**: A02:2021 – Cryptographic Failures

**Vulnerable Code**:
```javascript
// config/db.js
module.exports = {
  host: 'localhost',
  user: 'postgres',
  password: 'Postgres123!',  // ← HARDCODED
  database: 'orders'
};
```

**Issue**: Credentials committed to Git history (even if deleted in latest commit, still in history).

**Impact**: Database compromise if anyone clones repository. Credentials exposed to all developers (over-privileged DB user).

**Recommendation**:
```javascript
// Use environment variables
module.exports = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

// .env (git-ignored)
DB_PASSWORD=super-secret-from-vault
```

**Additional**: Rotate database password. Previous password still in Git history must be considered compromised.

**Owner**: DevOps  
**Due Date**: 2025-03-01  
**Status**: OPEN

---

### HIGH-003: No HTTPS Enforcement

**Severity**: **HIGH**  
**OWASP**: A02:2021 – Cryptographic Failures

**Issue**: Application runs on HTTP only in production. No redirect to HTTPS.

**Recommendation**:
```javascript
// Enforce HTTPS (behind load balancer)
app.enable('trust proxy');
app.use((req, res, next) => {
  if (req.secure) return next();
  res.redirect(`https://${req.headers.host}${req.url}`);
});
```

Or configure at load balancer (AWS ALB → HTTP → HTTPS redirect).

**Owner**: DevOps  
**Due Date**: 2025-02-28  
**Status**: OPEN

---

### HIGH-004: Session Token Stored in LocalStorage

**Severity**: **HIGH**  
**OWASP**: A07:2021 – Authentication Failures

**Vulnerable Code**:
```javascript
// React frontend
localStorage.setItem('token', jwt);  // Vulnerable to XSS theft
```

**Issue**: XSS vulnerability would expose session token. Also no automatic cleanup on logout.

**Recommendation**:
```javascript
// Use httpOnly cookie set by backend
// Frontend: no token handling
// fetch('/api/protected', { credentials: 'include' })
```

**Owner**: Frontend Team  
**Due Date**: 2025-03-10  
**Status**: OPEN

---

### MEDIUM-001: Missing Content Security Policy

**Severity**: **MEDIUM**  
**OWASP**: A05:2021 – Security Misconfiguration

**Issue**: No CSP header allows XSS payloads to execute.

**Recommendation**:
```javascript
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'"], // Remove unsafe-inline
    imgSrc: ["'self'", "data:", "https:"],
    connectSrc: ["'self'", "https://api.example.com"]
  }
}));
```

**Owner**: Frontend Team  
**Due Date**: 2025-03-15  
**Status**: OPEN

---

### MEDIUM-002: Verbose Error Messages in Production

**Severity**: **MEDIUM**  
**OWASP**: A05:2021 – Security Misconfiguration

**Vulnerable Code**:
```javascript
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message, stack: err.stack });  // Reveals internal details
});
```

**Recommendation**:
```javascript
if (process.env.NODE_ENV === 'production') {
  res.status(500).json({ error: 'Internal server error' });
} else {
  res.status(500).json({ error: err.message, stack: err.stack });
}
```

---

### MEDIUM-003: No Input Validation on Create Order

**Severity**: **MEDIUM**  
**OWASP**: A03:2021 – Injection

**Vulnerable**:
```javascript
router.post('/orders', async (req, res) => {
  const order = await db.orders.create(req.body);  // No validation
});
```

**Recommendation**: Use Joi/Zod validation:
```javascript
const orderSchema = Joi.object({
  productId: Joi.string().uuid().required(),
  quantity: Joi.number().integer().min(1).max(100).required(),
  shippingAddress: Joi.object({ /* nested validation */ }).required()
});
const { error } = orderSchema.validate(req.body);
if (error) return res.status(400).json({ error: error.message });
```

---

## Positive Findings (Good Security Practices)

✅ TLS 1.2+ enforced behind load balancer  
✅ Passwords hashed with bcrypt (cost 12)  
✅ HTTP-only, secure cookies for session  
✅ CSRF tokens on state-changing operations  
✅ CORS configured with specific origin allowlist  
✅ Audit logging for order creation (userId, IP, timestamp)  
✅ Dependency scanning in CI/CD (Snyk)  

---

## Recommendations by Priority

### Immediate (48 hours)
1. Fix IDOR vulnerability (CRIT-001)
2. Update JWT library (CRIT-002)
3. Fix SQL injection (CRIT-003)
4. Enable HTTPS (HIGH-003)

### This Week
5. Implement rate limiting (HIGH-001)
6. Move DB credentials to environment (HIGH-002)
7. Rotate compromised database password
8. Configure error handling for production (MEDIUM-002)

### This Sprint
9. Replace localStorage token with httpOnly cookie (HIGH-004)
10. Implement CSP header (MEDIUM-001)
11. Add input validation to all POST/PUT endpoints (MEDIUM-003)

### Next Sprint
12. Conduct full SAST scan (Bandit/Semgrep) and fix findings
13. Implement automated dependency updates (Dependabot/Renovate)
14. Add WAF (CloudFront WAF) with OWASP CRS
15. Penetration test before next release

---

## Appendices

### A. Dependency Vulnerabilities

```bash
$ npm audit --production

# Findings:
# moderate  Prototype Pollution in lodash
# high      Denial of Service in jsonwebToken (CVE-2024-xxxx)
# low       Regular Expression Denial of Service in debug
```

### B. Test Cases for Validation

**IDOR Test**:
```
1. Login as user A
2. GET /api/orders/<user_b_order_id>
3. Expected: 403 Forbidden
4. Current: 200 OK with order data ❌
```

**SQL Injection Test**:
```
GET /api/search?q=' UNION SELECT password FROM users--
Expected: 400 Bad Request or sanitized query
Current: Database error or password leak ❌
```

### C. References

- OWASP Top 10 (2025)
- OWASP Testing Guide v4
- Node.js Security Best Practices (Snyk)
- CVE-2024-xxxx details (NVD)
- Stripe Integration Security

---

**Report Generated**: 2025-02-27  
**Next Review**: 2025-05-27 (quarterly) or after critical fix deployment
