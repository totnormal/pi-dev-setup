# Debug React JavaScript Error

## Situation

Sentry alert: `TypeError: Cannot read properties of undefined (reading 'map')` in React component

## Investigation Steps

### 1. Fetch the error details

```bash
python sentry_error_investigator.py --issue-id PROJECT-456 --limit 5 --output markdown
```

### 2. Examine the error

Looking for:
- **Component name**: from "Culprit" field (e.g., `UserList.render`)
- **Error message**: `Cannot read properties of undefined (reading 'map')`
- **Browser/User Agent**: may indicate specific browsers affected
- **URL**: which page the error occurred on
- **Release**: if correlated with recent deployment

### 3. Identify the problematic code pattern

Classic error:
```javascript
// Bad - no guard for empty/undefined array
return (
  <ul>
    {users.map(user => <UserItem key={user.id} user={user} />)}
  </ul>
);
```

Or using destructuring:
```javascript
const { items } = response.data; // If response.data undefined, crash
return items.map(item => ...);
```

### 4. Check for common React pitfalls

**State initialization:**
```javascript
// Bad - state initialized as undefined
const [users, setUsers] = useState(); // undefined

// Good - default to empty array
const [users, setUsers] = useState([]);
```

**Async data fetching:**
```javascript
// Component renders before data loads
useEffect(() => {
  fetchUsers().then(data => setUsers(data.users));
}, []);

// Need to handle loading state
if (loading) return <Spinner />;
if (!users || users.length === 0) return <p>No users</p>;
```

**Optional chaining:**
```javascript
// Add optional chaining to prevent crashes
{users?.map(user => ...)}
```

**Default props:**
```javascript
UserList.defaultProps = {
  users: []
};
```

### 5. Check recent deploy

If error appeared after recent deployment:
```bash
# Check git history
git log --oneline --since="2 days ago" -- src/components/UserList.js

# Check bundle diff
npm run build
# Compare bundle sizes, check source maps uploaded correctly
```

### 6. Source maps verification

If stack trace shows minified code like `min.js:1` instead of readable component names:

```bash
# Create new release and upload sourcemaps
sentry-cli releases new my-app@1.2.3
sentry-cli releases files my-app@1.2.3 upload-sourcemaps ./build/ --url-prefix "~/"
sentry-cli releases finalize my-app@1.2.3
```

Verify in Sentry UI that stack traces are properly symbolicated.

### 7. Implement the fix

**Option 1: Add guard clause** (recommended)
```javascript
function UserList({ users = [] }) {
  if (!users || users.length === 0) {
    return <p>No users found</p>;
  }

  return (
    <ul>
      {users.map(user => (
        <UserItem key={user.id} user={user} />
      ))}
    </ul>
  );
}
```

**Option 2: Use optional chaining** (if supported)
```javascript
{users?.map(user => <UserItem key={user.id} user={user} />)}
```

**Option 3: Add loading state**
```javascript
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchUsers()
    .then(data => setUsers(data.users || []))
    .finally(() => setLoading(false));
}, []);

if (loading) return <LoadingSpinner />;
```

### 8. Add error boundaries (preventative)

```javascript
class UserListErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log to Sentry
    Sentry.captureException(error, {
      contexts: { react: errorInfo }
    });
  }

  render() {
    if (this.state.hasError) {
      return <FallbackUI />;
    }
    return this.props.children;
  }
}

// Wrap component
<UserListErrorBoundary>
  <UserList users={users} />
</UserListErrorBoundary>
```

### 9. Test locally

- Test with `users={undefined}`
- Test with `users={null}`
- Test with `users=[]`
- Test with normal array

```javascript
// Jest/React Testing Library test
test('renders empty state when users is empty', () => {
  const { container } = render(<UserList users={[]} />);
  expect(container).toHaveTextContent('No users found');
});

test('handles undefined users', () => {
  const { container } = render(<UserList />); // Defaults to []
  expect(container).toHaveTextContent('No users found');
});
```

### 10. Deploy and monitor

1. Create PR with fix and tests
2. Deploy to staging, test all UserList scenarios
3. Deploy to production with canary
4. Monitor Sentry:
   ```bash
   # Check error rate hourly
   python sentry_error_investigator.py --issue-id PROJECT-456 --since 1h
   ```
5. Verify error count drops to zero within hours

## Prevention

- Always initialize state with default values (empty arrays/objects)
- Use TypeScript for better type safety
- Enable ESLint rule: `react-hooks/exhaustive-deps`
- Add `prop-types` or TypeScript interfaces with defaults
- Write tests for edge cases (null, undefined, empty)
- Add source maps to Sentry for proper stack traces
- Set up Sentry release tracking to correlate errors with deployments

## Useful Commands

```bash
# Check if error correlates with specific release
sentry-cli releases list
sentry-cli releases describe my-app@1.2.3

# Find all user-facing issues
sentry-cli issues list --query 'tag[user]' --limit 20

# Compare error rates before/after
sentry-cli issues list --query 'firstSeen:-24h' --limit 50
```
