import React from 'react';
import PropTypes from 'prop-types';
// import { useShallowCompareEffect } from 'react-use';
import { FilterIcon } from '@patternfly/react-icons';
import { reduxTypes, storeHooks } from '../../redux';
import { DropdownSelect } from '../dropdownSelect/dropdownSelect';
import { translate } from '../i18n/i18n';
import { useView } from '../view/viewContext';
// import filterFields from '../credentials/credentialsToolbar'

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
        type: reduxTypes.view.SET_FILTER,
        viewId,
        currentFilterCategory: value
      }
    ]);
  };
};

/**
 * Return filtered category options, current, and initial value.
 *
 * @param {object} options
 * @param {Array} options.categoryOptions
 * @param {Function} options.useProduct
 * @param {Function} options.useProductToolbarConfig
 * @param {Function} options.useSelector
 * @returns {object}
 */
/*
const useSelectCategoryOptions = ({
  // categoryOptions = toolbarFieldOptions,
  // useProduct: useAliasProduct = useProduct,
  useView: useAliasView = useView,
  // useProductToolbarConfig: useAliasProductToolbarConfig = useProductToolbarConfig,
  useSelector: useAliasSelector = storeHooks.reactRedux.useSelector
} = {}) => {
  const { viewId, config } = useAliasView();
  const { toolbar: options } = config;

  const { currentCategory } = useAliasSelector(({ view }) => view.filters?.[viewId], {});

  /*
  let initialCategory;

  const updatedOptions = options.map(option => {
    const { selected, value } = option;

    if (currentCategory === undefined && selected) {
      initialCategory = value;
    }

    return {
      ...option,
      selected: (currentCategory === undefined && selected) || currentCategory === value
    };
  });
  * /

  return {
    currentCategory,
    options
    // initialCategory,
    // options: updatedOptions
  };
};
 */

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
const ViewToolbarSelectCategory = ({
  // options,
  t,
  useOnSelect: useAliasOnSelect,
  // useSelector: useAliasSelector,
  // useSelectCategoryOptions: useAliasSelectCategoryOptions,
  useSelector: useAliasSelector,
  useView: useAliasView
  // viewId
  // t,
  // useOnSelect: useAliasOnSelect,
  // useSelectCategoryOptions: useAliasSelectCategoryOptions
}) => {
  // const selectedOption = useAliasSelector(({ viewOptions }) => viewOptions?.[viewId]?.currentCategory, undefined);
  const { viewId, config } = useAliasView();
  const options = config.toolbar.filterFields;
  const onSelect = useAliasOnSelect(viewId);

  const selectedOption = useAliasSelector(({ view }) => view?.filters?.[viewId]?.currentFilterCategory);
  // const { currentCategory } = useAliasSelector(({ view }) => view.filters?.[viewId], {});
  // const { categoryFields, initialCategory } = useAliasSelectCategoryOptions(viewId, options);

  /*
  useShallowCompareEffect(() => {
    if (initialCategory) {
      onSelect({ value: initialCategory });
    }
  }, [initialCategory, onSelect]);
  */

  return (
    <DropdownSelect
      ariaLabel={t('toolbar.label', { context: ['placeholder', 'filter'] })}
      placeholder={t('toolbar.label', { context: ['placeholder', 'filter'] })}
      options={options}
      onSelect={onSelect}
      selectedOptions={selectedOption}
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
ViewToolbarSelectCategory.propTypes = {
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
  // useSelectCategoryOptions: PropTypes.func,
  useView: PropTypes.func
};

/**
 * Default props.
 *
 * @type {{useOnSelect: Function, t: Function, useSelectCategoryOptions: Function}}
 */
ViewToolbarSelectCategory.defaultProps = {
  // options: [],
  t: translate,
  useOnSelect,
  useSelector: storeHooks.reactRedux.useSelector,
  // useSelectCategoryOptions: Function.prototype,
  // useSelectCategoryOptions,
  useView
};

export { ViewToolbarSelectCategory as default, ViewToolbarSelectCategory, useOnSelect };
