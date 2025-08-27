# Agent Guidelines

## Overview

Agent-specific development guidelines for the Quipucords-UI project, optimized for machine processing.

## File Naming Convention

- `agent_*`: Guidance for autonomous agents

## Guidelines Index

### Agent Guidelines

- [Agent Behaviors](./agent_behaviors.md) - Comprehensive guide to agent behaviors, workflows, and standards
- [Agent PatternFly Development](./agent_patternfly_development.md) - PatternFly development and migration tools
- [Agent React Development](./agent_react_development.md) - React development, TypeScript integration, and performance optimization
- [Agent Testing](./agent_testing.md) - Testing procedures for React + PatternFly components and integration
- [Agent Comments](./agent_comments.md) - Comment templates and standards

## User Guide

### Available Trigger Phrases

- General
  - **`review the repo guidelines`** — Scan markdown files and guidelines directory
  - **`How do I [pattern]`** — Research and analyze behavior

- React
  - **`Implement a React component`** — End-to-end component workflow (Research → Plan → Implement → Test → Document → Validate)
  - **`Optimize React performance`** — Profiling and memoization/code-splitting workflow
  - **`Write tests for React component`** — RTL + user-event; a11y as applicable
  - **`Plan React migration`** — Version analysis and incremental adoption

- PatternFly
  - **`Make a PatternFly [pattern]`** — End-to-end PF pattern implementation with a11y/testing
  - **`Plan PatternFly migration`** — Version inventory and codemods plan
  - **`Diagnose a PatternFly bug`** — Reproduce, verify versions, propose official-API workaround

- Testing
  - **`Test a React component`** — Behavior-first component tests
  - **`Verify accessibility`** — jest-axe and keyboard/focus checks; react-axe (optional, dev-only)
  - **`Run integration tests`** — ./tests root execution with resilient selectors
  - **`Update snapshots`** — Verify diffs before intentional updates
  - **`Debug a failing test`** — Reproduce, inspect async flows, and stabilize tests

## Guidelines Processing Order

1. **Guidelines Directory** (all files in the `guidelines/` directory)
2. **Local Guidelines** (`.agent/` directory)

## Maintaining This Directory

### File Maintenance Principles
- Reference and index guidelines, don't duplicate content
- Update references when adding new files
- Keep descriptions concise and focused

### Adding New Guidelines
1. Add entry to "Guidelines Index" section
2. Include essential metadata
3. Provide brief description
4. Update processing order if needed

Last updated: September 4, 2025
