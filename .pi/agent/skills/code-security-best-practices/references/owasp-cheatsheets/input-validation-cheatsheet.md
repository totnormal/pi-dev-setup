# OWASP Input Validation Cheat Sheet (Abridged)

## Core Principles

- **Allowlist over blocklist**: Define what's allowed, not what's denied
- **Validate at boundaries**: At API entry points, not deep in business logic
- **Type, length, format, range**: All four dimensions matter
- **Context matters**: Validation differs for SQL vs HTML vs OS commands

## Validation By Data Type

### Strings
```javascript
// Username: alphanumeric, 3-30 chars
const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
if (!usernameRegex.test(input)) return 400;
```

### Numbers
```javascript
const userId = parseInt(req.params.id);
if (isNaN(userId) || userId <= 0) return 400;
```

### Email
```javascript
// Use built-in validator
if (!validator.isEmail(email)) return 400;
// Also verify domain exists via MX lookup for signup
```

### Dates
```javascript
const date = new Date(input);
if (isNaN(date.getTime())) return 400; // Invalid date
if (date > new Date()) return 400; // Future dates not allowed
```

### UUIDs
```javascript
const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
if (!uuidRegex.test(id)) return 400;
```

## Schema Validation Libraries

| Language | Library |
|----------|---------|
| JavaScript/TypeScript | Joi, Zod, Yup |
| Python | Pydantic, marshmallow |
| Java | Jakarta Validation (hibernate-validator) |
| Go | validator package, struct tags |

## Whitelisting vs Blacklisting

❌ **BAD**: `if (input.includes('<script>'))` – attacker uses `<scr<script>ipt>`  
✅ **GOOD**: Allowlist valid characters/patterns only

## Output Encoding

- HTML: escape `< > & " '` to entities
- JavaScript: escape Unicode quotes
- URL: percent-encode
- SQL: use parameterized queries (not escaping)

## Testing Checklist

- [ ] Boundary values tested (min/max length, min/max numeric)
- [ ] Unicode inputs tested (emoji, RTL text, overlong UTF-8)
- [ ] Unexpected types rejected (string when number expected, array when string expected)
- [ ] Null bytes handled (rejected or stripped)
- [ ] Deeply nested JSON structures have size limits
- [ ] Array length limited (no unlimited arrays causing DoS)

## OWASP Validation Regex Reference

| Type | Pattern |
|------|---------|
| Email | `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$` |
| IPv4 | `^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$` |
| IPv6 | Complex – use library instead |
| URL | Use `new URL()` constructor in JS, not regex |
