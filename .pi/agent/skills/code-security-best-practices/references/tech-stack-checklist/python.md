# Python (Django/Flask/FastAPI) Security Checklist

## Core Framework

### Django

- [ ] `DEBUG = False` in production
- [ ] `SECRET_KEY` from environment, not in repo
- [ ] `ALLOWED_HOSTS` configured (not `['*']`)
- [ ] HTTPS only: `SECURE_SSL_REDIRECT = True`
- [ ] CSRF middleware enabled
- [ ] XSS protection: Django auto-escapes templates (verify not `|safe` on user input)
- [ ] Clickjacking protection: `X_FRAME_OPTIONS = 'DENY'`
- [ ] HSTS: `SECURE_HSTS_SECONDS = 31536000`

### Flask

- [ ] `DEBUG=False` in production
- [ ] `SECRET_KEY` from env var
- [ ] Use `Flask-TLS` or reverse proxy for HTTPS
- [ ] CSRF protection: Flask-WTF or Flask-SeaSurf
- [ ] Session cookies: `SESSION_COOKIE_SECURE=True`, `SESSION_COOKIE_HTTPONLY=True`
- [ ] Use `escaped` in Jinja2 (auto-escape on by default)

### FastAPI

- [ ] `debug=False` in production
- [ ] `SECRET_KEY` from env var (for JWT/signing)
- [ ] CORS configured with allowlist, not `*`
- [ ] Input validation with Pydantic models
- [ ] Rate limiting: `slowapi` or reverse proxy
- [ ] Use `uvicorn --host 127.0.0.1` if not behind reverse proxy

## SQL Injection Prevention

### Django ORM (Safe)
```python
# SAFE: ORM parameterization
User.objects.filter(username=user_input)
```

### Raw SQL (Dangerous)
```python
# VULNERABLE
cursor.execute(f"SELECT * FROM users WHERE id = {user_id}")
# SAFE
cursor.execute("SELECT * FROM users WHERE id = %s", [user_id])
```

## Authentication

- [ ] Use `django.contrib.auth` or `Flask-Login` (not custom auth)
- [ ] Password hashing: PBKDF2 (Django default), bcrypt, or argon2-cffi
- [ ] Password validation: minimum length, complexity, breached password check
- [ ] MFA available: `django-otp`, `pyotp`
- [ ] Rate limit login attempts: `django-axes`, `flask-limiter`
- [ ] Session security: `SESSION_COOKIE_SECURE`, `SESSION_COOKIE_HTTPONLY`, `SESSION_COOKIE_SAMESITE='Lax'`
- [ ] CSRF protection enabled

## Files and Uploads

- [ ] Validate file uploads (type, size, content)
- [ ] Store uploads outside web root
- [ ] Rename to random UUID, not user-provided filename
- [ ] Use `django-storages` with cloud storage (S3 signed URLs)
- [ ] Scan for viruses (ClamAV integration)

## API Security (FastAPI/Django REST)

- [ ] All endpoints require authentication (except explicitly public)
- [ ] Rate limiting per IP/user
- [ ] Pagination (avoid returning entire dataset)
- [ ] Input validation with Pydantic (FastAPI) or Django serializers
- [ ] Filtering by user ownership (prevent IDOR):
```python
# Django REST: filter queryset by request.user
queryset = Order.objects.filter(user=request.user)
```

## Configuration & Secrets

- [ ] `.env` in `.gitignore` or use `python-decouple`
- [ ] `python-dotenv` for local development only
- [ ] Secrets in production: AWS Secrets Manager, HashiCorp Vault
- [ ] No `config.py` with real secrets committed

## Custom Headers

```python
# Django middleware
class SecurityHeadersMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
    def __call__(self, request):
        response = self.get_response(request)
        response['X-Content-Type-Options'] = 'nosniff'
        response['X-Frame-Options'] = 'DENY'
        response['Content-Security-Policy'] = "default-src 'self'"
        return response
```

## Dependency Security

```bash
# Check dependencies
pip-audit  # Preferred
safety check
snyk test

# Generate requirements with hashes
pip freeze --require-hashes -r requirements.txt
```

## Checklist

- [ ] Framework security middleware enabled (XSS, CSRF, clickjacking)
- [ ] Debug mode off
- [ ] All user input validated (Pydantic, Django forms, WTForms)
- [ ] SQL queries use ORM/parameterization
- [ ] Passwords hashed with bcrypt/argon2/PBKDF2
- [ ] Rate limiting on auth endpoints
- [ ] Session cookies secure (HttpOnly, Secure, SameSite)
- [ ] File uploads validated and stored safely
- [ ] Secrets from environment/vault, not in code
- [ ] Dependencies audited (pip-audit, safety)
- [ ] Logging configured (no PII in logs)
