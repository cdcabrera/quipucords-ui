import { storeHooks } from '../../redux';

/**
 * Return filter queries.
 *
 * @param {string} viewType
 * @param {Array} options
 * @param {object} opts
 * @param {Function} opts.useSelectors
 * @returns {object}
 */
const useToolbarFieldQueries = (
  viewType,
  options,
  { useSelectors: useAliasSelectors = storeHooks.reactRedux.useSelectors } = {}
) =>
  useAliasSelectors(
    options?.map(({ value }) => ({
      id: value,
      selector: ({ viewOptions }) => viewOptions?.[viewType]?.filterQuery?.[value]
    })),
    {}
  );

/**
 * Return filtered category options, current, and initial value.
 *
 * @param {string} viewType
 * @param {Array} categoryFields
 * @param {object} options
 * @param {Function} options.useSelector
 * @returns {object}
 */
const useSelectCategoryOptions = (
  viewType,
  categoryFields,
  { useSelector: useAliasSelector = storeHooks.reactRedux.useSelector } = {}
) => {
  const updatedCategory = useAliasSelector(({ viewOptions }) => viewOptions?.[viewType]?.currentCategory, null);
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
  useToolbarFieldClearAll,
  useToolbarFieldQueries
};

export {
  context as default,
  context,
  useSelectCategoryOptions,
  useToolbarFieldClear,
  useToolbarFieldClearAll,
  useToolbarFieldQueries
};
