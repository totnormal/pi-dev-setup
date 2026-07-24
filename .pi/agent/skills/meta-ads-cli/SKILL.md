---
name: meta-ads-cli
description: "Meta/Facebook Ads API CLI. Manage ad accounts, campaigns, ad sets, ads, pages, A/B tests. Keywords: meta ads, facebook ads, advertising, campaigns, ad sets."
disable-model-invocation: true
---

# Meta Ads CLI

## Usage

```bash
meta-ads accounts                          # List ad accounts
meta-ads account <id>                      # Account details
meta-ads campaigns <account_id>            # List campaigns
meta-ads adsets <account_id>               # List ad sets
meta-ads ads <account_id>                  # List ads
meta-ads pages <account_id>                # List pages
meta-ads ab-studies <account_id>           # List A/B tests
```

## Auth

Set `META_ACCESS_TOKEN` or save to `~/.config/meta-ads-token`.
