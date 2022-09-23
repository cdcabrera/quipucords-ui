import { reduxTypes, storeHooks } from '../../redux';
import { useView } from '../view/viewContext';

/**
 * Return filtered category options, current, and initial value.
 *
 * @param {Array} categoryFields
 * @param {object} options
 * @param {Function} options.useSelector
 * @param {string} options.viewId
 * @returns {object}
 */
/*
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
 */

/**
 * Clear a specific toolbar category.
 *
 * @param {object} options
 * @param {Function} options.useDispatch
 * @param {Function} options.useView
 * @returns {Function}
 */

const useToolbarFieldClear = ({
  useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch,
  useView: useAliasView = useView
} = {}) => {
  const { viewId } = useAliasView();
  const dispatch = useAliasDispatch();

  return filter =>
    dispatch([
      {
        type: reduxTypes.query.SET_QUERY,
        viewId,
        filter,
        value: undefined
      }
    ]);
};

/**
 * Clear all available toolbar categories.
 *
 * @param {object} options
 * @param {Function} options.useDispatch
 * @param {Function} options.useView
 * @returns {Function}
 */
const useToolbarFieldClearAll = ({
  useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch,
  useView: useAliasView = useView
} = {}) => {
  const dispatch = useAliasDispatch();
  const { viewId, config } = useAliasView();
  const options = config.toolbar.filterFields;

  return () => {
    const resetFilters = [];

    options.forEach(({ value: filter }) => {
      resetFilters.push({
        type: reduxTypes.query.SET_QUERY,
        viewId,
        filter,
        value: undefined
      });
    });

    dispatch(resetFilters);
  };
};

const context = {
  useToolbarFieldClear,
  useToolbarFieldClearAll
};

export { context as default, context, useToolbarFieldClear, useToolbarFieldClearAll };
