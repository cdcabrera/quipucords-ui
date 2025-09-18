# Agent MCP Setup

## Overview
Mandatory Model Context Protocol (MCP) setup for agents working in this repository. This enables reproducible, auditable access to local files, shell commands, git history, and the Quipucords OpenAPI spec. The repo’s .gitignore excludes `mcp-config.json`; keep MCP config local.

## Recommended MCP Servers
- filesystem: read-only access to project root
- shell: allowlisted commands only (npm, git, node, jest, tsc, eslint)
- git: history, blame and diff
- openapi: Quipucords API spec
- http: optional generic HTTP client

## Example mcp-config.json (do not commit)
Place at repository root as `mcp-config.json`.

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "mcp-server-filesystem",
      "args": ["--root", "."]
    },
    "shell": {
      "command": "mcp-server-shell",
      "env": { "MCP_SHELL_ALLOWED": "npm,git,node,jest,tsc,eslint" }
    },
    "git": { "command": "mcp-server-git" },
    "openapi": {
      "command": "mcp-server-openapi",
      "env": {
        "OPENAPI_URLS": "https://raw.githubusercontent.com/quipucords/quipucords/master/docs/swagger.yml"
      }
    },
    "http": { "command": "mcp-server-http" }
  }
}
```

## Install Servers
Install via your MCP-capable client (e.g., JetBrains AI Assistant MCP, Vercel MCP client, CLI-based MCP runners). Consult your client’s documentation for server installation and registration.

## Validation Steps
Use your MCP client to validate connectivity:
- filesystem.read: guidelines/README.md
- shell.run: `node -v` and `npm -v`
- git.show: latest commit on main
- openapi.list: ensure the Quipucords spec loads without error

## Security Notes
- Keep `mcp-config.json` local and uncommitted (gitignored).
- Keep shell allowlist tight; avoid interactive commands.
- Prefer filesystem read-only mode.

## Agent Boot Checklist (MANDATORY)
- [ ] MCP configured and reachable (filesystem, shell, git, openapi)
- [ ] `.agent/react-implementation.md` exists and is up to date
- [ ] `.agent/patternfly-implementation.md` exists and is up to date when PF work is involved
- [ ] Review package.json scripts/versions via MCP
- [ ] Review `.eslintrc.js` rules via MCP

Last updated: September 17, 2025
