# Agent Guidelines

## Overview

This directory contains agent-specific development guidelines for consistent implementation patterns and workflows.

Note: This guide assumes online access.

## Available Guidelines

- **[PatternFly Development](./patternfly-development.md)** - PatternFly development and migration tools
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
- **Key Concepts**: Migration tools, AI guidelines, local discoveries
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
- NEVER add, stage, or commit agent-only file modifications to version-control-tracked resources unless specifically directed by the user.


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

### Final Steps

These Unified Final Steps provide a single, consistent flow for agents to set up and index agent resources.

1. One-time Setup Offer (opt-in)
   - Prompt: "I can set up local agent resources now: create .agent structure and index this repo to generate .agent/code-summary.md for faster help."
   - Proceed only on explicit confirmation.

2. code-summary.md (human-friendly, incremental)
   - Path: .agent/code-summary.md
   - Sections: Title, Last Updated, Project Snapshot, Repo Overview, Key Components & Routes, Testing & Tooling, Known Gaps
   - Linked guideline snapshots: If a specialized guideline includes a "Project Resources → Implementation Guide" path, agents may add a concise snapshot subsection that links to that implementation guide. If no implementation guide is declared, skip.
   - Regeneration: update incrementally.

3. Completion Signal and Next Actions
   - Post a concise summary: e.g., "Setup complete; created/updated .agent/code-summary.md; errors: N (see summary). Open the summary or start a specific task?"

4. Re-run and Throttling Policy
   - Do not re-offer setup for 7 days if .agent/.last_setup < 7 days old, unless the user types "setup" or "refresh".


Notes
- Keep destructive actions out of this flow; they require explicit confirmation.
