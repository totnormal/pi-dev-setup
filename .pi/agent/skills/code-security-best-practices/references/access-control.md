# Access Control Security Checklist

## Broken Access Control (A01:2021) – Comprehensive Guide

### Core Principles

1. **Principle of Least Privilege**: Users have only the minimum permissions needed
2. **Deny by Default**: Everything denied unless explicitly allowed
3. **Server-Side Enforcement**: Never trust client-side authorization
4. **Defense in Depth**: Multiple layers of access control

### Common Vulnerability Patterns

#### IDOR (Insecure Direct Object Reference)

**Vulnerable Pattern**:
```javascript
// User ID from URL, no ownership check
GET /api/orders/12345
```

**Fix**:
```javascript
// Ensure user owns the resource
const order = await Order.findOne({
  id: req.params.id,
  user_id: req.user.id  // Add ownership filter
});
```

#### JWT Manipulation

**Vulnerable**:
```json
{"sub": "user123", "role": "user"}
```
Attacker modifies to `"role": "admin"`.

**Fix**:
- Use asymmetric keys (RS256) to prevent token forgery
- Validate algorithm: reject tokens with `alg: none` or unexpected algorithms
- Store role in server-side session or database, not in JWT payload
- Or, use short-lived tokens with refresh rotation

#### Horizontal Privilege Escalation

User A accesses User B's data by changing identifier.

**Testing**: For every endpoint that accepts user-controlled ID, test:
- Change ID to another user's → should return 403/404
- Change ID to invalid format → should return 400
- Remove ID parameter → should return 400

#### Vertical Privilege Escalation

User gains admin privileges.

**Check**:
- Role checks on every admin endpoint
- Role stored server-side (not just in `req.user.role` from JWT)
- Admin routes in separate namespace with stricter middleware

### Access Control Checklist

#### General

- [ ] All API endpoints have server-side authorization checks
- [ ] Authorization is centralized (middleware) not scattered
- [ ] Ownership checks on every data access (not just list views)
- [ ] Default access is denied (no open endpoints by default)
- [ ] API rate limiting on sensitive operations
- [ ] Resource IDs are non-guessable (UUIDs, not sequential)
- [ ] CORS configured with specific allowlist, not `*`

#### Database Level

- [ ] Row-level security policies (PostgreSQL RLS) or equivalent
- [ ] Database user accounts have least privilege (read-only where possible)
- [ ] Stored procedures enforce business logic (optional defense layer)

#### API Level

- [ ] All endpoints verified: `GET /user/:id`, `POST /order/:id/edit`
- [ ] No user-controlled parameter in query without ownership filter
- [ ] GraphQL: field-level authorization (not just type-level)
- [ ] Bypassable menu items/sidebar links logged out (security through obscurity only)
- [ ] Admin routes prefixed `/admin/*` with stricter checks
- [ ] File uploads: validate user can only access their own files
- [ ] Search results filtered by user (prevent row queries)

#### Authentication vs Authorization

- [ ] Authentication (who you are) and authorization (what you can do) are separate steps
- [ ] Role/permission information stored server-side (session or DB)
- [ ] JWT role claim validated against server-side source of truth
- [ ] Permission changes take effect immediately (no stale JWT issues)

#### Special Cases

- [ ] Bulk operations: each item individually checked for ownership
- [ ] Wildcard/global operations: allow only for super-admins
- [ ] PII access: additional authorization checks (HIPAA compliance)
- [ ] Cross-tenant access: tenant ID included in all queries (multi-tenant)
- [ ] Password reset: token tied to user, no user_id in request body

#### Testing Checklist

- [ ] Test IDOR: change numeric IDs to access others' data
- [ ] Test UUID predictability: can UUID be guessed/bruteforced?
- [ ] Test parameter pollution: `?user_id=1&user_id=2` → which is used?
- [ ] Test path traversal: `/users/../../../etc/passwd`
- [ ] Test GraphQL: query fields you shouldn't have access to
- [ ] Test admin endpoint from non-admin account
- [ ] Test with expired/invalid JWT (should be 401, not 403)

#### Code Review Questions

For each endpoint:
1. Where does user identity come from? (session, JWT, API key)
2. How is authorization enforced? (middleware, inline checks)
3. Is ownership verified for data operations (not just listing)?
4. Are there any shortcuts like `if (user.isAdmin) skipCheck()`?
5. Are role/permission changes audited?
6. Can static files be accessed directly without auth (e.g., `/uploads/private.pdf`)?

#### OWASP ASVS Controls

- **V4 Access Control**: All access control rules enforced on server
- **V4.1**: Access control matrix implemented and tested
- **V4.2**: All user-controllable parameters tested for access control bypass
- **V4.3**: Separation of duties implemented where required
