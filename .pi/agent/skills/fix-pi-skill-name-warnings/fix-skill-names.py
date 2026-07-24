#!/usr/bin/env python3
"""
Slugify invalid `name:` fields in SKILL.md files to satisfy Pi's spec:
  lowercase a-z, 0-9, hyphens only; no leading/trailing/consecutive hyphens.
Uses the same canonicalization as Pi's own slugify() in skill-utils.ts.
Only edits the name line within YAML frontmatter; leaves the body untouched.
"""
import os
import re
import sys

ROOT = sys.argv[1] if len(sys.argv) > 1 else "/Users/andreitarnovski/.pi/agent/skills"
VALID = re.compile(r"^[a-z0-9-]+$")
FRONTMATTER_RE = re.compile(r"\A---\r?\n(.*?)\r?\n---\r?\n", re.DOTALL)
NAME_LINE_RE = re.compile(r"^name:\s*(.*?)\s*$", re.MULTILINE)


def slugify(name: str) -> str:
    s = name.lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = re.sub(r"^-|-$", "", s)
    s = re.sub(r"-+", "-", s)
    return s[:64]


def is_valid(slug: str) -> bool:
    if not slug or not VALID.match(slug):
        return False
    if slug.startswith("-") or slug.endswith("-"):
        return False
    if "--" in slug:
        return False
    return True


def strip_quotes(v: str) -> str:
    v = v.strip()
    if len(v) >= 2 and v[0] == v[-1] and v[0] in "\"'":
        return v[1:-1]
    return v


changed, skipped, total = [], [], 0

for dirpath, dirnames, filenames in os.walk(ROOT):
    # mirror Pi's own walk rules: skip dot-dirs and node_modules
    dirnames[:] = [d for d in dirnames if not d.startswith(".") and d != "node_modules"]
    if "SKILL.md" not in filenames:
        continue
    total += 1
    path = os.path.join(dirpath, "SKILL.md")
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    fm = FRONTMATTER_RE.match(content)
    if not fm:
        continue
    fm_text = fm.group(1)
    nm = NAME_LINE_RE.search(fm_text)
    if not nm:
        continue

    raw_value = nm.group(1)            # captured value (may be quoted)
    name = strip_quotes(raw_value)
    if is_valid(name):
        continue

    slug = slugify(name)
    if not is_valid(slug):
        skipped.append((path, name, slug))
        continue

    # Rebuild the name line inside the original frontmatter slice, preserving
    # everything else (including original quoting of other lines) byte-for-byte.
    old_line = nm.group(0)              # full "name: ..." line as matched
    new_line = "name: " + slug
    new_fm_text = fm_text[: nm.start()] + new_line + fm_text[nm.end():]
    new_content = content[: fm.start(1)] + new_fm_text + content[fm.end(1):]

    with open(path, "w", encoding="utf-8") as f:
        f.write(new_content)
    changed.append((path, name, slug))

print(f"Scanned {total} SKILL.md files under {ROOT}")
print(f"Fixed {len(changed)} invalid name field(s):")
rel_root = os.path.expanduser("~/.pi/agent/skills")
for p, old, new in sorted(changed):
    rel = os.path.relpath(p, rel_root)
    print(f"  {old!r:45s} -> {new!r:25s}  ~/{os.path.join('.pi/agent/skills', rel)}")
if skipped:
    print(f"\nWARNING: {len(skipped)} still invalid after slugify (manual review):")
    for p, old, new in skipped:
        print(f"  {old!r} -> {new!r}  {p}")
