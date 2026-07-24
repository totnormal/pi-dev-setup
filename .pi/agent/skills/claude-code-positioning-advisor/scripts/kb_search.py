#!/usr/bin/env python3
"""
Search the MiniMBA KB (and optionally the extracted cache) for grounding excerpts.

Default behavior:
- Search KB-root *.txt (fast and usually sufficient).
- Also search the materialized cache if it exists.

Output is designed for quick citation: file + line number + snippet.
"""

from __future__ import annotations

import argparse
import os
import subprocess
import sys
from pathlib import Path


DEFAULT_KB_ROOT = (
    "/Users/andreitarnovski/Library/CloudStorage/GoogleDrive-andrei@tarnovski.com/"
    "Shared drives/Admin T.com/MiniMBA MK/Readings/MiniMBA-KB-strat"
)

DEFAULT_CACHE_DIR = str(Path.home() / ".codex" / "kb_cache" / "minimba-kb-strat")


def _have_rg() -> bool:
    return bool(shutil_which("rg"))


def shutil_which(cmd: str) -> str | None:
    # avoid importing shutil just for which
    for p in os.environ.get("PATH", "").split(os.pathsep):
        cand = Path(p) / cmd
        if cand.exists() and os.access(cand, os.X_OK):
            return str(cand)
    return None


def _run_rg(query: str, root: str, glob: str, max_results: int) -> list[str]:
    rg = shutil_which("rg")
    if not rg:
        return []
    # -n: line numbers, -S: smart case, --no-heading: stable output
    cmd = [
        rg,
        "-n",
        "-S",
        "--no-heading",
        "--glob",
        glob,
        query,
        root,
    ]
    proc = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=False)
    if proc.returncode not in (0, 1):
        err = proc.stderr.decode("utf-8", errors="replace").strip()
        raise RuntimeError(err or f"rg failed with code {proc.returncode}")
    lines = proc.stdout.decode("utf-8", errors="replace").splitlines()
    if max_results > 0:
        lines = lines[:max_results]
    return lines


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("query", help="Search query (rg syntax)")
    ap.add_argument("--kb-root", default=DEFAULT_KB_ROOT)
    ap.add_argument("--glob", default="*.txt", help="rg --glob pattern (default: *.txt)")
    ap.add_argument("--cache-dir", default=DEFAULT_CACHE_DIR)
    ap.add_argument("--no-cache", action="store_true", help="Do not search the cache dir")
    ap.add_argument("--max", type=int, default=40, help="Max results per root (default: 40)")
    args = ap.parse_args()

    kb_root = Path(args.kb_root)
    if not kb_root.exists():
        print(f"[kb_search] KB root not found: {kb_root}", file=sys.stderr)
        return 2

    roots: list[Path] = [kb_root]
    cache_dir = Path(args.cache_dir)
    if not args.no_cache and cache_dir.exists():
        roots.append(cache_dir)

    printed_any = False
    for root in roots:
        try:
            hits = _run_rg(args.query, str(root), args.glob, args.max)
        except Exception as e:
            print(f"[kb_search] ERROR searching {root}: {e}", file=sys.stderr)
            continue

        if not hits:
            continue

        printed_any = True
        print(f"== {root} ==")
        for h in hits:
            print(h)
        print()

    if not printed_any:
        print("[kb_search] No matches found.")
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

