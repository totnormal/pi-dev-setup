---
name: security-best-practices
disable-model-invocation: true
description: "Perform comprehensive threat modeling and security reviews using OWASP patterns, checklists, and industry standards. Use when the user requests: (1) threat modeling for an application/system, (2) security code review, (3) security architecture analysis, (4) vulnerability assessment, or (5) security checklist generation. Triggers: 'threat model', 'security review', 'vulnerability assessment', 'security audit'."
---

# Security Best Practices

This skill enables systematic threat modeling and security code reviews using OWASP methodologies, industry-standard checklists, and structured threat assessment frameworks.

## When to Use This Skill

Invoke this skill when the user requests:

- **Threat modeling** for new or existing applications
- **Security code reviews** with OWASP Top 10 focus
- **Architecture security analysis** and design reviews
- **Vulnerability assessments** and risk identification
- **Security checklist generation** tailored to the tech stack
- **Security control validation** and gap analysis
- **Compliance mapping** (PCI-DSS, SOC2, GDPR security requirements)

## Core Workflows

### 1. Threat Modeling Process

Follow this structured approach for all threat modeling requests:

**Step 1: Decompose the Application**
- Identify all components, data flows, and trust boundaries
- Document input/output points and external integrations
- Map data classification levels (public, internal, confidential, restricted)
- Create or obtain a data flow diagram (DFD)

**Step 2: Identify Threats Using STRIDE**
Apply the STRIDE mnemonic per component:

- **Spoofing**: Can an attacker pretend to be something/someone?
- **Tampering**: Can an attacker modify data or code?
- **Repudiation**: Can users deny their actions?
- **Information Disclosure**: Can data be exposed?
- **Denial of Service**: Can service be disrupted?
- **Elevation of Privilege**: Can unauthorized access be gained?

**Step 3: Assess and Prioritize**
- Rate each threat by **Likelihood** (High/Medium/Low)
- Rate each threat by **Impact** (High/Medium/Low)
- Calculate **Risk Score**: Likelihood × Impact
- Prioritize threats: High-High (Critical) → Low-Low (Informational)

**Step 4: Define Mitigations**
- Assign specific mitigation strategies per threat
- Document residual risks that cannot be mitigated
- Create actionable tasks with owners and deadlines

### 2. Security Code Review Process

Perform systematic code reviews using the OWASP Top 10 (2025 edition) as the baseline framework.

#### Review Methodology

**Phase 1: Automated Analysis First**
- Run static analysis tools (SAST)
- Check dependency vulnerabilities (SCA)
- Review secret scanning results

**Phase 2: Manual Code Inspection**
Focus on high-risk patterns per OWASP category:

**A01:2021 – Broken Access Control**
- Check for missing or improper authorization checks
- Verify principle of least privilege
- Test IDOR vulnerabilities: test parameter tampering
- Review CORS configuration: check `Access-Control-Allow-Origin`
- Confirm rate limiting on authentication endpoints

**A02:2021 – Cryptographic Failures**
- Verify TLS 1.2+ everywhere
- Check for hardcoded secrets, passwords, private keys
- Review encryption implementations (homegrown crypto → RED FLAG)
- Validate proper key management and rotation
- Ensure sensitive data at rest is encrypted (AES-256)

**A03:2021 – Injection**
- Search for string concatenation in SQL/queries
- Verify parameterized queries/prepared statements
- Check ORM usage: are raw queries avoided?
- Review NoSQL injection vectors (MongoDB `$where`, `$gt`)
- Validate input sanitization: is it context-appropriate?
- Test for command injection in system calls

**A04:2021 – Insecure Design**
- Check for missing business logic validation
- Verify threat modeling exists for new features
- Review architectural decisions for security implications
- Identify trust boundary violations

**A05:2021 – Security Misconfiguration**
- Check default credentials in production
- Verify unnecessary features/services are disabled
- Review error handling: do errors leak sensitive info?
- Confirm security headers present (HSTS, CSP, X-Frame-Options)
- Check verbose error messages in production

**A06:2021 – Vulnerable and Outdated Components**
- Run `npm audit`, `pip-audit`, `snyk test`, or equivalent
- Check for unpatched CVEs in dependencies
- Review dependency versions against CVE databases
- Assess third-party library security posture

**A07:2021 – Authentication Failures**
- Verify multi-factor authentication (MFA) for sensitive operations
- Check password policies (minimum length, complexity, rotation)
- Review credential storage: bcrypt/argon2, not MD5/SHA1
- Test for credential stuffing protections (rate limiting, account lockout)
- Validate session management: secure cookies, HttpOnly, SameSite
- Check for default admin accounts

**A08:2021 – Software and Data Integrity Failures**
- Verify CI/CD pipeline security (signed commits, protected branches)
- Check for deserialization vulnerabilities (XML, YAML, pickle)
- Review unsigned code/plugins in production
- Validate software supply chain integrity

