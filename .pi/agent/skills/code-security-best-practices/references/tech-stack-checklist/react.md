# React / Frontend Security Checklist

## XSS Prevention

- [ ] All user-generated content rendered with `{...}` not `dangerouslySetInnerHTML`
- [ ] If using `dangerouslySetInnerHTML`, sanitize with DOMPurify first
```javascript
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />
```
- [ ] Avoid `eval()`, `new Function()`, `setTimeout(string)` in code
- [ ] React's escaping is automatic for JSX text: `<div>{userInput}</div>` is SAFE
- [ ] Attribute values: `<img src={userInput} />` is SAFE (React prevents javascript: URLs)

## State Management

- [ ] Sensitive data (auth tokens, PII) NOT stored in localStorage (XSS risk)
- [ ] Use `httpOnly` cookies for session tokens
- [ ] State data cleared on logout
- [ ] Redux: never store passwords/tokens in plain state

## API Communication

- [ ] All API requests authenticated with Authorization header or secure cookie
- [ ] CSRF tokens for cookie-based auth (or use SameSite cookies)
- [ ] API keys NOT embedded in client bundle (moved to backend proxy)
- [ ] Environment variables for public API endpoints only (never secrets)

## Dependency Security

- [ ] `npm audit` or `yarn audit` clean before merge
- [ ] No vulnerable versions (check Snyk, npm audit)
- [ ] Prefer official packages (`@mui/material` not `material-ui`)
- [ ] Check package downloads and maintenance status before adding

## Build & Deployment

- [ ] Production build: `npm run build` (not dev server)
- [ ] Source maps disabled in production (or protected)
- [ ] CSP header configured: default-src 'self'
- [ ] No `.env` files bundled into build (only `.env.production` with non-sensitive vars)

## Third-Party Components

- [ ] Review libraries before adding (are they maintained? any vulnerabilities?)
- [ ] Upgraded regularly (Snyk/renovate helps)
- [ ] Risk assessment: is the library doing `eval()`? excessive permissions?

## Client-Side Routing

- [ ] Protected routes implemented (PrivateRoute component)
- [ ] Route guards on client-side (but never rely on them – server must also protect)
- [ ] No sensitive data in URL fragments or query params (logs, browser history)

## File Uploads (if frontend handles upload)

- [ ] File size limited in `<input accept>`
- [ ] File type validated before upload (but also validate on server!)
- [ ] Progress indicators, cancel uploads

## Common React Vulnerabilities

### 1. XSS via `dangerouslySetInnerHTML`
```javascript
// VULNERABLE
<div dangerouslySetInnerHTML={{ __html: userContent }} />
// SANITIZED
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userContent) }} />
```

### 2. XSS via `href` with `javascript:` URLs
```javascript
// React prevents this in most cases, but be cautious:
<a href={userUrl}>click</a>
// If userUrl = "javascript:alert(1)", React sanitizes to empty string
// Still validate URLs if they point to external sites
```

### 3. Data leakage via logs (console.log)
Never log sensitive data in production builds:
```javascript
// Bad: passwords in console
console.log('User logged in:', user);
// Good: omit sensitive fields or remove in production
if (process.env.NODE_ENV !== 'production') {
  console.log('User:', { id: user.id, email: user.email });
}
```

## Checklist

- [ ] DOMPurify included if any HTML rendering
- [ ] No `eval()`, `new Function()`, `setTimeout(string)`
- [ ] All user inputs escaped automatically (JSX safe)
- [ ] Third-party dependencies audited (npm audit)
- [ ] Sensitive data not in localStorage/sessionStorage
- [ ] Auth tokens in httpOnly cookies
- [ ] API keys only in backend, not bundled
- [ ] Route guards for admin pages (client-side)
- [ ] CSP configured on server for frontend assets
- [ ] No sensitive data in console logs in production

## References

- OWASP React Security Cheat Sheet
- React Security Best Practices (Snyk)
- MDN: Cross-site scripting (XSS)
