# Injection Prevention Reference

## Injection Types

1. **SQL Injection**
2. **NoSQL Injection**
3. **OS Command Injection**
4. **LDAP Injection**
5. **XPath Injection**
6. **Template Injection**
7. **CRLF Injection**
8. **XXE (XML External Entity)**

## Universal Defense

### 1. Parameterized Queries / Prepared Statements

```javascript
// VULNERABLE
const query = `SELECT * FROM users WHERE id = ${userInput}`;

// SECURE
const query = 'SELECT * FROM users WHERE id = ?';
db.execute(query, [userInput]);
```

### 2. Input Validation

```javascript
// Whitelist approach
const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
if (!usernameRegex.test(username)) throw new Error('Invalid');

// Type casting
const userId = parseInt(id); // parseInt("abc") => NaN
```

### 3. Output Encoding (Context-Aware)

- HTML: escape < > & " '
- JavaScript: escape Unicode, quotes
- URL: percent-encode
- SQL: use parameterized queries (not string escaping)

## SQL Injection Deep Dive

**Vulnerable Code**:
```sql
SELECT * FROM products WHERE category = '${category}'
```

**Exploit**: `category = "'; DROP TABLE products; --"`

**Prevention**:
- Use parameterized queries (all languages)
- ORM with safe query building ( Sequelize, Hibernate, Django ORM)
- Principle: Never concatenate user input into SQL strings

## NoSQL Injection

**Vulnerable**:
```javascript
const username = req.body.username;
const password = req.body.password;
db.users.findOne({ username: username, password: password });
```

**Exploit**: `{"username": {"$ne": null}, "password": {"$ne": null}}`

**Prevention**:
```javascript
// Use MongoDB with proper escaping
const query = { username: username, password: password }; // Mongoose sanitizes
// OR validate input type
if (typeof username !== 'string') throw new Error();
```

## Command Injection

**Vulnerable**:
```bash
filename = user_input
system("cat /tmp/uploads/" + filename)  # ; rm -rf /
```

**Prevention**:
- Avoid system calls with user input
- Use language features instead (Node.js `fs` vs `exec`)
- Escape/validate if unavoidable: allowlist filenames

## Testing Checklist

- [ ] All SQL uses parameterized queries or ORM
- [ ] No string concatenation/f-strings with user input in queries
- [ ] OS command execution avoided or input validated
- [ ] Template engines auto-escape (Jinja2, Handlebars)
- [ ] LDAP queries use parameterized APIs
- [ ] XML parsers disable external entities
