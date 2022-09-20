import React from 'react';
import PropTypes from 'prop-types';
import { reduxTypes, storeHooks } from '../../redux';
import { ViewToolbarFieldSortButton } from './viewToolbarFieldSortButton';
import { Tooltip } from '../tooltip/tooltip';
import { DropdownSelect } from '../dropdownSelect/dropdownSelect';
import { translate } from '../i18n/i18n';
import { API_QUERY_TYPES } from '../../constants/apiConstants';

/**
 * On select category for sorting.
 *
 * @param {object} options
 * @param {Function} options.useDispatch
 * @param {string} options.viewId
 * @returns {Function}
 */
const useOnSelect = ({ useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch, viewId } = {}) => {
  const dispatch = useAliasDispatch();

  return ({ value }) =>
    dispatch([
      {
        // type: reduxTypes.query.SET_QUERY_TYPES[API_QUERY_TYPES.ORDERING],
        type: reduxTypes.query.SET_QUERY,
        viewId,
        filter: API_QUERY_TYPES.ORDERING,
        value
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
const ViewToolbarFieldSort = ({ options, t, useOnSelect: useAliasOnSelect, useSelector: useAliasSelector, viewId }) => {
  const selectedOption = useAliasSelector(({ view }) => view?.query?.[viewId]?.[API_QUERY_TYPES.ORDERING]);
  const onSelect = useAliasOnSelect({ viewId });

  return (
    <React.Fragment>
      <DropdownSelect
        options={options}
        onSelect={onSelect}
        selectedOptions={selectedOption}
        data-test="toolbarSortType"
      />
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
ViewToolbarFieldSort.propTypes = {
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
ViewToolbarFieldSort.defaultProps = {
  options: [],
  t: translate,
  useOnSelect,
  useSelector: storeHooks.reactRedux.useSelector,
  viewId: null
};

export { ViewToolbarFieldSort as default, ViewToolbarFieldSort, useOnSelect };
