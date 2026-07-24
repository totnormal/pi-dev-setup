#!/usr/bin/env python3
"""
Secure State Manager for clauding-guide architecture.
Implements the intermediate buffer pattern and safe filesystem operations.
"""

import os
import json
import shutil
from pathlib import Path
from typing import Dict, Optional, Tuple
from hash_verification import LogicalHashVerifier

class SecureStateManager:
    """Manages secure state transitions with intermediate buffering."""

    def __init__(self, project_root: Path):
        self.project_root = project_root
        self.temp_dir = project_root / "temp"
        self.state_dir = project_root / "think"
        self.verifier = LogicalHashVerifier()

        # Ensure directories exist
        self.temp_dir.mkdir(exist_ok=True)
        self.state_dir.mkdir(exist_ok=True)

    def initialize_project(self, user_input: str) -> Tuple[bool, Dict]:
        """Initialize project state with security validation."""
        # Sanitize user input
        sanitized_input, is_clean = self.verifier.sanitize_user_input(user_input)

        if not is_clean:
            return False, {"error": "Input validation failed", "violations": "Detected dangerous patterns"}

        # Create initial state
        state_file = self.state_dir / "01_state.md"
        feature_count = self._count_features_in_input(sanitized_input)
        logical_hash = self.verifier.generate_feature_hash(feature_count)

        # Write to temp buffer first
        temp_state = self.temp_dir / "01_state.tmp"
        with open(temp_state, 'w') as f:
            f.write(f"""# Project State v1.0
## Validated Intent: {sanitized_input[:100]}...
## Schema Mapping:
- Problem: [Extracted from sanitized input]
- Solution: [Initial approach]
- TechStack: [Recommended technologies]
- RiskMatrix: [Initial assessment]
---
### LOGICAL HASH
{logical_hash}
### SECURITY AUDIT
- [ ] No imperative commands detected
- [ ] No policy violations (initial state)
- [ ] Intent clearly mapped to schema
""")

        # Move to final location after verification
        if self._verify_integrity(temp_state, logical_hash):
            shutil.move(temp_state, state_file)
            return True, {
                "state_file": str(state_file),
                "logical_hash": logical_hash,
                "feature_count": feature_count,
                "message": "Project initialized successfully"
            }
        else:
            temp_state.unlink(missing_ok=True)
            return False, {"error": "Integrity verification failed"}

    def update_state(self, user_feedback: str) -> Tuple[bool, Dict]:
        """Update state with cross-reference validation."""
        state_file = self.state_dir / "01_state.md"

        if not state_file.exists():
            return False, {"error": "No existing state to update"}

        # Read existing state
        with open(state_file, 'r') as f:
            existing_content = f.read()

        # Extract current hash
        current_hash = self._extract_hash_from_content(existing_content)

        # Sanitize feedback
        sanitized_feedback, is_clean = self.verifier.sanitize_user_input(user_feedback)

        if not is_clean:
            return False, {"error": "Feedback validation failed"}

        # Generate updated state in temp buffer
        temp_state = self.temp_dir / "01_state_updated.tmp"
        updated_content = self._generate_updated_state(existing_content, sanitized_feedback)

        with open(temp_state, 'w') as f:
            f.write(updated_content)

        # Verify no policy violations
        if self._check_policy_violations(existing_content, sanitized_feedback):
            temp_state.unlink(missing_ok=True)
            return False, {"error": "Policy violation detected in feedback"}

        # Verify integrity and commit
        new_feature_count = self._count_features_in_content(updated_content)
        new_hash = self.verifier.generate_feature_hash(new_feature_count)

        if self._verify_integrity(temp_state, new_hash):
            shutil.move(temp_state, state_file)
            return True, {
                "state_file": str(state_file),
                "previous_hash": current_hash,
                "new_hash": new_hash,
                "message": "State updated successfully"
            }
        else:
            temp_state.unlink(missing_ok=True)
            return False, {"error": "Integrity verification failed"}

    def generate_tasks(self, user_feedback: str) -> Tuple[bool, Dict]:
        """Generate atomic tasks from state and feedback."""
        state_file = self.state_dir / "01_state.md"

        if not state_file.exists():
            return False, {"error": "No existing state found"}

        # Read state
        with open(state_file, 'r') as f:
            state_content = f.read()

        # Extract hash
        expected_hash = self._extract_hash_from_content(state_content)

        # Sanitize feedback
        sanitized_feedback, is_clean = self.verifier.sanitize_user_input(user_feedback)

        if not is_clean:
            return False, {"error": "Feedback validation failed"}

        # Check for contradictions
        if self._check_contradictions(state_content, sanitized_feedback):
            return False, {
                "error": "Policy violation",
                "reasoning": "Feedback contradicts existing state"
            }

        # Generate tasks
        tasks = self._atomize_requirements(state_content, sanitized_feedback)

        return True, {
            "version": "1.0",
            "logical_hash": expected_hash,
            "security_audit": "Clean",
            "reasoning": "Feedback reconciled with existing state",
            "tasks": tasks
        }

    def _verify_integrity(self, file_path: Path, expected_hash: str) -> bool:
        """Verify file integrity with hash check."""
        is_valid, message = self.verifier.validate_state_integrity(file_path, expected_hash)
        return is_valid

    def _count_features_in_input(self, text: str) -> int:
        """Count features in user input."""
        return len(text.split('\n'))  # Simple count for initialization

    def _count_features_in_content(self, content: str) -> int:
        """Count features in state content."""
        return self.verifier._count_features(content)

    def _extract_hash_from_content(self, content: str) -> Optional[str]:
        """Extract logical hash from state content."""
        lines = content.split('\n')
        for line in lines:
            if 'LOGICAL HASH' in line:
                return line.split('LOGICAL HASH')[1].strip()
        return None

    def _check_policy_violations(self, existing_state: str, new_feedback: str) -> bool:
        """Check if new feedback violates existing policies."""
        # Simple check for direct contradictions
        prohibited_keywords = ['delete', 'remove', 'destroy']
        for keyword in prohibited_keywords:
            if keyword in new_feedback.lower():
                return True
        return False

    def _check_contradictions(self, state: str, feedback: str) -> bool:
        """Check for contradictions between state and feedback."""
        # Implement cross-reference logic
        return False  # Placeholder

    def _atomize_requirements(self, state: str, feedback: str) -> list:
        """Break down requirements into atomic tasks."""
        # Implement task atomization
        return [
            {
                "id": 1,
                "desc": "Implement core feature based on state",
                "complexity": "medium",
                "dependencies": [],
                "validation": "Feature works as specified"
            }
        ]

    def require_manual_confirmation(self, operation: str) -> bool:
        """Prompt for manual confirmation before operations."""
        print(f"\n🔒 SECURITY WARNING: About to perform {operation}")
        print("This operation requires manual confirmation.")
        response = input("Do you want to continue? (Y/N): ").strip().upper()
        return response == 'Y'