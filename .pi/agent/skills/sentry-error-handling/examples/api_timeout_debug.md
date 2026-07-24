# Debug API Timeout and Rate Limit Issues

## Situation

Sentry alert: Multiple "Read timed out" and "429 Too Many Requests" errors from payment service

## Investigation Steps

### 1. Fetch recent error patterns

```bash
# Get all recent timeout errors
python sentry_error_investigator.py --recent-errors --since 6h --limit 50 > recent_errors.json

# Analyze patterns
cat recent_errors.json | ./sentry_stack_analyzer.sh --limit 15
```

### 2. Identify affected endpoints

Look for patterns in stack traces:

```
Key patterns to find:
- "requests.exceptions.ReadTimeout"
- "Read timed out"
- "429"
- "Too Many Requests"
- "retry-after" header mentions
```

### 3. Correlate with payload size

Check if timeouts correlate with:
- Large payload sizes (check request body in Sentry breadcrumbs)
- Complex database queries (look for SQL in logs)
- Third-party service response times

### 4. Analyze code

Search codebase for:
```bash
# Find HTTP requests to payment service
grep -r "payment-service" --include="*.py" --include="*.js" --include="*.go" src/
grep -r "requests\.post\|fetch\|axios" src/payments/
```

Look for:
- Missing timeout settings
- No retry logic
- Synchronous calls blocking thread
- High-concurrency scenarios

### 5. Implement fix

**Add timeout and retry logic:**

Example for Python with requests:
```python
import requests
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry

# Configure session with retry
session = requests.Session()
retry_strategy = Retry(
    total=3,
    backoff_factor=1,
    status_forcelist=[429, 500, 502, 503, 504],
    allowed_methods=["HEAD", "GET", "OPTIONS", "POST"]
)
adapter = HTTPAdapter(max_retries=retry_strategy)
session.mount("https://", adapter)

# Use with timeout
try:
    response = session.post(url, json=data, timeout=(5, 30))  # (connect, read)
    response.raise_for_status()
except requests.exceptions.RetryError as e:
    logger.error(f"Payment failed after retries: {e}")
    raise PaymentUnavailableError()
except requests.exceptions.Timeout:
    logger.error("Payment service timeout")
    raise PaymentTimeoutError()
except requests.exceptions.HTTPError as e:
    if e.response.status_code == 429:
        retry_after = e.response.headers.get('Retry-After', '60')
        logger.warning(f"Rate limited, retry after {retry_after}s")
    raise
```

Example for Node.js with axios:
```javascript
const axios = require('axios');

const client = axios.create({
  timeout: 10000,
  maxRedirects: 3
});

// Retry interceptor
client.interceptors.response.use(null, async (error) => {
  const { config, response } = error;
  if (!config || !response) {
    return Promise.reject(error);
  }

  const { status } = response;
  if ([408, 429, 500, 502, 503, 504].includes(status)) {
    const retryCount = config.__retryCount || 0;
    if (retryCount < 3) {
      config.__retryCount = retryCount + 1;
      const delay = Math.min(1000 * 2 ** retryCount, 30000);
      await new Promise(resolve => setTimeout(resolve, delay));
      return client(config);
    }
  }

  return Promise.reject(error);
});
```

### 6. Update Sentry monitoring

Add tags for better debugging:
```python
with sentry_sdk.push_scope() as scope:
    scope.set_tag("payment_service", "stripe")
    scope.set_tag("timeout", "true")
    scope.set_extra("request_size", len(json_data))
    scope.set_extra("response_time", elapsed)
    capture_exception()
```

### 7. Test and deploy

1. Add unit tests for timeout scenarios using mocks
2. Create load test that generates high request volume
3. Deploy to staging with canary
4. Monitor Sentry for:
   - Reduction in timeout errors
   - No increase in 5xx errors
   - Response time improvements

## Mitigation While Deploying

If errors are spiking:
1. Implement circuit breaker pattern
2. Queue payment requests with background worker
3. Add alert to notify team when error rate > threshold
4. Consider rate limiting at the gateway level

## Prevention

- Set timeouts on all external HTTP calls
- Implement exponential backoff with jitter
- Document retry requirements for all third-party integrations
- Add performance budgets for API responses
- Regular load testing of critical paths
