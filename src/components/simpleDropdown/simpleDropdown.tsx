/**
 * A simplified dropdown component using PatternFly, designed for basic dropdown needs. It supports customizable
 * labels, items, accessibility options, and styling variants. The component is flexible, allowing for optional
 * full-width display and an onSelect callback for additional interaction handling.
 *
 * @module simpleDropdown
 */
import React, { useState } from 'react';
import {
  Dropdown,
  DropdownItem,
  DropdownList,
  MenuToggle,
  type MenuToggleElement,
  type MenuToggleProps
} from '@patternfly/react-core';

interface SimpleDropdownProps {
  label: string;
  dropdownItems?: string[];
  ariaLabel?: string;
  onSelect?: (item: string) => void;
  variant?: MenuToggleProps['variant'];
  isFullWidth?: boolean;
}

const SimpleDropdown: React.FC<SimpleDropdownProps> = ({
  label,
  dropdownItems,
  ariaLabel = 'Dropdown menu',
  onSelect = Function.prototype,
  variant,
  isFullWidth
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dropdown
      isOpen={isOpen}
      onOpenChange={isOpen => setIsOpen(isOpen)}
      onSelect={() => {
        setIsOpen(false);
      }}
      toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
        <MenuToggle
          isFullWidth={isFullWidth}
          ref={toggleRef}
          isExpanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          variant={variant}
          aria-label={ariaLabel}
          isDisabled={!dropdownItems || dropdownItems.length === 0}
        >
          {label}
        </MenuToggle>
      )}
    >
      <DropdownList>
        {Array.isArray(dropdownItems) &&
          dropdownItems.map(item => (
            <DropdownItem key={item} onClick={() => onSelect(item)}>
              {item}
            </DropdownItem>
          ))}
      </DropdownList>
    </Dropdown>
  );
};

export { SimpleDropdown as default, SimpleDropdown, type SimpleDropdownProps };
