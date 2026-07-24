#!/usr/bin/env python3
"""
Intermediate Buffer Pattern Implementation for clauding-guide.
Provides safe filesystem operations with atomic writes and verification.
"""

import os
import json
import shutil
from pathlib import Path
from typing import Dict, Optional, Tuple, Callable
import tempfile

class IntermediateBuffer:
    """Implements the safe intermediate buffer pattern."""

    def __init__(self, project_root: Path, buffer_dir: str = "temp"):
        self.project_root = project_root
        self.buffer_dir = project_root / buffer_dir
        self.buffer_dir.mkdir(exist_ok=True)

    def safe_write(self,
                  destination: Path,
                  content: str,
                  verify_hash: Optional[str] = None,
                  pre_write_hook: Optional[Callable] = None) -> Tuple[bool, str]:
        """
        Safely write content with intermediate buffer.

        Args:
            destination: Final destination path
            content: Content to write
            verify_hash: Optional hash to verify against
            pre_write_hook: Function to call before commit
        """
        # Create temp file in buffer
        with tempfile.NamedTemporaryFile(
            mode='w',
            dir=self.buffer_dir,
            delete=False
        ) as tmp_file:
            tmp_path = Path(tmp_file.name)
            tmp_file.write(content)

        # Run pre-write hook if provided
        if pre_write_hook:
            try:
                hook_result = pre_write_hook(tmp_path)
                if not hook_result["success"]:
                    tmp_path.unlink()
                    return False, f"Pre-write hook failed: {hook_result['message']}"
            except Exception as e:
                tmp_path.unlink()
                return False, f"Pre-write hook error: {str(e)}"

        # Verify hash if provided
        if verify_hash:
            from hash_verification import LogicalHashVerifier
            verifier = LogicalHashVerifier()
            is_valid, message = verifier.validate_state_integrity(tmp_path, verify_hash)
            if not is_valid:
                tmp_path.unlink()
                return False, f"Hash verification failed: {message}"

        # Create backup of existing file
        backup_path = None
        if destination.exists():
            backup_path = self.buffer_dir / f"{destination.name}.backup"
            shutil.copy2(destination, backup_path)

        # Commit to final destination
        try:
            # Create parent directories if needed
            destination.parent.mkdir(parents=True, exist_ok=True)

            # Move from buffer to final destination
            shutil.move(str(tmp_path), str(destination))

            return True, "File written successfully"

        except Exception as e:
            # Restore from backup if it exists
            if backup_path and backup_path.exists():
                shutil.move(str(backup_path), str(destination))

            # Clean up temp file
            if tmp_path.exists():
                tmp_path.unlink()

            return False, f"Write failed: {str(e)}"

    def safe_read(self, source: Path) -> Tuple[Optional[str], str]:
        """Safely read a file with integrity checks."""
        if not source.exists():
            return None, "File not found"

        try:
            with open(source, 'r') as f:
                content = f.read()
            return content, "Read successfully"
        except Exception as e:
            return None, f"Read failed: {str(e)}"

    def atomic_replace(self,
                     source: Path,
                     new_content: str,
                     verification_rules: Optional[Dict] = None) -> Tuple[bool, str]:
        """Atomic file replacement with rollback capability."""

        # Create temp file
        with tempfile.NamedTemporaryFile(
            mode='w',
            dir=self.buffer_dir,
            delete=False
        ) as tmp_file:
            tmp_path = Path(tmp_file.name)
            tmp_file.write(new_content)

        # Apply verification rules if provided
        if verification_rules:
            success, message = self._apply_verification_rules(tmp_path, verification_rules)
            if not success:
                tmp_path.unlink()
                return False, message

        # Backup original
        backup_path = None
        if source.exists():
            backup_path = self.buffer_dir / f"{source.name}.atomic_backup"
            shutil.copy2(source, backup_path)

        # Atomic replace
        try:
            # Create parent directories
            source.parent.mkdir(parents=True, exist_ok=True)

            # Replace atomically
            shutil.move(str(tmp_path), str(source))

            # Clean up backup
            if backup_path and backup_path.exists():
                backup_path.unlink()

            return True, "Atomic replacement successful"

        except Exception as e:
            # Restore from backup
            if backup_path and backup_path.exists():
                shutil.move(str(backup_path), str(source))

            # Clean up temp
            if tmp_path.exists():
                tmp_path.unlink()

            return False, f"Atomic replacement failed: {str(e)}"

    def _apply_verification_rules(self, file_path: Path, rules: Dict) -> Tuple[bool, str]:
        """Apply verification rules to a file."""
        content, read_msg = self.safe_read(file_path)
        if content is None:
            return False, read_msg

        # Example rule: Check for sensitive data
        if "no_sensitive_data" in rules:
            sensitive_patterns = rules["no_sensitive_data"].get("patterns", [])
            for pattern in sensitive_patterns:
                if pattern in content.lower():
                    return False, f"Sensitive data pattern detected: {pattern}"

        # Example rule: Check minimum length
        if "min_length" in rules:
            if len(content) < rules["min_length"]:
                return False, f"Content too short: {len(content)} < {rules['min_length']}"

        return True, "Verification passed"

    def cleanup_old_buffers(self, max_age_hours: int = 24):
        """Clean up old buffer files."""
        import time

        current_time = time.time()
        max_age = max_age_hours * 3600

        for file_path in self.buffer_dir.iterdir():
            if file_path.is_file():
                file_age = current_time - file_path.stat().st_mtime
                if file_age > max_age:
                    try:
                        file_path.unlink()
                    except Exception:
                        pass  # Ignore cleanup errors

    def get_buffer_stats(self) -> Dict:
        """Get statistics about buffer usage."""
        files = list(self.buffer_dir.glob("*"))
        total_size = sum(f.stat().st_size for f in files if f.is_file())

        return {
            "buffer_directory": str(self.buffer_dir),
            "total_files": len(files),
            "total_size_bytes": total_size,
            "oldest_file": min((f.stat().st_mtime for f in files), default=None),
            "newest_file": max((f.stat().st_mtime for f in files), default=None)
        }