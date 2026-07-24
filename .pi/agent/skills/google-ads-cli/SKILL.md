---
name: google-ads-cli
description: "Google Ads API CLI. Query campaigns, ad groups, performance reports via GAQL. Keywords: google ads, advertising, campaigns, adwords."
disable-model-invocation: true
---

# Google Ads CLI

## Usage

```bash
google-ads accounts                        # List accessible accounts
google-ads campaigns <customer_id>         # List campaigns
google-ads adgroups <customer_id>          # List ad groups
google-ads report <customer_id>            # Performance report (last 7 days)
```

## Auth

Set `GOOGLE_ADS_DEVELOPER_TOKEN` and `GOOGLE_APPLICATION_CREDENTIALS` (service account JSON path).
