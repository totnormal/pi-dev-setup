---
name: ghost-cms-cli
description: "Ghost CMS Admin API CLI. Manage posts, pages, tags, members, settings. Keywords: ghost, cms, blog, content management, publishing."
disable-model-invocation: true
---

# Ghost CMS CLI

## Usage

```bash
ghost-cms posts                            # List posts
ghost-cms post <id>                        # Get post
ghost-cms post create --title "Title" --content "Body"
ghost-cms post update <id> --title "New Title"
ghost-cms post delete <id>
ghost-cms pages                            # List pages
ghost-cms tags                             # List tags
ghost-cms members                          # List members
ghost-cms settings                         # Site settings
```

## Auth

Set `GHOST_API_URL` and `GHOST_ADMIN_API_KEY` or save to `~/.config/ghost-url` and `~/.config/ghost-key`.
