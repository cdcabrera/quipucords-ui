# Agent Setup Plan (Agent-Agnostic)

Purpose: Provide a self-contained plan any agent can follow to set up local, gitignored implementation documentation and optional tooling without needing to scan repository guidelines.

Last updated: 2025-09-17

---

## Outcomes
By following this plan, you will:
- Create a local .agent directory (gitignored) for project-specific analysis notes.
- Initialize three implementation documents with copy-ready templates:
  - .agent/react-implementation.md
  - .agent/patternfly-implementation.md
  - .agent/patternfly-discoveries.md
- Add a simple .agent/README.md for navigation.
- Optionally document PatternFly MCP integration (no repo changes unless explicitly approved).

Notes
- Do NOT add a new guideline file to the repository for local scaffolding; keep this plan and local docs only.
- Keep diffs minimal; do not commit .agent contents unless your team explicitly wants them versioned.

---

## Prerequisites
- Ability to create local files in this repository’s working copy.
- No specific Node/NPM steps are required for documentation scaffolding.
- Optional (only if enabling MCP locally): Node 22+ to run the PatternFly MCP server via npx.

---

## Setup Steps (Copy-Ready)

1) Ensure .agent is ignored by Git
- Check if .agent is already in .gitignore. If it isn’t, follow your team policy:
  - Preferred: keep .agent uncommitted; add .agent/ to your personal global gitignore.
  - Alternative (if team agrees): add .agent/ to project .gitignore via a normal PR.
- Proceed with local creation regardless; do not commit unless your team requires it.

2) Create the local directory and files
- Create a directory in the repo root: .agent
- Create these files inside it:
  - .agent/README.md
  - .agent/react-implementation.md
  - .agent/patternfly-implementation.md
  - .agent/patternfly-discoveries.md

3) Seed files with the templates below
- Replace [YYYY-MM-DD] with today’s date.
- Replace bracketed placeholders like [Project Name] with this repository’s name where appropriate.

4) Cross-linking policy and navigation
- In local .agent docs, you may reference top-level README.md and CONTRIBUTING.md for general project commands.
- Avoid deep-linking across internal guidelines; keep links simple and stable.

5) Optional: PatternFly MCP integration (documentation only)
- If you choose to enable the PatternFly MCP server locally for agent assistance, add the short note in .agent/README.md or .agent/patternfly-implementation.md (see template note). Do not modify package.json or add mcp-config.json unless your team approves.

6) Maintenance and cadence
- Update .agent docs when dependencies (React/PatternFly/testing/TypeScript) change or when you plan migrations.
- Keep entries concise, factual, and timestamped with Last updated.

---

## Templates (Copy into the respective files)

File: .agent/README.md

# .agent Documentation

Purpose: Project-specific implementation notes that complement standard repository docs.

Contents
- react-implementation.md — React usage analysis and plans
- patternfly-implementation.md — PatternFly usage analysis and plans
- patternfly-discoveries.md — Ongoing PF notes (quirks, deprecations, codemods)

Update Policy
- Keep entries concise, factual, and timestamped
- Prefer links to code (commit/PR) and external references
- Update on notable changes (package upgrades, migrations, architectural shifts)

Navigation
- See repository README.md and CONTRIBUTING.md for commands and contribution processes.

Optional: MCP Integration (for agents)
- If using PatternFly MCP locally, a common script is: "mcp:start": "npx @cdcabrera/pf-mcp"
- Typical mcp-config.json entry:
  {
    "mcpServers": {
      "patternfly-docs": {
        "command": "npx",
        "args": ["-y", "@cdcabrera/pf-mcp@latest"],
        "description": "PatternFly React development rules and documentation"
      }
    }
  }
- Only set this up if approved for your workflow; otherwise just keep this note for reference.

Last updated: [YYYY-MM-DD]


File: .agent/react-implementation.md

# React Implementation — [Project Name]

