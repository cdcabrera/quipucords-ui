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
  // useSelectCategoryOptions,
  useToolbarFieldClear,
  useToolbarFieldClearAll
  // useToolbarFieldQueries
} from './viewToolbarContext';
import { ViewToolbarSelectCategory } from './viewToolbarSelectCategory';
import { ViewToolbarFieldSort } from './viewToolbarFieldSort';
import { RefreshTimeButton } from '../refreshTimeButton/refreshTimeButton';
// import { helpers } from '../../common';
import { translate } from '../i18n/i18n';
import { useOnRefresh, useView } from '../view/viewContext';
import { storeHooks } from '../../redux';

const ViewToolbar = ({
  //
  // onRefresh,
  // categoryFields,
  lastRefresh,
  sortFields,
  secondaryFields,
  t,
  useOnRefresh: useAliasOnRefresh,
  useSelector: useAliasSelector,
  // useSelectCategoryOptions: useAliasSelectCategoryOptions,
  useToolbarFieldClear: useAliasToolbarFieldClear,
  useToolbarFieldClearAll: useAliasToolbarFieldClearAll,
  useView: useAliasView
  // useQuery: useAliasQuery,
  // useToolbarFieldQueries: useAliasToolbarFieldQueries,
  // t
}) => {
  const { config, query, viewId } = useAliasView();
  const categoryFields = config.toolbar.filterFields;

  const onRefresh = useAliasOnRefresh();
  const currentCategory = useAliasSelector(({ view }) => view?.filters?.[viewId]?.currentFilterCategory);
  /*
  const { currentCategory, categoryFields: updatedCategoryFields } = useAliasSelectCategoryOptions(
    viewId,
    categoryFields
  );
  */
  // console.log('useAliasSelectCategoryOptions', useAliasSelectCategoryOptions);
  // const currentCategory = null;
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
    const categoryValue = query?.[value];
    return (categoryValue && [t('toolbar.label', { context: ['chip', categoryValue] })]) || [];
  };

  return (
    <React.Fragment>
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
                  <ViewToolbarSelectCategory />
                </ToolbarItem>
              )}
              {updatedCategoryFields.map(({ title, value, component: OptionComponent }) => {
                const chipProps = { categoryName: (typeof title === 'function' && title()) || title };
                chipProps.chips = setSelectedOptions(value);
                chipProps.deleteChip = () => onClearFilter({ value });

                return (
                  <ToolbarFilter
                    key={value}
                    showToolbarItem={currentCategory === value || updatedCategoryFields.length === 1}
                    {...chipProps}
                  >
                    <OptionComponent />
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
        </ToolbarContent>
      </Toolbar>
      <Divider />
    </React.Fragment>
  );
};

ViewToolbar.propTypes = {
  /*
  categoryFields: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
      value: PropTypes.any,
      selected: PropTypes.bool,
      component: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
    })
  ),
   */
  secondaryFields: PropTypes.node,
  sortFields: PropTypes.array,
  // onRefresh: PropTypes.func,
  lastRefresh: PropTypes.number,
  t: PropTypes.func,
  useOnRefresh: PropTypes.func,
  useSelector: PropTypes.func,
  // useSelectCategoryOptions: PropTypes.func,
  useToolbarFieldClear: PropTypes.func,
  useToolbarFieldClearAll: PropTypes.func,
  useView: PropTypes.func
  // useToolbarFieldQueries: PropTypes.func,
  // viewId: PropTypes.string
};

ViewToolbar.defaultProps = {
  // categoryFields: [],
  secondaryFields: [],
  sortFields: [],
  // onRefresh: helpers.noop,
  lastRefresh: 0,
  t: translate,
  useSelector: storeHooks.reactRedux.useSelector,
  useOnRefresh,
  // useSelectCategoryOptions,
  useToolbarFieldClear,
  useToolbarFieldClearAll,
  // useToolbarFieldQueries,
  useView
  // viewId: null
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
