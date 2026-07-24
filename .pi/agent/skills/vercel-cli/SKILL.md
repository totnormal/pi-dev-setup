---
name: vercel-cli
description: "Vercel deployment CLI. Deploy, manage domains, inspect logs, manage projects. Keywords: vercel, deploy, hosting, serverless, next.js."
disable-model-invocation: true
---

# Vercel CLI

## Usage

```bash
vercel                                     # Deploy current project
vercel --prod                              # Deploy to production
vercel ls                                  # List deployments
vercel logs <url>                          # View deployment logs
vercel domains ls                          # List domains
vercel env ls                              # List environment variables
vercel project ls                          # List projects
vercel inspect <url>                       # Inspect a deployment
```

## Already installed

Vercel CLI is available as `vercel` on PATH (v54.1.0). No MCP server needed.
EOF
