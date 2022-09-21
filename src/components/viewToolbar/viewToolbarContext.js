import { storeHooks } from '../../redux';

/**
 * Return filtered category options, current, and initial value.
 *
 * @param {Array} categoryFields
 * @param {object} options
 * @param {Function} options.useSelector
 * @param {string} options.viewId
 * @returns {object}
 */
const useSelectCategoryOptions = (
  categoryFields,
  { useSelector: useAliasSelector = storeHooks.reactRedux.useSelector, viewId } = {}
) => {
  const updatedCategory = useAliasSelector(({ viewOptions }) => viewOptions?.[viewId]?.currentCategory, null);
  let initialCategory;

  const updatedCategoryFields = categoryFields.map(({ selected, ...option }) => {
    if (updatedCategory === null && selected) {
      initialCategory = option.value;
    }

    return {
      ...option,
      selected: (updatedCategory === null && selected) || updatedCategory === option.value
    };
  });

  return {
    categoryFields: updatedCategoryFields,
    currentCategory: updatedCategory,
    initialCategory
  };
};

/**
 * Clear a specific toolbar category.
 *
 * @returns {Function}
 */
const useToolbarFieldClear = () => field => console.log('CLEAR FIELD >>>>', field);

/**
 * Clear all available toolbar categories.
 *
 * @returns {Function}
 */
const useToolbarFieldClearAll = () => () => console.log('CLEAR FIELDS >>>>');

const context = {
  useSelectCategoryOptions,
  useToolbarFieldClear,
  useToolbarFieldClearAll
  // useToolbarFieldQueries
};

export { context as default, context, useSelectCategoryOptions, useToolbarFieldClear, useToolbarFieldClearAll };
