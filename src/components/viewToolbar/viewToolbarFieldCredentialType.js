import React from 'react';
import PropTypes from 'prop-types';
import { DropdownSelect } from '../dropdownSelect/dropdownSelect';
import { reduxTypes, storeHooks } from '../../redux';
import { translate } from '../i18n/i18n';

/*
 * Select field options.
 *
 * @type {{title: Function|string, value: string}[]}
 */
const fieldOptions = [
  { title: () => translate('form-dialog.label', { context: ['option', 'network'] }), value: 'network' },
  { title: () => translate('form-dialog.label', { context: ['option', 'satellite'] }), value: 'satellite' },
  { title: () => translate('form-dialog.label', { context: ['option', 'vcenter'] }), value: 'vcenter' }
];

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

  return ({ value = null }) => {
    dispatch([
      {
        type: reduxTypes.viewToolbar.SET_FILTER,
        viewType,
        param: 'cred_type',
        value
      }
    ]);

    /* what it does currently... sets a filter type, and filter value, AND uses "ADD_FILTER" to update the active filters,
        but also concat the heck out of the query string.
    dispatch([
      {
        type: reduxTypes.viewToolbar.SET_FILTER_TYPE,
        viewType,
        filterType: 'cred_type'
      },
      {
        type: reduxTypes.viewToolbar.SET_FILTER_VALUE,
        viewType,
        filterValue: value
      },
      {
        type: reduxTypes.viewToolbar.ADD_FILTER,
        viewType
        filter: { field, value, label: filterText }
      }
    ]);
     */
  };
};

/**
 * Display available credential types.
 *
 * @param {object} props
 * @param {Array} props.options
 * @param {string} props.placeholder
 * @param {Function} props.t
 * @param {Function} props.useOnSelect
 * @param {Function} props.useSelector
 * @param {string} props.viewType
 * @returns {React.ReactNode}
 */
const ViewToolbarFieldCredentialType = ({
  options,
  placeholder,
  t,
  useOnSelect: useAliasOnSelect,
  useSelector: useAliasSelector,
  viewType
} = {}) => {
  const selectedOption = useAliasSelector(({ viewOptions }) => viewOptions?.[viewType]?.filterQuery?.cred_type);
  const onSelect = useAliasOnSelect(viewType);

  return (
    <DropdownSelect
      ariaLabel={placeholder || t('toolbar.label', { context: ['placeholder', 'filter', 'cred_type'] })}
      placeholder={placeholder || t('toolbar.label', { context: ['placeholder', 'filter', 'cred_type'] })}
      options={options}
      onSelect={onSelect}
      selectedOptions={selectedOption}
    />
  );
};

/**
 * Prop types
 *
 * @type {{useOnSelect: Function, options: Array, placeholder: string}}
 */
ViewToolbarFieldCredentialType.propTypes = {
  placeholder: PropTypes.string,
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
 * @type {{useOnSelect: Function, t: translate, options: {title: (Function|string), value: string}[],
 *     placeholder: null}}
 */
ViewToolbarFieldCredentialType.defaultProps = {
  placeholder: null,
  options: fieldOptions,
  t: translate,
  useOnSelect,
  useSelector: storeHooks.reactRedux.useSelector,
  viewType: null
};

export { ViewToolbarFieldCredentialType as default, ViewToolbarFieldCredentialType, fieldOptions, useOnSelect };
