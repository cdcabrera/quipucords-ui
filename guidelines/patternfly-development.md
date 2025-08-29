# PatternFly Development Guidelines

## Overview

Agent-only reference system for PatternFly development in any React project.

## Resources

### Official Resources
- **[PatternFly Org](https://github.com/patternfly/patternfly-org.git)** - Main documentation and design system for [PatternFly.org](https://www.patternfly.org/)
- **[PatternFly React](https://github.com/patternfly/patternfly-react.git)** - React component library
- **[PatternFly Organization](https://github.com/patternfly/patternfly-org.git)** - Documentation site
- **[PatternFly Core](https://github.com/patternfly/patternfly.git)** - HTML/CSS implementation
- **[PatternFly AI Guidelines](https://github.com/patternfly/patternfly-ai-coding.git)** - AI-friendly guidelines
- **[PatternFly Codemods](https://github.com/patternfly/pf-codemods.git)** - Migration tools

### Required Cached Resources
**MANDATORY**: The following resources must be cached under `.agent/_resources/`:

1. **PatternFly Organization Documentation** - Official PatternFly documentation
   - **Source**: https://github.com/patternfly/patternfly-org.git
   - **Location**: `.agent/_resources/patternfly-org/`
   - **Purpose**: Official PatternFly documentation and guides

2. **PatternFly React Repository** - React component library source
   - **Source**: https://github.com/patternfly/patternfly-react.git
   - **Location**: `.agent/_resources/patternfly-react/`
   - **Purpose**: React component implementation and patterns

3. **PatternFly Core Repository** - Core CSS framework
   - **Source**: https://github.com/patternfly/patternfly.git
   - **Location**: `.agent/_resources/patternfly-core/`
   - **Purpose**: Core CSS framework and design tokens

4. **PatternFly AI Coding Guidelines** - AI-assisted development patterns
   - **Source**: https://github.com/patternfly/patternfly-ai-coding.git
   - **Location**: `.agent/_resources/patternfly-ai-coding/`
   - **Purpose**: AI-specific development patterns and guidelines

5. **PatternFly Codemods** - Migration and automation tools
   - **Source**: https://github.com/patternfly/pf-codemods.git
   - **Location**: `.agent/_resources/pf-codemods/`
   - **Purpose**: Migration tools and automated code updates

### Project Resources
- **Implementation Guide**: `.agent/patternfly-implementation.md` - Project-specific usage
- **Discoveries**: `.agent/patternfly-discoveries.md` - Developer-specific findings
- **AI Guidelines**: `.agent/patternfly-ai-guidelines-reference.md` - AI development reference

### Resource Caching

For resource caching guidance and purpose, see [README.md](./README.md#caching-strategy).

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

1. **Cached Resources** - Check `.agent/_resources/` directory first
2. **PatternFly AI Coding Guidelines** - For AI-optimized patterns
3. **Official Documentation** - For component APIs and examples
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

2. **MANDATORY Caching Check**: 
   - Check if `.agent/_resources/patternfly/` contains cached documentation
   - If empty or missing, AUTOMATICALLY offer: "Would you like me to cache PatternFly documentation for faster development assistance?"
   - Explain benefits: "This will cache official PatternFly docs locally for faster responses and offline access"
   - Proceed with caching unless user explicitly says "no"

3. **Implementation Documentation Check**:
   - Check if `.agent/patternfly-implementation.md` exists
   - If missing, offer to create it: "Would you like me to create project-specific PatternFly implementation documentation?"
   - Explain: "This documents how PatternFly is used in this specific codebase"
   - Proceed with creation unless user explicitly says "no"

4. **MANDATORY Cross-Technology Analysis**:
   - After creating implementation documentation, AUTOMATICALLY provide in-depth analysis
   - Include potential PatternFly issues and optimizations based on cached resources
   - Reference PatternFly best practices from AI coding guidelines and codemods
   - **CRITICAL**: Integrate React development patterns, TypeScript best practices, and testing strategies
   - Identify deprecated usage, performance issues, and architectural improvements
   - Provide specific recommendations with code examples that follow React + TypeScript best practices

**Note**: These offers should be automatic and prominent, not buried in other text.

## Development Workflow

### Before Development
1. **Check Cached Resources**: Follow the workflow in README.md
2. **Review AI Guidelines**: Consult PatternFly AI coding guidelines
3. **Check Discoveries**: Review local patternfly-discoveries.md
4. **Confirm Versions**: Ensure guidance matches project's version

### During Development
1. **Follow AI Guidelines**: Apply AI-optimized patterns
2. **Reference Official Docs**: Use official documentation for APIs
3. **Apply Discoveries**: Incorporate relevant findings
4. **Update Discoveries**: Document new findings

## Core Development Principles

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
   - Reference specific guidelines from cached resources

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
- **PatternFly AI Coding Guidelines**: `.agent/_resources/patternfly-ai-coding/.pf-ai-documentation/`
- **PatternFly Codemods**: `.agent/_resources/pf-codemods/`
- **PatternFly React**: `.agent/_resources/patternfly-react/`
- **PatternFly Core**: `.agent/_resources/patternfly-core/`

## Quick Reference

### Common PatternFly Questions
- **Component Usage**: Check PatternFly AI coding guidelines first (see [Official PatternFly Resources](#official-patternfly-resources))
- **API Reference**: Use official PatternFly.org documentation (see [Official PatternFly Resources](#official-patternfly-resources))
- **Implementation Issues**: Check local patternfly-discoveries.md (see [Project Resources](#project-resources))
- **Migration Planning**: Reference official migration guides (see [Official PatternFly Resources](#official-patternfly-resources))
- **Automated Migration**: Use PatternFly codemods for version upgrades (see [Official PatternFly Resources](#official-patternfly-resources))
