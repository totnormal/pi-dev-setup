# SSRF (Server-Side Request Forgery) Prevention Reference

## What is SSRF?

Attacker causes server to make HTTP/network request to attacker-controlled destination or internal resources.

### Impact
- Access to cloud metadata (AWS, GCP, Azure credentials)
- Internal network scanning
- Bypass firewall protections (server inside network)
- Exfiltrate data via DNS/HTTP callbacks
- Port scanning internal services

## Attack Scenarios

### 1. Cloud Metadata Access

```javascript
// VULNERABLE: User-provided URL fetched by server
app.get('/fetch', async (req, res) => {
  const url = req.query.url;
  const response = await fetch(url);
  res.json({ data: response.body });
});

// Attacker calls: GET /fetch?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/admin-role
// Server fetches AWS metadata → returns IAM credentials
```

### 2. Internal Port Scanning

```javascript
// Attacker probes internal network
GET /fetch?url=http://192.168.1.5:22  # SSH banner leaked
GET /fetch?url=http://192.168.1.5:6379 # Redis CONFIG response
```

### 3. DNS Rebinding

- Attacker's domain resolves to 127.0.0.1 (loopback) after first fetch
- Bypasses IP allowlist if validated only on first request

## Defense Strategies

### 1. URL Validation and Allowlisting

```javascript
const ALLOWED_DOMAINS = ['api.example.com', 'cdn.example.com'];
const BLOCKED_IP_RANGES = [
  '127.0.0.0/8',    // Loopback
  '10.0.0.0/8',     // Private
  '172.16.0.0/12',  // Private
  '192.168.0.0/16', // Private
  '169.254.169.254' // Cloud metadata
];

async function validateURL(urlString) {
  const url = new URL(urlString);
  
  // Protocol check
  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error('Invalid protocol');
  }
  
  // Domain allowlist
  if (!ALLOWED_DOMAINS.includes(url.hostname)) {
    throw new Error('Domain not allowed');
  }
  
  // Resolve DNS and check IPs
  const ips = await dns.resolve(url.hostname);
  for (const ip of ips) {
    if (isPrivateIP(ip)) {
      throw new Error('Private IP not allowed');
    }
  }
  
  return url;
}

function isPrivateIP(ip) {
  const privateRanges = [
    '127.0.0.0/8',
    '10.0.0.0/8',
    '172.16.0.0/12',
    '192.168.0.0/16',
    'fc00::/7'  // IPv6 private
  ];
  // Check if IP in range (implement IP-to-integer conversion)
  return privateRanges.some(range => ipInRange(ip, range));
}
```

### 2. Use Dedicated Egress Proxy

Deploy a forward proxy that:
- Validates destination against allowlist
- Does not forward requests to private IPs
- Logs all outbound requests for audit
- Set timeout limits (5-10 seconds)

```javascript
// Configure fetch to use proxy
const fetch = require('node-fetch');
const HttpsProxyAgent = require('https-proxy-agent');
const agent = new HttpsProxyAgent('http://egress-proxy:8080');

await fetch(url, { agent });
```

### 3. Network Segmentation

- Servers with SSRF functionality placed in separate subnet
- Firewall rules prevent egress to internal networks (only internet)
- Cloud IMDS (Instance Metadata Service) access restricted via IAM policies

AWS example:
```bash
# Disable IMDSv2 or restrict IAM role
aws ec2 modify-instance-metadata-options \
  --instance-id i-1234567890abcdef0 \
  --http-tokens required \
  --no-http-endpoint
```

### 4. Disable HTTP Redirects

```javascript
// Fetch with redirects disabled prevents some SSRF bypasses
await fetch(url, { follow: 0, redirect: 'manual' });
// If redirect Location header present, validate it before following
```

## Checklist

- [ ] All user-provided URLs validated before server-side fetch
- [ ] Used allowlist (not just blocklist) for allowed domains
- [ ] DNS resolution checked for private IPs (not just URL string)
- [ ] Private IP ranges blocked (127.0.0.0/8, 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16)
- [ ] Cloud metadata endpoints explicitly blocked (169.254.169.254, metadata.google.internal)
- [ ] HTTP redirects disabled or validated
- [ ] Protocol restricted to `http:` and `https:` only
- [ ] Port restrictions (only standard ports 80, 443)
- [ ] Request timeout set (5-10 seconds)
- [ ] Egress firewall rules prevent internal-to-internal traffic
- [ ] IMDS access restricted (AWS: `HttpTokens=required`)
- [ ] Regular SSRF testing in pentests/red team exercises

## Testing SSRF

```bash
# Test if server fetches URLs
curl "https://target.com/fetch?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/"

# Test DNS rebinding
# 1. Set your DNS to resolve evil.com to 127.0.0.1 for first 5 seconds
# 2. Then switch to 192.168.1.1
# If app fetches once and reuses connection, may bypass validation

# Test localhost bypasses
curl "https://target.com/fetch?url=http://127.1/127.0.0.1"  # Numeric IP bypass?
curl "https://target.com/fetch?url=http://[0:0:0:0:0:ffff:127.0.0.1]/"  # IPv6?
curl "https://target.com/fetch?url=http://2130706433/"  # 127.0.0.1 as decimal
```

## References

- OWASP SSRF Prevention Cheat Sheet
- PortSwigger SSRF Labs (for testing practice)
- AWS Security Best Practices for IMDS
