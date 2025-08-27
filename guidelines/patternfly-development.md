# PatternFly Development Guidelines

## Overview

Repository reference system for PatternFly development.

## Resources

### Official PatternFly Resources
- **[PatternFly.org](https://www.patternfly.org/)** - Main documentation and design system
- **[PatternFly React](https://github.com/patternfly/patternfly-react)** - React component library
- **[PatternFly Organization](https://github.com/patternfly/patternfly-org)** - Documentation site
- **[PatternFly Core](https://github.com/patternfly/patternfly)** - HTML/CSS implementation
- **[PatternFly AI Guidelines](https://github.com/patternfly/patternfly-ai-coding)** - AI-friendly guidelines
- **[PatternFly Codemods](https://github.com/patternfly/pf-codemods)** - Migration tools

### Project Resources
- **Implementation Guide**: `.agent/patternfly-implementation.md` - Project-specific usage
- **Discoveries**: `.agent/patternfly-discoveries.md` - Developer-specific findings
- **AI Guidelines**: `.agent/patternfly-ai-guidelines-reference.md` - AI development reference

### Resource Caching

For resource caching guidance, see [README.md](./README.md#caching-strategy).

## Agent Guidelines

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
- Always verify component APIs match the project's PatternFly version
- Check React and PatternFly versions before making recommendations
- Ensure guidance matches the project's PatternFly version

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
- **Rule**: Always verify component APIs match the project's PatternFly version
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

## Quick Reference

### Common PatternFly Questions
- **Component Usage**: Check PatternFly AI coding guidelines first (see [Official PatternFly Resources](#official-patternfly-resources))
- **API Reference**: Use official PatternFly.org documentation (see [Official PatternFly Resources](#official-patternfly-resources))
- **Implementation Issues**: Check local patternfly-discoveries.md (see [Project Resources](#project-resources))
- **Migration Planning**: Reference official migration guides (see [Official PatternFly Resources](#official-patternfly-resources))
- **Automated Migration**: Use PatternFly codemods for version upgrades (see [Official PatternFly Resources](#official-patternfly-resources))
