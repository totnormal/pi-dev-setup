# OWASP Authentication Cheat Sheet (Abridged)

## Password Storage

✅ Use bcrypt, scrypt, or Argon2  
✅ Per-user salt automatically generated  
✅ Work factor: bcrypt cost ≥12, Argon2 memory ≥64MB  
❌ Do NOT use MD5, SHA1, or plain SHA256

## Session Management

✅ Session tokens: cryptographically random, 128+ bits entropy  
✅ Session expiration: 30 min idle, 24h absolute  
✅ Secure cookie flags: `HttpOnly`, `Secure`, `SameSite=Lax/Strict`  
✅ Regenerate session on privilege escalation (login → MFA success)  
❌ Do NOT put session token in URL

## MFA Implementation

✅ Offer TOTP (Google Authenticator) or WebAuthn (FIDO2)  
✅ MFA required for admin accounts and sensitive operations  
✅ Backup codes single-use, stored hashed  
❌ Do NOT use SMS OTP as sole factor (SIM swap vulnerable) – acceptable as second factor only

## Login Security

✅ Rate limiting: 5 attempts per 15 min per IP/user  
✅ Account lockout after 5 failed attempts (temporary, 15 min)  
✅ Log all login attempts (success/failure) with IP, user agent  
✅ Credential stuffing protection (credential hashes, IP reputation)  
✅ Password reset: token random (256-bit), single-use, 1h expiry

## Common Vulnerabilities

| Vulnerability | Fix |
|---------------|-----|
| Credential stuffing | Rate limit, MFA, breach password detection |
| Session fixation | Regenerate session on login |
| Weak password hash | Use bcrypt/argon2 with sufficient work factor |
| Session hijacking | Secure cookies, TLS everywhere, short expiry |
