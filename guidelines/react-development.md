# React Development Guidelines

Essential guidelines for React development in Quipucords UI, focusing on modern React patterns, performance optimization, and best practices.

## Official React Resources

### Primary Documentation
- **[React.dev](https://react.dev/)** - Official React documentation (React 19.1)
- **[React GitHub Repository](https://github.com/facebook/react.git)** - Source code and development resources
- **[React API Reference](https://react.dev/reference/react)** - Complete API documentation

### Required Cached Resources
**MANDATORY**: The following resources must be cached under `.agent/_resources/`:

1. **React.dev Documentation** - Official React documentation and guides
   - **Source**: https://react.dev/
   - **Location**: `.agent/_resources/react-dev/`
   - **Purpose**: Official React patterns, hooks, and best practices

2. **React GitHub Repository** - Source code and development resources
   - **Source**: https://github.com/facebook/react.git
   - **Location**: `.agent/_resources/react/`
   - **Purpose**: Advanced patterns, implementation details, and source code

3. **Testing Library Documentation** - Component testing best practices
   - **Source**: https://testing-library.com/
   - **Location**: `.agent/_resources/testing-library/`
   - **Purpose**: React Testing Library patterns and accessibility testing

4. **TypeScript React Documentation** - TypeScript integration with React
   - **Source**: https://www.typescriptlang.org/docs/handbook/react.html
   - **Location**: `.agent/_resources/typescript-react/`
   - **Purpose**: TypeScript patterns for React development

### Version Information
- **Current React Version**: 18.3.1 (from package.json)
- **React DOM Version**: 18.3.1
- **TypeScript Types**: @types/react ^18.3.5, @types/react-dom ^18.3.0
- **Latest Available**: React 19.1 (as of search results)

## Project-Specific React Resources

### Development Dependencies
Based on `package.json` analysis:

#### Testing Framework
- **Jest**: 29.7.0 - JavaScript testing framework
- **React Testing Library**: ^16.0.1 - Component testing utilities
- **Testing Library DOM**: ^10.4.0 - DOM testing utilities
- **Testing Library User Event**: ^14.5.2 - User interaction simulation
- **Jest Environment JSDOM**: 29.7.0 - Browser environment for testing

#### Linting and Code Quality
- **ESLint**: 8.57.0 - JavaScript linting
- **ESLint React Plugin**: ^7.35.2 - React-specific linting rules
- **ESLint React Hooks Plugin**: ^4.6.2 - Hooks linting rules
- **ESLint JSX A11y Plugin**: ^6.10.0 - Accessibility linting
- **Prettier**: ^3.3.3 - Code formatting
- **TypeScript ESLint**: 7.18.0 - TypeScript linting

#### Build and Development Tools
- **Weldable**: ^3.2.0 - Webpack wrapper for development
- **TypeScript**: TypeScript compilation and type checking
- **React Router DOM**: 6.26.1 - Client-side routing

### Available Scripts
```bash
# Development
npm start                    # Start development server with mock API
npm run start:using-server   # Start with external server
npm run start:stage          # Start with staging environment

# Testing
npm test                     # Run all tests (lint, build, coverage)
npm run test:dev             # Development testing (lint, local tests)
npm run test:local           # Local tests with watch mode
npm run test:integration     # Integration tests
npm run test:lint            # Lint only
npm run test:lint-fix        # Lint with auto-fix
npm run test:types           # TypeScript type checking

# Building
npm run build                # Production build
npm run build:brand          # Brand-specific build
```

## Agent Guidelines

### Resource Priority
1. **React.dev Documentation** - Official, up-to-date React patterns
2. **Project package.json** - Project-specific tooling and versions
3. **React GitHub Repository** - Advanced patterns and implementation details
4. **Testing Library Documentation** - Component testing best practices

### When to Use React Resources
- **Component Architecture**: Design patterns, composition, and structure
- **Performance Optimization**: Memoization, hooks optimization, bundle size
- **Testing Strategies**: Component testing, integration testing, accessibility testing
- **State Management**: Hooks, context, and state patterns
- **Code Quality**: Linting rules, TypeScript patterns, formatting standards

### Version Awareness
- **Current Project**: React 18.3.1 (stable, production-ready)
- **Latest Available**: React 19.1 (new features, potential migration target)
- **Migration Considerations**: Evaluate React 19 features for future adoption
- **Backward Compatibility**: Ensure recommendations work with React 18

## Development Workflow

### Component Development
1. **Start with Function Components**: Use modern React patterns
2. **Implement Hooks**: useState, useEffect, useCallback, useMemo
3. **Add TypeScript**: Full type safety for props and state
4. **Write Tests**: Component and integration testing
5. **Lint and Format**: Ensure code quality standards

### Testing Strategy
```typescript
// Component testing pattern with TypeScript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

interface ComponentNameProps {
  title: string;
  onAction: (id: string) => void;
}

describe('ComponentName', () => {
  it('should render correctly', () => {
    render(<ComponentName title="Test" onAction={jest.fn()} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should handle user interactions', async () => {
    const user = userEvent.setup();
    const mockHandler = jest.fn();
    
    render(<ComponentName title="Test" onAction={mockHandler} />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(mockHandler).toHaveBeenCalledWith('expected-id');
  });
});
```

### Performance Optimization
```typescript
// Memoization patterns with TypeScript
interface DataItem {
  id: string;
  name: string;
  processed?: boolean;
}

interface ExpensiveComponentProps {
  data: DataItem[];
  onAction: (id: string) => void;
}

const ExpensiveComponent: React.FC<ExpensiveComponentProps> = React.memo(({ data, onAction }) => {
  const processedData = useMemo((): DataItem[] => 
    data.map(item => ({ ...item, processed: true })), 
    [data]
  );

  const handleAction = useCallback((id: string) => {
    onAction(id);
  }, [onAction]);

  return (
    <div>
      {processedData.map(item => (
        <Item key={item.id} item={item} onAction={handleAction} />
      ))}
    </div>
  );
});
```

## Core Development Principles

### 1. Functional Components and Hooks
- **Use Function Components**: Modern React pattern
- **Leverage Hooks**: useState, useEffect, useCallback, useMemo
- **Custom Hooks**: Extract reusable logic
- **Avoid Class Components**: Unless absolutely necessary

### 2. TypeScript Integration
- **Full Type Safety**: Props, state, and event handlers
- **Interface Definitions**: Clear component contracts
- **Generic Components**: Reusable, type-safe components
- **Type Guards**: Runtime type checking when needed
- **Strict Mode**: Enable strict TypeScript configuration
- **Type Inference**: Leverage TypeScript's inference capabilities
- **Utility Types**: Use React utility types (React.FC, React.PropsWithChildren)
- **Event Types**: Proper event handler typing (React.FormEvent, React.MouseEvent)

### 3. Performance First
- **React.memo**: Prevent unnecessary re-renders
- **useCallback**: Memoize event handlers
- **useMemo**: Memoize expensive computations
- **Code Splitting**: Lazy load components and routes
- **Bundle Analysis**: Monitor bundle size impact

### 4. Testing Best Practices
- **Component Testing**: Test component behavior, not implementation
- **Integration Testing**: Test component interactions
- **Accessibility Testing**: Ensure ARIA compliance
- **User Interaction Testing**: Test actual user workflows
- **Snapshot Testing**: Catch unintended changes

### 5. Code Quality Standards
- **ESLint Rules**: Follow React and TypeScript linting rules
- **Prettier Formatting**: Consistent code style
- **Accessibility**: JSX A11y plugin compliance
- **Documentation**: JSDoc comments for complex components

## TypeScript Best Practices

### Type Safety Patterns
```typescript
// Component props with strict typing
interface UserCardProps {
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  onEdit: (userId: string) => void;
  onDelete: (userId: string) => Promise<void>;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  const handleDelete = useCallback(async () => {
    try {
      await onDelete(user.id);
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  }, [user.id, onDelete]);

  return (
    <Card>
      <CardTitle>{user.name}</CardTitle>
      <CardBody>
        <Text>{user.email}</Text>
        <ActionGroup>
          <Button onClick={() => onEdit(user.id)}>Edit</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </ActionGroup>
      </CardBody>
    </Card>
  );
};
```

### Event Handler Typing
```typescript
// Proper event handler typing
interface FormProps {
  onSubmit: (data: FormData) => void;
  onChange: (field: string, value: string) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit, onChange }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSubmit(formData);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.name, event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" onChange={handleInputChange} />
      <button type="submit">Submit</button>
    </form>
  );
};
```

### Custom Hooks with TypeScript
```typescript
// Custom hook with proper typing
interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface UseApiActions<T> {
  fetch: () => Promise<void>;
  reset: () => void;
}

function useApi<T>(url: string): UseApiState<T> & UseApiActions<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null
  });

  const fetch = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await fetch(url);
      const data = await response.json();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({ data: null, loading: false, error: error as Error });
    }
  }, [url]);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, fetch, reset };
}
```

### Generic Components
```typescript
// Generic component with type constraints
interface ListItem {
  id: string;
  title: string;
}

interface ListProps<T extends ListItem> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  onItemClick: (item: T) => void;
}

function List<T extends ListItem>({ items, renderItem, onItemClick }: ListProps<T>) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id} onClick={() => onItemClick(item)}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}
```

### Type Guards and Runtime Checking
```typescript
// Type guards for runtime type checking
interface User {
  id: string;
  name: string;
  email: string;
}

interface Admin extends User {
  permissions: string[];
}

function isAdmin(user: User): user is Admin {
  return 'permissions' in user && Array.isArray(user.permissions);
}

const UserProfile: React.FC<{ user: User }> = ({ user }) => {
  if (isAdmin(user)) {
    return (
      <div>
        <h2>{user.name}</h2>
        <p>Permissions: {user.permissions.join(', ')}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Regular user</p>
    </div>
  );
};
```

## Version-Specific Principles

### React 18 Features
- **Concurrent Features**: Use startTransition for non-urgent updates
- **Automatic Batching**: Leverage automatic state batching
- **Suspense**: Code splitting and data fetching
- **Strict Mode**: Development-time checks

### React 19 Considerations
- **React Compiler**: Future optimization opportunities
- **Server Components**: Potential migration path
- **New Hooks**: Evaluate new hook patterns
- **Performance Improvements**: Monitor for adoption

## Implementation Documentation

Maintain `.agent/react-implementation.md` to document project-specific React usage.

### Required Documentation Sections
The implementation documentation MUST include:

1. **Current Implementation Analysis** - Detailed source code scanning
2. **Performance Analysis** - Bundle size, runtime performance, optimization opportunities
3. **Testing Coverage** - Component testing patterns and coverage analysis
4. **State Management Patterns** - Hooks usage, context patterns, data flow
5. **Code Quality Assessment** - Linting compliance, TypeScript usage, accessibility
6. **Migration Opportunities** - React 19 features, performance improvements

### Documentation Structure
- **Component Architecture**: How components are structured and composed
- **Hooks Usage**: Custom hooks, state management patterns
- **Performance Patterns**: Memoization, optimization strategies
- **Testing Strategy**: Testing patterns and coverage
- **Build Integration**: Webpack, TypeScript, and build optimization
- **Code Quality**: Linting, formatting, and accessibility compliance

### Key Information to Capture
- **Current Version**: Exact React versions in use
- **Component Patterns**: How components are structured and composed
- **State Management**: Hooks usage, context patterns, data flow
- **Performance**: Bundle size, runtime performance, optimization strategies
- **Testing**: Testing patterns, coverage, and quality
- **Code Quality**: Linting compliance, TypeScript usage, accessibility

### Required Analysis Sections
- **Performance Optimizations**: Bundle size, runtime performance, memory usage
- **Testing Improvements**: Coverage gaps, testing patterns, accessibility testing
- **Code Quality Enhancements**: Linting compliance, TypeScript usage, documentation
- **Migration Path**: React 19 features, performance improvements, breaking changes
- **Best Practice Compliance**: Alignment with React development guidelines
- **Architectural Improvements**: Component composition, state management patterns

## Version Migration

### React 18 to 19 Migration
- **Automatic Batching**: Already available in React 18
- **Concurrent Features**: Evaluate startTransition usage
- **New Hooks**: Monitor for new hook patterns
- **Performance Improvements**: Monitor bundle size and runtime performance

### Migration Strategy
1. **Assessment**: Evaluate current React 18 usage
2. **Testing**: Ensure comprehensive test coverage
3. **Gradual Migration**: Incremental feature adoption
4. **Performance Monitoring**: Track bundle size and runtime metrics
5. **Documentation**: Update implementation documentation

## Testing Patterns

### Component Testing
```typescript
// Testing Library pattern with TypeScript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

interface ComponentNameProps {
  title: string;
  onAction: (id: string) => void;
}

describe('ComponentName', () => {
  it('should render with props', () => {
    render(<ComponentName title="Test" onAction={jest.fn()} />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should handle user interactions', async () => {
    const user = userEvent.setup();
    const mockHandler = jest.fn<void, [string]>();
    
    render(<ComponentName title="Test" onAction={mockHandler} />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(mockHandler).toHaveBeenCalledWith('expected-id');
  });

  it('should handle form submissions', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn<void, [FormData]>();
    
    render(<ComponentName title="Test" onSubmit={mockSubmit} />);
    
    const input = screen.getByLabelText('Name');
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    
    await user.type(input, 'Test Name');
    await user.click(submitButton);
    
    expect(mockSubmit).toHaveBeenCalledWith(expect.any(FormData));
  });
});
```

### Integration Testing
```typescript
// Integration test pattern with TypeScript
interface AppState {
  user: User | null;
  data: DataItem[];
  loading: boolean;
}

describe('Feature Integration', () => {
  it('should handle complete user workflow', async () => {
    const user = userEvent.setup();
    const mockApi = jest.fn<Promise<DataItem[]>, []>();
    
    render(<App apiClient={mockApi} />);
    
    // Navigate to feature
    await user.click(screen.getByText('Feature'));
    
    // Interact with form
    const nameInput = screen.getByLabelText('Name');
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    
    await user.type(nameInput, 'Test Name');
    await user.click(submitButton);
    
    // Verify API call and result
    expect(mockApi).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Test Name'
    }));
    expect(screen.getByText('Success')).toBeInTheDocument();
  });
});
```

### Accessibility Testing
```typescript
// Accessibility test pattern with TypeScript
import { axe, toHaveNoViolations, AxeResults } from 'jest-axe';

expect.extend(toHaveNoViolations);

interface AccessibilityTestProps {
  title: string;
  children: React.ReactNode;
}

describe('Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(
      <ComponentName title="Test Component">
        <button>Click me</button>
      </ComponentName>
    );
    
    const results: AxeResults = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA attributes', () => {
    render(<ComponentName title="Test" />);
    
    const button = screen.getByRole('button', { name: /test/i });
    expect(button).toHaveAttribute('aria-label', 'Test button');
  });
});
```

## Performance Optimization

### Bundle Optimization
- **Code Splitting**: React.lazy and Suspense
- **Tree Shaking**: Named imports and dead code elimination
- **Bundle Analysis**: Monitor bundle size impact
- **Dynamic Imports**: Lazy load components and routes

### Runtime Optimization
- **React.memo**: Prevent unnecessary re-renders
- **useCallback**: Memoize event handlers
- **useMemo**: Memoize expensive computations
- **State Optimization**: Minimize state updates

### Memory Management
- **Cleanup Effects**: Proper useEffect cleanup
- **Event Listeners**: Remove listeners on unmount
- **Large Lists**: Virtualization for performance
- **Memory Leaks**: Monitor for memory leaks

## Code Review Checklist

### Component Review
- [ ] Uses function components and hooks
- [ ] Proper TypeScript types and interfaces
- [ ] Type safety for props, state, and events
- [ ] Memoization where appropriate
- [ ] Accessibility compliance
- [ ] Comprehensive testing
- [ ] Performance considerations

### Performance Review
- [ ] Bundle size impact
- [ ] Runtime performance
- [ ] Memory usage
- [ ] Re-render optimization
- [ ] Code splitting opportunities

### Testing Review
- [ ] Component behavior testing
- [ ] User interaction testing
- [ ] Accessibility testing
- [ ] Integration testing
- [ ] Test coverage adequacy

### Code Quality Review
- [ ] ESLint compliance
- [ ] Prettier formatting
- [ ] TypeScript usage and strict mode
- [ ] Type safety and interface definitions
- [ ] Documentation quality
- [ ] Accessibility standards

## Initial Steps After Reviewing React Development Guidelines
**AUTOMATIC ACTIONS REQUIRED**:

1. **MANDATORY Caching Check**: 
   - Check if `.agent/_resources/react/` contains cached documentation
   - If empty or missing, AUTOMATICALLY offer: "Would you like me to cache React documentation for faster development assistance?"
   - Explain benefits: "This will cache official React docs locally for faster responses and offline access"
   - Proceed with caching unless user explicitly says "no"

2. **Implementation Documentation Check**:
   - Check if `.agent/react-implementation.md` exists
   - If missing, offer to create it: "Would you like me to create project-specific React implementation documentation?"
   - Explain: "This documents how React is used in this specific codebase"
   - Proceed with creation unless user explicitly says "no"

3. **MANDATORY In-Depth Analysis**:
   - After creating implementation documentation, AUTOMATICALLY provide in-depth analysis
   - Include potential React issues and optimizations based on cached resources
   - Reference React best practices from official documentation
   - Identify performance issues, testing gaps, and architectural improvements
   - Provide specific recommendations with code examples

**Note**: These offers should be automatic and prominent, not buried in other text.

## In-Depth Analysis Requirements

### Mandatory Analysis Components
When creating implementation documentation, agents MUST provide:

1. **React Best Practice Analysis**:
   - Compare current implementation against React.dev guidelines
   - Identify deviations from recommended patterns
   - Reference specific guidelines from cached resources

2. **Performance and Optimization Analysis**:
   - Bundle size impact of current implementation
   - Runtime performance considerations
   - Memory usage and optimization opportunities
   - Code splitting and lazy loading analysis

3. **Testing and Quality Analysis**:
   - Test coverage assessment
   - Testing pattern analysis
   - Accessibility compliance review
   - Code quality and linting analysis

4. **Architectural Review**:
   - Component composition patterns
   - State management approaches
   - Hooks usage patterns
   - Integration with build system

5. **Migration and Compatibility Analysis**:
   - React 19 migration opportunities
   - Version compatibility issues
   - Breaking change impact assessment
   - Feature adoption recommendations

### Analysis Sources
- **React.dev Documentation**: `.agent/_resources/react-dev/`
- **React GitHub Repository**: `.agent/_resources/react/`
- **Testing Library Documentation**: `.agent/_resources/testing-library/`
- **TypeScript React Documentation**: `.agent/_resources/typescript-react/`
- **Project package.json**: Current tooling and dependencies

## Quick Reference

### Common React Questions
- **Component Usage**: Check React.dev documentation first
- **Hooks Reference**: Use React.dev hooks documentation
- **Performance**: Reference React.dev performance guides
- **Testing**: Use Testing Library documentation
- **Migration**: Reference React.dev migration guides

### Testing Commands
```bash
npm test                    # Run all tests
npm run test:dev           # Development testing
npm run test:local         # Local tests with watch
npm run test:lint          # Lint only
npm run test:types         # TypeScript checking
```

### Build Commands
```bash
npm start                  # Development server
npm run build              # Production build
npm run build:brand        # Brand-specific build
```

### Linting Commands
```bash
npm run test:lint          # Run ESLint
npm run test:lint-fix      # Auto-fix linting issues
npm run test:types         # TypeScript type checking
```

## Created
- **Date**: August 29, 2025
- **Purpose**: Comprehensive React development guidelines for Quipucords UI
- **Status**: Complete with caching strategy, implementation documentation requirements, and in-depth analysis guidelines
