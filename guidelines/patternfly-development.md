# PatternFly Development Guidelines

## Overview

This document provides agent-specific guidance for PatternFly development in the Quipucords-UI project. It serves as a reference system for agents to access PatternFly resources and best practices.

## Primary Resources

### Official PatternFly Resources

#### Core Documentation
- **[PatternFly.org](https://www.patternfly.org/)** - Main PatternFly documentation and design system
- **[PatternFly React Repository](https://github.com/patternfly/patternfly-react)** - React component library source code and examples
- **[PatternFly Organization Repository](https://github.com/patternfly/patternfly-org)** - Documentation site and website source
- **[PatternFly Core Repository](https://github.com/patternfly/patternfly)** - HTML/CSS implementation

#### AI-Optimized Resources
- **[PatternFly AI Coding Guidelines](https://github.com/patternfly/patternfly-ai-coding)** - AI-friendly development patterns and guidelines

#### Migration Tools
- **[PatternFly Codemods](https://github.com/patternfly/pf-codemods)** - Automated migration tools for PatternFly version upgrades (PF4→PF5, PF5→PF6, and future PF6→PF7)

## Local Resource Caching Strategy

### Purpose
To reduce bandwidth usage and improve agent response times, PatternFly resources can be cached locally under `.agent/_resources/*` with user confirmation.

### Benefits for Users
- **Reduced Bandwidth**: Minimizes repeated downloads of large documentation repositories
- **Faster Agent Responses**: Local resources enable quicker access to PatternFly guidance
- **Offline Availability**: Resources remain accessible even when web access is limited
- **Version Control**: Local copies can be versioned and updated at controlled intervals

### Caching Process
1. **Request User Confirmation**: Before downloading any PatternFly resource
2. **Specify Resource**: Clearly identify which repository/documentation to cache
3. **Explain Purpose**: Describe how the resource will be used for development guidance
4. **Update Schedule**: Establish when the resource should be refreshed

### Recommended Local Structure
```
.agent/_resources/
├── patternfly-ai-coding/          # AI development guidelines
├── patternfly-react/              # React component library
├── patternfly-org/                # Documentation site
├── patternfly/                    # Core HTML/CSS implementation
└── pf-codemods/                   # Migration tools and codemods
```

## Agent Usage Guidelines

### When to Reference These Resources
- **PatternFly Questions**: Any question containing "patternfly", "PF", or "pf"
- **Component Development**: When creating or modifying PatternFly components
- **Migration Planning**: When planning PatternFly version upgrades (PF4→PF5, PF5→PF6, PF6→PF7)
- **Best Practices**: When seeking PatternFly development guidance
- **Automated Migration**: When using codemods for version upgrades

### Reference Priority Order
1. **Local Cached Resources** (`.agent/_resources/*`) - If available and current
2. **PatternFly AI Coding Guidelines** - For AI-optimized development patterns
3. **Official Documentation** - For component APIs and examples
4. **GitHub Repositories** - For source code and implementation details

### PatternFly Discoveries
- **Local Discoveries**: Check `.agent/patternfly-discoveries.md` for developer-specific findings
- **Purpose**: Contains real-world implementation insights and solutions
- **Scope**: Developer-specific discoveries that may not be in official documentation
- **Usage**: Reference when official documentation doesn't address specific issues

## Development Workflow

### Before Starting PatternFly Work
1. **Check Local Resources**: Verify if relevant PatternFly resources are cached locally
2. **Review AI Guidelines**: Consult PatternFly AI coding guidelines for best practices
3. **Check Discoveries**: Review local patternfly-discoveries.md for relevant insights
4. **Confirm Versions**: Ensure guidance matches the project's PatternFly version

### During Development
1. **Follow AI Guidelines**: Apply AI-optimized patterns from cached resources
2. **Reference Official Docs**: Use official documentation for component APIs
3. **Apply Discoveries**: Incorporate relevant findings from local discoveries
4. **Update Discoveries**: Document new findings in patternfly-discoveries.md

### After Development
1. **Validate Implementation**: Ensure code follows PatternFly best practices
2. **Update Local Resources**: Consider updating cached resources if needed
3. **Document Findings**: Add new discoveries to patternfly-discoveries.md

## Resource Maintenance

### Update Schedule
- **AI Guidelines**: Update when new AI-optimized patterns are released
- **Component Library**: Update when new components or breaking changes are released
- **Documentation**: Update when major documentation changes occur
- **Codemods**: Update when new migration tools or version support is added
- **Discoveries**: Update continuously as new findings emerge

### User Confirmation Required
- **Initial Caching**: Always confirm before downloading resources
- **Major Updates**: Confirm before updating cached resources
- **Storage Management**: Confirm before removing cached resources
- **Bandwidth Usage**: Consider bandwidth impact when requesting updates

## Integration with Project Guidelines

### Relationship to Other Guidelines
- **Core Guidelines**: This file supplements the main guidelines README
- **Agent Directory**: References `.agent/` for developer-specific resources
- **Coding Standards**: Works with project coding standards for PatternFly development
- **Migration Planning**: Supports PatternFly version migration efforts

### Agent Behavior Standards
- **Resource-First**: Always check local resources before web access
- **User Confirmation**: Request permission before downloading new resources
- **Discovery Integration**: Incorporate local discoveries into guidance
- **Version Awareness**: Ensure guidance matches project's PatternFly version

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
