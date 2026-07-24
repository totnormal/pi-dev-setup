# Nous Portal Auth PermissionError

## Error Encountered

When running `hermes auth add nous` from a restricted directory (e.g., a path where the process lacks permission to read the current working directory), the following traceback occurs:

```
Traceback (most recent call last):
  File "/Users/andreitarnovski/.hermes/hermes-agent/venv/bin/hermes", line 10, in <module>
    sys.exit(main())
  ...
  File ".../rich/__init__.py", line 17, in <module>
    _IMPORT_CWD = os.path.abspath(os.getcwd())
PermissionError: [Errno 1] Operation not permitted
```

## Root Cause

The `rich` library (used for pretty console output) attempts to compute the absolute path of the current working directory during import. If the process does not have permission to `stat` the current directory (or any parent), `os.getcwd()` or `os.path.abspath()` raises a `PermissionError`.

This can happen in:
- Highly locked-down environments (e.g., certain corporate macOS configurations, sandboxed shells).
- When the current directory is on a mounted volume with restrictive permissions.
- When the terminal session itself lacks read access to the cwd.

## Solution

Run the authentication command from a directory you have read access to, such as `/tmp` or your home directory:

```bash
cd /tmp
hermes auth add nous
```

Alternatively, ensure your terminal session has permission to access the current folder (verify with `ls -la .`).

## Additional Notes

- This error is unrelated to Nous Portal credentials; it is an environment issue with the `rich` dependency.
- Once you run the command from an accessible directory, the OAuth device-code flow proceeds normally.
- After successful authentication, the credential is stored in `~/.hermes/auth.json` (or profile-specific auth file) and can be used from any directory thereafter.

---