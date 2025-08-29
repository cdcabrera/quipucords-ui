# Agent Guidelines

## Overview

This directory contains agent-specific development guidelines for consistent implementation patterns and workflows.

## Available Guidelines

- **[PatternFly Development](./patternfly-development.md)** - PatternFly development, resource caching, and migration tools
- **[React Development](./react-development.md)** - React development, TypeScript integration, and performance optimization

## Agent-Only Index

### Guidelines Processing Order

1. **Core Guidelines** (this file) - Fundamental standards and overview
2. **Specialized Guidelines** - Domain-specific implementation instructions
3. **Local Guidelines** (`.agent/` directory) - Agent-generated session-specific guidance

### Available Guidelines

#### PatternFly Development
- **File**: `patternfly-development.md`
- **Version**: 1.0
- **Priority**: High
- **Applies To**: PatternFly component development, migration planning, resource management
- **Contexts**: Component creation, version upgrades, AI-assisted development
- **Key Concepts**: Resource caching, migration tools, AI guidelines, local discoveries
- **Trigger Prefixes**: "patternfly", "PF", "pf"
- **Description**: Reference system for PatternFly development resources, and migration tools.

#### React Development
- **File**: `react-development.md`
- **Version**: 1.0
- **Priority**: High
- **Applies To**: React component development, TypeScript integration, performance optimization
- **Contexts**: Component architecture, hooks usage, testing strategies, code quality
- **Key Concepts**: TypeScript patterns, performance optimization, testing best practices, React 18/19 features
- **Trigger Prefixes**: "react", "typescript", "ts", "hooks", "performance"
- **Description**: Comprehensive React development guidelines with TypeScript integration and performance optimization.

### Core Agent Guidance Behavior Standards

<!--
Before the agent runs `$ date` the agent should explain what it's going to be used for. Agents should attempt to run `$ date` to get the system date before applying dates and times anywhere.

Common uses for dates include:
- Updating "Last Updated" timestamps in documentation files
- Adding creation dates to new files or savepoints
- Timestamping conversation states or session information
- Recording when changes or updates were made to configuration files
- Ensuring accurate date references in commit messages or change logs
-->

- **Sequential Processing**: Ask questions one at a time, wait for responses
- **Reference-Based Implementation**: Review git reference commits before implementation
- **Validation Required**: Follow file checklists and run validation commands
- **Confirmation Model**: Use a single umbrella confirmation for non-destructive setup (default proceed unless the user says "no" or "customize"). Require explicit confirmation for any destructive or irreversible actions
- **State Management**: Use `.agent/` directory for session continuity

#### Agent Artifacts

- Policy: Do not add, stage, or commit agent-only guidance or guidance-related resource files to the repository unless specifically dictated by the user.

**Prohibited**:
- NEVER recreate or override the `.agent` `.gitignore` rule.
- NEVER add any agent-created guidance resources outside `.agent/` unless specifically directed by the user.
- NEVER add any sidecar metadata files for `.agent/` resources, all-provenance lives in `.agent/_resources/resource-manifest.json`.
- NEVER add, stage, or commit agent-only file modifications to version-control-tracked resources unless specifically directed by the user.

#### Caching Strategy

- Default: cache docs under `.agent/_resources/` (created via Unified Final Steps).
- Local-only rule: All cached resources must be stored under `.agent/_resources` and remain local; they must not be committed to the repository.
- Trigger: covered by the umbrella confirmation (proceed unless user says "no" or "customize").
- Freshness: refresh if the manifest entry’s `lastCheckedAt` is older than 30 days.
- Process: if missing or stale, fetch/refresh the resource; update the manifest entry’s `modified` (observed mtime or server time) and `lastCheckedAt` (now).
- Fetch means one of: (a) shallow-clone related git repositories; (b) generate lightweight local guidance when full offline caching isn’t practical.
- Freshness and status are determined exclusively from `.agent/_resources/resource-manifest.json`. Resource directories are not used for freshness decisions.
- All caching/refresh worklists are built from manifest entries. If a required resource isn’t in the manifest, create an entry first, then process it.
- Provenance/traceability is recorded in the central manifest entry (e.g., `source`, `version`); do not create sidecar files.
- Scope: resources are defined by specialized guidelines (e.g., PatternFly, React).
- Structure (example):
`.agent/_resources/<resource>/`

