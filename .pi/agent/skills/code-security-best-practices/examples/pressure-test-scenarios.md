# Pressure Test Scenarios for Security Reviews

These scenarios simulate high-stress situations where the agent must rapidly identify critical security issues with limited information. Use these to validate the skill's effectiveness under pressure.

---

## Scenario 1: Production Breach Response

**Context**: You're paged at 2 AM. Production database was accessed by unauthorized IP `185.220.101.xxx`. Credit card numbers may have been exfiltrated. CEO demands immediate assessment and remediation plan within 2 hours.

**Available Information**:
- Log snippet: `185.220.101.xxx accessed /api/orders/12345, /api/orders/12346, /api/orders/12347` (totally 1,200 orders in 10 minutes)
- Application uses JWT authentication
- API endpoints: GET /api/orders/:orderId

**Task**: Determine attack vector, assess scope, recommend immediate containment steps.

**Expected Output**:
1. Quick diagnosis: IDOR vulnerability (attacker accessed multiple orders sequentially)
2. Immediate containment: disable all API keys/credentials used in app, check logs for data exfiltration, block IP in WAF
3. Forensic: Search logs for all accesses by that IP, identify if data was downloaded
4. Communication plan: notify affected customers (PII exposure), payment processor (PCI-DSS breach notification)
5. Fix plan: Deploy `requireOwnership` middleware fix within hours

---

## Scenario 2: Executive Dashboard Security Review

**Context**: CTO asks for quick security review of a new executive dashboard built in 2 weeks. The dashboard displays employee salaries, PII, and company financials. You have 30 minutes to review code before demo to board.

**Available Information**:
- Codebase: 5 files, ~1,000 lines total
- Frontend: React with Redux state storing `employeeData` including salaries
- Backend: GET /api/employees/:id returns full employee record
- Authentication: Basic Auth with company email/password (no MFA)
- Route: Admin-only route `/admin/dashboard` with client-side check `if (user.role === 'admin')`

**Task**: Identify critical issues that could lead to data breach or unauthorized access.

**Expected Output**:
1. **Critical**: IDOR on `/api/employees/:id` – any authenticated user can access any employee by ID
2. **Critical**: Admin route relies solely on client-side check (anyone can navigate directly)
3. **High**: Basic Auth (no MFA) for admin dashboard
4. **High**: Redux state stores PII in plaintext in browser memory (XSS risk)
5. **Immediate actions**: Block admin route until fix, add server-side role check, require MFA, clear sensitive data from Redux
6. Business impact: Any employee could view executive salaries

---

## Scenario 3: Emergency Security Audit (Auditor Arrives Today)

**Context**: Company is being audited for SOC2 compliance tomorrow. External auditor will review your security posture. You need to quickly assess and document the following: authentication controls, access reviews, encryption, logging. Last-minute discovery: development team used `console.log` to log all API requests including full user objects (with emails, addresses) to shared log file.

**Available Information**:
- Infrastructure: AWS, microservices (10 services), PostgreSQL RDS, Redis ElastiCache
- Logging: Application logs to CloudWatch, no centralized aggregation
- Authentication: OAuth2 with SSO (Okta)
- Access: IAM roles per service, but no regular access reviews

**Task**: Compile SOC2 compliance gaps with remediation plan.

**Expected Output**:
1. **Logging Gap**: PII in application logs violates privacy principle – immediate fix: remove PII from logs, implement log sanitization middleware
2. **Access Review Gap**: No quarterly access reviews – recommend automated access review process
3. **Encryption**: Database encryption at rest? Verify RDS encryption enabled
4. **Monitoring**: No SIEM – recommend CloudWatch + GuardDuty + EventBridge alerts
5. Report structure: SOC2 Trust Services Criteria mapping (Security, Availability, Confidentiality)

---

## Scenario 4: Incident Response – Suspected Ransomware

**Context**: Server generates ransom note: "Your data encrypted. Pay 10 BTC." You discover unpatched CVE-2024-xxxx in Apache (RCE) and unencrypted backups. 3 servers affected. Critical business operations down.

**Available Information**:
- Servers: Ubuntu 20.04, Apache 2.4.41 (vulnerable)
- Backups: Daily to NFS share, no encryption
- Network: Single firewall, all servers in same subnet
- Access logs: POST /upload.php from unknown IP

**Task**: Containment, eradication, recovery plan. Prioritize actions.

**Expected Output**:
1. **Contain immediately**: Isolate affected servers (network isolation), block malicious IP, firewall off backup NFS (prevent crypto virus spread)
2. **Assess**: Check if backups infected – likely yes since unencrypted and network accessible
3. **Restore**: Restore from backup from before infection date; verify backup integrity
4. **Remediate**: Apply Apache patch CVE-2024-xxxx, remove vulnerable upload.php
5. **Prevent future**: Encrypt backups (at rest + in transit), network segmentation, host-based firewalls, EDR tool
6. **Communication**: Notify stakeholders, consider legal notification requirements (data breach if customer data exfiltrated)

---

## Scenario 5: Rapid Security Assessment Before Investor Demo

