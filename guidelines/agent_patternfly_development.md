# PatternFly Development Guidelines

## Overview

Agent-only reference system for PatternFly development in any React project.

## For Agents

### Processing Priority

High — Process early when working on UI development or migrations.

### Related Guidelines

See the [Guidelines Index](./README.md#guidelines-index) for all related guidelines.

### Key Concepts

- Version-aware PatternFly usage and migration
- Trigger-based workflows for PF component work
- Validation procedures (tests, accessibility, snapshots)
- Decision-making principles (consistency, DX, backward-compat)
- Cross-technology integration (React + TypeScript + Testing)

## Resources

### Official Resources
- **[PatternFly Org](https://github.com/patternfly/patternfly-org.git)** - Main documentation and design system for [PatternFly.org](https://www.patternfly.org/)
- **[PatternFly React](https://github.com/patternfly/patternfly-react.git)** - React component library
- **[PatternFly Organization](https://github.com/patternfly/patternfly-org.git)** - Documentation site
- **[PatternFly Core](https://github.com/patternfly/patternfly.git)** - HTML/CSS implementation
- **[PatternFly AI Guidelines](https://github.com/patternfly/patternfly-ai-coding.git)** - AI-friendly guidelines
- **[PatternFly Codemods](https://github.com/patternfly/pf-codemods.git)** - Migration tools

### PatternFly MCP Server (Recommended)
- **[PatternFly MCP Package](https://www.npmjs.com/package/@cdcabrera/pf-mcp)** - `@cdcabrera/pf-mcp` - Centralized PatternFly documentation and development rules via Model Context Protocol
- **MCP Tools Available**:
  - `list_documentation` - Lists available PatternFly documentation categories
  - `get_documentation` - Retrieves full content of specific documentation
  - `search_documentation` - Searches across all PatternFly documentation
  - `get_quick_rules` - Gets essential PatternFly development rules
  - `get_all_standards` - Retrieves comprehensive PatternFly standards

### Project Resources
- **Implementation Guide**: `.agent/patternfly-implementation.md` - Project-specific usage
- **Discoveries**: `.agent/patternfly-discoveries.md` - Developer-specific findings
- **AI Guidelines**: `.agent/patternfly-ai-guidelines-reference.md` - AI development reference


## Agent Guidelines

### Dynamic Project Analysis
**MANDATORY**: Before providing any recommendations, agents must analyze the project:

1. **Package.json Analysis**:
   - Detect PatternFly version from dependencies
   - Detect React version from dependencies
   - Identify PatternFly packages in use (core, react, icons, etc.)
   - Verify version compatibility between PatternFly and React
   - Identify any PatternFly-related build tools

2. **Project Structure Analysis**:
   - Identify PatternFly component usage patterns
   - Detect custom PatternFly component implementations
   - Analyze PatternFly integration patterns
   - Identify migration opportunities

3. **Version Compatibility Check**:
   - Compare detected PatternFly version with latest available
   - Identify potential migration opportunities
   - Ensure recommendations work with detected versions

### Resource Priority

1. **PatternFly MCP Server** - For comprehensive, up-to-date documentation and development rules (if available)
2. **Official Documentation** - For component APIs and examples
3. **PatternFly AI Coding Guidelines** - For AI-optimized patterns
4. **GitHub Repositories** - For source code and implementation details

### When to Use Resources
- **PatternFly Questions**: Any question containing "patternfly", "PF", or "pf"
- **Component Development**: When creating or modifying PatternFly components
- **Migration Planning**: When planning PatternFly version upgrades
- **Best Practices**: When seeking PatternFly development guidance

### Version Awareness
**MANDATORY**: Agents must dynamically detect and analyze versions:

- **PatternFly Version**: Detect from `package.json` dependencies
- **React Version**: Detect from `package.json` dependencies
- **Version Compatibility**: Ensure PatternFly and React versions are compatible
- **API Verification**: Always verify component APIs match the detected PatternFly version
- **Version Analysis**: Compare current vs latest versions for migration opportunities

### Initial Steps After Reviewing PatternFly Development Guidelines
**AUTOMATIC ACTIONS REQUIRED**:

1. **MANDATORY Repository Guidance Review**:
   - **BEFORE** creating any documentation, review ALL available repository guidelines
   - Check for React development guidelines, testing guidelines, linting guidelines, etc.
   - Use ALL available resources to enhance analysis quality and depth
   - Cross-reference patterns between different technology guidelines

2. **MANDATORY PatternFly MCP Server Setup**:
   - **AUTOMATICALLY** check if PatternFly MCP server is available and configured
   - If not available, **AUTOMATICALLY** offer to set it up: "Would you like me to set up the PatternFly MCP server for enhanced PatternFly guidance?"
   - **Setup includes**:
     - Adding NPM scripts to `package.json` for MCP server management
     - Creating `mcp-config.json` for MCP client configuration
     - Testing MCP server connectivity and functionality
   - **Benefits explained**: "This provides up-to-date PatternFly documentation, development rules, and best practices directly accessible to AI assistants"
   - Proceed with setup unless user explicitly says "no"

### Automatic MCP Client Setup for Agents

**MANDATORY**: All agents must automatically set up PatternFly MCP client integration when working with PatternFly components.

#### Setup Process (Automatic)
1. **Check Current Setup**:
   ```bash
   # Check if MCP scripts exist in package.json
   grep -q "mcp:" package.json && echo "MCP scripts found" || echo "MCP scripts missing"
   
   # Check if mcp-config.json exists
   test -f mcp-config.json && echo "MCP config found" || echo "MCP config missing"
   ```

2. **Add NPM Scripts** (if missing):
   ```json
   {
     "scripts": {
       "mcp:start": "npx @cdcabrera/pf-mcp",
       "mcp:update": "npm update @cdcabrera/pf-mcp",
       "dev:with-mcp": "concurrently \"npm start\" \"npm run mcp:start\"",
       "agent:verify-dates": "./.agent/verify-dates.sh",
       "agent:setup-mcp": "./.agent/setup-mcp.sh"
     }
   }
   ```

3. **Create MCP Configuration** (if missing):
   ```json
   {
     "mcpServers": {
       "patternfly-docs": {
         "command": "npx",
         "args": ["-y", "@cdcabrera/pf-mcp@latest"],
         "description": "PatternFly React development rules and documentation"
       }
     }
   }
   ```

4. **Test MCP Server**:
   ```bash
   # Test MCP server startup
   npm run mcp:start &
   sleep 2
   kill %1
   echo "MCP server test completed"
   ```

5. **Verify MCP Tools Available**:
   - Test `mcp_context7_resolve-library-id` with "patternfly"
   - Test `mcp_context7_get-library-docs` with PatternFly components
   - Confirm access to PatternFly documentation and examples

#### MCP Client Integration Benefits
- **Real-time Documentation**: Access to latest PatternFly docs and examples
- **Component Examples**: Hundreds of working code snippets
- **Design Token Guidance**: Proper token usage and naming conventions
- **Best Practices**: AI-optimized development patterns
- **Version Awareness**: Automatic compatibility with current PatternFly versions

#### Agent Workflow Integration
```markdown
# When working with PatternFly components:

1. **Start MCP Server**: `npm run mcp:start` (if needed)
2. **Query Documentation**: Use MCP tools to get component examples
3. **Verify Patterns**: Check against PatternFly best practices
4. **Implement**: Use MCP-provided examples and patterns
5. **Validate**: Ensure compliance with PatternFly standards
```

#### Troubleshooting MCP Setup
- **Package Not Found**: Run `npx @cdcabrera/pf-mcp` directly to install and start
- **Server Won't Start**: Check Node.js version (requires 22+)
- **No Documentation**: Verify MCP tools are available in environment
- **Connection Issues**: Restart MCP server with `npm run mcp:start`

3. **Implementation Documentation Check**:
   - Check if `.agent/patternfly-implementation.md` exists
   - If missing, offer to create it: "Would you like me to create project-specific PatternFly implementation documentation?"
   - Explain: "This documents how PatternFly is used in this specific codebase"
   - Proceed with creation unless user explicitly says "no"

4. **MANDATORY Cross-Technology Analysis**:
   - After creating implementation documentation, AUTOMATICALLY provide in-depth analysis
   - Include potential PatternFly issues and optimizations based on official resources
   - Reference PatternFly best practices from AI coding guidelines and codemods
   - **CRITICAL**: Integrate React development patterns, TypeScript best practices, and testing strategies
   - Identify deprecated usage, performance issues, and architectural improvements
   - Provide specific recommendations with code examples that follow React + TypeScript best practices

**Note**: These offers should be automatic and prominent, not buried in other text.

## PatternFly MCP Server Integration

### Automatic Setup Process
When setting up the PatternFly MCP server, agents should:

1. **Check Current Setup**:
   - Look for existing `mcp-config.json` in project root
   - Check `package.json` for MCP-related scripts
   - Verify if `@cdcabrera/pf-mcp` is available

2. **Add NPM Scripts** (if not present):
   ```json
   {
     "scripts": {
       "mcp:install": "npm install @cdcabrera/pf-mcp",
       "mcp:start": "npx @cdcabrera/pf-mcp",
       "mcp:dev": "npx @cdcabrera/pf-mcp",
       "mcp:update": "npm update @cdcabrera/pf-mcp",
       "mcp:setup": "npm install @cdcabrera/pf-mcp",
       "dev:with-mcp": "concurrently \"npm start\" \"npm run mcp:start\"",
       "dev:mcp-only": "npm run mcp:start"
     }
   }
   ```

3. **Create MCP Configuration** (`mcp-config.json`):
   ```json
   {
     "mcpServers": {
       "patternfly-docs": {
         "command": "npx",
         "args": ["-y", "@cdcabrera/pf-mcp@latest"],
         "description": "PatternFly React development rules and documentation"
       }
     }
   }
   ```

4. **Test MCP Server**:
   - Run `npm run mcp:start` to verify server starts
   - Test MCP tools availability (list_documentation, get_quick_rules, etc.)
   - Verify connectivity and functionality

### MCP Server Benefits
- **Up-to-date Documentation**: Always current PatternFly documentation
- **Comprehensive Rules**: Complete development guidelines and best practices
- **Search Capabilities**: Find specific patterns and solutions quickly
- **Version Awareness**: Automatic version-specific guidance
- **AI-Optimized**: Designed specifically for AI assistant integration

### MCP Tool Usage Patterns
- **Component Questions**: Use `get_documentation` for specific component APIs
- **Best Practices**: Use `get_quick_rules` for development guidelines
- **Search**: Use `search_documentation` for finding specific patterns
- **Comprehensive**: Use `get_all_standards` for complete guidance overview

## Development Workflow

### Before Development
1. **Check MCP Server**: Ensure PatternFly MCP server is running and accessible
2. **Review AI Guidelines**: Consult PatternFly AI coding guidelines via MCP
3. **Check Discoveries**: Review local patternfly-discoveries.md
4. **Confirm Versions**: Ensure guidance matches project's version

### During Development
1. **Use MCP Tools**: Leverage PatternFly MCP server for real-time guidance
2. **Follow AI Guidelines**: Apply AI-optimized patterns from MCP
3. **Reference Official Docs**: Use MCP documentation tools for APIs
4. **Apply Discoveries**: Incorporate relevant findings
5. **Update Discoveries**: Document new findings

## Core Development Principles

### Emulate Local Patterns
- Match the surrounding file/module’s established patterns (function style, imports, testing, comments). Default to codebase conventions; deviate only for correctness or clear quality improvements.

**1. Version-Aware Implementation**
- **Rule**: Always verify component APIs match the detected PatternFly version from package.json
- **Benefit**: Avoids compatibility issues and ensures proper functionality

**2. Built-in Solutions Over Custom Code**
- **Rule**: If a solution requires custom CSS or workarounds, look deeper for built-in options
- **Benefit**: Better accessibility, consistency, and maintainability

**3. Component Composition Pattern**
- **Rule**: Use component composition and built-in props before writing custom code
- **Benefit**: Leverages design system consistency and reduces maintenance burden

**4. Semantic Props Over Styling**
- **Rule**: Choose props that indicate purpose over visual-only props
- **Benefit**: Better accessibility and future-proof code

**5. Accessibility-First Approach**
- **Rule**: Use PatternFly components as designed to maintain accessibility
- **Benefit**: Ensures applications meet accessibility standards without extra work

**6. Design System Consistency**
- **Rule**: Follow PatternFly patterns rather than creating custom implementations
- **Benefit**: Consistent user experience and reduced design debt

**7. Future-Resistant Implementation**
- **Rule**: Use official APIs and avoid custom workarounds that may break in updates
- **Benefit**: Easier upgrades and reduced technical debt

**8. Research Process**
1. **Check Official Documentation**: Start with PatternFly.org
2. **Look for Component Examples**: Search for specific component demos
3. **Check Migration Guides**: Review version migration documentation
4. **Avoid Custom CSS**: If the solution requires custom CSS, look deeper
5. **Test Built-in Props**: Many components have props for common use cases

## Version-Specific Principles

### PatternFly 6 Principles

**1. Token System Compliance**
- **Rule**: Use semantic tokens (`--pf-t-*`) instead of global variables (`--pf-v6-*`)
- **Benefit**: Future-proof styling that works reliably across versions

**2. Import Pattern Standards**
- **Rule**: Use named imports from specific modules
- **Benefit**: Smaller bundle sizes and clearer dependencies

**3. Z-Index Management**
- **Rule**: Avoid custom z-index values and use PatternFly's built-in stacking context
- **Benefit**: Consistent component layering and reduced CSS conflicts

## Implementation Documentation

Maintain `.agent/patternfly-implementation.md` to document project-specific PatternFly usage.

### Required Documentation Sections
The implementation documentation MUST include:

1. **Current Implementation Analysis** - Detailed source code scanning
2. **Potential Issues and Optimizations** - Based on PatternFly best practices
3. **Migration Recommendations** - Using PatternFly codemods and guidelines
4. **Performance Analysis** - Bundle size, runtime performance, accessibility
5. **Architectural Improvements** - Component composition, state management
6. **Specific Code Recommendations** - With actual code examples

### Documentation Structure
```markdown
# PatternFly Implementation - [Project Name]

## Current PatternFly Version
- **Core Version**: [version]
- **React Version**: [version]
- **Icons Version**: [version]
- **Table Version**: [version]

## Component Usage Patterns
### Core Components
- **Layout Components**: [components]
- **Data Display**: [components]
- **Form Components**: [components]
- **Navigation**: [components]
- **Feedback**: [components]

### Custom Components Built on PatternFly
- **Component Name**: Description and dependencies

## Styling and Theming
### CSS Custom Properties
- **Design Tokens**: Usage patterns
- **Custom Properties**: Project-specific variables
- **Theme Support**: Implementation details

## Migration History
### Previous Versions
- **From Version**: [version]
- **To Version**: [version]
- **Key Changes**: Major breaking changes handled

### Future Migration Plans
- **Target Version**: [version]
- **Known Issues**: Components needing updates
- **Migration Strategy**: Planned approach
```

### Key Information to Capture
- **Current Version**: Exact PatternFly versions in use
- **Usage Patterns**: How components are used in the codebase
- **Customizations**: Project-specific modifications
- **Migration History**: Previous upgrades and future plans
- **Accessibility**: How accessibility is implemented
- **Testing**: How components are tested

### Required Analysis Sections
- **Potential Issues**: Deprecated components, anti-patterns, version conflicts
- **Performance Optimizations**: Bundle size, runtime performance, memory usage
- **Architectural Improvements**: Component composition, state management patterns
- **Accessibility Enhancements**: ARIA compliance, keyboard navigation, screen reader support
- **Migration Path**: Specific steps using PatternFly codemods and guidelines
- **Best Practice Compliance**: Alignment with PatternFly AI coding guidelines

## Version Migration

### General Migration Process

1. **Preparation**
   - Review migration guide in PatternFly documentation
   - Identify affected components
   - Create test environment

2. **Implementation**
   - Apply changes incrementally
   - Use available codemods
   - Update documentation

3. **Validation**
   - Test all migrated components
   - Verify accessibility compliance
   - Check for visual regressions

### Deprecated Component Handling
- **Identification**: Check release notes, console warnings, migration guides
- **Assessment**: Determine usage frequency, complexity, potential breaking changes
- **Prioritization**: Focus on security-critical components and critical user flows
- **Migration Tools**: Use PatternFly codemods, ESLint rules, custom scripts
- **Testing**: Test functionality, accessibility, visual appearance

## Code Review Checklist

- **PatternFly Compliance**: Current components, design guidelines, responsive behavior
- **Accessibility**: Built-in features, ARIA attributes, keyboard navigation
- **Import Patterns**: Named imports, correct packages, necessary components
- **Token Usage**: Semantic tokens, consistent application, appropriate categories
- **Component Usage**: Built-in props, composition patterns, state management, edge cases

## Accessibility Implementation

### ARIA Labels and Roles
- Use built-in accessibility features of PatternFly components
- Follow PatternFly's accessibility guidelines for custom implementations
- Maintain proper heading hierarchy and landmark regions
- Ensure proper focus management in interactive components

### Keyboard Navigation
- Ensure all interactive elements are keyboard accessible
- Maintain logical tab order through the interface
- Implement keyboard shortcuts for common actions
- Provide visible focus indicators for all interactive elements

### Optional runtime accessibility checks (react-axe)
- react-axe is optional and should be enabled in development only. By default, rely on lint-time checks (eslint-plugin-jsx-a11y) and targeted test-time checks (jest-axe).
- If you need live a11y feedback during manual testing, you may integrate react-axe.

How to research then implement react-axe:
1. Research
   - Verify React and ReactDOM versions in package.json
   - Confirm you will initialize in development only (not in tests or production)
   - Review the latest react-axe README for version compatibility and initialization API
2. Implement (dev-only)
   - Install: npm i -D react-axe axe-core
   - Initialize in a dev-only entry path (e.g., src/index.tsx) using dynamic imports to avoid bundling in prod:
     ```ts
     if (process.env.NODE_ENV !== 'production') {
       Promise.all([
         import('react'),
         import('react-dom'),
         import('react-axe')
       ]).then(([React, ReactDOM, axe]) => {
         (axe as any).default(React, ReactDOM, 1000);
       }).catch(() => {
         // No-op: react-axe is optional; ignore if unavailable
       });
     }
     ```
   - Ensure this block does not run in Jest/jsdom tests unless explicitly desired
3. Validate
   - Run the app in development; confirm accessibility warnings appear in the browser console
   - Confirm production builds have no react-axe code paths

Note: For automated checks in tests, see the testing guidance (see Guidelines Index); runtime react-axe is optional.

## Testing Patterns

### Component Testing
- Use Jest with React Testing Library
- Focus on testing behavior rather than implementation details
- Test user interactions and accessibility features
- Verify component state changes and rendering

### Testing Best Practices
- Focus on application integration not retesting PatternFly components
- Test components in isolation when possible
- Use mock data for consistent results
- Test both success and error states
- Verify accessibility compliance
- Test responsive behavior

## In-Depth Analysis Requirements

### Mandatory Analysis Components
When creating implementation documentation, agents MUST provide:

1. **PatternFly Best Practice Analysis**:
   - Compare current implementation against PatternFly AI coding guidelines
   - Identify deviations from recommended patterns
   - Reference specific guidelines from official resources

2. **React + TypeScript Integration Analysis**:
   - **CRITICAL**: Evaluate TypeScript usage in PatternFly components
   - Assess React patterns (hooks, memoization, performance) in PatternFly context
   - Review event handler typing and component prop interfaces
   - Analyze custom hooks integration with PatternFly components
   - Check for proper React.memo, useCallback, and useMemo usage

3. **Performance and Optimization Analysis**:
   - Bundle size impact of current implementation
   - Runtime performance considerations
   - Memory usage and optimization opportunities
   - Tree shaking and code splitting analysis
   - React-specific performance patterns with PatternFly components

4. **Testing and Quality Analysis**:
   - **CRITICAL**: Evaluate testing patterns for PatternFly components
   - Assess TypeScript testing with React Testing Library
   - Review accessibility testing implementation
   - Check for proper mock typing and test coverage
   - Analyze integration testing with PatternFly components

5. **Migration and Compatibility Analysis**:
   - Identify deprecated component usage
   - Reference PatternFly codemods for migration paths
   - Version compatibility issues
   - Breaking change impact assessment
   - React 18/19 compatibility with PatternFly

6. **Architectural Review**:
   - Component composition patterns
   - State management approaches with React hooks
   - Custom component design with TypeScript
   - Integration with PatternFly design system
   - Code quality and linting compliance

### Analysis Sources
- PatternFly AI Coding Guidelines: https://github.com/patternfly/patternfly-ai-coding
- PatternFly Codemods: https://github.com/patternfly/pf-codemods
- PatternFly React: https://github.com/patternfly/patternfly-react
- PatternFly Core: https://github.com/patternfly/patternfly

## Quick Reference

### Common PatternFly Questions
- **Component Usage**: Use PatternFly MCP server tools first, then check PatternFly AI coding guidelines
- **API Reference**: Use MCP `get_documentation` tool for official PatternFly.org documentation
- **Implementation Issues**: Use MCP `search_documentation` tool, then check local patternfly-discoveries.md
- **Migration Planning**: Use MCP `get_quick_rules` for migration guidelines and codemods
- **Automated Migration**: Use MCP tools to find PatternFly codemods for version upgrades
- **MCP Setup**: Use trigger "Set up PatternFly MCP" for automatic configuration


## Trigger-Based Workflows

### Trigger: "Make a PatternFly [pattern]"
1. **AUTOMATIC MCP Setup** (if not already configured):
   - Check if MCP scripts exist in package.json
   - Check if mcp-config.json exists
   - If missing, automatically add NPM scripts and MCP configuration
   - Test MCP server connectivity
   - Verify MCP tools are available

2. Research
   - **Use MCP Tools**: Query PatternFly MCP server for component documentation and best practices
   - Check official PatternFly docs and AI coding guidelines via MCP
   - Identify PF React component(s) and props to use using MCP search
   - Review project usage patterns and versions
   - Inventory local patterns: function style, import ordering/naming, testing style (RTL queries), accessibility approach (lint-time via eslint-plugin-jsx-a11y; jest-axe as needed; react-axe optional, dev-only), and commenting (JSDoc-first); match the surrounding code
2. Plan
   - Determine target files/components
   - Identify accessibility and testing implications
3. Implement
   - Prefer built-in props and composition over custom CSS
   - Keep imports named and minimal
   - Add inline purpose comments for non-obvious choices
4. Test
   - Add/update RTL tests focused on behavior and a11y
   - Verify keyboard/focus behavior; update snapshots only after review
5. Document
   - Update `.agent/patternfly-implementation.md` if present
   - Add notes to `.agent/patternfly-discoveries.md`
6. Validate
   - Run tests, lint, and type checks
   - Manually verify responsive behavior if applicable

### Trigger: "Plan PatternFly migration"
1. **Use MCP Tools**: Query PatternFly MCP server for migration guidelines and codemods
2. Analyze versions (PF, React) from package.json
3. Inventory components and deprecated APIs using MCP documentation
4. Map codemods from pf-codemods via MCP search
5. Plan incremental PRs with test gates
6. Validate a11y and visual regressions

### Trigger: "Diagnose a PatternFly bug"
1. **Use MCP Tools**: Search PatternFly MCP server for known issues and solutions
2. Reproduce with a minimal example
3. Check upstream issues and changelogs via MCP
4. Validate version-specific behavior using MCP documentation
5. Propose workaround using official APIs; avoid custom CSS if possible

### Trigger: "Set up PatternFly MCP" or "Enable PatternFly MCP"
1. **Check Current Setup**: Look for existing MCP configuration and scripts
2. **Add NPM Scripts**: Add MCP management scripts to package.json
3. **Create MCP Config**: Create mcp-config.json with PatternFly MCP server configuration
4. **Test Setup**: Verify MCP server starts and tools are accessible
5. **Document Setup**: Update implementation documentation with MCP integration details

### Trigger: "Review the repo guidelines" (Enhanced with MCP Setup)
1. **AUTOMATIC MCP Setup Check**:
   - Check if PatternFly MCP server is configured
   - If missing, automatically set up MCP integration
   - Add NPM scripts and MCP configuration
   - Test MCP server connectivity
   - Verify MCP tools are available

2. **Repository Analysis**:
   - Review all guidelines in `guidelines/` directory
   - Analyze current PatternFly and React implementation
   - Create implementation documentation if missing
   - Provide comprehensive recommendations

3. **MCP Integration Verification**:
   - Test `mcp_context7_resolve-library-id` with "patternfly"
   - Test `mcp_context7_get-library-docs` with PatternFly components
   - Confirm access to PatternFly documentation and examples
   - Document MCP setup in implementation files

## Decision-Making Guidelines
- Consistency over novelty unless fixing bugs or enabling features
- Prefer built-in PF tokens/components over custom styling
- Maintain backward compatibility; document intentional breaking changes
- Optimize for accessibility and developer experience

## Validation Procedures
- Tests: RTL behavior tests + a11y checks; verify snapshots before updating
- Documentation: Update comments and implementation docs
- Code Quality: ESLint compliance, import hygiene, token usage

## Date and Time Management
Run `date` locally before writing timestamps in docs. Use it for "Last updated" stamps and change logs.

Last updated: September 16, 2025
