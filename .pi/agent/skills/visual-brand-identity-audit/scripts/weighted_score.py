#!/usr/bin/env python3
"""Compute a weighted aggregate score for visual brand identity audit dimensions.

Input JSON (file path or stdin):
{
  "dimensions": [
    {
      "name": "Distinctiveness",
      "score": 7.5,
      "category_importance": 5,
      "client_importance": 4
    }
  ],
  "category_weight": 0.5,
  "client_weight": 0.5
}

Output JSON:
{
  "aggregate_score": 7.12,
  "rows": [...],
  "weights": {...}
}
"""

from __future__ import annotations

import argparse
import json
import sys
from dataclasses import dataclass
from typing import Any, Dict, List


@dataclass
class Dimension:
    name: str
    score: float
    category_importance: float
    client_importance: float


def clamp(value: float, low: float, high: float) -> float:
    return max(low, min(high, value))


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Compute weighted identity audit score")
    parser.add_argument(
        "--input",
        "-i",
        default="-",
        help="Path to input JSON. Use '-' for stdin (default).",
    )
    parser.add_argument(
        "--pretty",
        action="store_true",
        help="Pretty-print JSON output.",
    )
    return parser.parse_args()


def load_payload(path: str) -> Dict[str, Any]:
    if path == "-":
        raw = sys.stdin.read().strip()
        if not raw:
            raise ValueError("stdin is empty")
        return json.loads(raw)
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def validate_dimension(item: Dict[str, Any]) -> Dimension:
    required = ["name", "score", "category_importance", "client_importance"]
    missing = [key for key in required if key not in item]
    if missing:
        raise ValueError(f"dimension missing fields: {', '.join(missing)}")

    name = str(item["name"]).strip()
    if not name:
        raise ValueError("dimension name must be non-empty")

    score = clamp(float(item["score"]), 0.0, 10.0)
    category_importance = clamp(float(item["category_importance"]), 1.0, 5.0)
    client_importance = clamp(float(item["client_importance"]), 1.0, 5.0)

    return Dimension(
        name=name,
        score=score,
        category_importance=category_importance,
        client_importance=client_importance,
    )


def compute(payload: Dict[str, Any]) -> Dict[str, Any]:
    items = payload.get("dimensions", [])
    if not isinstance(items, list) or not items:
        raise ValueError("'dimensions' must be a non-empty list")

    c_weight = float(payload.get("category_weight", 0.5))
    cl_weight = float(payload.get("client_weight", 0.5))

    if c_weight < 0 or cl_weight < 0 or (c_weight + cl_weight) <= 0:
        raise ValueError("category_weight and client_weight must be non-negative and sum > 0")

    total_basis = c_weight + cl_weight
    c_weight /= total_basis
    cl_weight /= total_basis

    dims: List[Dimension] = [validate_dimension(item) for item in items]

    rows = []
    combined_sum = 0.0
    for dim in dims:
        combined_importance = (dim.category_importance * c_weight) + (
            dim.client_importance * cl_weight
        )
        rows.append(
            {
                "name": dim.name,
                "score": round(dim.score, 3),
                "category_importance": round(dim.category_importance, 3),
                "client_importance": round(dim.client_importance, 3),
                "combined_importance": combined_importance,
            }
        )
        combined_sum += combined_importance

    if combined_sum <= 0:
        raise ValueError("combined importance sum must be > 0")

    weighted_total = 0.0
    for row in rows:
        normalized_weight = row["combined_importance"] / combined_sum
        contribution = row["score"] * normalized_weight
        row["normalized_weight"] = round(normalized_weight, 6)
        row["weighted_contribution"] = round(contribution, 6)
        weighted_total += contribution

    return {
        "aggregate_score": round(weighted_total, 4),
        "weights": {
            "category_weight": round(c_weight, 4),
            "client_weight": round(cl_weight, 4),
        },
        "rows": rows,
    }


def main() -> int:
    args = parse_args()
    payload = load_payload(args.input)
    result = compute(payload)

    if args.pretty:
        print(json.dumps(result, indent=2, ensure_ascii=True))
    else:
        print(json.dumps(result, ensure_ascii=True))
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:  # pragma: no cover
        print(f"error: {exc}", file=sys.stderr)
        raise SystemExit(1)
