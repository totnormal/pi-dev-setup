---
name: clauding-guide
disable-model-invocation: true
description: "Sophisticated prompt-as-code architecture implementing recursive context injection, implicit state machine, and security-by-design principles for structured project development. Use when Claude needs to: (1) Initialize project schemas with state persistence, (2) Implement cross-document referencing and reconciliation, (3) Generate secure governance policies, (4) Build task atomization systems, (5) Create hash verification workflows for integrity checking, or (6) Establish safe filesystem operations with intermediate buffers."
---

# Core Architecture Components

## 1. Project Architect Layer
- Hydrates environment with metadata files
- Establishes "Ground Truth" schema
- Maps user intent to structured format
- Generates 4-digit logical hash for verification

## 2. Logic Engine Layer
- Performs cross-referencing between state and feedback
- Detects contradictions and policy violations
- Atomizes features into technical tasks
- Maintains task ID continuity

## 3. Security Enforcement Layer
- Implements taint tracking (trusted vs untrusted data)
- Sanitizes all user input before processing
- Requires manual confirmation for write operations
- Prevents direct modification of state files

## 4. State Persistence Layer
- Uses filesystem as Long-Term Memory
- Implements intermediate buffer pattern
- Hash verification for tamper detection
- Atomic state transitions with rollback capability

## Usage Workflow

1. **Initialization**: `clauding.project_architect()` - Creates initial state with schema mapping
2. **Task Generation**: `clauding.logic_engine()` - Breaks down requirements into atomic tasks
3. **State Updates**: `clauding.update_state()` - Applies new feedback with validation
4. **Verification**: `clauding.verify_integrity()` - Checks state hasn't been tampered with

## Security Features

- **Input Sanitization**: Automatically strips dangerous patterns from user input
- **Policy Enforcement**: Validates against predefined rules before any operation
- **Hash Verification**: 4-digit checksums detect unauthorized modifications
- **Safe Writes**: All operations go through temp/ buffer first
- **Manual Override**: Critical operations require human confirmation

## Configuration

The system uses templating for project-specific policies:
- `templates/project_architect.md` - Schema initialization template
- `templates/logic_engine.md` - Task generation template
- `templates/secure_claude_generator.md` - Policy generation template

Built-in hash verification and secure state management are handled by:
- `scripts/hash_verification.py` - Integrity checking
- `scripts/secure_state_manager.py` - State transitions
- `scripts/intermediate_buffer.py` - Safe filesystem operations