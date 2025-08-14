import * as React from 'react';
import { ToolbarFilter, Menu, MenuContent, MenuItem, MenuList, MenuToggle } from '@patternfly/react-core';
import { FilterControlProps } from './FilterControl';
import { SelectFilterCategory, OptionPropsWithKey } from './FilterToolbar';

export interface SelectFilterControlProps<TItem, TFilterCategoryKey extends string>
  extends FilterControlProps<TItem, TFilterCategoryKey> {
  category: SelectFilterCategory<TItem, TFilterCategoryKey>;
  isScrollable?: boolean;
}

export const SelectFilterControl = <TItem, TFilterCategoryKey extends string>({
  category,
  filterValue,
  setFilterValue,
  showToolbarItem,
  isDisabled = false,
  isScrollable = false,
  id
}: React.PropsWithChildren<SelectFilterControlProps<TItem, TFilterCategoryKey>>): JSX.Element | null => {
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = React.useState(false);

  const getOptionKeyFromOptionValue = (optionValue: string) =>
    category.selectOptions.find(optionProps => optionProps.value === optionValue)?.key;

  const getChipFromOptionValue = (optionValue: string | undefined) =>
    optionValue ? optionValue.toString() : '';

  const getOptionKeyFromChip = (chip: string) =>
    category.selectOptions.find(optionProps => optionProps.value.toString() === chip)?.key;

  const getOptionValueFromOptionKey = (optionKey: string) =>
    category.selectOptions.find(optionProps => optionProps.key === optionKey)?.value;

  const onFilterSelect = (value: string) => {
    const optionKey = getOptionKeyFromOptionValue(value);
    setFilterValue(optionKey ? [optionKey] : null);
    setIsFilterDropdownOpen(false);
  };

  const onFilterClear = (chip: string) => {
    const optionKey = getOptionKeyFromChip(chip);
    const newValue = filterValue ? filterValue.filter(val => val !== optionKey) : [];
    setFilterValue(newValue.length > 0 ? newValue : null);
  };

  // Get the selected option value for display
  const selectedOption = filterValue && filterValue.length > 0 
    ? category.selectOptions.find(optionProps => optionProps.key === filterValue[0])
    : null;

  const chips = selectedOption ? [getChipFromOptionValue(selectedOption.value)] : [];

  const renderMenuItems = (options: OptionPropsWithKey[]) =>
    options.map(optionProps => (
      <MenuItem 
        key={optionProps.key} 
        itemId={optionProps.value}
        isSelected={filterValue?.includes(optionProps.key)}
      >
        {optionProps.value}
      </MenuItem>
    ));

  return (
    <ToolbarFilter
      id={`${id}-filter-control-${category.key}`}
      labels={chips}
      deleteLabel={(_, chip) => onFilterClear(chip as string)}
      categoryName={category.title}
      showToolbarItem={showToolbarItem}
      // htmlFor={`${id}-${category.key}-filter-toggle`}
    >
      <Menu
        id={`${id}-${category.key}-filter-menu`}
        onSelect={(_, itemId) => onFilterSelect(itemId as string)}
      >
        <MenuToggle
          id={`${id}-${category.key}-filter-toggle`}
          aria-label={category.title}
          isDisabled={isDisabled || category.selectOptions.length === 0}
          isExpanded={isFilterDropdownOpen}
          onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
        >
          {selectedOption ? selectedOption.value : 'Any'}
        </MenuToggle>
        <MenuContent>
          <MenuList>
            {renderMenuItems(category.selectOptions)}
          </MenuList>
        </MenuContent>
      </Menu>
    </ToolbarFilter>
  );
};
