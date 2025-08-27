# PatternFly Development Guidelines

## Overview

This document provides agent-specific guidance for PatternFly development in the Quipucords-UI project.

## Resources

### Official PatternFly Resources
- **[PatternFly.org](https://www.patternfly.org/)** - Main documentation and design system
- **[PatternFly React Repository](https://github.com/patternfly/patternfly-react)** - React component library
- **[PatternFly Organization Repository](https://github.com/patternfly/patternfly-org)** - Documentation site
- **[PatternFly Core Repository](https://github.com/patternfly/patternfly)** - HTML/CSS implementation
- **[PatternFly AI Coding Guidelines](https://github.com/patternfly/patternfly-ai-coding)** - AI-friendly guidelines
- **[PatternFly Codemods](https://github.com/patternfly/pf-codemods)** - Migration tools

### Local Resources
- **Cached Resources**: `.agent/_resources/*` - Local copies of PatternFly resources
- **Implementation Guide**: `.agent/patternfly-implementation.md` - Project-specific usage
- **Discoveries**: `.agent/patternfly-discoveries.md` - Developer-specific findings
- **AI Guidelines**: `.agent/patternfly-ai-guidelines-reference.md` - AI development reference

## Agent Guidelines

### Resource Priority
1. **Local Cached Resources** - If available and current
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
1. **Check Local Resources**: Verify if relevant PatternFly resources are cached locally
2. **Review AI Guidelines**: Consult PatternFly AI coding guidelines for best practices
3. **Check Discoveries**: Review local patternfly-discoveries.md for relevant insights
4. **Confirm Versions**: Ensure guidance matches the project's PatternFly version

### During Development
1. **Follow AI Guidelines**: Apply AI-optimized patterns from cached resources
2. **Reference Official Docs**: Use official documentation for component APIs
3. **Apply Discoveries**: Incorporate relevant findings from local discoveries
4. **Update Discoveries**: Document new findings in patternfly-discoveries.md

#### Core Development Principles

1. **Built-in Solutions Over Custom Code**: Use PatternFly's built-in solutions before custom code
2. **Component Composition**: Combine existing components rather than creating custom solutions
3. **Semantic Props Over Styling**: Use semantic props that provide meaning rather than visual styling
4. **Version-Aware Implementation**: Verify component APIs match the project's PatternFly version
5. **Accessibility-First**: Use PatternFly components as designed to maintain accessibility
6. **Design System Consistency**: Follow PatternFly patterns for consistent user experience
7. **Future-Resistant Implementation**: Use official APIs to handle future updates gracefully
8. **Token System Compliance**: Use semantic tokens for styling to ensure compatibility
9. **Import Pattern Standards**: Use named imports for better tree-shaking and clarity
10. **Z-Index Management**: Avoid custom z-index unless necessary

### After Development
1. **Validate Implementation**: Ensure code follows PatternFly best practices
2. **Update Local Resources**: Consider updating cached resources if needed
3. **Document Findings**: Add new discoveries to patternfly-discoveries.md
4. **Update Implementation Guide**: Maintain `.agent/patternfly-implementation.md` with current usage patterns

## Implementation Documentation

Maintain `.agent/patternfly-implementation.md` to document project-specific PatternFly usage.

### When to Update
- Initial project analysis
- After major PatternFly-related updates
- After PatternFly version migrations
- When new usage patterns emerge

### Template Reference
See `.agent/patternfly-implementation.md` for the current template structure.

## Resource Management

### Caching Strategy
- Cache PatternFly resources locally under `.agent/_resources/*` with user confirmation
- Request user confirmation before downloading any PatternFly resource
- Clearly identify which repository/documentation to cache
- Explain how the resource will be used for development guidance

### Update Process
- **AI Guidelines**: Update when new AI-optimized patterns are released
- **Component Library**: Update when new components or breaking changes are released
- **Documentation**: Update when major documentation changes occur
- **Codemods**: Update when new migration tools or version support is added
- **Discoveries**: Update continuously as new findings emerge

## Resource Scanning

### When to Scan Resources
- When users reference other PatternFly projects or repositories
- When users ask for advanced PatternFly implementation patterns
- When current guidance doesn't cover specific use cases
- When users need insights from specific PatternFly versions

### Scanning Approach
1. Follow a structured approach to analyze codebases
2. Look for recurring patterns and best practices
3. Consider the PatternFly and React versions being used
4. Extract concrete code examples and patterns
5. Identify what's missing from current guidance

### Documentation Process
- Document findings in structured format
- Update implementation templates with new patterns
- Add concrete code examples from scanned resources
- Add new patterns to patternfly-discoveries.md

## Quick Reference

### Common PatternFly Questions
- **Component Usage**: Check PatternFly AI coding guidelines first
- **API Reference**: Use official PatternFly.org documentation
- **Implementation Issues**: Check local patternfly-discoveries.md
- **Migration Planning**: Reference cached migration resources
- **Automated Migration**: Use PatternFly codemods for version upgrades

### Resource Locations
- **AI Guidelines**: `.agent/_resources/patternfly-ai-coding/`
- **Local Discoveries**: `.agent/patternfly-discoveries.md`
- **Official Docs**: https://www.patternfly.org/
- **Component Source**: https://github.com/patternfly/patternfly-react
- **Migration Tools**: https://github.com/patternfly/pf-codemods

---

**Note**: This document serves as a reference system and should not duplicate content from the referenced resources. Its purpose is to guide agents to the appropriate resources and establish caching strategies for efficient PatternFly development.
