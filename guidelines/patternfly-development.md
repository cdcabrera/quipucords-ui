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

#### Research Process for PatternFly Solutions

When encountering a PatternFly implementation challenge:

1. **Check Official Documentation**: Start with [PatternFly.org](https://www.patternfly.org/)
2. **Look for Component Examples**: Search for specific component demos
3. **Check Migration Guides**: Review PF5 to PF6 migration documentation
4. **Avoid Custom CSS**: If the solution requires custom CSS, look deeper
5. **Test Built-in Props**: Many components have props for common use cases
6. **Use Component Composition**: Combine components rather than custom styling

#### Core Development Principles

**1. Built-in Solutions Over Custom Code**
- **Principle**: PatternFly components are designed to handle common use cases internally
- **Generic Rule**: If a solution requires custom CSS or workarounds, look deeper for built-in options
- **Benefit**: Better accessibility, consistency, and maintainability

**2. Component Composition Pattern**
- **Principle**: Combine existing PatternFly components rather than creating custom solutions
- **Generic Rule**: Use component composition and built-in props before writing custom code
- **Benefit**: Leverages design system consistency and reduces maintenance burden

**3. Semantic Props Over Styling**
- **Principle**: Use semantic props that provide meaning rather than just visual styling
- **Generic Rule**: Choose props that indicate purpose (like `isActionCell`) over visual-only props
- **Benefit**: Better accessibility and future-proof code

**4. Version-Aware Implementation**
- **Principle**: PatternFly APIs change between versions, requiring specific approaches
- **Generic Rule**: Always verify component APIs match the project's PatternFly version
- **Benefit**: Avoids compatibility issues and ensures proper functionality

**5. Version-Aware Recommendations**
- **Principle**: Always check React and PatternFly versions before making recommendations
- **Generic Rule**: Analyze existing usage of hooks and optimization techniques before suggesting improvements
- **Benefit**: Provides accurate, actionable guidance based on actual available features

**6. Accessibility-First Approach**
- **Principle**: PatternFly components include built-in accessibility features
- **Generic Rule**: Use PatternFly components as designed to maintain accessibility
- **Benefit**: Ensures applications meet accessibility standards without extra work

**7. Design System Consistency**
- **Principle**: PatternFly provides a consistent design system across all components
- **Generic Rule**: Follow PatternFly patterns rather than creating custom implementations
- **Benefit**: Consistent user experience and reduced design debt

**8. Future-Resistant Implementation**
- **Principle**: PatternFly components are designed to handle future updates gracefully
- **Generic Rule**: Use official APIs and avoid custom workarounds that may break in updates
- **Benefit**: Easier upgrades and reduced technical debt

**9. PatternFly 6 Token System Compliance**
- **Principle**: PatternFly 6 uses semantic tokens (`--pf-t-*`) instead of global variables (`--pf-v6-*`)
- **Generic Rule**: Always use semantic tokens for styling to ensure compatibility and consistency
- **Benefit**: Future-proof styling that works reliably across PatternFly 6 versions

**10. Import Pattern Standards**
- **Principle**: Use named imports from specific modules for better tree-shaking and clarity
- **Generic Rule**: Prefer named imports over default or wildcard imports
- **Benefit**: Smaller bundle sizes and clearer dependencies

**11. Z-Index Management**
- **Principle**: PatternFly manages z-index internally for overlays and components
- **Generic Rule**: Avoid custom z-index unless necessary, and check for stacking context issues
- **Benefit**: Consistent component layering and reduced CSS conflicts

### After Development
1. **Validate Implementation**: Ensure code follows PatternFly best practices
2. **Update Local Resources**: Consider updating cached resources if needed
3. **Document Findings**: Add new discoveries to patternfly-discoveries.md
4. **Update Implementation Guide**: Maintain `.agent/patternfly-implementation.md` with current usage patterns

#### Implementation Documentation

**Purpose**: Create and maintain `.agent/patternfly-implementation.md` to document how PatternFly is specifically used within this repository.

**When to Generate/Update**:
- **Initial Setup**: When first analyzing a PatternFly project
- **Major Changes**: After significant PatternFly-related updates
- **Version Upgrades**: After PatternFly version migrations
- **New Patterns**: When new usage patterns emerge

**Documentation Structure**:

```markdown
# PatternFly Implementation - [Project Name]

## Current PatternFly Version
- **Core Version**: [e.g., 6.3.1]
- **React Version**: [e.g., 6.3.1]
- **Icons Version**: [e.g., 6.3.1]
- **Table Version**: [e.g., 6.3.1]

## Component Usage Patterns

### Core Components
- **Layout Components**: [Page, PageSection, Toolbar, etc.]
- **Data Display**: [Table, List, Cards, etc.]
- **Form Components**: [Button, Input, Select, etc.]
- **Navigation**: [Nav, Masthead, Breadcrumb, etc.]
- **Feedback**: [Alert, Modal, Toast, etc.]

### Custom Components Built on PatternFly
- **Component Name**: Brief description and PatternFly dependencies
- **Usage Pattern**: How it's used in the codebase
- **Customization**: Any project-specific modifications

## Styling and Theming

### CSS Custom Properties
- **Design Tokens**: How PatternFly tokens are used
- **Custom Properties**: Project-specific CSS variables
- **Theme Support**: Light/dark theme implementation

### PatternFly 6 Token System
- **Semantic Tokens**: Use `--pf-t-*` tokens for PatternFly 6 compatibility
- **Global Variables**: Avoid `--pf-v6-*` variables (legacy, may not work reliably)
- **Token Categories**: Background, text, border, spacing, and z-index tokens
- **Migration Strategy**: Replace global variables with semantic tokens during PF6 upgrades

### Custom CSS
- **BEM Naming**: Project's CSS naming conventions
- **Component Overrides**: Any PatternFly component customizations
- **Layout Customizations**: Project-specific layout patterns

### Z-Index Management
- **Component Z-Index**: PatternFly manages z-index internally for overlays (Popover, Modal, Tooltip)
- **Custom Z-Index**: Use custom CSS classes or inline styles when needed
- **Stacking Context**: Check for potential stacking context issues with custom z-index
- **Utility Classes**: PatternFly does not provide z-index utility classes

## Vendor Code and Dependencies

### Third-Party Wrappers
- **Library Name**: Purpose and PatternFly integration
- **Customization Level**: How much it modifies PatternFly behavior
- **Migration Status**: Whether it needs updates

### Legacy/Deprecated Components and APIs
- **Component/API Name**: Current legacy or deprecated usage in the codebase
- **Legacy Reason**: Why it exists (custom implementation, old PatternFly version, etc.)
- **Deprecation Status**: Whether it's officially deprecated and when
- **PatternFly Compatibility**: Current version compatibility
- **Replacement Component**: What to use instead (if available)
- **Migration Status**: Whether it has been updated or needs updating
- **Breaking Changes**: Any breaking changes introduced by the replacement
- **Migration Strategy**: Step-by-step approach to update deprecated usage
- **Priority Level**: High/Medium/Low based on impact and usage

## Migration History

### Previous Versions
- **From Version**: [e.g., 5.3.x]
- **To Version**: [e.g., 6.3.1]
- **Key Changes**: Major breaking changes handled
- **Migration Tools**: Codemods or manual changes used

### Future Migration Plans
- **Target Version**: [e.g., 7.0.0]
- **Known Issues**: Components that will need updates
- **Migration Strategy**: Planned approach for upgrades

## Project-Specific Patterns

### Common Usage Scenarios
- **Data Tables**: How tables are implemented
- **Form Handling**: Form validation and submission patterns
- **Navigation**: How navigation is structured
- **State Management**: How PatternFly components integrate with state

### Custom Hooks and Utilities
- **Hook Name**: Purpose and PatternFly dependencies
- **Usage Pattern**: How it's used throughout the project
- **Customization**: Project-specific modifications

## Testing Patterns

### Component Testing
- **Test Framework**: How PatternFly components are tested
- **Snapshot Testing**: Approach to snapshot updates
- **Accessibility Testing**: How accessibility is verified

### Testing Integration Patterns
- **Component Integration Testing**: Test PatternFly component integration, not implementation
- **Accessibility Testing**: Use eslint-plugin-jsx-a11y for lint-time accessibility validation or axe-core/jest-axe for in-depth runtime testing
- **User Interaction Testing**: Test user interactions with PatternFly components
- **Snapshot Management**: Maintain and update component snapshots regularly

### Integration Testing
- **E2E Testing**: How PatternFly components work in E2E tests
- **OUIA IDs**: How component identification is handled

## Performance Considerations

### Bundle Optimization
- **Import Strategy**: How PatternFly components are imported
- **Tree Shaking**: Whether unused components are eliminated
- **Bundle Size**: Impact of PatternFly on application size

### Runtime Performance
- **Component Optimization**: Any performance optimizations applied
- **Rendering Patterns**: How components are rendered efficiently

### Performance Optimization Patterns
- **Lazy Loading**: Use React.lazy for heavy components
- **Memoization**: Use React.memo for frequently re-rendered components
- **Virtualization**: Implement for large datasets in tables and lists
- **Bundle Splitting**: Separate PatternFly components into chunks

## Accessibility Implementation

### ARIA Labels and Roles
- **Implementation Pattern**: How accessibility is handled
- **Custom Accessibility**: Project-specific accessibility features
- **Testing Approach**: How accessibility is verified

### Keyboard Navigation
- **Implementation**: How keyboard navigation is implemented
- **Custom Handlers**: Project-specific keyboard handling

### Accessibility Linting Strategy
- **Primary Approach**: Use eslint-plugin-jsx-a11y for lint-time accessibility validation
- **Configuration**: Enable recommended rules with project-specific customizations
- **Benefits**: Catches accessibility issues during development, no runtime overhead
- **Alternative**: Use axe-core or jest-axe for runtime accessibility testing when needed
- **Integration**: Configure eslint-plugin-jsx-a11y in .eslintrc.js with PatternFly-specific rules

## Maintenance Guidelines

### Update Process
- **Version Updates**: How to update PatternFly versions
- **Breaking Changes**: How to handle breaking changes
- **Testing Strategy**: How to verify updates work correctly

### Deprecated Component Updates
- **Identification**: How to identify deprecated components and APIs
- **Assessment**: Evaluate impact of deprecated usage on the codebase
- **Prioritization**: Which deprecated components to update first
- **Migration Tools**: Available codemods or automated tools for updates
- **Manual Updates**: How to manually update deprecated components
- **Testing**: How to verify deprecated component updates work correctly
- **Documentation**: How to document the migration process and lessons learned

### Code Review Checklist
- **PatternFly Compliance**: What to check in code reviews
- **Accessibility**: Accessibility requirements for PatternFly components (eslint-plugin-jsx-a11y integration)
- **Performance**: Performance considerations for PatternFly usage
- **Import Patterns**: Verify named imports are used instead of default/wildcard imports
- **Token Usage**: Check that semantic tokens are used for PatternFly 6 styling
- **Z-Index Management**: Ensure custom z-index doesn't conflict with PatternFly components

## Resources and References

### Local Resources
- **Cached Documentation**: Links to local PatternFly resources
- **Migration Tools**: Local copies of migration tools
- **Custom Documentation**: Project-specific PatternFly guides

### External Resources
- **Official Documentation**: Links to relevant PatternFly docs
- **Migration Guides**: Links to version migration guides
- **Community Resources**: Links to helpful community resources
```

**Key Information to Capture**:
- **Current Version**: Exact PatternFly versions in use
- **Usage Patterns**: How components are actually used in the codebase
- **Customizations**: Project-specific modifications and overrides
- **Migration History**: Previous upgrades and future plans
- **Performance Impact**: How PatternFly affects application performance
- **Accessibility**: How accessibility is implemented with PatternFly
- **Testing**: How PatternFly components are tested
- **Maintenance**: Guidelines for keeping PatternFly usage current

**Update Triggers**:
- PatternFly version upgrades
- New component implementations
- Major refactoring efforts
- Performance optimizations
- Accessibility improvements
- Deprecated component announcements
- Breaking changes in PatternFly releases

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

## Resource Scanning Strategy

### When to Suggest Resource Scanning
- **User Mentions Other Projects**: When users reference other PatternFly projects or repositories
- **Advanced Pattern Requests**: When users ask for advanced PatternFly implementation patterns
- **Guidance Gaps**: When current guidance doesn't cover specific use cases
- **Version-Specific Questions**: When users need insights from specific PatternFly versions
- **Performance Optimization**: When users seek advanced performance patterns
- **Component Integration**: When users need examples of complex component integration

### How to Approach Resource Analysis
1. **Systematic Code Review**: Follow a structured approach to analyze codebases
2. **Pattern Identification**: Look for recurring patterns and best practices
3. **Version-Specific Analysis**: Consider the PatternFly and React versions being used
4. **Implementation Examples**: Extract concrete code examples and patterns
5. **Gap Analysis**: Identify what's missing from our current guidance

### What to Look For During Scanning

#### **Import and Usage Patterns**
- **Import Strategies**: How PatternFly components are imported (named, aliased, deep imports)
- **Component Usage**: How components are actually used in real applications
- **Hook Integration**: How React hooks are used with PatternFly components
- **Performance Patterns**: Optimization techniques and performance considerations

#### **Architecture and Composition**
- **Custom Wrappers**: How projects create custom wrappers around PatternFly components
- **Component Families**: How related components are organized and structured
- **Styling Approaches**: How PatternFly styling and theming is implemented
- **Accessibility Patterns**: How accessibility is implemented throughout the application

#### **Advanced Features**
- **Chart Integration**: How PatternFly charts and data visualization are implemented
- **Table Patterns**: Advanced table implementations and customizations
- **Form Handling**: Complex form patterns and validation approaches
- **Layout Strategies**: Advanced layout and responsive design patterns

### How to Document Findings

#### **Create Insights Files**
```markdown
# [Project Name] Analysis - PatternFly Development Insights

## Codebase Overview
- Project type and domain
- Technology stack and versions
- PatternFly usage statistics

## Key Discoveries
- Advanced patterns found
- Implementation examples
- Best practices identified

## Recommendations
- How findings apply to our guidance
- Suggested guidance updates
- New patterns to consider
```

#### **Update Implementation Templates**
- **Enhance Templates**: Update `.agent/patternfly-implementation.md` templates with new patterns
- **Add Examples**: Include concrete code examples from scanned resources
- **Document Patterns**: Add new patterns to patternfly-discoveries.md

### How to Apply Learnings

#### **Guidance Enhancement**
- **Identify Gaps**: Use findings to identify gaps in current guidance
- **Add Sections**: Create new sections for advanced patterns
- **Update Examples**: Enhance existing examples with real-world implementations
- **Validate Principles**: Confirm that current principles work across different project types

#### **Pattern Adoption**
- **Evaluate Relevance**: Determine which patterns are relevant to our project
- **Adapt Patterns**: Modify patterns to fit our project's needs
- **Test Implementation**: Verify that patterns work in our context
- **Document Usage**: Add adopted patterns to our implementation guide

### Agent Behavior Standards for Resource Scanning

#### **Proactive Suggestion**
- **Recognize Opportunities**: Identify when resource scanning could be valuable
- **Explain Benefits**: Clearly explain what insights might be gained
- **Request Permission**: Always ask for user permission before scanning
- **Set Expectations**: Explain the scope and time commitment involved

#### **Systematic Approach**
- **Structured Analysis**: Follow a consistent methodology for code review
- **Comprehensive Coverage**: Analyze imports, components, styling, and patterns
- **Version Awareness**: Consider version-specific patterns and limitations
- **Documentation Focus**: Focus on patterns that can be documented and reused

#### **Quality Assurance**
- **Validate Findings**: Verify that patterns are actually beneficial
- **Context Consideration**: Consider the context and applicability of findings
- **User Confirmation**: Confirm findings with users before implementing changes
- **Continuous Learning**: Use findings to improve future scanning approaches

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
- **Version Awareness**: Ensure guidance matches the project's PatternFly version

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
