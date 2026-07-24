# Authentication Security Reference

## Password Storage

| Method | Security | Notes |
|--------|----------|-------|
| bcrypt | ✅ Excellent | Cost factor 12+ |
| argon2 | ✅ Excellent | Memory-hard, modern |
| scrypt | ✅ Good | Memory-hard, slower |
| PBKDF2 | ⚠️ Acceptable | 310,000 iterations minimum |
| SHA256 + salt | ❌ Poor | Too fast, use bcrypt instead |
| MD5/SHA1 plaintext | ❌ Dangerous | Never use |

## Multi-Factor Authentication (MFA)

**TOTP** (Time-based One-Time Password): Google Authenticator, Authy
**WebAuthn** (FIDO2): Hardware keys (YubiKey), biometrics
**SMS OTP**: Less secure (SIM swap), better than nothing
**Push notifications**: User approval on device

**Implementation**: Require MFA for:
- Admin accounts
- Financial transactions
- Access to sensitive data (PII, health records)
- From new IP/device (step-up auth)

## Session Management

### Secure Cookie Attributes
```javascript
res.cookie('session', token, {
  httpOnly: true,   // Prevents XSS theft
  secure: true,     // HTTPS only
  sameSite: 'lax',  // CSRF protection
  maxAge: 24 * 60 * 60 * 1000  // 1 day
});
```

### Session Token Best Practices
- Cryptographically random (128+ bits entropy)
- Expire after inactivity (30 min)
- Absolute expiration (7 days)
- Regenerate on privilege elevation (login→MFA success)
- Invalidate on logout (server-side deletion)

## Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,  // 5 attempts per 15min per IP
  delayMs: 0  // No delay, hard block after limit
});
app.use('/login', loginLimiter);
```

**Additional limits**:
- Password reset: 3 per hour per account
- MFA attempts: 5 per 15min (lock account temporarily)
- API keys: 1000 requests/hour per key

## Credential Stuffing Defenses

1. **IP-based rate limiting** (per IP)
2. **Account-based rate limiting** (per username/email)
3. **IP+username combined** (prevent distributed attacks)
4. **Device fingerprinting** (browser/device cookies)
5. **CAPTCHA** after N failed attempts

## Brute Force Defenses

- Strong password policies (min 12 chars, complexity)
- Rate limiting on all auth endpoints
- Account lockout (temporary, 15min) after 5 failed attempts
- Progressive delays (increase wait time per failure)
- Notify user on suspicious login (new IP/device)

## Password Reset Security

**Vulnerable**:
- Predictable token: `Date.now().toString()`
- Token never expires
- No rate limiting → email bombing

**Secure**:
```javascript
const token = crypto.randomBytes(32).toString('hex');
// Store hash(token) in DB, not plaintext
// Expire after 1 hour
// Single-use
// Rate limited (3 per hour per account)
```

## Common Anti-Patterns

❌ Client-side password strength validation only
❌ Passwords in URLs or query strings
❌ Storing passwords in localStorage (XSS risk)
❌ Sending passwords in plaintext emails
❌ Logging passwords in application logs
❌ Password hint questions (mother's maiden name easily guessed)
❌ Default passwords (admin/admin) in production
❌ Same session token before and after login (session fixation)