##### Resource Discovery and Caching
- **MANDATORY**: Before creating any documentation, scan ALL specialized guidelines for required resources
- **Automatic Discovery**: Each specialized guideline defines its required resources (e.g., PatternFly repos, React docs)
- **Cross-Reference**: Ensure all resources from all guidelines are included in the manifest
- **Comprehensive Caching**: Cache resources from ALL available guidelines, not just the current task's guideline
- **Future-Proof**: Maintain generic guidance to allow for future guideline resources without code changes

##### Resource Manifest
- Location: `.agent/_resources/resource-manifest.json`
- Ownership: Agent-maintained only; users do not edit.
- Minimum entry fields: `id`, `location`, `modified` (ISO8601), `status` ("pending" | "success" | "failed"), `lastCheckedAt` (ISO8601).
- Update triggers: Create if missing; update during caching, scanning, and processing steps.
- Keep it simple; future agents may extend as needed (e.g., `statusDetail`, `tags`, `checksum`).
- Extensions (e.g., `source`, `version`) must be added to manifest entries, not as additional files.

### Maintaining This File

**Important**: This file serves as an index and reference system only.

#### File Maintenance Principles
- **DO NOT recreate existing guidelines** - This file should only reference and index specialized guidelines, not duplicate their content
- **DO update agent-specific references** - When new guideline markdown files are added to the `guidelines/` directory, update the "Available Guidelines" section
- **Keep it concise** - Focus on indexing rather than comprehensive implementation details
- **MANDATORY**: Ensure all specialized guidelines are properly indexed and cross-referenced
- **MANDATORY**: Maintain consistency between guideline metadata and actual guideline content

#### When Adding New Guidelines
1. **Add new guideline link** to "Available Guidelines" section and provide a brief description focusing on what the guideline covers
2. **Add new guideline entry** to "Agent-Only Index -> Available Guidelines" section and include essential metadata: File, Version, Priority, Applies To, Contexts, Key Concepts, Trigger Prefixes
3. **Update processing order** if needed in the "Agent-Only Index -> Available Guidelines" section
4. **Maintain alphabetical organization** within categories
5. **MANDATORY**: Update resource manifest to include any required resources defined by the new guideline
6. **MANDATORY**: Ensure all existing resources from other guidelines are still included in the manifest

### Final Steps

These Unified Final Steps provide a single, consistent, flow for agents to set up and index agent resources. They are user opt-out.

1. One-time Setup Offer (default-yes, 15-second grace)
   - Prompt: "I can set up local agent resources now: create .agent structure, scan and cache docs, and index this repo to generate .agent/code-summary.md for faster, offline-aware help. I’ll proceed in 15 seconds unless you say 'no' or 'customize'."
   - Options recognized: yes/proceed, no/stop, customize (choose resources, limit size/time, skip large repos, offline-only)
   - If no response after 15 seconds, proceed.

2. Resource Caching
   - Cache resources under `.agent/_resources/...` when applicable.
   - After each attempt, update the manifest entry (`modified`, `lastCheckedAt`, `status`).
   - Refresh if `lastCheckedAt` > 30 days (per manifest).
   - On failure, record the error in the completion summary and continue.
   - Local-only: All cached outputs are local-only and untracked; do not commit `.agent/` contents.

3. Resource Scanning
   - Scan `.agent/_resources/...` for resources defined by specialized guidelines.
   - Update or insert corresponding entries in `.agent/_resources/resource-manifest.json`.
   - Agents may compute in-memory indexes for convenience; do not persist additional index files. The central manifest remains authoritative.
   - If scanning produces a failure, note it then continue to the next resource.
   - If caching is skipped, do an online scan of the resource.

4. code-summary.md (human-friendly, incremental)
   - Path: .agent/code-summary.md
   - Sections: Title, Last Updated, Project Snapshot, Repo Overview, Key Components & Routes, Testing & Tooling, Known Gaps
   - Linked guideline snapshots: If a specialized guideline includes a "Project Resources → Implementation Guide" path, agents may add a concise snapshot subsection that links to that implementation guide. If no implementation guide is declared, skip.
   - Regeneration: update incrementally.

5. Completion Signal and Next Actions
   - Post a concise summary: e.g., "Setup complete: cached X resources, skipped X resources, scanned Y resources; created/updated .agent/code-summary.md; errors: N (see summary). Open the summary or start a specific task?"

6.  Re-run and Throttling Policy
   - Do not re-offer setup for 7 days if .agent/.last_setup < 7 days old, unless the user types "setup" or "refresh".
   - Re-offer caching refresh only if the manifest’s `lastCheckedAt` for relevant resources is older than 30 days, or on user request.


Notes
- Keep destructive actions out of this flow; they require explicit confirmation.
