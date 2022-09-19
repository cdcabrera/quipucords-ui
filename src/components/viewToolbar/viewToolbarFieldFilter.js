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
 * @param {string} viewId
 * @param {string} param
 * @param {object} options
 * @param {Function} options.useDispatch
 * @returns {Function}
 */
const useOnSubmit = (viewId, param, { useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch } = {}) => {
  const dispatch = useAliasDispatch();

  return value =>
    dispatch([
      {
        type: reduxTypes.viewToolbar.SET_FILTER,
        viewId,
        param,
        value
      }
    ]);
};

/**
 * On clear input, dispatch type.
 *
 * @param {string} viewId
 * @param {string} queryType
 * @param {object} options
 * @param {Function} options.useDispatch
 * @param {Function} options.useSelector
 * @returns {Function}
 */
const useOnClear = (
  viewId,
  queryType,
  {
    useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch,
    useSelector: useAliasSelector = storeHooks.reactRedux.useSelector
  } = {}
) => {
  const currentValue = useAliasSelector(({ viewOptions }) => viewOptions?.[viewId]?.filterQuery?.[queryType]);
  const dispatch = useAliasDispatch();

  return () => {
    if (currentValue === '' || !currentValue) {
      return;
    }

    dispatch([
      {
        type: reduxTypes.viewToolbar.SET_FILTER,
        viewId,
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
 * @param {string} props.viewId
 * @returns {React.ReactNode}
 */
const ViewToolbarFieldFilter = ({
  debounceTimer,
  queryType,
  t,
  useOnClear: useAliasOnClear,
  useOnSubmit: useAliasOnSubmit,
  useSelector: useAliasSelector,
  viewId
}) => {
  const currentValue = useAliasSelector(({ viewOptions }) => viewOptions?.[viewId]?.filterQuery?.[queryType]);
  const onSubmit = useAliasOnSubmit(viewId, queryType);
  const onClear = useAliasOnClear(viewId, queryType);

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
 * @type {{useOnSubmit: Function, t: Function, useSelector: Function, debounceTimer: number, viewId: string,
 *     useOnClear: Function, queryType: string}}
 */
ViewToolbarFieldFilter.propTypes = {
  debounceTimer: PropTypes.number,
  queryType: PropTypes.string,
  t: PropTypes.func,
  useOnClear: PropTypes.func,
  useOnSubmit: PropTypes.func,
  useSelector: PropTypes.func,
  viewId: PropTypes.string
};

/**
 * Default props
 *
 * @type {{useOnSubmit: Function, t: translate, useSelector: Function, debounceTimer: number, viewId: null,
 *     useOnClear: Function, queryType: null}}
 */
ViewToolbarFieldFilter.defaultProps = {
  debounceTimer: 800,
  queryType: null,
  t: translate,
  useOnClear,
  useOnSubmit,
  useSelector: storeHooks.reactRedux.useSelector,
  viewId: null
};

export { ViewToolbarFieldFilter as default, ViewToolbarFieldFilter };
