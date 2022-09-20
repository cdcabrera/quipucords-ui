import React from 'react';
import PropTypes from 'prop-types';
import { DropdownSelect, SelectPosition } from '../dropdownSelect/dropdownSelect';
import { reduxTypes, storeHooks } from '../../redux';
import { translate } from '../i18n/i18n';
import { API_QUERY_TYPES } from '../../constants/apiConstants';

/*
 * Credential, and source, field options
 *
 * @type {{title: Function|string, value: string}[]}
 */
const credentialSourceTypeFieldOptions = [
  { title: () => translate('form-dialog.label', { context: ['option', 'network'] }), value: 'network' },
  { title: () => translate('form-dialog.label', { context: ['option', 'satellite'] }), value: 'satellite' },
  { title: () => translate('form-dialog.label', { context: ['option', 'vcenter'] }), value: 'vcenter' }
];

/**
 * Available select options
 *
 * @type {{'[API_QUERY_TYPES.CREDENTIAL_TYPE]': Array, '[API_QUERY_TYPES.SOURCE_TYPE]': Array}}
 */
const SelectFilterVariantOptions = {
  [API_QUERY_TYPES.CREDENTIAL_TYPE]: credentialSourceTypeFieldOptions,
  [API_QUERY_TYPES.SOURCE_TYPE]: credentialSourceTypeFieldOptions
};

/**
 * Available select filters
 *
 * @type {{'[API_QUERY_TYPES.CREDENTIAL_TYPE]': string, '[API_QUERY_TYPES.SOURCE_TYPE]': string}}
 */
const SelectFilterVariant = {
  [API_QUERY_TYPES.CREDENTIAL_TYPE]: API_QUERY_TYPES.CREDENTIAL_TYPE,
  [API_QUERY_TYPES.SOURCE_TYPE]: API_QUERY_TYPES.SOURCE_TYPE
};

/**
 * On select
 *
 * @param {string} filter
 * @param {object} options
 * @param {Function} options.useDispatch
 * @param {string} options.viewId
 * @returns {Function}
 */
const useOnSelect = (filter, { useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch, viewId } = {}) => {
  const dispatch = useAliasDispatch();

  return ({ value = null }) => {
    dispatch([
      {
        type: reduxTypes.query.SET_QUERY,
        viewId,
        filter,
        value
      }
    ]);
  };
};

/**
 * Display available select options.
 *
 * @param {object} props
 * @param {string} props.filter
 * @param {object} props.filterOptions
 * @param {string} props.position
 * @param {Function} props.t
 * @param {Function} props.useOnSelect
 * @param {Function} props.useSelector
 * @param {string} props.viewId
 * @returns {React.ReactNode}
 */
const ViewToolbarSelect = ({
  filter,
  filterOptions,
  position,
  t,
  useOnSelect: useAliasOnSelect,
  useSelector: useAliasSelector,
  viewId
} = {}) => {
  const selectedOption = useAliasSelector(({ view }) => view?.query?.[viewId]?.[filter]);
  const onSelect = useAliasOnSelect({ viewId });
  const updatedOptions = filterOptions?.[filter] || [];

  return (
    <DropdownSelect
      ariaLabel={t('toolbar.label', { context: ['placeholder', 'filter', filter] })}
      placeholder={t('toolbar.label', { context: ['placeholder', 'filter', filter] })}
      options={updatedOptions}
      onSelect={onSelect}
      position={position}
      selectedOptions={selectedOption}
      data-test={`toolbarSelect_${filter}`}
    />
  );
};

/**
 * Prop types
 *
 * @type {{filter: string, useOnSelect: Function, viewId: string, t: Function, useSelector: Function, position: string,
 *     filterOptions: object}}
 */
ViewToolbarSelect.propTypes = {
  filter: PropTypes.oneOf([...Object.values(SelectFilterVariant)]).isRequired,
  filterOptions: PropTypes.shape({
    [API_QUERY_TYPES.CREDENTIAL_TYPE]: PropTypes.array,
    [API_QUERY_TYPES.SOURCE_TYPE]: PropTypes.array
  }),
  position: PropTypes.oneOf([...Object.values(SelectPosition)]),
  /*
  options: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
      value: PropTypes.any,
      selected: PropTypes.bool
    })
  ),
  */
  t: PropTypes.func,
  useOnSelect: PropTypes.func,
  useSelector: PropTypes.func,
  viewId: PropTypes.string
};

/**
 * Default props
 *
 * @type {{useOnSelect: Function, viewId: null, t: translate, useSelector: Function, position: string,
 *     filterOptions: {'[API_QUERY_TYPES.CREDENTIAL_TYPE]': Array, '[API_QUERY_TYPES.SOURCE_TYPE]': Array}}}
 */
ViewToolbarSelect.defaultProps = {
  filterOptions: SelectFilterVariantOptions,
  position: SelectPosition.left,
  t: translate,
  useOnSelect,
  useSelector: storeHooks.reactRedux.useSelector,
  viewId: null
};

export { ViewToolbarSelect as default, ViewToolbarSelect, SelectFilterVariant, SelectFilterVariantOptions };
