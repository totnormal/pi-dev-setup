---
name: hermes-nous-portal-setup
description: Configure Hermes Agent to use Nous Portal as a model provider via OAuth device-code flow.
version: 1.0.0
author: Hermes Agent
license: MIT
disable-model-invocation: true
---
# Hermes Nous Portal Setup

Configure Hermes Agent to use Nous Portal as a model provider via OAuth device‑code flow.

## When to Use
- You want to use free or paid models from Nous Portal (e.g., `nous/hermes-3-8b`, `nous/hermes-2-pro`, etc.) in Hermes.
- You encounter the error: `Error: Could not resolve credentials for provider 'Nous Portal': No access token found for Nous Portal login.`
- You saw a `PermissionError` from `rich` when running `hermes auth add nous` from a restricted directory.

## Setup Steps

1. **Add Nous credentials**  
   Run the interactive auth command (use `-p <profile>` if you need to configure a specific profile, e.g., Telegram gateway):
   ```bash
   # Default (CLI/desktop) profile
   hermes auth add nous

   # Example for Telegram profile
   hermes -p telegram auth add nous
   ```
   - A browser window will open to `https://portal.nousresearch.com/manage-subscription?user_code=XXXX-XXXX`.
   - If it doesn’t open automatically, copy the URL and user code shown in the terminal.
   - Log in to your Nous Portal account and approve the device request.

2. **Verify the credential was stored**  
   ```bash
   hermes auth list nous          # default profile
   hermes -p telegram auth list nous   # Telegram profile
   ```
   You should see an entry like:
   ```
   nous (1 credentials):
     #1  device_code          oauth   device_code ←
   ```

3. **Select a Nous model**  
   Launch the interactive model picker:
   ```bash
   hermes model
   ```
   - Choose the **Nous** provider from the list.
   - Pick a model (free models are marked; premium models require a subscription).
   - Confirm your choice. The selection is saved to `~/.hermes/config.yaml` under `model.default` and `model.provider`.

4. **Test the configuration**  
   Run a simple query to ensure the model works:
   ```bash
   hermes chat -q "Say hello in one sentence."
   ```
   You should receive a response from the selected Nous model.

## Troubleshooting

### PermissionError from `rich` during `hermes auth add nous`
**Symptom**:  
```
Traceback (most recent call last):
  File ".../hermes", line 10, in <module>
    sys.exit(main())
  ...
  File ".../rich/__init__.py", line 17, in <module>
    _IMPORT_CWD = os.path.abspath(os.getcwd())
PermissionError: [Errno 1] Operation not permitted
```
**Cause**: The `rich` library tries to get the absolute path of the current working directory, which fails if the process lacks permission to read that directory (common in restricted environments or certain terminal contexts).

**Fix**:  
- Run the command from a directory you have read access to, e.g., `/tmp` or your home directory:
  ```bash
  cd /tmp
  hermes auth add nous
  ```
- Alternatively, ensure your terminal session has permission to access the current folder (check with `ls -la .`).

### No browser opened / device code not shown
If you are in a headless environment (SSH without X forwarding), add `--no-browser` and manually open the URL:
```bash
hermes auth add nous --no-browser
```
Then copy the printed URL and user code into a browser on another machine.

### Token expired or revoked
Repeat step 1 (`hermes auth add nous`) to obtain fresh credentials.

### Model picker shows no Nous models
Ensure you have successfully added the Nous credential (step 1). The model list is fetched from the Nous Portal catalog; if auth fails, the provider may appear empty.

## Reference
See `references/nous-portal-auth-error.md` for the exact error traceback and additional context.

---
*Tip*: Prefer free models for testing; they are rate‑limited but sufficient for light usage. Check your Nous Portal subscription for available credits and model access.