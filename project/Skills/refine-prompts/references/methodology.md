# Prompt Refinement Methodology

Use this reference for complex or mission-critical prompt rewrites.

## 1. Diagnose

Identify:
- Surface request.
- Underlying objective.
- Desired outcome.
- Missing context.
- Likely failure modes.
- Safety or governance risks.

## 2. Classify

Assign complexity:
- Simple: narrow request with low risk.
- Moderate: needs structure, role, constraints, and output format.
- Complex: multiple sources, tools, deliverables, or decisions.
- Mission-critical: production, destructive, legal/compliance, payment, deployment, credentials, customer-impacting, or irreversible actions.

Assign archetypes:
- Coding, debugging, architecture, audit, research, strategy, migration, documentation, testing, deployment, data task, content brief, stakeholder brief, or tool workflow.

## 3. Build Source Hierarchy

When sources exist, classify:
- Primary authority: explicit user instructions, contracts, governing requirements.
- Secondary authority: attached files, repository contents, source documents.
- Reference: external links, docs, research, tool output.
- Inspiration: examples, samples, style references.

Conflict rule:
Primary sources override secondary sources. Explicit user instructions override inferred context unless they conflict with safety, legal, or platform constraints. Examples guide style only unless marked authoritative.

## 4. Add Governance

Add approval gates for:
- Destructive changes.
- Production systems.
- Publishing, deployment, release, or submission.
- Account-level changes.
- Payments, billing, subscriptions, refunds.
- Credentials, secrets, tokens.
- Legal, privacy, compliance, or customer-impacting work.
- Repository modification when the user asked for review only.

## 5. Rewrite

Use the minimum structure needed for reliable execution:
- Role.
- Context.
- Goal.
- Scope and non-goals.
- Source hierarchy.
- Workflow.
- Tool rules.
- Deliverables.
- Output format.
- Validation.
- Acceptance criteria.
- Assumptions or clarifying questions.

## 6. Validate

Before returning, check:
- Intent is preserved.
- The embedded task is not solved.
- File paths, URLs, code, names, and technical terms are preserved.
- The prompt has a clear objective and definition of done.
- Relevant constraints and safety boundaries are explicit.
- Tool usage is operational and not decorative.
- The output is copy-paste-ready.
