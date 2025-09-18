# Agent Local Scaffolding

## Purpose
Provide copy-ready templates for the local, gitignored `.agent/` directory and guidance to bootstrap it. These local files capture agent-specific state and implementation notes without polluting the repository.

## .agent Directory
- Location: project root (`./.agent`)
- VCS: intentionally gitignored (see .gitignore)
- Usage: local guidance/state that augments the repository’s guidelines

## Templates (copy-ready)

Create the files below on your machine inside `./.agent/`.

### .agent/react-implementation.md
```
# React Implementation Notes (Local)
- React: 18.3.x; PatternFly: 6.3.x; TypeScript
- Component style: function components; hooks; import ordering per .eslintrc.js
- Testing: RTL + user-event; prefer queries by role/name
- Accessibility: eslint-plugin-jsx-a11y; add jest-axe when needed
- Performance: memoization and lazy/suspense policy
- Deviation log: (record any local deviations and rationale)
```

### .agent/patternfly-implementation.md
```
# PatternFly Implementation Notes (Local)
- Prefer PF components and tokens over custom CSS
- OUIA: use ouiaId or data-ouia-component-id
- Branding: use `npm run build:brand` when needed
- Deviation log: (record any local deviations and rationale)
```

## Bootstrap Steps
1. Create the directory: `mkdir -p .agent`
2. Create files from templates above:
   - `.agent/react-implementation.md`
   - `.agent/patternfly-implementation.md` (when PF work is planned)
3. Update the notes with the current project versions and local decisions before starting a task.

## Agent Boot Checklist (MANDATORY)
- [ ] `.agent/react-implementation.md` exists and is current
- [ ] `.agent/patternfly-implementation.md` exists and is current (if PF-related work)
- [ ] Versions and patterns reviewed from package.json and .eslintrc.js
- [ ] Any deviations documented in the local files

See also: guidelines/agent_mcp_setup.md for required MCP configuration.

Last updated: September 17, 2025
