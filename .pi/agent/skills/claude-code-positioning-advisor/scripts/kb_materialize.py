#!/usr/bin/env python3
"""
Materialize a searchable text cache from the MiniMBA KB.

Why:
- The KB includes .pdf/.epub/.rtf which aren't easily grep-able without extraction.
- This script converts supported formats into plain .txt in a cache dir so searches are fast and repeatable.

It is intentionally dependency-light:
- RTF: uses macOS `textutil` (built-in).
- EPUB: uses stdlib zipfile + html.parser.
- PDF: optional (requires `pdfminer.six`).
"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import subprocess
import sys
import time
import zipfile
from html.parser import HTMLParser
from pathlib import Path


DEFAULT_KB_ROOT = (
    "/Users/andreitarnovski/Library/CloudStorage/GoogleDrive-andrei@tarnovski.com/"
    "Shared drives/Admin T.com/MiniMBA MK/Readings/MiniMBA-KB-strat"
)


class _HTMLToText(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self._chunks: list[str] = []

    def handle_data(self, data: str) -> None:
        if data:
            self._chunks.append(data)

    def text(self) -> str:
        s = "\n".join(self._chunks)
        # basic whitespace cleanup
        s = re.sub(r"[ \t]+\n", "\n", s)
        s = re.sub(r"\n{3,}", "\n\n", s)
        return s.strip()


def _sha1_for_path(p: Path) -> str:
    h = hashlib.sha1()
    with p.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def _ensure_dir(p: Path) -> None:
    p.mkdir(parents=True, exist_ok=True)


def _rtf_to_text(path: Path) -> str:
    # macOS built-in converter
    proc = subprocess.run(
        ["/usr/bin/textutil", "-convert", "txt", "-stdout", str(path)],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        check=False,
    )
    if proc.returncode != 0:
        raise RuntimeError(proc.stderr.decode("utf-8", errors="replace").strip())
    return proc.stdout.decode("utf-8", errors="replace")


def _epub_to_text(path: Path) -> str:
    chunks: list[str] = []
    with zipfile.ZipFile(path, "r") as z:
        names = [n for n in z.namelist() if n.lower().endswith((".xhtml", ".html", ".htm"))]
        # try to keep reading order stable-ish
        names.sort()
        for name in names:
            data = z.read(name)
            try:
                s = data.decode("utf-8")
            except UnicodeDecodeError:
                s = data.decode("utf-8", errors="replace")
            parser = _HTMLToText()
            parser.feed(s)
            t = parser.text()
            if t:
                chunks.append(t)
    out = "\n\n".join(chunks)
    out = re.sub(r"\n{3,}", "\n\n", out)
    return out.strip()


def _pdf_to_text(path: Path) -> str:
    try:
        from pdfminer.high_level import extract_text  # type: ignore
    except Exception as e:
        raise RuntimeError(
            "Missing PDF dependency. Install with:\n"
            "  python3 -m pip install --user pdfminer.six\n"
            f"Original error: {e}"
        )
    return extract_text(str(path)) or ""


def _should_regen(src: Path, dst: Path, manifest: dict) -> bool:
    if not dst.exists():
        return True
    key = str(src)
    meta = manifest.get(key)
    if not meta:
        return True
    try:
        st = src.stat()
    except FileNotFoundError:
        return False
    return (meta.get("mtime") != st.st_mtime) or (meta.get("size") != st.st_size)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--kb-root", default=DEFAULT_KB_ROOT)
    ap.add_argument(
        "--cache-dir",
        default=str(Path.home() / ".codex" / "kb_cache" / "minimba-kb-strat"),
        help="Where extracted .txt files are written",
    )
    ap.add_argument("--include-pdf", action="store_true", help="Extract PDFs (needs pdfminer.six)")
    ap.add_argument("--include-epub", action="store_true", help="Extract EPUBs")
    ap.add_argument("--include-rtf", action="store_true", help="Extract RTFs (uses textutil)")
    ap.add_argument("--force", action="store_true", help="Re-extract even if unchanged")
    args = ap.parse_args()

    kb_root = Path(args.kb_root)
    cache_dir = Path(args.cache_dir)
    _ensure_dir(cache_dir)

    manifest_path = cache_dir / "manifest.json"
    if manifest_path.exists():
        try:
            manifest = json.loads(manifest_path.read_text("utf-8"))
        except Exception:
            manifest = {}
    else:
        manifest = {}

    exts = {".txt"}  # always include existing txt files (copy-through)
    if args.include_rtf:
        exts.add(".rtf")
    if args.include_epub:
        exts.add(".epub")
    if args.include_pdf:
        exts.add(".pdf")

    sources = [p for p in kb_root.rglob("*") if p.is_file() and p.suffix.lower() in exts]
    sources.sort()

    converted = 0
    skipped = 0
    errors = 0

    for src in sources:
        try:
            rel = src.relative_to(kb_root)
        except Exception:
            rel = Path(src.name)

        # stable output file name; also avoids weird unicode/spacing issues in paths
        out_name = rel.as_posix().replace("/", "__")
        out_base = cache_dir / out_name
        dst = out_base.with_suffix(out_base.suffix + ".txt") if src.suffix.lower() != ".txt" else out_base

        try:
            st = src.stat()
        except FileNotFoundError:
            continue

        if not args.force and not _should_regen(src, dst, manifest):
            skipped += 1
            continue

        try:
            if src.suffix.lower() == ".txt":
                text = src.read_text("utf-8", errors="replace")
            elif src.suffix.lower() == ".rtf":
                text = _rtf_to_text(src)
            elif src.suffix.lower() == ".epub":
                text = _epub_to_text(src)
            elif src.suffix.lower() == ".pdf":
                text = _pdf_to_text(src)
            else:
                skipped += 1
                continue

            dst.parent.mkdir(parents=True, exist_ok=True)
            dst.write_text(text, "utf-8", errors="replace")

            manifest[str(src)] = {
                "rel": rel.as_posix(),
                "out": str(dst),
                "mtime": st.st_mtime,
                "size": st.st_size,
                "extracted_at": time.time(),
            }
            converted += 1
        except Exception as e:
            errors += 1
            print(f"[kb_materialize] ERROR: {src}\n  {e}", file=sys.stderr)

    manifest_path.write_text(json.dumps(manifest, indent=2, sort_keys=True), "utf-8")

    print(f"[kb_materialize] cache_dir={cache_dir}")
    print(f"[kb_materialize] converted={converted} skipped={skipped} errors={errors}")
    if errors:
        return 2
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

