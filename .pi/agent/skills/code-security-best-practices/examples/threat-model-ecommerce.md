# Threat Model: E-Commerce Platform

**Application**: Online store selling physical products  
**Date**: 2025-02-27  
**Reviewer**: Security Team  
**Scope**: Web frontend, REST API, PostgreSQL DB, payment processing

---

## 1. System Decomposition

### Components

| Component | Technology | Trust Boundary |
|-----------|------------|----------------|
| CDN (CloudFront) | AWS | External → CDN |
| Load Balancer | nginx | CDN → LB |
| Web Servers | Node.js/Express, React frontend | LB → App |
| API Servers | Node.js/Express | App → API |
| Database | PostgreSQL | API → DB |
| Payment Gateway | Stripe (external) | API → Stripe |
| Object Storage | S3 (product images) | App → S3 |
| Cache | Redis | API → Redis |

### Data Flows

```
User → HTTPS → CloudFront → Load Balancer → Express API → PostgreSQL
                                   ↓
                                   Redis (caching)
                                   ↓
                               Stripe (payments)
```

### Data Classification

- **Public**: Product catalog, prices, reviews
- **Internal**: User preferences, session data
- **Confidential**: PII (name, address, email, phone)
- **Restricted**: Payment data (credit cards – handled by Stripe only)

---

## 2. STRIDE Analysis

### Trust Boundary: External User → Application

| Threat Category | Threat | Likelihood | Impact | Risk | Mitigation |
|-----------------|--------|------------|--------|------|------------|
| **Spoofing** | Attacker uses stolen credentials | High | High | Critical | MFA for admin accounts; rate limiting on login; anomaly detection on new IP |
| **Tampering** | Parameter tampering (change price in cart) | High | High | Critical | Server-side price validation on checkout; immutable price snapshots |
| **Repudiation** | User claims they didn't place order | Medium | Medium | Medium | Audit log: capture user_id, IP, order details, timestamp; signed logs |
| **Info Disclosure** | Error messages leak PII (stack trace with email) | Medium | High | High | Generic error messages; logs sanitized; production error handler |
| **DoS** | Flood API with requests | High | Medium | High | Rate limiting per IP/user (100 req/min); auto-scaling |
| **Elevation of Priv** | Shoppers access admin interface | High | Critical | Critical | Role-based access control; admin routes prefixed `/admin/*` with `requireAdmin` middleware; session checks |

### Trust Boundary: API → Database

| Threat Category | Threat | Likelihood | Impact | Risk | Mitigation |
|-----------------|--------|------------|--------|------|------------|
| **Spoofing** | DB connection string stolen | Low | High | Medium | Credentials in AWS Secrets Manager; IAM roles for EC2 |
| **Tampering** | SQL injection via search | Medium | High | High | Parameterized queries; ORM; input validation |
| **Information Disclosure** | DB backup leaked to public S3 | Low | High | Medium | S3 bucket private by default; encryption at rest; bucket policies |
| **Elevation of Priv** | Read other users' orders (IDOR) | High | High | Critical | All queries filter by `user_id`; UUIDs instead of sequential IDs |

### Trust Boundary: API → Stripe (Payment Gateway)

