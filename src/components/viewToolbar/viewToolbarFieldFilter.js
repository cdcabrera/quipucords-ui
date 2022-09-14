import React from 'react';
import PropTypes from 'prop-types';
import { InputGroup } from '@patternfly/react-core';
import _debounce from 'lodash/debounce';
import { reduxTypes, storeHooks } from '../../redux';
import { TextInput } from '../form/textInput';
import { translate } from '../i18n/i18n';

/**
 * On submit input, dispatch type.
 *
 * @param {string} viewType
 * @param {string} queryType
 * @param {object} options
 * @param {Function} options.useDispatch
 * @returns {Function}
 */
const useOnSubmit = (
  viewType,
  queryType,
  { useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch } = {}
) => {
  const dispatch = useAliasDispatch();

  return value =>
    dispatch([
      {
        type: reduxTypes.viewToolbar.SET_FILTER,
        viewType,
        param: queryType,
        value
      }
    ]);
};

/**
 * On clear input, dispatch type.
 *
 * @param {string} viewType
 * @param {string} queryType
 * @param {object} options
 * @param {Function} options.useDispatch
 * @param {Function} options.useSelector
 * @returns {Function}
 */
const useOnClear = (
  viewType,
  queryType,
  {
    useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch,
    useSelector: useAliasSelector = storeHooks.reactRedux.useSelector
  } = {}
) => {
  const currentValue = useAliasSelector(({ viewOptions }) => viewOptions?.[viewType]?.filterQuery?.[queryType]);
  const dispatch = useAliasDispatch();

  return () => {
    if (currentValue === '' || !currentValue) {
      return;
    }

    dispatch([
      {
        type: reduxTypes.viewToolbar.SET_FILTER,
        viewType,
        param: queryType,
        value: ''
      }
    ]);
  };
};

/**
 * Display an input field for filtering results.
 *
 * @fires onKeyUp
 * @param {object} props
 * @param {string} props.queryType
 * @param {Function} props.t
 * @param {number} props.debounceTimer
 * @param {Function} props.useOnClear
 * @param {Function} props.useOnSubmit
 * @param {Function} props.useSelector
 * @param {string} props.viewType
 * @returns {React.ReactNode}
 */
const ViewToolbarFieldFilter = ({
  debounceTimer,
  queryType,
  t,
  useOnClear: useAliasOnClear,
  useOnSubmit: useAliasOnSubmit,
  useSelector: useAliasSelector,
  viewType
}) => {
  const currentValue = useAliasSelector(({ viewOptions }) => viewOptions?.[viewType]?.filterQuery?.[queryType]);
  const onSubmit = useAliasOnSubmit(viewType, queryType);
  const onClear = useAliasOnClear(viewType, queryType);

  /**
   * Set up submit debounce event to allow for bypass.
   */
  const debounced = _debounce(onSubmit, debounceTimer);

  /**
   * On enter submit value, on type submit value, and on esc ignore (clear value at component level).
   *
   * @event onKeyUp
   * @param {object} event
   */
  const onKeyUp = event => {
    switch (event.keyCode) {
      case 13:
        onSubmit(event.value);
        break;
      case 27:
        break;
      default:
        debounced(event.value);
        break;
    }
  };

  return (
    <InputGroup>
      <TextInput
        aria-label={t('toolbar.label', { context: ['placeholder', 'filter', queryType] })}
        className="quipucords-input__search-name"
        iconVariant="search"
        maxLength={255}
        onClear={onClear}
        onKeyUp={onKeyUp}
        value={currentValue}
        placeholder={t('toolbar.label', { context: ['placeholder', 'filter', queryType] })}
        data-test="viewToolbarFieldNameFilter"
      />
    </InputGroup>
  );
};

/**
 * Prop types
 *
 * @type {{useOnSubmit: Function, t: Function, useSelector: Function, debounceTimer: number, viewType: string,
 *     useOnClear: Function, queryType: string}}
 */
ViewToolbarFieldFilter.propTypes = {
  debounceTimer: PropTypes.number,
  queryType: PropTypes.string,
  t: PropTypes.func,
  useOnClear: PropTypes.func,
  useOnSubmit: PropTypes.func,
  useSelector: PropTypes.func,
  viewType: PropTypes.string
};

/**
 * Default props
 *
 * @type {{useOnSubmit: Function, t: translate, useSelector: Function, debounceTimer: number, viewType: null,
 *     useOnClear: Function, queryType: null}}
 */
ViewToolbarFieldFilter.defaultProps = {
  debounceTimer: 800,
  queryType: null,
  t: translate,
  useOnClear,
  useOnSubmit,
  useSelector: storeHooks.reactRedux.useSelector,
  viewType: null
};

export { ViewToolbarFieldFilter as default, ViewToolbarFieldFilter };
