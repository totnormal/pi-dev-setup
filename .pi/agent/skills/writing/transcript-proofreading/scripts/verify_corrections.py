"""
verify_corrections.py

Mechanical verifier for transcript proofreading. Confirms:
  1. The output JSON parses
  2. Each corrected term is present
  3. Each original mishearing is absent

Usage:
  python3 verify_corrections.py transcript.json

Adapt the `checks` dict to the corrections made in your session.
"""

import json
import sys
from pathlib import Path


def verify(json_path: Path, checks: dict[str, bool]) -> bool:
    """Run all checks. Return True only if every check passes."""
    raw = json_path.read_text(encoding="utf-8")
    data = json.loads(raw)  # raises on malformed JSON
    content = data.get("content", "")

    print(f"JSON parses OK")
    print(f"Total chars: {len(content)}")
    print(f"Total lines (split by newline): {content.count(chr(10)) + 1}")
    print()

    all_pass = True
    for label, predicate in checks.items():
        # callables let us do case-insensitive or custom checks
        if callable(predicate):
            result = predicate(content)
        else:
            result = bool(predicate)
        marker = "✓" if result else "✗"
        print(f"  {marker} {label}: {result}")
        if not result:
            all_pass = False

    print()
    print("ALL PASS" if all_pass else "FAILURES PRESENT")
    return all_pass


# ---- Edit this section per session -----------------------------------------
checks: dict[str, bool] = {
    # "<correct term> present": "<correct term>" in content,
    # "<old mishearing> removed": "<old mishearing>" not in content,
    # For case-insensitive checks, use a lambda:
    # "no lowercase 'claw code'": lambda c: "claw code" not in c.lower(),
}
# ---------------------------------------------------------------------------


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(__doc__)
        sys.exit(1)
    ok = verify(Path(sys.argv[1]), checks)
    sys.exit(0 if ok else 1)