**Context**: Startup demoing to VCs in 4 hours. Demo shows new AI feature processing user data. Last night, engineer pushed code with API key committed to Git. You need to assess impact and decide: proceed with demo or postpone?

**Available Information**:
- Code: `const OPENAI_API_KEY = "sk-openai-xxxxxxxx"` committed to public GitHub repo
- API used for inference, called server-side
- Key exposed 12 hours ago (committed 10pm, discovered 10am)
- Cloudflare logs show requests from attacker IPs to your endpoint `/api/ai`
- OpenAI dashboard: Key made 50 calls in last hour (normal usage ~100/day)

**Task**: Assess risk, determine if demo safe, recommend remediation steps.

**Expected Output**:
1. **Risk**: API key exposed, active abuse occurs (50 calls from suspicious IPs) – attacker has access to your OpenAI account, could run up charges, access prompts/data
2. **Immediate**: Rotate OpenAI API key immediately (invalidate old key)
3. **Demo safety**: If you rotate key now and deploy fix (key to env), demo can proceed safely in 4 hours
4. **Scope**: Did attacker access customer data? Check if any PII passed through AI endpoint in logs – if yes, potential data breach
5. **Process fix**: Implement pre-commit hook to scan for secrets, move all keys to vault

---

## Scenario 6: Code Review Under Time Pressure

**Context**: Developer submits PR 30 minutes before release deadline. You're assigned to review. The PR adds payment webhook handling. Code is 200 lines.

**Available Information**:
```javascript
// webhook.js
app.post('/webhook/stripe', express.raw(), (req, res) => {
  const sig = req.headers['stripe-signature'];
  const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_SECRET);  // ⚠️ secret from env
  
  if (event.type === 'payment_intent.succeeded') {
    const payment = event.data.object;
    // Update order status
    db.orders.update({ status: 'paid' }, { where: { stripeId: payment.id } });
  }
  
  res.send(200);
});
```

**Task**: Identify security issues in this 10-minute review.

**Expected Output** (within 5 minutes):
1. **Missing signature verification on POST endpoint** – endpoint accepts any content-type, should verify `sig` against known webhook secret
2. **No idempotency check** – replay attack: same webhook delivered twice → double fulfillment
3. **No rate limiting** – attacker can flood webhook endpoint
4. **Missing authentication** – webhook endpoint should be authenticated (Stripe signs with secret, but consider additional check)
5. **Recommendation**: Use Stripe's webhook library properly; add idempotency key storage; rate limit per Stripe event type

---

## Scenario 7: Third-Party Library Emergency

**Context**: Alert: `log4j` CVE-2024-xxxx discovered (critical RCE). Your system uses `log4j` indirectly through `some-logging-library` (transitive dependency). You have 4 hours to assess impact and patch or mitigate.

**Available Information**:
- Dependency tree: your-app → winston → node-log4j → log4j (vulnerable)
- Version: log4j 2.17.0 (affected before 2.17.1)
- Production servers internet-facing, running in Docker

**Task**: Determine exploitability, identify mitigations, decide if downtime needed.

**Expected Output**:
1. **Impact**: RCE via log4j JNDI lookup if untrusted input logged (attacker-controlled user-agent could trigger)
2. **Mitigate immediately**:
   - Set JVM option: `-Dlog4j2.formatMsgNoLookups=true` (if using Java app, but this is Node – different)
   - For Node, check if node-log4j uses Java log4j? Probably not – clarify Node vs Java ecosystem
   - Actually: If Node dependency, likely node-log4j is pure JS, not vulnerable; verify which package actually pulls in Java log4j JAR
3. **Decision**: If pure JS logging library, likely safe; if Docker image includes Java service somewhere, patch that
4. **Communicate**: Document assessment, even if false alarm – show due diligence
5. **Long-term**: Implement SCA tool to catch these earlier, SBOM maintenance

---

## Scenario 8: Customer Data Breach Notification Deadline

**Context**: Legal team: GDPR requires notification within 72 hours of data breach affecting EU citizens. You discover misconfigured S3 bucket `company-backups-2024` with PII (names, emails, phone numbers) was publicly readable for 2 weeks. It's now secured. Estimate 5,000 EU users affected.

**Available Information**:
- Bucket ACL: `public-read` on `backups/` folder
- Files: CSV dumps from database (unencrypted)
- CloudTrail logs: Show GET requests from IP `45.xxx.xxx.xxx` (unknown) accessed files 3 days ago
- No way to know exactly which files downloaded because bucket access logging was disabled

**Task**: Prepare breach notification report (what happened, scope, impact, remediation).

**Expected Output**:
1. **Incident Summary**: Misconfigured S3 bucket with PII publicly accessible for 2 weeks. Unauthorized access confirmed from external IP.
2. **Data Involved**: Customer PII (name, email, phone). No financial data or passwords (stored elsewhere).
3. **Scope**: 5,000 EU customers affected (GDPR applies)
4. **Notification Plan**:
   - Notify DPA (Data Protection Authority) within 72 hours
   - Notify affected customers (email + website notice)
   - Offer credit monitoring (goodwill)
