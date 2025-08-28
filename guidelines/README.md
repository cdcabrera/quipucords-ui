# Agent Guidelines

## Overview

This directory contains agent-specific development guidelines for consistent implementation patterns and workflows.

## Available Guidelines

- **[PatternFly Development](./patternfly-development.md)** - PatternFly development, resource caching, and migration tools

## Initial Steps
1. **If the `./.agent/_resources` directory does not exist, ask the user if they want to create it.** The agent should explain how it's going to be used.

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

### Core Agent Behavior Standards

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
- **Confirmation Required**: Ask for user confirmation before completion
- **State Management**: Use `.agent/` directory for session continuity

### Caching Strategy

#### Purpose
- **Reduced Bandwidth**: Minimizes repeated downloads of large documentation
- **Faster Responses**: Local resources enable quicker access to guidance
- **Undocumented Discovery**: Local resources can reveal undocumented behaviors
- **Version Control**: Local copies can be versioned and updated at controlled intervals
- **Offline Access**: Ensures resources are available with minimal internet connectivity

#### Caching Process
1. **Request User Confirmation**: Before downloading/updating resources
2. **Check Resource Freshness**: Verify `.last_updated` timestamp (update if >30 days)
3. **Specify Resource**: Identify which repository/documentation to cache
4. **Create Timestamp**: Add `.last_updated` file with current date
5. **Document Dependencies**: Note related resources that should be cached together

#### Recommended Local Structure
```
.agent/_resources/
├── resource1/                     # A cached resource
│   └── .last_updated              # Timestamp file showing when resource was last updated
└── resource2/                     # Another cached resource
    └── .last_updated              # Timestamp file showing when resource was last updated
```

### Maintaining This File

**Important**: This file serves as an index and reference system only.

#### File Maintenance Principles
- **DO NOT recreate existing guidelines** - This file should only reference and index specialized guidelines, not duplicate their content
- **DO update agent-specific references** - When new guideline markdown files are added to the `guidelines/` directory, update the "Available Guidelines" section
- **Keep it concise** - Focus on indexing rather than comprehensive implementation details

#### When Adding New Guidelines
1. Add new guideline link to "Available Guidelines" section and provide a brief description focusing on what the guideline covers
2. Add new guideline entry to "Agent-Only Index -> Available Guidelines" section and include essential metadata: File, Version, Priority, Applies To, Contexts, Key Concepts, Trigger Prefixes
3. Update the "Agent-Only Index -> Available Guidelines" section processing order if needed.
4. Maintain alphabetical organization within categories
