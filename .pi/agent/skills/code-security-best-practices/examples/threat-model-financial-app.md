# Threat Model: Banking Mobile Application

**Application**: Mobile banking app (iOS/Android) with account management, transfers, payments  
**Date**: 2025-02-27  
**Reviewer**: Security Team  
**Scope**: Mobile clients, REST API, core banking system integration, push notifications

---

## 1. System Decomposition

### Components

| Component | Technology | Trust Boundary |
|-----------|------------|----------------|
| Mobile App | React Native (iOS/Android) | External → Device |
| API Gateway | AWS API Gateway | App → Gateway |
| Backend Services | Node.js (microservices) | Gateway → Services |
| Core Banking | Legacy COBOL system (via API) | Services → Core |
| Database | PostgreSQL, Redis | Services → DB/Cache |
| Push Notifications | Firebase Cloud Messaging (FCM)/APNs | Services → FCM/APNs |
| Biometric | Device Secure Enclave / TEE | App ↔ Device Biometric |

### Data Flows

```
Mobile App → HTTPS → API Gateway → Auth Service → Banking Service → Core System
                                    ↓
                                  Redis (session)
                                    ↓
                             FCM/APNs (notifications)
```

### Data Classification

- **Public**: App UI text, help articles
- **Internal**: User preferences, app config
- **Confidential**: Account numbers, balances, transaction history, personal details
- **Restricted**: SSN, full card numbers (handled by PCI-compliant provider)

---

## 2. STRIDE Analysis

### Mobile App ↔ API Gateway

| Threat | Category | Likelihood | Impact | Risk | Mitigation |
|--------|----------|------------|--------|------|------------|
| Tampered mobile app (modified APK/IPA) | Tampering | Medium | Critical | High | App attestation (Google Play Integrity, Apple DeviceCheck); pinning |
| Intercepted API calls | Tampering | High | High | Critical | Certificate pinning; TLS 1.3 |
| Stolen device with cached data | Info Disclosure | Medium | High | High | Local storage encryption (Keychain/Keystore); remote wipe |
| Replayed valid request | Repudiation | Medium | High | High | Nonce/timestamp validation on all requests |
| Biometric bypass | Spoofing | Medium | High | High | Biometric never alone – fallback to PIN/password |
| Malware on device reads memory | Tampering | Low | High | Medium | Jailbreak/root detection; app sandbox |

### API Gateway → Backend Services

| Threat | Category | Likelihood | Impact | Risk | Mitigation |
|--------|----------|------------|--------|------|------------|
| Stolen JWT (session token) | Spoofing | High | Critical | Critical | Short-lived tokens (5 min); refresh rotation; TLS |
| API key leakage in logs | Info Disclosure | Medium | High | High | Mask API keys; centralized logging sanitization |
| DDoS on API Gateway | DoS | High | Medium | High | Rate limiting per device/IP; AWS WAF |
| Privilege escalation via JWT | Elevation | Medium | Critical | High | Validate JWT signature; server-side session store for roles |

### Backend ↔ Core Banking System

| Threat | Category | Likelihood | Impact | Risk | Mitigation |
|--------|----------|------------|--------|------|------------|
| Unauthorized transfer request | Tampering | High | Critical | Critical | Transaction signing (HMAC with user secret); amount + recipient validation |
| Replay of transfer request | Repudiation | Medium | High | High | Idempotency key per transaction; atomic DB operation |
| Data corruption in core | Tampering | Low | Critical | High | Transaction validation at gateway; double-entry bookkeeping |
| Service unavailable | DoS | Medium | High | High | Circuit breaker; bulkhead; graceful degradation |

### Push Notifications

| Threat | Category | Likelihood | Impact | Risk | Mitigation |
|--------|----------|------------|--------|------|------------|
| Push notification interception | Info Disclosure | Low | High | Medium | End-to-end encryption; ephemeral content |
| Spoofed push (phishing) | Spoofing | Medium | Medium | Medium | Verify notification signature (APNs/FCM) |
| Notification spam | DoS | Medium | Low | Low | Rate limit notifications per user |

---

## 3. Critical Threats Summary

| # | Threat | Component | Risk | Priority |
|---|--------|-----------|------|----------|
| 1 | Transaction tampering (amount/recipient modification) | Banking Service | Critical | P0 |
| 2 | JWT theft/long-lived tokens | Auth Service | Critical | P0 |
| 3 | Mobile app reverse engineering/repackaging | Mobile App | High | P1 |
| 4 | Biometric bypass without fallback | Mobile App | High | P1 |
| 5 | Push notification spoofing (phishing) | Notifications | Medium | P2 |

---

## 4. Mobile-Specific Controls

### App Hardening
- Code obfuscation (ProGuard/R8 for Android, LLVM for iOS)
- Anti-tamper: runtime integrity checks (signature verification)
- Debug flag disabled in production
- Certificate pinning (public keys pinned in app)

### Data Storage
- Never store PII in `SharedPreferences`/`UserDefaults`; use encrypted storage (SQLCipher, Keychain, Keystore)
- Clear sensitive data from clipboard on app background
- Prevent screenshots on sensitive screens (bank balance)

### Authentication
- Biometric: stored in Secure Enclave/TEE, never leaves device
- Fallback to strong PIN (6+ digits) when biometric fails
- Device binding: register device fingerprint during enrollment
- Anomaly detection: new device requires secondary verification

### Network
- TLS 1.3 minimum; pinning to API Gateway certificate
- Reject self-signed certificates
- Use `networkSecurityConfig` (Android) / `NSAppTransportSecurity` (iOS) to restrict connections

---

## 5. Action Items

| ID | Action | Owner | Due |
|-----|--------|-------|-----|
| TM-MOB-001 | Implement certificate pinning in mobile app | Mobile Team | 2025-03-15 |
| TM-MOB-002 | Add HMAC transaction signing with user-provided secret | Backend Team | 2025-03-10 |
| TM-MOB-003 | Reduce JWT lifetime to 5 minutes, implement refresh rotation | Auth Team | 2025-03-05 |
| TM-MOB-004 | Enable app attestation (Play Integrity/DeviceCheck) | Mobile Team | 2025-03-20 |
| TM-MOB-005 | Validate all transfers server-side against user's lastknown account | Backend Team | 2025-03-01 |
| TM-MOB-006 | Add rate limiting at API Gateway per device fingerprint | DevOps | 2025-03-08 |

---

## 6. Compliance Notes

- **PCI-DSS**: Card data handled by Stripe/Braintree (tokenized). No PAN stored.
- **GDPR**: Right to erasure implemented; data encryption at rest; breach notification <72h
- **PSD2/SCA**: Strong customer authentication required (biometric+pin) for all payments

---

**Review Cycle**: Mobile threat models updated with each major app release or annually.
