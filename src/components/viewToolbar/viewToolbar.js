import React from 'react';
import PropTypes from 'prop-types';
import {
  Divider,
  Toolbar,
  ToolbarContent,
  ToolbarFilter,
  ToolbarGroup,
  ToolbarItem,
  ToolbarItemVariant,
  ToolbarToggleGroup
} from '@patternfly/react-core';
import { FilterIcon } from '@patternfly/react-icons';
import {
  useSelectCategoryOptions,
  useToolbarFieldClear,
  useToolbarFieldClearAll,
  useToolbarFieldQueries
} from './toolbarContext';
import { ViewToolbarFieldSelectCategory } from './viewToolbarFieldSelectCategory';
import { ViewToolbarFieldSortType } from './viewToolbarFieldSortType';
import { RefreshTimeButton } from '../refreshTimeButton/refreshTimeButton';
import { helpers } from '../../common';
import { translate } from '../i18n/i18n';

const ViewToolbar = ({
  lastRefresh,
  onRefresh,
  categoryFields,
  sortFields,
  secondaryFields,
  useSelectCategoryOptions: useAliasSelectCategoryOptions,
  useToolbarFieldClear: useAliasToolbarFieldClear,
  useToolbarFieldClearAll: useAliasToolbarFieldClearAll,
  useToolbarFieldQueries: useAliasToolbarFieldQueries,
  t,
  viewType
}) => {
  const { currentCategory, categoryFields: updatedCategoryFields } = useAliasSelectCategoryOptions(
    viewType,
    categoryFields
  );
  const toolbarFieldQueries = useAliasToolbarFieldQueries(viewType, categoryFields);
  const clearField = useAliasToolbarFieldClear();
  const clearAllFields = useAliasToolbarFieldClearAll();

  /**
   * Clear a specific value
   *
   * @event onClearFilter
   * @param {object} params
   * @param {*} params.value
   * @returns {void}
   */
  const onClearFilter = ({ value }) => clearField(value);

  /**
   * Clear all active filters.
   *
   * @event onClearAll
   * @returns {void}
   */
  const onClearAll = () => clearAllFields();

  /**
   * Set selected options for chip display.
   *
   * @param {*|string} value
   * @returns {Array}
   */
  const setSelectedOptions = value => {
    const query = toolbarFieldQueries?.[value];
    return (query && [t(['form-dialog.label', 'toolbar.label'], { context: ['option', query] })]) || [];
  };

  return (
    <Toolbar
      id="quipucords-toolbar"
      // className="quipucords-toolbar pf-m-toggle-group-container"
      collapseListedFiltersBreakpoint="sm"
      clearAllFilters={onClearAll}
      clearFiltersButtonText={t('toolbar.label', { context: 'clear-filters' })}
    >
      <ToolbarContent>
        <ToolbarToggleGroup toggleIcon={<FilterIcon />} breakpoint="md">
          <ToolbarGroup variant="filter-group">
            {updatedCategoryFields.length > 1 && (
              <ToolbarItem>
                <ViewToolbarFieldSelectCategory options={updatedCategoryFields} viewType={viewType} />
              </ToolbarItem>
            )}
            {updatedCategoryFields.map(({ title, value, component: OptionComponent, options: filterOptions }) => {
              const chipProps = { categoryName: (typeof title === 'function' && title()) || title };

              chipProps.chips = setSelectedOptions(value);
              chipProps.deleteChip = () => onClearFilter({ options: filterOptions, value });

              return (
                <ToolbarFilter
                  key={value}
                  showToolbarItem={currentCategory === value || updatedCategoryFields.length === 1}
                  {...chipProps}
                >
                  <OptionComponent viewType={viewType} />
                </ToolbarFilter>
              );
            })}
          </ToolbarGroup>
        </ToolbarToggleGroup>
        <ToolbarItem key="groupSeparator" variant={ToolbarItemVariant.separator} />
        <ToolbarItem key="sortFields" spacer={{ default: 'spacerSm' }}>
          <ViewToolbarFieldSortType options={sortFields} viewType={viewType} />
        </ToolbarItem>
        <ToolbarItem key="sortSeparator" variant={ToolbarItemVariant.separator} />
        <ToolbarItem key="lastRefresh">
          <RefreshTimeButton onRefresh={onRefresh} lastRefresh={lastRefresh} />
        </ToolbarItem>
        <ToolbarItem key="secondaryFields" alignment={{ lg: 'alignRight', md: 'alignLeft' }}>
          {secondaryFields}
        </ToolbarItem>
        <Divider />
        <ToolbarItem alignment={{ lg: 'alignRight', md: 'alignLeft' }}>hey</ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );
};

ViewToolbar.propTypes = {
  /*
  viewType: PropTypes.string,
  totalCount: PropTypes.number,
  selectedCount: PropTypes.number,
  filterFields: PropTypes.array,
  sortFields: PropTypes.array,
  onRefresh: PropTypes.func,
  lastRefresh: PropTypes.number,
  actions: PropTypes.node,
  itemsType: PropTypes.string,
  itemsTypePlural: PropTypes.string,
  filterType: PropTypes.object,
  filterValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  activeFilters: PropTypes.array,
  sortField: PropTypes.oneOfType(PropTypes.string, PropTypes.number),
  sortType: PropTypes.object,
  sortAscending: PropTypes.bool
   */
  categoryFields: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
      value: PropTypes.any,
      selected: PropTypes.bool,
      component: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
    })
  ),
  secondaryFields: PropTypes.node,
  sortFields: PropTypes.array,
  onRefresh: PropTypes.func,
  lastRefresh: PropTypes.number,
  t: PropTypes.func,
  useSelectCategoryOptions: PropTypes.func,
  useToolbarFieldClear: PropTypes.func,
  useToolbarFieldClearAll: PropTypes.func,
  useToolbarFieldQueries: PropTypes.func,
  viewType: PropTypes.string
};

ViewToolbar.defaultProps = {
  categoryFields: [],
  secondaryFields: [],
  sortFields: [],
  onRefresh: helpers.noop,
  lastRefresh: 0,
  useSelectCategoryOptions,
  useToolbarFieldClear,
  useToolbarFieldClearAll,
  useToolbarFieldQueries,
  t: translate,
  viewType: null
  /*
  viewType: null,
  totalCount: 0,
  selectedCount: 0,
  filterFields: [],
  sortFields: [],
  onRefresh: helpers.noop,
  lastRefresh: 0,
  actions: null,
  itemsType: '',
  itemsTypePlural: '',
  filterType: {},
  filterValue: '',
  activeFilters: [],
  sortField: null,
  sortType: {},
  sortAscending: true
   */
};

export { ViewToolbar as default, ViewToolbar };
