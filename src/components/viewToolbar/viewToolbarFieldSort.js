import React from 'react';
import PropTypes from 'prop-types';
import { reduxTypes, storeHooks } from '../../redux';
import { ViewToolbarFieldSortButton } from './viewToolbarFieldSortButton';
import { Tooltip } from '../tooltip/tooltip';
import { DropdownSelect } from '../dropdownSelect/dropdownSelect';
import { translate } from '../i18n/i18n';
import { API_QUERY_TYPES } from '../../constants/apiConstants';
import { useQuery, useView } from '../view/viewContext';

/**
 * On select category for sorting.
 *
 * @param {object} options
 * @param {Function} options.useDispatch
 * @param {Function} options.useView
 * @returns {Function}
 */
const useOnSelect = ({
  useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch,
  useView: useAliasView = useView
} = {}) => {
  const { viewId } = useAliasView();
  const dispatch = useAliasDispatch();

  return ({ value }) =>
    dispatch([
      {
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
 * @param {Function} props.useQuery
 * @returns {React.ReactNode}
 */
const ViewToolbarFieldSort = ({ options, t, useOnSelect: useAliasOnSelect, useQuery: useAliasQuery }) => {
  const { [API_QUERY_TYPES.ORDERING]: selectedOption } = useAliasQuery();
  const onSelect = useAliasOnSelect();

  return (
    <React.Fragment>
      <DropdownSelect
        options={options}
        onSelect={onSelect}
        selectedOptions={selectedOption}
        data-test="toolbarSortType"
      />
      <Tooltip placement="right" content={t('toolbar.label', { context: ['option', 'sort', selectedOption] })}>
        <ViewToolbarFieldSortButton />
      </Tooltip>
    </React.Fragment>
  );
};

/**
 * Prop types
 *
 * @type {{useQuery: Function, t: Function, useSelector: Function, options:Array}}
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
  useQuery: PropTypes.func
};

/**
 * Default props
 *
 * @type {{useOnSelect: Function, t: Function, useQuery: Function, options: *[]}}
 */
ViewToolbarFieldSort.defaultProps = {
  options: [],
  t: translate,
  useOnSelect,
  useQuery
};

export { ViewToolbarFieldSort as default, ViewToolbarFieldSort, useOnSelect };
