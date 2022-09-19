import React from 'react';
import PropTypes from 'prop-types';
import { useShallowCompareEffect } from 'react-use';
import { FilterIcon } from '@patternfly/react-icons';
import { reduxTypes, storeHooks } from '../../redux';
import { DropdownSelect } from '../dropdownSelect/dropdownSelect';
import { translate } from '../i18n/i18n';
import { useSelectCategoryOptions } from './toolbarContext';

/**
 * On select update category.
 *
 * @param {string} viewId
 * @param {object} options
 * @param {Function} options.useDispatch
 * @returns {Function}
 */
const useOnSelect = (viewId, { useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch } = {}) => {
  const dispatch = useAliasDispatch();

  return ({ value = null } = {}) => {
    dispatch([
      {
        type: reduxTypes.viewToolbar.SET_FILTER_TYPE,
        viewId,
        // currentFilter: value
        currentCategory: value
      }
    ]);
  };
};

/**
 * Select available filter categories.
 *
 * @param {object} props
 * @param {Array} props.options
 * @param {Function} props.t
 * @param {Function} props.useOnSelect
 * @param {Function} props.useSelectCategoryOptions
 * @param {string} props.viewId
 * @returns {React.ReactNode}
 */
const ViewToolbarFieldSelectCategory = ({
  options,
  t,
  useOnSelect: useAliasOnSelect,
  // useSelector: useAliasSelector,
  useSelectCategoryOptions: useAliasSelectCategoryOptions,
  viewId
  // t,
  // useOnSelect: useAliasOnSelect,
  // useSelectCategoryOptions: useAliasSelectCategoryOptions
}) => {
  // const selectedOption = useAliasSelector(({ viewOptions }) => viewOptions?.[viewId]?.currentCategory, undefined);
  const { categoryFields, initialCategory } = useAliasSelectCategoryOptions(viewId, options);
  const onSelect = useAliasOnSelect(viewId);

  useShallowCompareEffect(() => {
    if (initialCategory) {
      onSelect({ value: initialCategory });
    }
  }, [initialCategory, onSelect]);

  return (
    <DropdownSelect
      ariaLabel={t('toolbar.label', { context: ['placeholder', 'filter'] })}
      placeholder={t('toolbar.label', { context: ['placeholder', 'filter'] })}
      options={categoryFields}
      onSelect={onSelect}
      // selectedOptions={currentCategory}
      toggleIcon={<FilterIcon />}
    />
  );
};

/**
 * Prop types.
 *
 * @type {{useOnSelect: Function, t: Function, useSelectCategoryOptions: Function}}
 */
ViewToolbarFieldSelectCategory.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
      value: PropTypes.any,
      selected: PropTypes.bool
    })
  ),
  t: PropTypes.func,
  useOnSelect: PropTypes.func,
  useSelectCategoryOptions: PropTypes.func,
  viewId: PropTypes.string
};

/**
 * Default props.
 *
 * @type {{useOnSelect: Function, t: Function, useSelectCategoryOptions: Function}}
 */
ViewToolbarFieldSelectCategory.defaultProps = {
  options: [],
  t: translate,
  useOnSelect,
  useSelectCategoryOptions,
  viewId: null
};

export { ViewToolbarFieldSelectCategory as default, ViewToolbarFieldSelectCategory, useOnSelect };
