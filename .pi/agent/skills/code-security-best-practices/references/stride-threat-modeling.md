# STRIDE Threat Modeling Reference

STRIDE is a mnemonic for categorizing threat types. Use this guide during threat modeling sessions.

## STRIDE Categories

| Category | Question to Ask | Example Threats | Common Controls |
|----------|----------------|-----------------|-----------------|
| **Spoofing** | Can an attacker pretend to be something/someone? | Stolen credentials, JWT forging, DNS spoofing | MFA, certificate pinning, IP allowlisting |
| **Tampering** | Can an attacker modify data or code? | SQL injection, file upload malware, API param manipulation | Input validation, digital signatures, immutability |
| **Repudiation** | Can users deny their actions? | Deleted logs, forged timestamps, anonymous actions | Audit logging, signed logs, non-repudiation policies |
| **Information Disclosure** | Can data be exposed? | Data leaks, verbose errors, directory listing | Encryption, access controls, error handling |
| **Denial of Service** | Can service be disrupted? | Resource exhaustion, ReDoS, flood attacks | Rate limiting, circuit breakers, WAF |
| **Elevation of Privilege** | Can unauthorized access be gained? | Privilege escalation, admin access, sandbox escape | Least privilege, sandboxing, code signing |

---

## Per-Category Deep Dive

### Spoofing

**Threat Examples**:
- Attacker uses stolen credentials to access user account
- Attacker forges JWT token to gain admin privileges
- DNS cache poisoning redirects users to malicious site
- Email spoofing (phishing from fake sender)
- MAC/IP address spoofing bypasses network controls

**Controls**:
- Multi-factor authentication (MFA)
- Strong password policies
- Certificate pinning for mobile apps
- DNSSEC
- SPF/DKIM/DMARC for email
- Mutual TLS

### Tampering

**Threat Examples**:
- SQL injection modifies database queries
- Malicious file upload (web shell)
- API parameter manipulation (change price from $100 to $1)
- Client-side validation bypass (modify JavaScript)
- Man-in-the-middle modifies traffic

**Controls**:
- Input validation (allowlists)
- Parameterized queries/prepared statements
- Digital signatures for critical data
- Immutable infrastructure
- TLS for data in transit
- Hash verification for file uploads

### Repudiation

**Threat Examples**:
- User claims they didn't perform action because no proof
- Attacker deletes audit logs to cover tracks
- Timestamp manipulation to create alibi
- Anonymous actions with no user attribution

**Controls**:
- Comprehensive audit logging (who, what, when, where)
- Logs stored in write-once, read-many (WORM) storage
- Log entries cryptographically signed
- Unique user identifiers in all actions
- Non-repudiation through digital signatures

### Information Disclosure

**Threat Examples**:
- Sensitive data in error messages (stack traces, DB errors)
- Directory listing exposes source code
- Misconfigured S3 bucket publicly accessible
- Excessive data in API responses (includes PII not needed)
- Verbose debug logs in production

**Controls**:
- Principle of least privilege (access controls)
- Encryption at rest and in transit
- Generic error messages in production
- Data classification and handling policies
- Data loss prevention (DLP) tools
- Regular security scanning

### Denial of Service

**Threat Examples**:
- Flood attack overwhelms server capacity
- ReDoS (Regular Expression Denial of Service) with crafted input
- Resource exhaustion (memory, CPU, file handles)
- Distributed DoS from botnet
- Application-level exhaustion (create 10,000 user accounts)

**Controls**:
- Rate limiting per IP/user
- Auto-scaling infrastructure
- Resource quotas (max connections, request size)
- Circuit breakers
- WAF rules for known DoS patterns
- Request timeouts

### Elevation of Privilege

**Threat Examples**:
- User A accesses User B's data (horizontal escalation)
- Regular user gains admin privileges (vertical escalation)
- Sandbox escape (Chrome renderer → kernel)
- JWT manipulation to change role claim

**Controls**:
- Principle of least privilege
- Server-side authorization checks on every request
- Role-based access control (RBAC)
- Secure session management
- Regular privilege audits
- Code signing and integrity checks

---

## Using STRIDE in Threat Modeling

### Step 1: Identify Components and Data Flows

Create a Data Flow Diagram (DFD) showing:
- External entities (users, third-party APIs)
- Processes (application logic)
- Data stores (databases, file storage)
- Trust boundaries (where security changes)

### Step 2: Apply STRIDE to Each Element

For each trust boundary and data flow, ask STRIDE questions:

**On user → web server boundary**:
- Spoofing: Can attacker spoof user identity? (IP spoofing,Credential theft)
- Tampering: Can attacker modify request in transit? (MITM without TLS)
- ...
- Elevation of Privilege: Can attacker gain web server OS access? (RCE, shell upload)

**On web server → database**:
- Spoofing: Can attacker spoof DB identity? (connection string theft)
- Tampering: Can attacker modify queries? (SQL injection) ← HIGH
- ...

### Step 3: Document Threats in Table

| # | Component | Threat Type | Description | Likelihood | Impact | Mitigation | Owner |
|---|-----------|-------------|-------------|------------|--------|------------|-------|
| 1 | Login API | Spoofing | JWT algorithm=none attack | Medium | High | Enforce algorithm validation, use asymmetric keys | Team A |
| 2 | Upload API | Tampering | Malicious file upload with double extension | High | High | Validate file type via MIME, rename to UUID, store outside web root | Team B |

### Step 4: Prioritize and Act

Focus on High-Likelihood × High-Impact threats first. Assign owners and deadlines.

---

## STRIDE per Layer

| Layer | Typical Threats | Mitigation Focus |
|-------|-----------------|------------------|
| **Client** | Tampering (JS modification), Information Disclosure (browser storage) | Code signing, secure storage |
| **Network** | Spoofing, Tampering, Eavesdropping | TLS, VPN, firewalls, DNSSEC |
| **Server** | All six categories | Defense-in-depth |
| **Storage** | Tampering, Information Disclosure | Encryption, access controls |
| **Identity** | Spoofing, Repudiation | MFA, audit logging, certificates |

---

## Notes

- STRIDE is a brainstorming tool, not an exhaustive list
- Some threats span multiple categories (e.g., SQL injection is Tampering + Information Disclosure)
- Consider multiple trust boundaries: external users → load balancer → app server → DB → cache
- Update threat models for major changes (new feature, new integration)
- Review threat models annually or after security incidents
