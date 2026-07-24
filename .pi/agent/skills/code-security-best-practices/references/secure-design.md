# Secure Design Principles Reference

## Core Principles

### 1. Least Privilege
Grant minimum permissions necessary. Apply to:
- User roles and permissions
- Database accounts
- API keys and service accounts
- Network access (firewall rules)

### 2. Defense in Depth
Multiple security layers so if one fails, others remain:
- Network firewall → Host firewall → Application auth → Database auth
- Client validation → Server validation → Database constraints

### 3. Fail Securely
When failures occur:
- Default to deny (not allow)
- Clean up partial state (transaction rollback)
- Log the failure with context
- Return generic error to user (no stack traces)

### 4. Don't Trust Client-Side
Client can be modified:
- Never trust price from client – re-fetch from DB
- Never trust user role – verify server-side
- Client-side validation for UX only, always re-validate server-side

### 5. Principle of Least Astonishment
Code should behave as other developers expect:
- Security checks visible, not hidden
- Failures obvious (throw exceptions, not silent returns)
- Follow conventions of the framework/language

## Insecure Design Patterns (Anti-Patterns)

### 1. Missing Threat Modeling
- Feature built without security review
- No STRIDE analysis
- Result: security as afterthought

### 2. Trusting Inputs Without Validation
- Assuming clients send valid data types
- No range checks, length checks, format validation

### 3. Business Logic in Frontend Only
- Price validation only in JavaScript
- Workflow state only in UI (can be bypassed)

### 4. Race Conditions
- Check-then-act without atomicity:
  ```javascript
  // BAD
  if (balance > amount) { await setBalance(balance - amount); }
  // Race: two concurrent requests both pass check
  ```
- **Solution**: Atomic operations, database constraints, locks

### 5. Magic Values
- Hardcoded URLs, credentials, thresholds
- **Solution**: Configuration with validation

### 6. Overly Complex Security
- Custom crypto, homegrown auth
- Complex RBAC matrix no one understands
- **Solution**: Use battle-tested libraries and simple models

## Secure Design Checklist

### Architectural Review

- [ ] Threat modeling conducted for new features/architecture
- [ ] Trust boundaries identified (external→internal, user→admin)
- [ ] Data classification performed (PII, confidential, public)
- [ ] Security controls mapped to each data classification
- [ ] Principle of least privilege applied at all layers
- [ ] Defense in depth implemented (multiple controls)
- [ ] Fail-secure defaults configured
- [ ] Security considerations documented in ADRs

### Data Flow Validation

- [ ] All inputs validated (type, length, format, range)
- [ ] All outputs encoded for target context (HTML, SQL, JS, URL)
- [ ] Data integrity checks (hashes, signatures) for critical data
- [ ] Sensitive data never logged or exposed in errors
- [ ] Data at rest encrypted (PII, payment info, credentials)

### Business Logic Security

- [ ] Critical operations idempotent (prevent double-spend)
- [ ] State transitions validated (cannot go from "paid" back to "pending")
- [ ] Time-based checks (expiration, rate limits) use server time
- [ ] Concurrent operations safe (atomic, optimistic locking)
- [ ] Financial calculations done server-side, never trust client

### Authentication & Authorization

- [ ] Authentication precedes authorization on protected routes
- [ ] Authorization checks on every request (not just UI hiding)
- [ ] Role/permission changes take effect immediately
- [ ] Privilege escalation requires re-authentication
- [ ] Session tokens random, server-side validation, expiration

### Error Handling

- [ ] Errors logged with context (request ID, user ID)
- [ ] Errors returned to user are generic (no stack traces, DB errors)
- [ ] All exceptions caught at boundary and handled appropriately
- [ ] No sensitive data in error messages (PII, secrets, paths)

### Supply Chain

- [ ] Dependencies from trusted sources only
- [ ] Dependency versions pinned (no caret/tilde)
- [ ] SCA tool integrated in CI/CD
- [ ] SBOM maintained and updated
- [ ] Build pipeline secured (signed commits, protected branches)

## Design Patterns for Security

### Guard Clause
```javascript
function updateProfile(userId, data) {
  if (!data.name || data.name.length > 100) {
    throw new Error('Invalid name');  // Early exit on invalid input
  }
  // ... rest of function assumes valid input
}
```

### Fail-Fast
Validate inputs at boundaries (API entry point, not deep in service).

### Immutable Objects
```javascript
// Objects can't be modified after creation, prevents accidental mutation
const user = Object.freeze({ id: 1, name: 'Alice' });
```

### Chain of Responsibility
Multiple authz checks in sequence:
```javascript
app.use('/admin', checkIPWhitelist, checkMFAPassed, checkIsAdmin);
```

### Decorator Pattern
Wrap existing functions with security checks without modifying them:
```javascript
const requireAdmin = (handler) => async (req, res) => {
  if (!req.user.isAdmin) return 403;
  return handler(req, res);
};
app.get('/admin', requireAdmin, adminHandler);
```

## Questions for Design Review

1. What happens if an attacker provides malformed input? Injected payload?
2. What if two requests happen simultaneously? Race condition?
3. What if the clock is wrong? (Time-based checks)
4. What if a dependency is compromised? (Supply chain)
5. What if an attacker gains read-only access to database? (Data exposure)
6. What if session token is stolen? (Session hijacking)
7. What if the service is overwhelmed? (DoS)
8. What if an internal user abuses privileged access? (Insider threat)
9. How are secrets rotated if compromised?
10. How would we detect if this was attacked? (Logging, monitoring)

## References

- See `references/owasp-top-10.md` for OWASP Top 10 mapping
- See `references/threat-modeling.md` for STRIDE methodology
- See `examples/` for complete design reviews
