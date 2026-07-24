# Java / Spring Boot Security Checklist

## Build & Dependencies

- [ ] Maven/Gradle: Use OWASP Dependency Check plugin or Snyk in CI
- [ ] Pin dependency versions (no LATEST, no version ranges)
- [ ] No vulnerable dependencies (Log4j CVE-2021-44228 fixed – verify version)
- [ ] Detect secrets in repo: use gitleaks pre-commit hook

## Spring Security Configuration

- [ ] CSRF protection enabled (default in Spring Security)
- [ ] CORS with specific allowlist (not `*`)
- [ ] HTTPS enforced (`requiresChannel().https()`)
- [ ] Security headers: HSTS, CSP, X-Frame-Options, X-Content-Type-Options
- [ ] Session management: `HttpOnly`, `Secure`, `SameSite=Strict/Lax`
- [ ] Password encoder: `BCryptPasswordEncoder` with strength ≥12

## Authentication & Authorization

- [ ] All endpoints require authentication unless explicitly marked `permitAll()`
- [ ] Method-level security: `@PreAuthorize("hasRole('ADMIN')")` or `@Secured`
- [ ] Role hierarchy defined clearly; no role confusion
- [ ] MFA required for admin operations (integration with TOTP/WebAuthn)
- [ ] Account lockout after failed attempts (custom or use spring-security-oauth2-resource-server)
- [ ] Rate limiting on login endpoint (Bucket4j or gateway-level)

## Input Validation & Injection

- [ ] All JPQL/HQL queries parameterized (no string concatenation)
- [ ] Native queries: use `setParameter()`, never string concat
- [ ] Input validation on all request DTOs using `@NotNull`, `@Size`, `@Pattern`, `@Min`, `@Max`
- [ ] Use `@Valid` on `@RequestBody` to trigger validation
- [ ] Avoid `@RequestBody String rawBody` without validation

## Deserialization

- [ ] Avoid Java serialization (`ObjectInputStream`) with untrusted data
- [ ] If necessary, use `ObjectInputFilter` with strict allowlist
- [ ] JSON libraries (Jackson) safe by default – but watch for polymorphic typing pitfalls:
  - `@JsonTypeInfo` usage requires careful `JsonSubTypes` registration
  - Consider disabling default typing: `mapper.disableDefaultTyping()`

## Error Handling

- [ ] Generic error messages in production (no stack traces, SQL errors, internal paths)
- [ ] `ErrorMvcAutoConfiguration` or custom `@ControllerAdvice` to handle exceptions
- [ ] Log errors with context (request ID, user ID) but without PII

## Secrets & Configuration

- [ ] `application.properties` not committed with real secrets
- [ ] Use environment variables, Spring Cloud Config with Vault, or AWS Secrets Manager
- [ ] `spring.profiles.active=prod` sets secure defaults
- [ ] Encrypt sensitive properties with Jasypt if needed

## Logging

- [ ] `application.yml` sets logging level to WARN/ERROR in production
- [ ] Audit logging for security events: login, logout, permission changes
- [ ] No PII in logs (especially if custom `toString()` on entities)
- [ ] Consider `logback-access` for HTTP access logs

## OWASP Top 10 Quick Check

- **A01 Access Control**: `@PreAuthorize` on all endpoints; service layer also checks?
- **A02 Crypto Failures**: TLS 1.2+, passwords bcrypt, secrets in vault
- **A03 Injection**: Parameterized queries, input validation
- **A04 Insecure Design**: Threat modeling done? Business logic validated server-side?
- **A05 Misconfiguration**: `debug=false`, default credentials changed
- **A06 Vulnerable Components**: SCA in CI; no critical CVEs
- **A07 Authentication Failures**: MFA, rate limiting, secure session
- **A08 Data Integrity**: Code signing, serialization protection
- **A09 Logging Failures**: Audit logs enabled, centralized, no PII
- **A10 SSRF**: If app makes outbound requests, validate URLs, block private IPs

## Spring-Specific Tips

- Use `spring-security-oauth2-resource-server` for JWT validation
- `@JsonIgnore` on sensitive fields to prevent serialization leaks
- `HttpSessionEventPublisher` to detect session fixation attacks
- `SessionRegistry` to track concurrent sessions (prevent multiple logins)
- `DelegatingFilterProxy` or `OncePerRequestFilter` for custom security checks

## References

- OWASP Java Security Cheat Sheet
- Spring Security Reference (https://spring.io/projects/spring-security)
- OWASP ASVS (Application Security Verification Standard) – Level 2
