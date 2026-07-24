# Common Error Patterns & Debugging Guide

This guide helps identify and resolve the most common errors seen in Sentry.

## Table of Contents

1. [JavaScript/TypeScript Errors](#javascripttypescript-errors)
2. [Python Errors](#python-errors)
3. [iOS/macOS Native Errors](#iosmacos-native-errors)
4. [Android Errors](#android-errors)
5. [Network/API Errors](#networkapi-errors)
6. [Database Errors](#database-errors)
7. [Memory/Performance Errors](#memoryperformance-errors)
8. [Concurrency Issues](#concurrency-issues)

---

## JavaScript/TypeScript Errors

### TypeError: Cannot read property 'X' of undefined/null

**Stack trace:** `at Object.<anonymous> (UserList.js:42)`

**Cause:** Accessing property on undefined variable

**Common scenarios:**
- Missing null check before accessing nested properties
- Array `.map()` on undefined
- Destructuring from undefined object

**Fix:**
```javascript
// Bad
const count = items.length;

// Good
const count = items?.length || 0;

// Bad
const { name, email } = user;

// Good
const { name, email } = user || {};

// Bad
return users.map(u => u.name);

// Good
return users?.map(u => u.name) || [];
```

**Investigate:** What made the variable undefined? Check API response, parent state, prop defaults.

---

### TypeError: X is not a function

**Stack trace:** `TypeError: myFunction is not a function`

**Cause:** Calling a variable that's not a function (might be undefined, object, or primitive)

**Fix:**
```javascript
// Check before calling
if (typeof myFunction === 'function') {
  myFunction();
}

// Or provide default
const myFunction = props.onClick || (() => {});

// Or use optional chaining with call (if supported)
props.onClick?.();
```

---

### ReferenceError: X is not defined

**Cause:** Variable used before declaration or out of scope

**Fix:**
```javascript
// Check variable scope
function myComponent() {
  const [state, setState] = useState(); // OK
  console.log(state); // OK
  console.log(undeclaredVar); // ReferenceError
}
```

---

### Uncaught (in promise) Error: X

**Cause:** Promise rejection without `.catch()` or `try/catch` with `async/await`

**Fix:**
```javascript
// async/await
async function fetchData() {
  try {
    const data = await fetch('/api/data');
    return data.json();
  } catch (error) {
    console.error('Fetch failed:', error);
    throw error; // Re-throw if needed
  }
}

// Promise chain
fetch('/api/data')
  .then(res => res.json())
  .then(data => ...)
  .catch(error => console.error(error));
```

---

## Python Errors

### TypeError: decode() argument 1 must be str, not None

**Cause:** Passing None to a function expecting string, often from missing API response field

**Example:**
```python
# Bad
user_data = api_response.get('user')
name = user_data['name'].encode('utf-8')  # Crashes if 'name' None

# Good
name = (user_data.get('name') or '').encode('utf-8')
```

---

### KeyError: 'X'

**Cause:** Accessing dict key that doesn't exist

**Fix:**
```python
# Bad
value = my_dict['missing_key']  # KeyError

# Good
value = my_dict.get('missing_key', default_value)

# Or check existence
if 'missing_key' in my_dict:
    value = my_dict['missing_key']
```

---

### AttributeError: 'NoneType' object has no attribute 'X'

**Cause:** Method/property access on None

**Fix:**
```python
# Bad
if user and user.profile and user.profile.avatar:  # Deep nesting
    ...

# Good (with walrus operator)
if (profile := getattr(user, 'profile', None)):
    if (avatar := getattr(profile, 'avatar', None)):
        ...

# Or use try/except
try:
    avatar_url = user.profile.avatar.url
except AttributeError:
    avatar_url = default_avatar
```

---

## iOS/macOS Native Errors

### EXC_BAD_ACCESS (SIGSEGV)

**Cause:** Accessing deallocated memory (use-after-free)

**Common patterns:**
- Weak reference becomes nil but still used
- Delegate not nilled out on dealloc
- Unbalanced retain/release

**Debugging:**
1. Enable Zombies in Xcode scheme
2. Reproduce crash
3. Console will show: `*** -[MyClass someMethod]: message sent to deallocated instance`

**Fix:**
```objc
// Ensure strong reference where needed
@property (nonatomic, strong) MyObject *object;  // not weak

// Or check for nil
if (self.object) {
    [self.object doSomething];
}

// In dealloc, break retain cycles
- (void)dealloc {
    self.delegate = nil;  // Break delegate reference
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}
```

---

### NSInvalidArgumentException

**Cause:** Sending unrecognized selector to object

**Common:** Typos in method name, calling method on wrong class

**Fix:**
- Check method signature matches precisely
- Verify object is of expected class: `if ([obj isKindOfClass:[MyClass class]])`
- Use `respondsToSelector:` before calling optional delegate methods

---

### EXC_BAD_INSTRUCTION (SIGABRT)

**Cause:** Usually assertion failure or forced unwrap of nil

**Swift:**
```swift
// Force unwrap crashes if nil
let value = optionalValue!  // Crash if nil

// Use optional binding
if let value = optionalValue {
    // use value
} else {
    // handle nil
}

// Or nil-coalescing
let value = optionalValue ?? defaultValue
```

---

## Android Errors

### java.lang.NullPointerException

**Cause:** Calling method on null object reference

**Fix (Java):**
```java
// Check for null
if (obj != null) {
    obj.doSomething();
}

// Or Objects.requireNonNull
public void setUser(User user) {
    this.user = Objects.requireNonNull(user, "user must not be null");
}
```

**Fix (Kotlin):**
```kotlin
// Safe calls
user?.profile?.avatarUrl

// Elvis operator
val name = userName ?: "Anonymous"

// Not-null assertion (use carefully)
val name = userName!!  // Throws NPE if null
```

---

### android.os.NetworkOnMainThreadException

**Cause:** Network operation on UI thread

**Fix:**
```java
// Use AsyncTask, Thread, or coroutines
new AsyncTask<Void, Void, Result>() {
    protected Result doInBackground(Void... params) {
        return api.fetchData();
    }
}.execute();

// Or Kotlin coroutines
lifecycleScope.launch {
    val data = withContext(Dispatchers.IO) {
        api.fetchData()
    }
    updateUI(data)
}
```

---

## Network/API Errors

### Read timed out / Connection timed out

**Cause:** HTTP request exceeded timeout threshold

**Fix:**
```python
# Increase timeout
response = requests.get(url, timeout=(5, 30))  # (connect, read)

# Add retry logic
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

session = requests.Session()
retry = Retry(total=3, backoff_factor=1)
session.mount('https://', HTTPAdapter(max_retries=retry))
```

---

### 429 Too Many Requests

**Cause:** Rate limit exceeded

**Fix:**
```python
# Check response headers for Retry-After
response = requests.get(url)
if response.status_code == 429:
    retry_after = int(response.headers.get('Retry-After', '60'))
    time.sleep(retry_after)
    # Retry request
```

**Backoff with jitter:**
```python
import random
delay = (2 ** retry_count) + random.uniform(0, 1)
time.sleep(delay)
```

---

### SSL certificate verify failed

**Cause:** Self-signed cert in dev, expired cert in prod

**Fix:**
- Development: Temporarily disable verification (NOT for production)
  ```python
  response = requests.get(url, verify=False)  # Insecure!
  ```
- Production: Update certificate or add CA bundle:
  ```python
  response = requests.get(url, verify='/path/to/ca-bundle.crt')
  ```

---

## Database Errors

### Too many connections / Connection pool exhausted

**See separate guide:** `examples/database_connection_debug.md`

**Quick fix:**
- Increase connection pool size
- Implement connection recycling
- Check for connection leaks

---

###Deadlock detected / Lock wait timeout

**Cause:** Multiple transactions waiting on each other's locks

**Fix:**
- Ensure consistent lock ordering
- Reduce transaction duration
- Use `SELECT ... FOR UPDATE` carefully
- Implement retry logic with exponential backoff

---

## Memory/Performance Errors

### Out of memory / GC overhead limit exceeded (Java)

**Cause:** Memory leak or insufficient heap

**Fix:**
- Check for large collections not being cleared
- Use profiling tools: VisualVM, YourKit, Java Flight Recorder
- Increase heap size: `-Xmx2g` (but fix leak first)
- For Android: Use `android:largeHeap="true"` as last resort

---

### Memory warning (iOS)

**Cause:** Using too much RAM

**Fix:**
- Release cached images when receiving `didReceiveMemoryWarning`
- Use `autoreleasepool` for temporary large objects
- Downsample images before loading into memory
- Use Instruments → Allocations to find leaks

---

## Concurrency Issues

### Race condition / Data race

**Symptoms:** Inconsistent state, random crashes, data corruption

**Fix:**
```python
# Use locks
with threading.Lock():
    shared_resource.modify()

# Or use thread-safe collections
from queue import Queue
q = Queue()

# Or atomic operations (if available)
import threading
counter = threading.Semaphore(1)
```

---

## Sentry Best Practices

### 1. Add context for debugging

```python
import sentry_sdk

with sentry_sdk.push_scope() as scope:
    scope.set_user({"id": user.id, "email": user.email})
    scope.set_tag("env", "production")
    scope.set_extra("order_id", order.id)
    scope.set_extra("cart_total", cart.total)
    sentry_sdk.capture_exception(error)
```

### 2. Wrap external API calls

```python
def call_external_api():
    try:
        response = requests.post(url, json=data, timeout=5)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        # Add helpful context
        with sentry_sdk.configure_scope() as scope:
            scope.set_tag("api_endpoint", url)
            scope.set_extra("request_body", data)
        sentry_sdk.capture_exception(e)
        raise
```

### 3. Fingerprinting for grouping

```python
sentry_sdk.set_tag("issue_type", "payment_failed")

# Or manually set fingerprint to group related but different-looking errors
with sentry_sdk.configure_scope() as scope:
    scope.fingerprint = ['{{ default }}', f'user-{user.id}']
```

### 4. Before/After breadcrumbs

```python
sentry_sdk.add_breadcrumb(
    category="http",
    message=f"Fetching user data for {user.id}",
    level="info"
)
data = fetch_user_data(user.id)
sentry_sdk.add_breadcrumb(
    category="http",
    message=f"User data fetched successfully: {len(data)} items",
    level="info"
)
```

### 5. Sample rate for performance monitoring

```python
sentry_sdk.init(
    traces_sample_rate=0.1  # Sample 10% of transactions
)
```

---

## Quick Checklist

When investigating a new Sentry error:

- [ ] Check frequency trend (spiking or constant?)
- [ ] Identify first seen vs last seen (new issue or regression?)
- [ ] Note affected environments (prod vs staging)
- [ ] Count unique users affected (isolated or widespread?)
- [ ] Examine top stack frame (which file/line?)
- [ ] Search codebase for that file and line number
- [ ] Check recent commits to that file
- [ ] Correlate with recent deployments
- [ ] Look for patterns: time of day, specific actions, user segments
- [ ] Check if error includes HTTP status codes or database error codes
- [ ] Verify proper error handling exists in that code path
- [ ] Reproduce locally if possible
- [ ] Create test case that covers the bug
- [ ] Implement fix with defensive coding
- [ ] Deploy to staging, monitor
- [ ] Deploy to production, verify issue resolved

---

## Resources

- Sentry Docs: https://docs.sentry.io/
- Error Grouping: https://docs.sentry.io/product/issues/issue-grouping/
- Stack Traces: https://docs.sentry.io/platforms/guides/stacktrace/