| Threat Category | Threat | Likelihood | Impact | Risk | Mitigation |
|-----------------|--------|------------|--------|------|------------|
| **Spoofing** | Attacker submits forged payment confirmation | Medium | Critical | High | Server-side verification with Stripe API (don't trust client `payment_status`) |
| **Tampering** | Price manipulation before payment | High | Critical | Critical | Price calculated server-side from product catalog; order total validated against Stripe `payment_intent.amount` |
| **Repudiation** | User claims they paid less | Low | Medium | Low | Stripe webhook logs stored; order history immutable |
| **Information Disclosure** | Credit card data logged | Low | Critical | High | Never log card details; Stripe returns token only |
| **Elevation of Priv** | Access other users' order history | High | Medium | High | Ownership checks on all `/orders/:id` endpoints |

### Trust Boundary: API → Redis (Cache)

| Threat Category | Threat | Likelihood | Impact | Risk | Mitigation |
|-----------------|--------|------------|--------|------|------------|
| **Tampering** | Cache poisoning (malicious product data) | Medium | High | High | Cache keys prefixed with app identifier; validate cached data structure before use |
| **Information Disclosure** | Redis publicly accessible | Low | High | Medium | Redis in private subnet; security group restricts to app servers only; AUTH enabled |
| **DoS** | Redis DoS (maxmemory) | Medium | Medium | Medium | Memory limit configured; eviction policy `allkeys-lru` |

---

## 3. Critical Threats Summary

| # | Threat | Component | Risk | Mitigation Priority |
|---|--------|-----------|------|---------------------|
| 1 | Price manipulation (checkout) | API → Order | Critical | P0 – Fix immediately |
| 2 | IDOR on orders (access others' orders) | API → DB | Critical | P0 – Fix immediately |
| 3 | SQL injection on search endpoint | API → DB | High | P1 – Fix this sprint |
| 4 | Stripe payment confirmation spoofing | API → Stripe | High | P1 – Fix this sprint |
| 5 | Rate limiting missing on login | Auth | High | P1 – Implement now |
| 6 | Redis publicly accessible | Infrastructure | Medium | P2 – Next sprint |
| 7 | Error messages leak PII | API | High | P1 – 48 hours |

---

## 4. Recommended Controls

### Immediate (P0)

1. **Enforce ownership checks** on all user data endpoints:
```javascript
// ALL endpoints with :userId/:orderId must have:
const order = await Order.findOne({ id: req.params.id, userId: req.user.id });
if (!order) return 403;
```

2. **Server-side price validation**:
```javascript
const product = await Product.find({ id: cartItem.productId });
const total = product.currentPrice * cartItem.quantity;
// Compare with client-submitted total, reject if mismatch
```

3. **Verify Stripe payments server-side**:
```javascript
const paymentIntent = await stripe.paymentIntents.retrieve(clientSecret);
if (paymentIntent.amount !== expectedAmount) throw new Error('Amount mismatch');
```

### Near-term (P1)

4. **Add rate limiting** on auth endpoints (login, reset, MFA)
5. **Enable MFA** for admin accounts
6. **Audit logging** for sensitive operations (order placement, price changes, admin actions)
7. **Parameterize all SQL queries** – review code for string concatenation

### Medium-term (P2)

8. **Replace sequential IDs with UUIDs** (users, orders)
9. **Implement Redis AUTH** and network isolation
10. **Deploy WAF** (CloudFront WAF) with OWASP Core Rule Set
11. **Set up automated SAST/SCA** in CI/CD pipeline

---

## 5. Residual Risks

After implementing above mitigations, the following risks remain acceptable:

- **Insider threat** (DB admin accesses user data) – mitigated by audit logging, separation of duties, background checks
- **Compromised Stripe secret key** – mitigated by Stripe webhooks signature verification, key rotation capability
- **Zero-day in Node.js** – mitigated by rapid patching, WAF rules, intrusion detection

---

## 6. Action Items

| ID | Action | Owner | Due Date | Status |
|-----|--------|-------|----------|--------|
| TM-001 | Add `requireOwnership` middleware to all Order endpoints | Backend Team | 2025-03-05 | TODO |
| TM-002 | Implement server-side price validation at checkout | Backend Team | 2025-03-05 | TODO |
| TM-003 | Add Stripe payment verification before order confirmation | Payments Team | 2025-03-03 | TODO |
| TM-004 | Deploy rate limiting middleware to `/login`, `/reset` | DevOps | 2025-02-28 | TODO |
| TM-005 | Enable MFA for all admin users | Security | 2025-03-01 | TODO |
| TM-006 | Review codebase for SQL injection vulnerabilities | Backend Team | 2025-03-10 | TODO |
| TM-007 | Configure Redis AUTH and VPC isolation | DevOps | 2025-03-15 | TODO |

---

## 7. References

- OWASP Top 10 (2025)
- STRIDE threat modeling framework
- AWS Well-Architected Framework – Security Pillar
- Stripe Integration Security Guide

---

**Review Cycle**: Re-assess this threat model quarterly or after major architecture changes.
