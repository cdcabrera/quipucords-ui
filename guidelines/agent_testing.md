# Agent Testing

## Overview

Agent guidance on testing procedures and standards for the Quipucords-UI project (React + PatternFly).

## For Agents

### Processing Priority

High — Use when implementing changes that affect behavior, UI, or configuration.

### Related Guidelines

See the [Guidelines Index](./README.md#guidelines-index) for all related guidelines.

### Key Concepts

- Test types and their purposes (unit, integration, a11y, snapshot)
- Project scripts and execution patterns
- Snapshot verification discipline
- Machine-actionable test case structure

## Project Test Stack

- Test Runner: Jest 29 (jsdom)
- UI Testing: @testing-library/react, @testing-library/user-event, @testing-library/jest-dom
- Integration Tests: Jest under ./tests with separate roots
- Type Checking: TypeScript via tsc
- Lint Gate: ESLint (TS, TSX, JSON)

## Dynamic Project Analysis (MANDATORY)
Perform this via MCP (filesystem + shell). Before advising or running tests, inspect package.json to discover available commands and versions; validate environment with allowlisted shell commands.

- Quick MCP examples:
  - filesystem.read: `package.json` and `.eslintrc.js`
  - shell.run: `npm run test:types` and `npm run test:lint`
- Scripts:
  - test: runs test:ci-lint, test:ci-build, test:ci-coverage
  - test:dev: lint + local watch tests
  - test:local: jest --roots=./src --watch
  - test:integration: jest --roots=./tests
  - test:integration-dev: jest --roots=./tests --watchAll
  - test:types: tsc --noEmit
  - test:lint / test:lint-fix: ESLint
- Libraries:
  - React 18.3.x, PatternFly 6.3.x
  - @testing-library/react 16.x, jest 29.x

### Emulate Local Patterns
- Match the surrounding file/module’s established patterns (function style, import ordering, test style and queries, commenting). Default to codebase conventions; deviate only for correctness or clear quality improvements.

## Trigger-Based Workflows

### Trigger: "Test a React component"
1. Research
   - Identify component behaviors, props, and edge cases
   - Confirm React/RTL versions from package.json
   - Inventory local patterns: function style, import ordering/naming, test query preferences (byRole/name), accessibility approach (eslint-plugin-jsx-a11y; jest-axe as needed; react-axe optional, dev-only), and commenting (JSDoc-first); match the surrounding code
2. Plan
   - Select/create test file under src/**/__tests__
   - Define test data and user flows
3. Implement
   - Use RTL + user-event, focus on behavior and a11y roles/labels
   - Prefer queries by role/name; avoid test IDs unless necessary
4. Test
   - Run: npm run test:local (src root)
   - Add jest-axe only when a11y checks are needed
5. Validate
   - Ensure assertions reflect real UX; verify snapshots before updating

### Trigger: "Verify accessibility"
- Note: Runtime auditing (react-axe) is optional and for development use only. Activation steps are documented in the PatternFly guidance (see Guidelines Index).
1. Add an a11y test with jest-axe if the component renders complex ARIA/landmarks
2. Validate keyboard navigation and focus order with user-event
3. Ensure accessible names via role/label associations

### Trigger: "Update snapshots"
1. Run tests without updating snapshots (npm run test:dev or npm test)
2. Review snapshot diffs; confirm intentional UI changes
3. Update only when diffs are correct (use jest -u via your local workflow)

### Trigger: "Run integration tests"
1. Place/modify tests under ./tests with focused scenarios
2. Execute: npm run test:integration (or :integration-dev)
3. Keep integration tests resilient: avoid brittle selectors; prefer semantics

### Trigger: "Debug a failing test"
1. Reproduce locally with the narrowest command (test:local or direct jest pattern)
2. Add debug output sparingly; prefer RTL screen.debug()
3. Check async flows; await user interactions and async UI changes

## Test Types

- Unit/Component Tests (src root): behavior, interactions, minimal coupling
- Integration Tests (tests root): multi-component flows and side effects
- Accessibility Checks: jest-axe and semantic queries
- Snapshot Tests: capture intentional UI structure changes

## Creating Quality Tests

- Structure
  - Arrange-Act-Assert pattern; clear test names
  - Use TypeScript types for props and mocks
- Interactions
  - userEvent.setup(); await user.click/type/etc.
- Async UI
  - Use findBy* queries or waitFor for async changes
- Mocks
  - Provide typed mocks; reset between tests

## Snapshot Content Verification (MANDATORY)
Before updating snapshots, verify content:
1. Run tests without updating snapshots (npm test)
2. Examine diffs; ensure messages and structure match expectations
3. Confirm no unintended rule/behavior noise; adjust filters/mocks if needed
4. Document verification in PR description or test comments

## Commands Reference

- npm test — CI pipeline (lint, build, coverage)
- npm run test:dev — Lint then local tests
- npm run test:local — Watch mode for src tests
- npm run test:integration — Integration tests under ./tests
- npm run test:types — TypeScript check
- npm run test:lint — ESLint (json, ts, tsx)

## Validation Procedures

- Tests pass locally for affected areas (unit/integration)
- TypeScript: npm run test:types
- Lint: npm run test:lint (and fix if needed)
- Snapshots: Only updated after manual verification

## Date and Time Management
Run `date` locally before writing timestamps in docs. Use it for "Last updated" stamps and change logs.

Last updated: September 4, 2025
