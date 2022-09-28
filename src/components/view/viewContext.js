import React, { useEffect, useContext, useCallback } from 'react';
// import { useShallowCompareEffect } from 'react-use';
import { reduxTypes, storeHooks } from '../../redux';
import { helpers } from '../../common';

const DEFAULT_CONTEXT = ['e30=', helpers.noop];

const ViewContext = React.createContext(DEFAULT_CONTEXT);

/**
 * Get an updated view context.
 *
 * @returns {React.Context<{}>}
 */
const useViewContext = () => useContext(ViewContext);

/**
 * Set the view context
 *
 * @param {*} context
 */
const useSetViewContext = context => {
  const [priorContext, setContext] = useContext(ViewContext);

  useEffect(() => {
    if (context) {
      const base64 = window.btoa(JSON.stringify(context));
      if (base64 !== priorContext) {
        console.log('WORK >>>>', context, base64);
        // setContext(() => context);
        setContext(base64);
      }
    }
  }, [context, priorContext, setContext]);

  return useCallback(
    updatedContext => {
      setContext(() => updatedContext);
    },
    [setContext]
  );
};

/* works
const useUpdateViewContext = () => {
  const [, setContext] = useContext(ViewContext);

  return useCallback(
    context => {
      setContext(context);
    },
    [setContext]
  );
};
 */

/**
 * Context query for views
 *
 * @param {object} options
 * @param {Function} options.useSelector
 * @param {Function} options.useViewContext
 * @returns {{}}
 */
const useQuery = ({
  useSelector: useAliasSelector = storeHooks.reactRedux.useSelector,
  useViewContext: useAliasViewContext = useViewContext
} = {}) => {
  const [{ initialQuery, viewId }] = useAliasViewContext();
  const query = useAliasSelector(({ view }) => view.query?.[viewId], {});

  console.log('INITIAL QUERY', initialQuery, viewId);

  return {
    ...initialQuery,
    ...query
  };
};

/**
 * Context config for views
 *
 * @param {object} options
 * @param {Function} options.useViewContext
 * @returns {{toolbar}}
 */
const useConfig = ({ useViewContext: useAliasViewContext = useViewContext } = {}) => {
  const [{ toolbar }] = useAliasViewContext();

  return {
    toolbar
  };
};

/**
 * Context config and query for views
 *
 * @param {object} options
 * @param {Function} options.useConfig
 * @param {Function} options.useQuery
 * @param {Function} options.useViewContext
 * @param options.useSelector
 * @returns {{viewId, query: object, config: {toolbar: *}}}
 */
const useView = ({
  // useConfig: useAliasConfig = useConfig,
  // useQuery: useAliasQuery = useQuery,
  useViewContext: useAliasViewContext = useViewContext,
  useSelector: useAliasSelector = storeHooks.reactRedux.useSelector
} = {}) => {
  const [context] = useAliasViewContext();
  let updatedContext = {};
  try {
    updatedContext = JSON.parse(window.atob(context)) || {};
  } catch (e) {
    //
  }

  const { initialQuery, viewId, toolbar } = updatedContext;

  const query = useAliasSelector(({ view }) => view.query?.[viewId], {});
  // const config = useAliasConfig();
  // const query = useAliasQuery();
  const checkFilters = Object.entries(query).filter(([key, value]) => initialQuery && !(key in initialQuery) && value);

  console.log('USE VIEW >>>', updatedContext, viewId, initialQuery);

  return {
    viewId,
    query: { ...initialQuery, ...query },
    isFilteringActive: checkFilters.length > 0,
    config: { toolbar }
  };
};
/*
const useViewOLD = ({
  useConfig: useAliasConfig = useConfig,
  useQuery: useAliasQuery = useQuery,
  useViewContext: useAliasViewContext = useViewContext
} = {}) => {
  const [{ initialQuery, viewId }] = useAliasViewContext();
  const config = useAliasConfig();
  const query = useAliasQuery();
  const checkFilters = Object.entries(query).filter(([key, value]) => initialQuery && !(key in initialQuery) && value);

  return {
    viewId,
    query,
    isFilteringActive: checkFilters.length > 0,
    config
  };
};
 */

/**
 * On refresh view.
 *
 * @param {object} options
 * @param {Function} options.useDispatch
 * @param {Function} options.useViewContext
 * @returns {Function}
 */
const useOnRefresh = ({
  useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch,
  useViewContext: useAliasViewContext = useViewContext
} = {}) => {
  const [{ viewId }] = useAliasViewContext();
  const dispatch = useAliasDispatch();

  return () => {
    dispatch({
      type: reduxTypes.view.UPDATE_VIEW,
      viewId
    });
  };
};

const context = {
  ViewContext,
  DEFAULT_CONTEXT,
  useQuery,
  useConfig,
  useOnRefresh,
  useSetViewContext,
  useView,
  useViewContext
};

export {
  context as default,
  context,
  ViewContext,
  DEFAULT_CONTEXT,
  useQuery,
  useConfig,
  useOnRefresh,
  useSetViewContext,
  useView,
  useViewContext
};
