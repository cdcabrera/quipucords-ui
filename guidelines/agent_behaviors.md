# Agent Behaviors

## Overview

Comprehensive guide to agent behaviors, workflows, and standards for the ESLint Config Toolkit.

## For Agents

### Processing Priority

Critical - Process first when working with the repository.

### Related Guidelines

See the [Guidelines Index](./README.md#guidelines-index) for all guidelines.

### Key Concepts

- Repository context and structure
- Core behavior standards
- Trigger-based workflows
- Decision-making principles
- Guidance authoring standards

## 1. Repository Context

ESLint Config Toolkit provides:
- **Consistent Linting**: Standardized rules across project types
- **Modular Configurations**: Separate configs for different environments
- **Best Practices**: Enforces coding standards
- **Developer Experience**: Simplified ESLint setup

**Core Directories**:
- `configs/`: ESLint configurations
- `tests/`: Test files and fixtures
- `scripts/`: Utility scripts
- `guidelines/`: Documentation
- `.agent/`: Local agent state (gitignored)

**Key Files**:
- `index.js`: Main entry point
- `eslint.config.js`: Repository ESLint config
- `package.json`: Project metadata
- `README.md`, `CONTRIBUTING.md`, `DOCS.md`: Documentation

Uses ESLint's flat configuration system with configurations for:
- Base JavaScript
- Node.js
- React
- JSON
- Jest

Configurations can be used independently or combined.

## 2. Core Behavior Standards

- **Sequential Processing**: Ask questions one at a time; process requests in logical order; complete one task before starting another
- **Reference-Based Implementation**: Review git history; study existing patterns; maintain code style consistency
- **Validation Required**: Follow checklists; verify requirements; test thoroughly; validate against standards
- **Confirmation Required**: Confirm success; summarize changes; explain impact; verify understanding
- **State Management**: Use `.agent/` directory; maintain context; preserve session information

## 3. Trigger-Based Workflows

### Trigger: "How do I [pattern]"

1. **Research**
  - Check best practices
  - Identify relevant patterns
  - Review existing implementations

2. **Plan**
  - Determine files to update
  - Identify potential conflicts

2. **Report**
  - Summarize behavior
  - Highlight conflicts
  - Provide recommendations

### Trigger: "Make a PatternFly [pattern]"

1. **Research**
  - Check best practices
  - Identify relevant patterns
  - Review existing implementations

2. **Plan**
  - Determine files to update
  - Identify potential conflicts

3. **Implement**
  - Add pattern to appropriate files
  - Configure with proper options
  - Add explanatory comments

4. **Test**
  - Create/update tests
  - Add test cases
  - Run tests and update snapshots

5. **Document**
  - Update comments
  - Update documentation
  - Summarize changes

6. **Validate**
  - Run full test suite
  - Verify expected behavior
  - Check for side effects

## 4. Decision-Making Guidelines

1. **Consistency vs. Improvement**
  - Favor consistency for minor changes
  - Favor improvement for bugs and features
  - Balance both when possible

2. **Strictness vs. Flexibility**
  - Strict for quality/security
  - Flexible for style preferences
  - Consider developer experience

3. **Backward Compatibility**
  - Minimize breaking changes
  - Document when necessary

## 5. Validation Procedures

For all workflows:

1. **Testing**: Run appropriate tests, ensure passing, update snapshots only when intentional
2. **Documentation**: Verify accuracy, consistency, and helpful examples
3. **Code Quality**: Follow patterns, check edge cases, ensure clear comments

## 6. Guidance Authoring Principles

1. **Clarity**: Be specific and unambiguous
   ```markdown
   When implementing X, include: Y, severity (0-2), options, purpose comment
   ```

2. **Hierarchy**: Use clear section organization
   ```markdown
   ## Process
   1. Research
   2. Configure
   3. Test
   ```

3. **Context**: Provide rationale for recommendations
   ```markdown
   Use snake_case for consistency and cross-platform compatibility
   ```

4. **Machine-Actionable**: Structure for easy parsing
   ```markdown
   ### Template
   ```js
   /**
    * Purpose: Brief explanation
    *
    * returns {type}
    */
   const x = () => {};
   ```
   ```

## 7. Templates and Patterns

### Pattern Implementation

```markdown
# T.B.D.

## Configuration
```js
// Purpose: What this checks
T.B.D.
```

## Examples
```js
// Valid
const good = () => {};

// Invalid
const bad = function() {};
```

## Testing
How to test this implementation.
```

### Workflow

```markdown
# [Workflow] Guidelines

## Process Steps
1. **[Step 1]**: Description
2. **[Step 2]**: Description

## Decision Table
| Scenario | Action |
|----------|--------|
| Case 1 | Action 1 |
| Case 2 | Action 2 |
```

## Date and Time Management

Run `$ date` to get system date before applying dates. Used for:
- Updating timestamps in documentation
- Adding creation dates
- Recording when changes were made

## References

- [Guidelines Index](./README.md#guidelines-index)

Last updated: September 2, 2025
