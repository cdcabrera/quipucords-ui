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
 * @param {string} viewId
 * @param {object} options
 * @param {Function} options.useDispatch
 * @returns {Function}
 */
const useOnSelect = (viewId, { useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch } = {}) => {
  const dispatch = useAliasDispatch();

  return ({ value }) =>
    dispatch([
      {
        type: reduxTypes.viewToolbar.SET_SORT_TYPE,
        viewId,
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
 * @param {string} props.viewId
 * @returns {React.ReactNode}
 */
const ViewToolbarFieldSortType = ({
  options,
  t,
  useOnSelect: useAliasOnSelect,
  useSelector: useAliasSelector,
  viewId
}) => {
  const selectedOption = useAliasSelector(({ viewOptions }) => viewOptions?.[viewId]?.sortField);
  const onSelect = useAliasOnSelect(viewId);

  return (
    <React.Fragment>
      <DropdownSelect options={options} onSelect={onSelect} selectedOptions={selectedOption} />
      <Tooltip placement="right" content={t('toolbar.label', { context: ['option', 'sort', selectedOption] })}>
        <ViewToolbarFieldSortButton viewId={viewId} />
      </Tooltip>
    </React.Fragment>
  );
};

/**
 * Prop types
 *
 * @type {{useSelector: Function, t: Function, useSelector: Function, options:Array, viewId: string}}
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
  viewId: PropTypes.string
};

/**
 * Default props
 *
 * @type {{useOnSelect: Function, t: Function, useSelector: Function, options: *[], viewId: null}}
 */
ViewToolbarFieldSortType.defaultProps = {
  options: [],
  t: translate,
  useOnSelect,
  useSelector: storeHooks.reactRedux.useSelector,
  viewId: null
};

export { ViewToolbarFieldSortType as default, ViewToolbarFieldSortType, useOnSelect };
