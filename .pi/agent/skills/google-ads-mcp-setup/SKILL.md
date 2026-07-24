---
name: "google-ads-mcp-setup"
description: "Configure mcp-google-ads (mharnett) MCP server for Pi with correct env vars and diagnose common issues"
version: 1
created: "2026-07-03"
updated: "2026-07-03"
disable-model-invocation: true
---
## When to Use
Use when setting up or debugging the mcp-google-ads MCP server (by mharnett, npm package mcp-google-ads) with Pi coding agent. Covers the unauthorized_client env-var quirk, customer_id vs mcc_customer_id, and DEVELOPER_TOKEN_NOT_APPROVED diagnosis.

## Procedure
1. Install mcp-google-ads globally: npm install -g mcp-google-ads (provides mcp-google-ads binary, mcp-google-ads-auth, mcp-google-ads-doctor, mcp-google-ads-install)
2. Authenticate once: npx mcp-google-ads-auth (browser flow, writes ~/Library/Preferences/mcp-google-ads-nodejs/credentials.json on macOS)
3. Run mcp-google-ads-doctor to check setup status
4. Configure in .pi/mcp.json with ALL credentials as env vars (not relying on credentials.json): GOOGLE_ADS_DEVELOPER_TOKEN, GOOGLE_ADS_CLIENT_ID, GOOGLE_ADS_CLIENT_SECRET, GOOGLE_ADS_REFRESH_TOKEN, GOOGLE_ADS_MCP_WRITE=true, GOOGLE_ADS_CUSTOMER_ID, GOOGLE_ADS_MCC_CUSTOMER_ID
5. Add .pi/mcp.json to .gitignore (it contains secrets)
6. Verify the server starts: echo '{"jsonrpc":"2.0","id":1,"method":"initialize",...}' | timeout 8 mcp-google-ads — check stderr for 'MCP Google Ads server running' and 'Write operations ENABLED'

## Pitfalls
- unauthorized_client quirk: mcp-google-ads Node.js google-auth-library throws `unauthorized_client` when reading OAuth creds from credentials.json, but works fine when the SAME credentials are passed as env vars. Always pass all 4 creds (developer_token, client_id, client_secret, refresh_token) as env vars in the MCP config.
- DEVELOPER_TOKEN_NOT_APPROVED error means the Google Ads developer token is at Test Account level only (not Basic/Standard). It blocks ALL search/mutate calls on production accounts. Fix: create a Google Ads test account OR apply for Basic access. Note: listAccessibleCustomers works even with unapproved tokens.
- customer_id vs mcc_customer_id: mcp-google-ads-doctor warns 'customer_id is a leaf account, not an MCC' if both are the same. Most tools want a leaf account as customer_id. But if the OAuth refresh token was obtained for the MCC, accessing leaf accounts requires the login-customer-id header (GOOGLE_ADS_MCC_CUSTOMER_ID env var).
- The doctor's claude_desktop_config checks are irrelevant for Pi — Pi uses .pi/mcp.json, not Claude Desktop config. Ignore those 3 failures.

## Verification
1. mcp-google-ads --version returns the installed version (e.g. 1.6.0)
2. mcp-google-ads-doctor shows 'customer_id is a leaf account, not an MCC' as ✓
3. echo initialize-request | mcp-google-ads shows 'Credentials resolved' + 'Write operations ENABLED' + 'MCP Google Ads server running' in stderr (no unauthorized_client)
4. In Pi: /mcp shows google-ads server connected
5. OAuth refresh test: POST to https://oauth2.googleapis.com/token with the refresh_token returns 200 (validates creds independently of Node.js library)