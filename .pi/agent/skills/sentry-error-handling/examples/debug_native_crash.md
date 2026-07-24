# Debug Native iOS Crash

## Situation

Sentry alert: `EXC_BAD_ACCESS (SIGSEGV)` in `AppDelegate.m:47`

## Investigation Steps

### 1. Fetch the issue details

```bash
sentry-cli issues get PROJECT-123
```

### 2. Get the most recent event with full stack trace

```bash
python sentry_error_investigator.py --issue-id PROJECT-123 --limit 3 --output markdown
```

### 3. Analyze the output

Expected findings:
- **Exception**: `EXC_BAD_ACCESS (SIGSEGV)` or `EXC_BAD_INSTRUCTION (SIGABRT)`
- **Culprit**: Usually `AppDelegate.m` or a specific view controller
- **Stack trace**: Look for `objc_msgSend` indicating message sent to deallocated object

### 4. Root cause analysis

Common causes:
- Use-after-free (object deallocated but still referenced)
- Unrecognized selector sent to instance
- Unbalanced retain/release (if not using ARC)
- Weak reference becoming nil unexpectedly

### 5. Debugging in Xcode

1. Enable Zombies: Edit Scheme → Run → Diagnostics → Enable Zombie Objects
2. Reproduce the crash in debugger
3. Check console for zombie message: `*** -[MyClass someMethod]: message sent to deallocated instance`

### 6. Code fixes

**If use-after-free with weak reference:**
```objc
// Bad
@property (nonatomic, weak) MyObject *object; // Can become nil

// Better
@property (nonatomic, strong) MyObject *object; // Keep strong reference
// or check for nil before use
if (self.object) {
    [self.object doSomething];
}
```

**If unrecognized selector:**
- Check for typos in selector names
- Ensure delegate protocols are properly implemented
- Verify method exists in target class

### 7. Validation

1. Add unit test that triggers the edge case
2. Run with Zombies enabled
3. Deploy to TestFlight and monitor Sentry for recurrence
4. Use Xcode Instruments → Zombies to profile

## Expected Outcome

After fix, verify:
- No new crashes in Sentry
- Existing error count for this issue decreases to zero
- TestFlight users not reporting the crash