## Current Implementation Analysis
- React version: [x.y.z] (from package.json)
- React DOM version: [x.y.z]
- TypeScript version: [x.y.z]
- Router/testing/linting/build tools: [summarize versions]
- Component architecture patterns: [summary]
- Hooks usage: [summary]

## Performance Analysis
- Bundle size trends: [notes]
- Hot paths / re-render risks: [notes]
- Code-splitting/lazy/Suspense: [notes]

## Testing Coverage
- RTL patterns used: [notes]
- Accessibility checks (jest-axe): [notes]
- Coverage highlights/gaps: [notes]

## State Management Patterns
- Context usage: [notes]
- Local state vs lifted state: [notes]

## Code Quality Assessment
- ESLint/Prettier compliance: [notes]
- TS strictness and typing quality: [notes]

## Migration Opportunities
- React 19 features: [candidates]
- Risks and prerequisites: [notes]

Last updated: [YYYY-MM-DD]


File: .agent/patternfly-implementation.md

# PatternFly Implementation — [Project Name]

## Current PatternFly Version
- Core: [x.y.z]
- React: [x.y.z]
- Icons: [x.y.z]
- Table: [x.y.z]

## Component Usage Patterns
- Layout components: [list]
- Data display: [list]
- Forms: [list]
- Navigation: [list]
- Feedback: [list]

## Styling and Theming
- Token usage: [semantic tokens used]
- Custom properties: [project tokens]
- Theme support: [notes]

## Migration History and Plans
- Previous → current versions, key changes handled
- Target version(s) and strategy
- Known issues/deprecations

## Potential Issues and Optimizations
- Deprecated APIs / anti-patterns
- Import hygiene and tree-shaking
- Accessibility considerations

## Architectural Improvements
- Composition patterns and state boundaries
- Event typing, React.memo/useCallback/useMemo usage

## Specific Code Recommendations
- Example 1: [code snippet + rationale]
- Example 2: [code snippet + rationale]

Optional: MCP Integration (for agents)
- If enabled, document how to start locally (e.g., npm run mcp:start) and reference mcp-config.json entries.

Last updated: [YYYY-MM-DD]


File: .agent/patternfly-discoveries.md

# PatternFly Discoveries (Running Log)

- [YYYY-MM-DD] [short title]
  - Context: [where/when observed]
  - Detail: [what was found]
  - Link(s): [PR/commit/docs]
  - Status: todo | investigating | resolved

Last updated: [YYYY-MM-DD]

---

## Validation Checklist
- [ ] .agent directory exists locally and is ignored by Git (globally or via project policy)
- [ ] .agent/README.md created and initialized
- [ ] .agent/react-implementation.md created and initialized
- [ ] .agent/patternfly-implementation.md created and initialized
- [ ] .agent/patternfly-discoveries.md created and initialized
- [ ] “Last updated” timestamps are set
- [ ] Links from .agent docs point to repository README.md and/or CONTRIBUTING.md as needed
- [ ] No additional guideline files were added to the repository for local scaffolding

---

## Maintenance Guidance
- Ownership: Assign a maintainer (Docs Champion) to periodically review .agent docs.
- Cadence: Update when React/PatternFly/tooling versions change or when migration work starts.
- Pre-release: Before each release, confirm .agent docs accuracy and update timestamps.

---

## Optional MCP Setup (Local-only, summarize here; obtain team approval before committing any config)
If enabling the MCP server locally for PatternFly guidance:
1. Add a local npm script (do not commit without approval):
   "mcp:start": "npx @cdcabrera/pf-mcp"
2. Use a local mcp-config.json (do not commit without approval):
   {
     "mcpServers": {
       "patternfly-docs": {
         "command": "npx",
         "args": ["-y", "@cdcabrera/pf-mcp@latest"],
         "description": "PatternFly React development rules and documentation"
       }
     }
   }
3. Start the server when needed: npm run mcp:start
4. Document your local approach in .agent/patternfly-implementation.md or .agent/README.md.

This MCP note is optional and does not change repository behavior unless you intentionally add scripts/config in a PR.
