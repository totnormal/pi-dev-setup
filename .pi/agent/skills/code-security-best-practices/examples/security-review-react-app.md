# Security Review: React Banking Dashboard

**Project**: Customer-facing banking dashboard  
**Tech Stack**: React 18, TypeScript, Material-UI, Redux Toolkit, React Query, Node.js backend  
**Review Date**: 2025-02-27  
**Scope**: Frontend security, API integration, client-side data handling

---

## Executive Summary

**Overall Risk**: **HIGH** – Multiple critical client-side data exposures and XSS vectors identified.  
**Critical Findings**: 2  
**High Findings**: 3  
**Medium Findings**: 5  

**Key Concerns**:
1. PII stored in Redux state indefinitely (XSS risk)
2. API keys exposed in client bundle
3. Lack of CSP enables XSS
4. Missing input sanitization on user-generated content
5. No rate limiting visible on login (should be backend, but confirm)

**Recommendation**: Fix critical issues before production deployment. Frontend security depends heavily on backend controls – ensure backend is also secure.

---

## Detailed Findings

### CRIT-001: Sensitive PII Stored in Redux State

**Severity**: **CRITICAL**  
**OWASP**: A07:2021 – Authentication Failures (also A01, A05)

**Vulnerable Code**:
```typescript
// store/slices/userSlice.ts
const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: {
      email: '',
      fullName: '',
      ssn: '',        // ← CRITICAL: SSN in client memory
      accountNumber: '',
      balance: 0
    } as UserData
  },
  reducers: { /* ... */ }
});
```

**Issue**: Full user object including SSN and account numbers stored in Redux, accessible to any JavaScript running on page (including malicious third-party scripts or XSS payloads). This violates "data minimization" and creates excessive PII exposure risk.

**Impact**: XSS vulnerability (even if minor elsewhere) becomes critical due to PII exposure. Insider threat (browser extensions) can read Redux state. State persisted to localStorage in some browsers (dev tools persist state across reloads).

**Recommendation**:
```typescript
// Store only non-sensitive identifiers in Redux
const userSlice = createSlice({
  initialState: {
    id: '',           // UUID only
    email: '',
    name: '',
    // NO ssn, no full account number, no balances (fetch on demand)
  }
});

// Fetch sensitive data on-demand from secure API endpoint
// with proper authorization each time
const { data: accountBalance } = useQuery({
  queryKey: ['balance'],
  queryFn: fetchBalance  // API call with auth header
});
```

**Owner**: Frontend Team  
**Due Date**: 2025-02-28  
**Status**: OPEN

---

### CRIT-002: Exposed API Keys in Client Bundle

**Severity**: **CRITICAL**  
**OWASP**: A02:2021 – Cryptographic Failures

**Vulnerable Code**:
```typescript
// config/api.ts
export const API_CONFIG = {
  STRIPE_PUBLIC_KEY: 'pk_live_51Mz...',  // OK, this is public key
  SENDGRID_API_KEY: 'SG.xxxxx',           // ← CRITICAL: Secret key in client!
  MAPS_API_KEY: 'AIzaSy...',              // OK
};

// Another file
const headers = { 'Authorization': `Bearer ${SENDGRID_API_KEY}` }; // Sent to backend but key exposed
```

**Issue**: Secret API keys (SendGrid, internal backend API keys) bundled into JavaScript accessible to everyone via DevTools → Network requests. Attacker can steal keys and abuse them (spam emails, access internal APIs).

**Impact**: Unlimited abuse of stolen admin keys, service charges (SendGrid), lateral movement into internal APIs.

**Recommendation**:
```typescript
// Remove all secrets from client code
// ✅ Only public-facing keys (Stripe public, Maps API key with HTTP referrer restriction)
// ❌ Never: SendGrid API key, backend admin API key, database connection string

// Move SendGrid calls to backend
// Frontend: POST /api/contact { message }
// Backend: uses SendGrid API key server-side, sends email
```

**Owner**: Frontend Team  
**Due Date**: 2025-02-28  
**Status**: OPEN

---

### HIGH-001: Missing Content Security Policy (CSP)

**Severity**: **HIGH**  
**OWASP**: A03:2021 – Injection (XSS)

**Issue**: No CSP header configured on server allowing inline scripts and eval(). Any XSS vulnerability becomes fully exploitable.

**Current** (DevTools > Network > Response Headers):
```
Content-Security-Policy: (none)
```

**Recommendation**:
```javascript
// Server (Express/Node.js backend)
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "https://cdn.jsdelivr.net"],  // Remove 'unsafe-inline', 'unsafe-eval'
    styleSrc: ["'self'", "'unsafe-inline'"],  // Material-UI may need inline styles; consider nonce
    imgSrc: ["'self'", "data:", "https:"],
    connectSrc: ["'self'", "https://api.example.com"]
  }
}));
```

For React apps using Material-UI with inline styles, use **nonce** or **strict-dynamic**:
```javascript
const nonce = crypto.randomBytes(16).toString('base64');
res.setHeader('Content-Security-Policy', `
  default-src 'self';
  script-src 'self' 'nonce-${nonce}';
  style-src 'self' 'unsafe-inline';
`);
```

React scripts inline in HTML (for hydration) need either `unsafe-inline` temporarily or use **nonce** (React 18 supports nonce prop).

**Owner**: DevOps / Backend  
**Due Date**: 2025-03-05  
**Status**: OPEN

---

### HIGH-002: Unsanitized User-Generated Content (Potential XSS)

**Severity**: **HIGH**  
**OWASP**: A03:2021 – Injection

