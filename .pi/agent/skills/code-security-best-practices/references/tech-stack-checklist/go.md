# Go Security Checklist

## Common Vulnerabilities

### 1. Command Injection
```go
// VULNERABLE
cmd := exec.Command("sh", "-c", userInput) // User can inject ; rm -rf /
```

**Fix**: Avoid shell; use direct exec with argument array:
```go
cmd := exec.Command("ls", "-la", userProvidedPath)
```

### 2. SQL Injection
```go
// VULNERABLE
query := fmt.Sprintf("SELECT * FROM users WHERE id = %s", userID)
```

**Fix**: Use parameterized queries:
```go
query := "SELECT * FROM users WHERE id = $1"
rows, err := db.Query(query, userID)
```

### 3. XSS in Templates
Go's `html/template` auto-escapes by default – safe. But if using `template/template`, verify:
```go
t, _ := template.New("page").ParseFiles("page.html")
// By default, html/template escapes variables
```

### 4. Race Conditions
```go
// VULNERABLE
if balance > amount {
    balance = balance - amount  // TOCTOU race
}
```

**Fix**: Use channels or mutexes, or database-level atomic operations:
```go
_, err = db.Exec("UPDATE accounts SET balance = balance - $1 WHERE id = $2 AND balance >= $3", amount, id, amount)
```

### 5. Insecure Random
```go
// VULNERABLE: math/rand is not cryptographically secure
token := fmt.Sprintf("%d", rand.Intn(1000000))
```

**Fix**: Use `crypto/rand`:
```go
b := make([]byte, 16)
_, err := rand.Read(b)
token := base64.URLEncoding.EncodeToString(b)
```

## Checklist

- [ ] No `os/exec` with user-controlled strings (`sh -c`)
- [ ] All SQL queries parameterized (database/sql package with `?` or `$1` placeholders)
- [ ] Template escaping not disabled (`{{` not `{{` with `html/template`)
- [ ] Race conditions addressed (mutexes, channels, atomic ops, DB constraints)
- [ ] Cryptographically random tokens for session/auth (use `crypto/rand`)
- [ ] HTTPS enforced (http.Server with TLS)
- [ ] No hardcoded secrets in code
- [ ] Environment variables or secret manager for credentials
- [ ] Input validation (type/length/format) on all external input
- [ ] Dependency scanning: `govulncheck ./...`
- [ ] Build with `-trimpath` to avoid leaking local paths
- [ ] Binary stripping (`-ldflags="-s -w"`) to reduce attack surface (remove symbols)

## Go-Specific Resources

- **Go Wiki on Security**: https://github.com/golang/go/wiki/Security
- **Go's `crypto` package**: Use for all crypto needs (no homegrown)
- **Static analysis**: `staticcheck`, `gosec` (install: `go install github.com/securecodewarrior/gosec/v2/cmd/gosec@latest`)
