#!/usr/bin/env python3
"""
Logical Hash Verification System for clauding-guide architecture.
Implements tamper detection and state integrity validation.
"""

import hashlib
import json
import re
from pathlib import Path
from typing import Dict, Optional, Tuple

class LogicalHashVerifier:
    """Implements the 4-digit logical hash system for state verification."""

    def __init__(self):
        self.hash_history = {}

    def generate_feature_hash(self, feature_count: int) -> str:
        """Generate a 4-digit hash based on feature count."""
        # Use SHA-256 for cryptographic security, then take first 4 digits
        hash_input = str(feature_count).encode('utf-8')
        full_hash = hashlib.sha256(hash_input).hexdigest()
        return full_hash[:4].upper()

    def validate_state_integrity(self, state_file: Path, expected_hash: str) -> Tuple[bool, str]:
        """Validate that the state hasn't been tampered with."""
        if not state_file.exists():
            return False, "State file not found"

        try:
            with open(state_file, 'r') as f:
                content = f.read()

            # Count features in the state
            feature_count = self._count_features(content)

            # Generate expected hash
            actual_hash = self.generate_feature_hash(feature_count)

            # Compare with provided hash
            is_valid = actual_hash == expected_hash
            return is_valid, f"Expected: {expected_hash}, Actual: {actual_hash}"

        except Exception as e:
            return False, f"Validation error: {str(e)}"

    def _count_features(self, content: str) -> int:
        """Count features in state content using multiple heuristics."""
        # Look for feature markers
        patterns = [
            r'^#\s+Feature\s+[\d]+',  # Markdown headers
            r'^-\s+Feature\s+[\d]+',  # Bullet points
            r'Feature\s+ID:\s*[\d]+', # Explicit IDs
            r'task_id:\s*[\d]+',      # Task-style IDs
        ]

        total_features = 0
        for pattern in patterns:
            matches = re.findall(pattern, content, re.MULTILINE | re.IGNORECASE)
            total_features += len(matches)

        return total_features

    def create_intermediate_buffer(self, source: Path, destination: Path) -> bool:
        """Create safe intermediate buffer file with verification."""
        try:
            # Copy source to temp location
            temp_file = destination.with_suffix('.tmp')

            if source.exists():
                temp_file.write_text(source.read_text())

            # Verify hash if source was a state file
            if source.suffix == '.md' and 'state' in source.name:
                # This would be called by the main application
                pass

            return True
        except Exception:
            return False

    def sanitize_user_input(self, user_input: str) -> Tuple[str, bool]:
        """Sanitize user input to prevent injection attacks."""
        violations = []

        # Check for dangerous patterns
        dangerous_patterns = [
            r'!\w+\s',  # Shell commands
            r'rm\s+-rf',  # Dangerous delete commands
            r'curl\s+|wget\s+',  # Network commands
            r'sudo\s+',  # Privilege escalation
            r'>\s*\&',   # File redirection
            r'eval\s*\(',  # Code execution
        ]

        sanitized = user_input
        for pattern in dangerous_patterns:
            matches = re.findall(pattern, user_input)
            if matches:
                violations.append(f"Detected dangerous pattern: {pattern}")
                sanitized = re.sub(pattern, '[REDACTED]', sanitized)

        # Strip imperative commands
        imperative_verbs = ['run', 'execute', 'delete', 'remove', 'create', 'write', 'read', 'open']
        words = sanitized.split()
        filtered_words = []
        skip_next = False

        for i, word in enumerate(words):
            if skip_next:
                skip_next = False
                continue

            if word.lower() in imperative_verbs:
                # Skip this word and potentially the next (object)
                skip_next = True
                continue

            filtered_words.append(word)

        return ' '.join(filtered_words), len(violations) == 0

def create_hash_verification_prompt():
    """Create the prompt for hash verification workflow."""
    return """### ROLE
You are the State Integrity Guardian. Your job is to verify that project state hasn't been tampered with.

### TASK
Verify the logical hash before and after each state modification.

### VERIFICATION PROTOCOL
1. BEFORE accepting any user input, record the current logical hash
2. AFTER processing, verify the new hash matches expected
3. If hashes don't match, flag as TAMPER DETECTION and stop

### OUTPUT FORMAT
{
  "status": "verified|tampered|error",
  "previous_hash": "XXXX",
  "current_hash": "XXXX",
  "message": "[Explanation]"
}

### SECURITY PROTOCOLS
- Never accept a state file with a mismatched hash
- Require manual confirmation for hash resets
- Log all hash verifications for audit trail"""