**Vulnerable Code**:
```tsx
// components/Post.tsx
function Post({ content }: { content: string }) {
  return <div>{content}</div>;  // React escapes automatically ✅
}

// BUT:
function Comment({ html }: { html: string }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;  // ❌ No sanitization
}
```

**Issue**: `dangerouslySetInnerHTML` used without DOMPurify sanitization. If user-submitted HTML contains `<script>alert('xss')</script>`, it executes.

**Recommendation**:
```bash
npm install dompurify @types/dompurify
```
```tsx
import DOMPurify from 'dompurify';

function Comment({ html }: { html: string }) {
  const clean = DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}
```

**Owner**: Frontend Team  
**Due Date**: 2025-03-01  
**Status**: OPEN

---

### HIGH-003: Lack of Input Validation on Forms (Client-Side Only)

**Severity**: **HIGH**  
**OWASP**: A03:2021 – Injection

**Vulnerable**:
```tsx
// TransferForm.tsx
function TransferForm() {
  const [amount, setAmount] = useState('');
  const [toAccount, setToAccount] = useState('');

  const submit = async () => {
    await fetch('/api/transfer', {
      method: 'POST',
      body: JSON.stringify({ amount, toAccount })  // No validation before send
    });
  };
}
```

**Issue**: Client-side validation only (if any). Attacker can bypass by crafting API request directly (curl) or modifying JavaScript.

**Recommendation**:
1. Backend must validate all inputs (this is client reference file, but note: frontend validation for UX only)
2. Frontend validation with Zod/Yup for user experience
```typescript
import { z } from 'zod';

const transferSchema = z.object({
  amount: z.number().positive().max(10000),
  toAccount: z.string().uuid()  // Validate format
});
```

**Owner**: Frontend Team (but Backend must also validate)  
**Due Date**: 2025-03-05  
**Status**: OPEN

---

### MEDIUM-001: Sensitive Data in URL Query Params

**Severity**: **MEDIUM**  
**OWASP**: A02:2021 – Cryptographic Failures

**Vulnerable**:
```tsx
// Redirect after login
navigate(`/dashboard?token=${authToken}`);  // Token in URL!
```

**Issue**: Auth tokens in URL get logged in browser history, server logs, referrer headers when navigating away.

**Recommendation**:
- Use `location.replace` without query params after extracting
- Store tokens in `httpOnly` cookie or memory (React context)
- If token must be in URL (OAuth callback), consume immediately and redirect to clean URL

**Owner**: Frontend Team  
**Due Date**: 2025-03-10  
**Status**: OPEN

---

### MEDIUM-002: Missing `autocomplete="off"` on Sensitive Fields

**Severity**: **MEDIUM**  
**OWASP**: A07:2021 – Authentication Failures

**Issue**: Login form fields allow browser autocomplete; passwords stored in browser password manager (might be acceptable for usability) but also potentially accessible to malware on shared computers.

**Recommendation**:
```tsx
<input
  type="password"
  autoComplete="current-password"
  // Consider `autocomplete="off"` for high-security contexts
/>
```

Debate: Password managers recommended for security (unique passwords), so `autocomplete="on"` may be acceptable. Business policy should decide.

---

### MEDIUM-003: Third-Party Scripts Without Integrity Checks

**Severity**: **MEDIUM**  
**OWASP**: A06:2021 – Vulnerable Components

**Vulnerable**:
```html
<script src="https://cdn.jsdelivr.net/npm/moment@2.29.4/min/moment.min.js"></script>
<!-- No SRI, compromised CDN could inject malicious code -->
```

**Recommendation**: Use Subresource Integrity (SRI):
```html
<script src="https://cdn.jsdelivr.net/npm/moment@2.29.4/min/moment.min.js"
        integrity="sha384-...hash..."
        crossorigin="anonymous"></script>
```

Prefer npm packages bundled with webpack instead of CDN where possible.

---

## Positive Findings

✅ React auto-escaping prevents most XSS  
✅ TypeScript provides type safety (reduces some bugs)  
✅ Redux Toolkit state mutations prevented via Immer  
✅ HTTP-only cookies used for session (backend sets)  
✅ Strict CORS policy on backend (`Access-Control-Allow-Origin` specific)  
✅ HTTPS enforced at load balancer  

---

## Recommendations by Priority

### Immediate (48 hours)
1. Remove API keys from client bundle (CRIT-002)
2. Implement CSP header (HIGH-001)
3. Sanitize all `dangerouslySetInnerHTML` uses (HIGH-002)
4. Remove PII (SSN, full account numbers) from Redux state (CRIT-001)

### This Week
5. Add React Query for on-demand sensitive data fetching
6. Set up SRI for third-party scripts
7. Remove tokens from URL query strings
8. Client-side Zod validation for forms (UX, not security)

### Next Sprint
9. Penetration test focused on XSS and data exposure
10. Implement CSP nonce properly with React 18 nonce prop
11. Add automated dependency scanning in CI/CD

---

## Backend Dependencies

Frontend security is only as strong as backend. Verify:

- ✅ Rate limiting on all auth endpoints (login, transfer, account-query)
- ✅ All sensitive operations require authorization (RBAC)
- ✅ CORS configured properly (not `*` with credentials)
- ✅ API validates all inputs server-side
- ✅ JWT tokens short-lived (5-15 minutes) with refresh rotation
- ✅ HTTPS enforced on API
- ✅ Audit logging for critical operations

---

**Report Generated**: 2025-02-27  
**Next Review**: 2025-05-27 (post-mitigation)
