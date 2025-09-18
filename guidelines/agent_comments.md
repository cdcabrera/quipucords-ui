# Agent Comments

## Overview

Comment templates and standards for this repository (React + TypeScript + PatternFly), optimized for machine processing.

## For Agents

### Processing Priority

Medium — Use when adding or reviewing comments and documentation in code or tests.

### Related Guidelines

See the [Guidelines Index](./README.md#guidelines-index) for all related guidelines.

### Key Concepts

- JSDoc-first documentation for components, hooks, utilities, and tests
- Minimal inline comments (only for TODO, FIXME, eslint directives, or non-obvious behavior)
- ESLint directives scope and rationale
- Spacing and length rules (comment-length)
- Cross-linking policy: index-first, no deep anchors

## Comment Taxonomy and Policy

- Primary: Use JSDoc blocks above functions/components/hooks/tests for intent and contracts.
- Inline comments are limited to:
  - TODO: and FIXME: notes
  - eslint-disable[-next-line] with brief justification
  - Brief notes for non-obvious behavior that cannot be captured via types or JSDoc
- Prefer @remarks in JSDoc over long inline narratives.

## JSDoc Templates (copy-ready)

### React Component (TSX)
```tsx
/**
 * @summary Inventory toolbar with status filter and clear controls.
 * @remarks Uses PatternFly Toolbar composition; accessible names and keyboard navigation first.
 * @param props.filters - Current filter values keyed by filter name
 * @param props.onChange - Called when a filter value changes
 * @param props.onClearAll - Clears all filters
 */
export const InventoryToolbar: React.FC<InventoryToolbarProps> = ({ filters, onChange, onClearAll }) => {
  // TODO: Add date filter in a subsequent iteration
  return null;
};
```

### Hook/Utility Function (TS)
```ts
/**
 * @summary Clean credential form values by auth type.
 * @param formData - Partial credential form data
 * @param authType - Active authentication type
 * @param maskedFields - Fields to drop when empty
 * @returns Cleaned credential payload
 */
function getCleanedFormData(
  formData: CredentialFormType,
  authType: string,
  maskedFields: string[] = ['password', 'ssh_key', 'ssh_passphrase', 'become_password', 'auth_token']
): CredentialFormType {
  // Non-obvious: Only drop masked fields when empty to avoid clobbering persisted secrets
  return formData;
}
```

### Test Case Intent (TS)
```ts
/**
 * @summary Selecting "Active" updates the status filter.
 */
it('updates filter when status selected', async () => { /* ... */ });
```

### Valid/Invalid via @example
```ts
/**
 * @summary Toolbar composition pattern.
 * @example Valid
 * Uses PatternFly components with accessible names and minimal imports.
 * @example Invalid
 * Reimplements PF DOM; lacks accessible names.
 */
export const ToolbarExample = () => null;
```

## ESLint Directives Usage

- Prefer the narrowest scope: // eslint-disable-next-line <rule-id>
- Include a brief justification next to the directive, or add context in JSDoc @remarks if not obvious.
- Avoid file-wide disables unless absolutely necessary; document rationale.

Example:
```tsx
// eslint-disable-next-line jsx-a11y/anchor-has-content -- Intentional shell in test-only mock
const MockNavLink = (props: any) => <a {...props} />;
```

## Spacing and Length Rules

- Respect comment-length: keep lines under 120 characters for comments.
- Keep one blank line between major sections of code; avoid large inline narratives.
- Use @remarks in JSDoc for additional context rather than multi-line inline comments.

## Before/After Examples

Before (verbose inline comments):
```ts
// This component renders a toolbar and also has a lot of behavior and here is why we did it this way ...
const Toolbar = () => null;
```

After (concise JSDoc):
```ts
/**
 * @summary Toolbar composition pattern with accessible names.
 * @remarks Uses PF components; prefer tokens over custom CSS.
 */
const Toolbar = () => null;
```

## Cross-linking Policy

- Index-first: Refer readers to the Guidelines Index for related topics.
- Do not include deep links to specific sections in sibling documents.
- Use stable, neutral references (e.g., “React guidance”) without anchors.

## Validation Checklist

- JSDoc present for complex components/utilities/tests
- Inline comments limited to TODO/FIXME/eslint directives/non-obvious notes
- Comment-length limits respected; spacing is consistent

## References

- See the [Guidelines Index](./README.md#guidelines-index) for related guidelines
- ESLint config for jsdoc and comment-length rules is defined in .eslintrc.js

## PR Transparency (MCP)
- Include a short note in PR descriptions when MCP-assisted: `Assisted by: [tool or IDE] ([model]); MCP servers: [filesystem, shell, git, openapi, http]`
- If MCP access was limited or deviated (e.g., additional shell commands), note the rationale briefly.

Last updated: September 17, 2025