**A09:2021 – Security Logging and Monitoring Failures**
- Confirm audit logging for security events
- Check log integrity (signed logs, centralized storage)
- Verify logging doesn't expose PII/secrets
- Review alerting on anomalous activities
- Test log retention and rotation policies

**A10:2021 – Server-Side Request Forgery (SSRF)**
- Validate user-supplied URLs before fetching
- Use allowlists for outbound destinations
- Block access to internal IP ranges (127.0.0.1, 10.0.0.0/8, 192.168.0.0/16)
- Disable HTTP redirects or validate redirect targets

#### Phase 3: Tech Stack-Specific Checks

Reference tech stack checklists in `references/tech-stack-checklist/` for framework-specific vulnerabilities.

**Phase 4: Report Generation**
- Create a structured report with evidence-based findings
- Include risk ratings (CVSS or custom scoring)
- Provide actionable remediation with code examples
- Rank by priority (Critical, High, Medium, Low, Info)
- Include positive findings to highlight good practices

### 3. Security Checklist Generation

Generate tailored checklists based on project characteristics.

**Input Parameters**:
- Tech stack (languages, frameworks, databases)
- Deployment environment (cloud provider, on-premise, hybrid)
- Compliance requirements (PCI-DSS, HIPAA, SOC2, GDPR)
- Data classification level

**Process**:
1. Parse user requirements or project configuration
2. Select applicable checklist items from `references/checklists/`
3. Customize based on identified tech stack
4. Output as markdown table or JSON for integration

## Reference Resources

The skill bundles comprehensive reference materials in `references/`:

- `owasp-top-10.md` – Detailed OWASP Top 10 (2025) with examples and defenses
- `stride-threat-modeling.md` – STRIDE methodology with per-category patterns
- `access-control.md` – Broken access control checklist and attack patterns
- `cryptography.md` – Cryptographic failure patterns and proper implementations
- `injection-prevention.md` – Injection vectors and parameterization techniques
- `authentication.md` – Authentication best practices and failure patterns
- `secure-design.md` – Insecure design patterns and secure architecture principles
- `misconfiguration.md` – Common misconfigurations per framework/cloud
- `ssrf.md` – Server-side request forgery detection and prevention
- `logging-monitoring.md` – Logging and monitoring requirements
- `tech-stack-checklist/` – Framework-specific security checklists (Node.js, React, Python, Java, Go, AWS, Azure, GCP)
- `owasp-cheatsheets/` – OWASP Cheat Sheet Series (abridged)
- `checklists/` – Comprehensive security checklists (API, microservices, container, mobile)
- `countermeasures.md` – Mapping of threats to specific mitigations
- `automated-tools.md` – Recommended SAST, SCA, DAST tools per language

### Examples Directory

See `examples/` for complete worked examples:

- `threat-model-ecommerce.md` – Full threat model for an e-commerce platform
- `threat-model-financial-app.md` – Threat model for a banking application
- `security-review-node-api.md` – Security code review of a Node.js REST API
- `security-review-react-app.md` – Security review of a React frontend
- `pressure-test-scenarios.md` – Simulated high-pressure security review scenarios

Use these examples as templates for similar tasks.

### Scripts Directory

- `validate-security.js` – Validation script for pressure testing security assumptions
  - Usage: `node scripts/validate-security.js --scenario <scenario-name>`
  - Tests response quality under pressure scenarios

## Output Standards

All threat models and security reviews must include:

1. **Structured format** with consistent headings
2. **Evidence-based findings** (code snippets, configuration excerpts, network traces)
3. **Risk ratings** with clear justification (CVSS or custom scoring)
4. **Remediation guidance** with specific code examples where applicable
5. **Priority ranking** (Critical/High/Medium/Low/Info)
6. **References** to OWASP, CVE, or other authoritative sources
7. **Positive findings** to acknowledge existing good practices
8. **Residual risk** documentation for accepted risks

## Conciseness and Token Efficiency

- Keep SKILL.md under 500 lines
- Load `references/` files only when needed for specific OWASP categories
- Prefer concise examples over verbose explanations
- Challenge each piece of information: "Does the agent really need this?"
- Move detailed schemas, full checklists, and extensive examples to reference files

## Validation and Testing

Before packaging or sharing this skill:

1. **Run the validation script**: `node scripts/validate-security.js --test-all`
2. **Check completeness**: All OWASP Top 10 categories covered, at least 3 threat model examples, at least 2 security review examples
3. **Verify reference integrity**: All referenced files exist and are readable
4. **Token efficiency review**: SKILL.md body under 10KB, no redundant information

## Pressure Testing Scenarios

The skill includes `examples/pressure-test-scenarios.md` with simulated high-stress situations to test the agent's ability to:

- Perform rapid threat assessment under time constraints
- Identify critical vulnerabilities with incomplete information
- Prioritize findings when overwhelmed by issues
- Communicate security risks to non-technical stakeholders
- Provide actionable remediation under pressure

Use these scenarios to validate the skill's real-world effectiveness.
