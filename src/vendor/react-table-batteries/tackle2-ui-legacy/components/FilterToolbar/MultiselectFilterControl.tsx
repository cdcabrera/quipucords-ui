import * as React from 'react';
import { ToolbarFilter, Menu, MenuContent, MenuItem, MenuList, MenuToggle, Checkbox } from '@patternfly/react-core';
import { FilterControlProps } from './FilterControl';
import { MultiselectFilterCategory, OptionPropsWithKey } from './FilterToolbar';

export interface MultiselectFilterControlProps<TItem, TFilterCategoryKey extends string>
  extends FilterControlProps<TItem, TFilterCategoryKey> {
  category: MultiselectFilterCategory<TItem, TFilterCategoryKey>;
  isScrollable?: boolean;
}

export const MultiselectFilterControl = <TItem, TFilterCategoryKey extends string>({
  category,
  filterValue,
  setFilterValue,
  showToolbarItem,
  isDisabled = false,
  isScrollable = false,
  id
}: React.PropsWithChildren<MultiselectFilterControlProps<TItem, TFilterCategoryKey>>): JSX.Element | null => {
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

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
    if (optionKey && filterValue?.includes(optionKey)) {
      const updatedValues = filterValue.filter((item: string) => item !== optionKey);
      setFilterValue(updatedValues);
    } else if (filterValue) {
      const updatedValues = [...filterValue, optionKey];
      setFilterValue(updatedValues as string[]);
    } else {
      setFilterValue([optionKey || '']);
    }
  };

  const onFilterClear = (chip: string) => {
    const optionKey = getOptionKeyFromChip(chip);
    const newValue = filterValue ? filterValue.filter(val => val !== optionKey) : [];
    setFilterValue(newValue.length > 0 ? newValue : null);
  };

  // Get selected options for display
  const selectedOptions = filterValue 
    ? category.selectOptions.filter(optionProps => filterValue.includes(optionProps.key))
    : [];

  const chips = selectedOptions.map(option => getChipFromOptionValue(option.value));

  // Filter options based on search
  const filteredOptions = category.selectOptions.filter(optionProps => {
    if (!searchValue) return true;
    const optionValue = optionProps?.value?.toString();
    return (
      optionProps?.key?.toLowerCase().includes(searchValue.toLowerCase()) ||
      optionValue.toLowerCase().includes(searchValue.toLowerCase())
    );
  });

  const renderMenuItems = (options: OptionPropsWithKey[]) =>
    options.map(optionProps => (
      <MenuItem 
        key={optionProps.key} 
        itemId={optionProps.value}
        isSelected={filterValue?.includes(optionProps.key)}
      >
        <Checkbox
          id={`${id}-${category.key}-${optionProps.key}-checkbox`}
          isChecked={filterValue?.includes(optionProps.key)}
          onChange={() => onFilterSelect(optionProps.value)}
          aria-label={`Select ${optionProps.value}`}
        />
        {optionProps.value}
      </MenuItem>
    ));

  const placeholderText = category.placeholderText || `Filter by ${category.title}...`;

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
          {selectedOptions.length > 0 
            ? `${selectedOptions.length} selected` 
            : placeholderText}
        </MenuToggle>
        <MenuContent>
          <MenuList>
            {renderMenuItems(filteredOptions)}
          </MenuList>
        </MenuContent>
      </Menu>
    </ToolbarFilter>
  );
};
