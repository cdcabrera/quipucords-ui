import React from 'react';
import PropTypes from 'prop-types';
import { reduxTypes, storeHooks } from '../../redux';
import { ViewToolbarFieldSortButton } from './viewToolbarFieldSortButton';
import { Tooltip } from '../tooltip/tooltip';
import { DropdownSelect } from '../dropdownSelect/dropdownSelect';
import { translate } from '../i18n/i18n';

/**
 * On select category for sorting.
 *
 * @param {string} viewType
 * @param {object} options
 * @param {Function} options.useDispatch
 * @returns {Function}
 */
const useOnSelect = (viewType, { useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch } = {}) => {
  const dispatch = useAliasDispatch();

  return ({ value }) =>
    dispatch([
      {
        type: reduxTypes.viewToolbar.SET_SORT_TYPE,
        viewType,
        // sortType: value
        sortField: value
      }
    ]);
};

/**
 * Toolbar sort button wrapper.
 *
 * @param {object} props
 * @param {Array} props.options
 * @param {Function} props.t
 * @param {Function} props.useOnSelect
 * @param {Function} props.useSelector
 * @param {string} props.viewType
 * @returns {React.ReactNode}
 */
const ViewToolbarFieldSortType = ({
  options,
  t,
  useOnSelect: useAliasOnSelect,
  useSelector: useAliasSelector,
  viewType
}) => {
  const selectedOption = useAliasSelector(({ viewOptions }) => viewOptions?.[viewType]?.sortField);
  const onSelect = useAliasOnSelect(viewType);

  return (
    <React.Fragment>
      <DropdownSelect options={options} onSelect={onSelect} selectedOptions={selectedOption} />
      <Tooltip placement="right" content={t('toolbar.label', { context: ['option', 'sort', selectedOption] })}>
        <ViewToolbarFieldSortButton viewType={viewType} />
      </Tooltip>
    </React.Fragment>
  );
};

/**
 * Prop types
 *
 * @type {{useSelector: Function, t: Function, useSelector: Function, options:Array, viewType: string}}
 */
ViewToolbarFieldSortType.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
      value: PropTypes.any,
      selected: PropTypes.bool
    })
  ),
  t: PropTypes.func,
  useOnSelect: PropTypes.func,
  useSelector: PropTypes.func,
  viewType: PropTypes.string
};

/**
 * Default props
 *
 * @type {{useOnSelect: Function, t: Function, useSelector: Function, options: *[], viewType: null}}
 */
ViewToolbarFieldSortType.defaultProps = {
  options: [],
  t: translate,
  useOnSelect,
  useSelector: storeHooks.reactRedux.useSelector,
  viewType: null
};

export { ViewToolbarFieldSortType as default, ViewToolbarFieldSortType, useOnSelect };