5. **Remediation**: Bucket secured (ACL private, access logging enabled, encryption at rest), implement automated bucket configuration scanning (AWS Config rule), regular bucket audit
6. **Root Cause**: Manual bucket creation without Terraform/CloudFormation, missed `public-read` flag

---

## Scenario 9: Social Engineering Attack Simulation

**Context**: Red team successfully obtained developer credentials via phishing. They accessed your Git repository and created a PR that introduces backdoor. The PR was approved by another developer who missed the malicious change. You're reviewing all PRs in last 24 hours and found it.

**Available Information**:
- PR titled "Fix login bug – urgent"
- Changes: Added `require('child_process').exec(userInput);` in `routes/utilities.js`
- Code review comments: "Looks good to me" from senior dev (PR auto-approved after 1 review)
- Commit author: `junior-dev@company.com` (junior dev out sick today)

**Task**: Assess threat, containment steps, process improvements to prevent recurrence.

**Expected Output**:
1. **Severity**: Critical – RCE via command injection in utility route
2. **Contain**: Revert PR immediately, revoke compromised credential, force password reset for all devs (phishing likely widespread)
3. **Forensic**: Check Git history for other malicious commits, check for other backdoors
4. **Process**:
   - Require 2 reviews for all PRs (currently 1 is allowed)
   - Add automated code scanning (SAST) to flag `exec(userInput)`
   - Enforce CODEOWNERS with senior review for security-sensitive files
   - Security awareness training (phishing simulation)
5. **Monitor**: Review server logs for suspicious activity since PR merge (commands executed)

---

## Scenario 10: Rapid API Assessment (5-Minute Read)

**Context**: You're in a vendor review meeting. Vendor claims their API is "very secure." They provided a 50-line code snippet. You have 5 minutes before meeting resumes to assess if it's secure.

**Available Information** (vendor code):
```javascript
app.post('/api/process', async (req, res) => {
  const { data } = req.body;
  const result = await processData(data);  // What does processData do? Unknown.
  const query = `SELECT * FROM items WHERE id = '${data.itemId}'`;  // ⚠️
  await db.query(query);
  res.json({ result });
});
```

**Task**: Quick red flags? Recommend no-go or proceed?

**Expected Output** (within 3 minutes):
1. **SQL injection** – immediate red flag. Walk away.
2. **No input validation** on `data` or `data.itemId`
3. **No error handling** – stack traces in response (info leak)
4. **No authentication/authorization** – endpoint appears public
5. **Recommendation**: Do NOT proceed with vendor. Security posture unacceptable.

---

## Scoring Pressure Performance

The skill should demonstrate:

| Criterion | Excellent | Acceptable | Poor |
|-----------|-----------|------------|------|
| **Time to critical finding** | <30 seconds | 1-2 minutes | >5 minutes |
| **Prioritization** | Critical risks first, explicit severity | Moderate prioritization | Misses critical |
| **Actionable remediation** | Specific code changes, not vague | General guidance | No solution |
| **Business impact communication** | Clear to non-technical execs | Technical with some business context | Only technical |
| **Compliance awareness** | Maps to GDPR, PCI-DSS, SOC2 as needed | Some compliance references | None |
| **False positive rate** | Low – issues are real | Some false alarms | Many false alarms |

Use these scenarios to test the skill's performance under realistic pressure constraints.

## Scenario 9: Code Review Under Pressure

**Context**: Senior dev just submitted a PR with a critical bug 1 hour before release. You have 10 minutes to review this 300-line change that adds admin user management.

**Available Information**:
```python
# admin/users.py (new file)
@api.route('/admin/users', methods=['POST'])
@require_admin  # Custom decorator
def create_user():
    data = request.get_json()
    user = User(**data)  # Mass assignment
    db.session.add(user)
    db.session.commit()
    return jsonify(user.to_dict()), 201
```

**Task**: Spot vulnerabilities rapidly.

**Expected Output**:
1. **Mass Assignment** – User can set `is_admin=True`, `password_hash` directly
2. Missing input validation – any JSON fields accepted, including `password`, `role`
3. Should use explicit allowlist: `allowed = ['email', 'name', 'phone']`
4. Rate limiting missing on admin endpoint
5. No audit log of user creation
6. Recommendation: Use schema (Pydantic/Marshmallow) with explicit fields; add admin-only auth check (verify current user is admin server-side not just decorator); rate limit; audit log.

---

## Scenario 10: Rapid API Assessment

**Context**: You're evaluating a third-party vendor's API for a potential partnership. They provided a 50-line code snippet. You have 5 minutes to decide if it's secure.

**Available Information**:
```javascript
app.post('/webhook', (req, res) => {
  const event = JSON.parse(req.body);
  processEvent(event);  // What does processEvent do? Unknown
  res.send(200);
});
```

**Task**: Quick red flags?

**Expected Output**:
1. No authentication – endpoint public, anyone can send events
2. No validation of `req.body` – malformed JSON could crash
3. No rate limiting – can flood endpoint
4. No signature verification if this is a payment/stripe webhook (should verify Stripe-Signature header)
5. Decision: **Reject vendor** – security posture unacceptable.
