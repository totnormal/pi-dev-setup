# Debug Database Connection Pool Exhaustion

## Situation

Sentry alerts: "Connection pool exhausted" errors, increasing frequency of "too many connections" or timeout errors

## Investigation Steps

### 1. Correlate with traffic patterns

```bash
# Get error timestamps from last 24h
python sentry_error_investigator.py --issue-id PROJECT-789 --since 24h --limit 50 > db_errors.json

# Extract timestamps and analyze frequency
cat db_errors.json | jq -r '.events[]?.dateCreated' | sort
```

Look for:
- Peaks during specific hours
- Correlation with cron jobs or batch processes
- Spike after a specific deployment

### 2. Identify connectivity pattern

Check if errors are:
- `Connection pool timeout` (pool exhausted)
- `too many connections` (database limit reached)
- `Connection refused` (database down)
- `SSL SYSCALL` (network interruption)
- `Idle connection terminated` (connections timing out)

### 3. Check database configuration

**PostgreSQL example:**
```sql
-- Check current connections
SELECT count(*) FROM pg_stat_activity;

-- Check max connections setting
SHOW max_connections;

-- Check for idle connections taking up slots
SELECT state, count(*) FROM pg_stat_activity GROUP BY state;

-- Find long-running queries
SELECT pid, now() - pg_stat_activity.query_start AS duration, query
FROM pg_stat_activity
WHERE (now() - pg_stat_activity.query_start) > interval '5 minutes';
```

### 4. Check application connection pool settings

Common configuration points:

**Python (SQLAlchemy):**
```python
# settings.py or database config
SQLALCHEMY_ENGINE_OPTIONS = {
    'pool_size': 20,           # Number of connections to keep open
    'max_overflow': 30,        # Temporary connections beyond pool_size
    'pool_timeout': 30,        # Seconds to wait for connection before timeout
    'pool_recycle': 3600,      # Recycle connections after 1 hour
    'pool_pre_ping': True,     # Test connections before using
}
```

**Node.js (pg/pgpool):**
```javascript
const pool = new Pool({
  max: 20,              // Maximum number of clients
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

**Go (database/sql):**
```go
db.SetMaxOpenConns(25)
db.SetMaxIdleConns(25)
db.SetConnMaxLifetime(time.Hour)
```

### 5. Identify common causes

**Cause A: Pool size too small**
- Symptom: Errors during peak traffic, but fine off-peak
- Fix: Increase `pool_size` / `max` connections

**Cause B: Connections not being released**
- Symptom: `idle` connections accumulate, never timeout
- Check: Are you using connection pooling correctly? Are connections being closed?
- Fix: Set `pool_recycle` or `idle_timeout`, ensure proper connection.close() in application

**Cause C: Long-running queries**
- Symptom: Connections held by slow queries
- Fix: Optimize queries, add indexes, use query timeouts

**Cause D: Connection leak**
- Symptom: Gradual increase in connections over time, never released
- Fix: Ensure all code paths call `connection.close()`, use context managers

**Cause E: Multiple app instances**
- Symptom: Total connections = (pool_size * number_of_instances) > database max_connections
- Fix: Either increase database `max_connections` or reduce pool size per instance

### 6. Debug with connection tracing

Add logging to track connection lifecycle:

```python
# SQLAlchemy event listeners
from sqlalchemy import event

@event.listens_for(engine, "checkout")
def receive_checkout(dbapi_connection, connection_record, connection_proxy):
    print(f"Connection checkout: {id(dbapi_connection)}")

@event.listens_for(engine, "checkin")
def receive_checkin(dbapi_connection, connection_record):
    print(f"Connection checkin: {id(dbapi_connection)}")

@event.listens_for(engine, "close")
def receive_close(dbapi_connection, connection_record):
    print(f"Connection closed: {id(dbapi_connection)}")
```

### 7. Implement improved configuration

**Recommended PostgreSQL settings:**
```python
# Production config based on load testing
SQLALCHEMY_ENGINE_OPTIONS = {
    'pool_size': int(os.getenv('DB_POOL_SIZE', 20)),
    'max_overflow': int(os.getenv('DB_MAX_OVERFLOW', 30)),
    'pool_timeout': int(os.getenv('DB_POOL_TIMEOUT', 30)),
    'pool_recycle': int(os.getenv('DB_POOL_RECYCLE', 1800)),  # 30 minutes
    'pool_pre_ping': True,  # Detects stale connections
    'echo_pool': DEBUG,     # Log pool activity in debug mode
}
```

**Environment-based sizing:**
```python
import multiprocessing

# Calculate based on CPU cores and expected load
if ENV == 'production':
    WORKERS = multiprocessing.cpu_count() * 2 + 1
    DB_POOL_SIZE = min(50, WORKERS * 5)  # 5 connections per worker
else:
    DB_POOL_SIZE = 10
```

### 8. Monitor after changes

Add monitoring:

```bash
# Check connection count metrics
sentry-cli issues list --query 'tag[database]' --limit 20

# Monitor PostgreSQL connections
watch -n 5 "psql -c 'SELECT count(*) FROM pg_stat_activity;'"
```

Add to Sentry dashboards:
- `db.connections.active`
- `db.connections.idle`
- `db.connections.waiting`
- `db.query.duration`

### 9. Deploy gradually

1. Test configuration in staging with simulated load
2. Update one app instance at a time
3. Monitor database connection count after each restart:
   ```bash
   SELECT count(*) FROM pg_stat_activity WHERE application_name = 'your-app';
   ```
4. Verify no connection pool exhaustion in subsequent hours

### 10. Long-term solutions

- Implement connection pool metrics monitoring (Prometheus + Grafana)
- Set up alerts:
  - `connections_waiting > 5` for > 5 minutes
  - `active_connections > pool_size * 0.9`
- Use pgBouncer for connection pooling at database level
- Implement circuit breaker for database calls
- Add request queueing during peak times

## Emergency Measures

If errors are causing outages:

1. **Restart app servers** to clear existing connections (temporary fix)
2. **Increase database max_connections** temporarily (requires DB restart)
3. **Reduce app pool size** to fit within database limit
4. **Enable query logging** to find long-running queries:
   ```sql
   SELECT pid, now() - pg_stat_activity.query_start AS duration, query
   FROM pg_stat_activity
   WHERE state = 'active'
   ORDER BY duration DESC
   LIMIT 10;
   ```
5. **Kill long-running queries** if necessary:
   ```sql
   SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE ...;
   ```

## Prevention

- Set connection pool parameters based on load testing
- Always use `pool_pre_ping` to detect stale connections
- Set reasonable `pool_recycle` (1-2 hours)
- Monitor pool metrics in production
- Implement proper connection cleanup in application code
- Use database connection pooler (pgBouncer, HikariCP) for large deployments
- Document connection pool settings per environment
