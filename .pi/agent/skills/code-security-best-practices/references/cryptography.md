# Cryptographic Security Reference

## Common Failure Patterns

### 1. Transmitting Secrets in Plaintext
- Using HTTP instead of HTTPS
- Including passwords/API keys in URLs (GET parameters)
- Unencrypted protocols (FTP, Telnet, SMTP without TLS)

### 2. Weak Hashing
- MD5, SHA1 for passwords or sensitive data
- No salt for password hashes
- Fast hash functions for passwords (SHA256)

### 3. Hardcoded Secrets
```javascript
// BAD: Secret in source
const API_KEY = "sk_live_123456";
const PASSWORD = "Admin@123";
```

### 4. Improper TLS Configuration
- SSLv2/SSLv3 enabled
- TLS 1.0/1.1 enabled (deprecated)
- Self-signed certs in production
- Certificate validation disabled: `rejectUnauthorized: false`

## Secure Patterns

### Password Storage
```javascript
// Use bcrypt (cost 12+) or argon2
const bcrypt = require('bcrypt');
const hash = await bcrypt.hash(password, 12);
const valid = await bcrypt.compare(input, hash);
```

### TLS Configuration
```javascript
const https = require('https');
const server = https.createServer({
  minVersion: 'TLSv1.2',
  ciphers: 'ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-GCM-SHA256',
  honorCipherOrder: true
}, app);
```

### Secrets Management
- Use environment variables (local) or secret manager (AWS Secrets Manager, HashiCorp Vault)
- Never commit secrets to Git
- Rotate keys periodically
- Encryption keys stored separately from encrypted data

### Encryption
- AES-256-GCM for symmetric encryption (provides confidentiality + integrity)
- RSA-2048 minimum for asymmetric (RSA-4096 recommended)
- Never roll your own crypto

## Quick Checklist

- [ ] TLS 1.2+ enforced, old protocols disabled
- [ ] Valid certificates (no self-signed in prod)
- [ ] No sensitive data in URLs
- [ ] Passwords: bcrypt/argon2, per-user salt
- [ ] No hardcoded secrets in code
- [ ] Secrets from environment variables or vault
- [ ] Data at rest encrypted (AES-256)
- [ ] Encryption keys managed separately
- [ ] IVs/nonces random and unique per encryption
- [ ] Authenticated encryption (GCM, CCM) preferred
