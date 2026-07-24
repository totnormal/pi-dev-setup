# Security Misconfiguration Reference

## Common Misconfigurations by Category

### Web Server

| Item | Secure Setting | Vulnerable Default |
|------|----------------|-------------------|
| Directory listing | `Options -Indexes` (Apache) / `autoindex off` (nginx) | Often enabled by default |
| Server tokens | `ServerTokens Prod` (Apache) / `server_tokens off;` (nginx) | `Server: Apache` reveals version |
| Default error pages | Custom error pages (no version info) | `404 Not Found` with server version |
| Unused modules | Disable `mod_php` if not using PHP | All modules enabled |
| HTTP methods | Disable PUT, DELETE, TRACE if not needed | All methods enabled |

### Cloud Infrastructure

| Item | Secure Setting | Common Vulnerability |
|------|----------------|---------------------|
| S3 buckets | Private by default, explicit public read where needed | `public-read` ACL accidentally set |
| Security groups | Deny all ingress, explicit allow | `0.0.0.0/0` on port 22, 3389 |
| IAM policies | Least privilege, specific actions | `*` (admin) permissions |
| Cloud metadata | Block access from instances unless needed | Unrestricted IMDS access |
| Default VPC | Delete or lock down | Open to internet |

### Application Framework

| Item | Secure Setting | Vulnerable |
|------|----------------|------------|
| Debug mode | `debug = false` in production | `debug = true` |
| Default admin | Changed password or disabled | `admin/admin` |
| Sample apps | Removed before production | `/examples/` accessible |
| Verbose logging | `WARN` or `ERROR` level | `DEBUG` in production |
| Health endpoints | Authenticated or IP-restricted | `/health` public (info leakage) |

### Container Security

| Item | Secure |
|------|--------|
| Base image | Minimal (alpine, distroless) not `ubuntu:latest` |
| User | Run as non-root (`USER node` not `USER root`) |
| Capabilities | Drop `NET_RAW`, `SYS_ADMIN` |
| Read-only filesystem | `--read-only` where possible |
| Secrets | Mounted via secret store, not `-e` or `Dockerfile` |

## Configuration Validation Checklist

### CI/CD Pipeline

- [ ] Secrets stored in vault, not in pipeline variables
- [ ] Protected branches require PR and code review
- [ ] Automated security scans in pipeline (SAST, SCA)
- [ ] Build artifacts signed before deployment
- [ ] Immutable deployments (no SSH changes post-deploy)

### Runtime Configuration

- [ ] Environment-specific configs (dev vs prod)
- [ ] Secrets from environment variables or secret manager
- [ ] No passwords/keys in config files committed to Git
- [ ] Feature flags with default deny for risky features
- [ ] Network timeouts configured (prevent hung connections)

### Monitoring Configuration

- [ ] Log levels appropriate (WARN/ERROR in prod)
- [ ] Logs aggregated centrally and retained
- [ ] Metrics and alerts configured
- [ ] Audit logging enabled for security events
- [ ] No sensitive data in logs (PII, tokens, passwords)

## Hardening Guides

### Linux Server

```bash
# Disable password SSH, use key only
PasswordAuthentication no
# Disable root login
PermitRootLogin no
# Limit users allowed
AllowUsers alice bob

# Firewall (ufw)
ufw default deny incoming
ufw allow 22/tcp  # SSH if needed
ufw allow 443/tcp # HTTPS
ufw enable
```

### PostgreSQL

```sql
-- Disable trust authentication
ALTER SYSTEM SET pg_hba.conf to use md5/scram-sha-256;

-- Disable remote connections if not needed
listen_addresses = 'localhost'

-- Encryption
ssl = on
ssl_cert_file = '/path/to/cert.pem'
```

## Testing for Misconfigurations

```bash
# Check HTTP headers
curl -I https://api.example.com

# Look for:
# - Server: Apache/2.4.41 (Ubuntu)  → Version disclosure
# - X-Powered-By: PHP/7.4.3       → Version disclosure
# Missing: Content-Security-Policy, X-Frame-Options, Strict-Transport-Security

# Check directory listing
curl https://example.com/uploads/  # Should return 403 or index.html, not file list

# Check TLS config
nmap --script ssl-enum-ciphers -p 443 example.com

# Check cloud storage (AWS)
aws s3api get-bucket-acl --bucket my-bucket  # Should not grant public
```

## Resources

- CIS Benchmarks (https://www.cisecurity.org/cis-benchmarks/)
- OWASP Secure Headers Project
- AWS Well-Architected Framework – Security Pillar
