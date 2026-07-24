# Logging and Monitoring Security Reference

## Why This Matters

Without proper logging and monitoring:
- Attacks go undetected for months (Mean Time to Detect 200+ days)
- No evidence for forensic analysis
- Cannot meet compliance requirements (PCI-DSS, HIPAA)
- Cannot trigger automated responses (alerts, blocks)

## What to Log

### Security-Relevant Events

**Authentication**:
- All login attempts (success/failure)
- Logout events
- Password reset requests
- MFA challenges and verifications
- Account lockouts

**Authorization**:
- Access control failures (403 responses)
- Privilege escalation attempts
- Access to sensitive resources (PII, admin panels)

**System**:
- Software installation/updates
- Configuration changes
- User account creation/deletion
- Firewall rule changes
- Certificate rotations

**Data**:
- Bulk data exports
- Failed decrypt operations
- File access (especially sensitive files)

### Log Structure

```json
{
  "timestamp": "2025-02-27T19:30:00.000Z",
  "level": "INFO",
  "event": "user.login",
  "userId": "user_123",
  "ip": "203.0.113.45",
  "userAgent": "Mozilla/5.0...",
  "requestId": "req_abc123",
  "success": true,
  "failureReason": null,
  "tenantId": "tenant_456"
}
```

**Key fields**:
- `timestamp`: UTC, ISO 8601
- `event`: short identifier (user.login, payment.failed)
- `userId`: unique user identifier (not IP alone)
- `ip`: client IP (use X-Forwarded-For if behind proxy, trust boundary!)
- `requestId`: trace ID across services
- `success`: boolean
- `context`: additional fields as needed

## What NOT to Log

- Passwords (plaintext or hashed)
- API keys, tokens, session IDs
- PII in logs (SSN, credit card, health data)
- Encryption keys
- Sensitive request bodies (credit card numbers)
- Anything requiring PCI-DSS/HIPAA compliance sanitization

If you must log sensitive data (for debugging), mask:
```javascript
// BEFORE logging
const logBody = maskSensitive(req.body);
logger.info('Request body', logBody);
```

## Centralized Logging Architecture

```
Application → stdout (JSON) → Fluentd/Fluent Bit → Log Storage (S3, GCS)
                                       ↓
                                  Indexing (Elasticsearch)
                                       ↓
                                   Dashboard (Kibana, Grafana)
                                       ↓
                                   Alerting (ElastAlert, Prometheus Alertmanager)
```

### Implementation in Node.js

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console()  // stdout for Docker/K8s
  ]
});

// In your app
logger.info('Payment processed', {
  userId: user.id,
  amount: payment.amount,
  paymentMethod: payment.methodType
});
```

## Alerting

### Critical Alerts (P0 – Page immediately)

- Multiple failed login attempts (potential credential stuffing)
- Successful login from new country/IP
- Admin role granted to user
- Encryption key rotation failure
- Database backup failure
- WAF block rate spike

### High Alerts (P1 – Respond within 1 hour)

- Single failed login from admin account
- Unusual data export volume
- File upload of executable to web-accessible directory
- SSL certificate expiring in <7 days

### Medium Alerts (P2 – Review daily)

- Service error rate >1%
- Disk usage >80%
- API response time >2s (p95)

## Alert Fatigue Prevention

- Rate limit alerts (no 1000 emails for same issue)
- Suppress known false positives during maintenance
- Use grouping (alert A and B suppressed if A triggers)
- Escalation chains (P0→SMS→page, P1→email)

## Compliance Requirements

### PCI-DSS

- Log all access to cardholder data
- Log all administrative actions
- Retain logs for ≥1 year (3 months immediately available)
- Protect logs from tampering (least privilege, WORM)

### HIPAA

- Audit controls: record/log access to ePHI
- Unique user identification
- Retention as required by organizational policy
- Regular review of logs

### SOC2

- Log all significant events
- Retain logs for sufficient period (typically 7 years)
- Periodic log review (automated or manual)
- Document log review procedures

## Monitoring Tools

| Category | Tools |
|----------|-------|
| Log aggregation | ELK Stack, Splunk, Datadog, Loki |
| Metrics | Prometheus, Graphite, Datadog |
| Alerting | ElastAlert, Prometheus Alertmanager, PagerDuty |
| SIEM | Wazuh, QRadar, Azure Sentinel |
| File integrity | OSSEC, Wazuh, Tripwire |

## Testing Your Monitoring

1. **Schedule regular log review**: Assign security on-call to review logs daily
2. **Red team exercises**: Simulate attacks, verify detection
3. **Canary alerts**: Send test alerts to validate escalation paths
4. **Log completeness audit**: Check that all security events are captured

## Checklist

- [ ] All authentication events logged (success/failure)
- [ ] Authorization failures logged with resource and user
- [ ] Privilege changes logged (role assignment, permission grant)
- [ ] Sensitive operations logged (password reset, data export)
- [ ] Logs include: timestamp, userId, IP, userAgent, requestId
- [ ] No sensitive data in logs (PII, credentials, tokens)
- [ ] Logs structured JSON (machine-parseable)
- [ ] Centralized log aggregation configured
- [ ] Log retention policy meets compliance (90 days min, 1+ years for PCI)
- [ ] Alerts configured for critical events
- [ ] Alert fatigue mitigation (rate limiting, grouping)
- [ ] Log integrity protected (immutable storage for critical logs)
- [ ] Unique request ID propagated across services
- [ ] Log sources tested regularly (red team, canary alerts)

## Common Gaps

- ❌ Logging success but not failures (only seeing 200s)
- ❌ Application logs not aggregated (each server isolated)
- ❌ No alerts on critical events (logs stored but never reviewed)
- ❌ Logging passwords/tokens (compliance violation)
- ❌ No time synchronization (NTP drift causes timestamp confusion)
- ❌ Logs stored on local disk (lost on server rebuild)
