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
  useToolbarFieldClearAll
  // useToolbarFieldQueries
} from './viewToolbarContext';
import { ViewToolbarSelectCategory } from './viewToolbarSelectCategory';
import { ViewToolbarFieldSort } from './viewToolbarFieldSort';
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
  // useQuery: useAliasQuery,
  // useToolbarFieldQueries: useAliasToolbarFieldQueries,
  t,
  viewId
}) => {
  /*
  const { currentCategory, categoryFields: updatedCategoryFields } = useAliasSelectCategoryOptions(
    viewId,
    categoryFields
  );
  */
  console.log('useAliasSelectCategoryOptions', useAliasSelectCategoryOptions);
  const currentCategory = null;
  const updatedCategoryFields = categoryFields;
  // const toolbarFieldQueries = useAliasToolbarFieldQueries(viewId, categoryFields);
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
    console.log('>>>> set selected options', value);
    // const query = toolbarFieldQueries?.[value];
    // return (query && [t(['form-dialog.label', 'toolbar.label'], { context: ['option', query] })]) || [];
    return [];
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
                <ViewToolbarSelectCategory options={updatedCategoryFields} viewId={viewId} />
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
                  <OptionComponent viewId={viewId} />
                </ToolbarFilter>
              );
            })}
          </ToolbarGroup>
        </ToolbarToggleGroup>
        <ToolbarItem key="groupSeparator" variant={ToolbarItemVariant.separator} />
        <ToolbarItem key="sortFields" spacer={{ default: 'spacerSm' }}>
          <ViewToolbarFieldSort options={sortFields} viewId={viewId} />
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
  // useToolbarFieldQueries: PropTypes.func,
  viewId: PropTypes.string
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
  // useToolbarFieldQueries,
  t: translate,
  viewId: null
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
