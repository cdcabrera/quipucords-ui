import React, { useContext } from 'react';
import { storeHooks } from '../../redux';
import { helpers } from '../../common';

const DEFAULT_CONTEXT = [{ initialQuery: {}, toolbarConfig: {} }, helpers.noop];

const ViewContext = React.createContext(DEFAULT_CONTEXT);

/**
 * Get an updated view context.
 *
 * @returns {React.Context<{}>}
 */
const useViewContext = () => useContext(ViewContext);

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
  const { initialQuery, viewId } = useAliasViewContext();
  const query = useAliasSelector(({ query: viewQuery }) => viewQuery.query?.[viewId], {});

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
  const { toolbarConfig: toolbar } = useAliasViewContext();

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
 * @returns {{viewId, query: object, config: {toolbar: *}}}
 */
const useView = ({
  useConfig: useAliasConfig = useConfig,
  useQuery: useAliasQuery = useQuery,
  useViewContext: useAliasViewContext = useViewContext
} = {}) => {
  const { viewId } = useAliasViewContext();
  const config = useAliasConfig();
  const query = useAliasQuery();

  return {
    viewId,
    query,
    config
  };
};

const context = {
  ViewContext,
  DEFAULT_CONTEXT,
  useQuery,
  useConfig,
  useView
};

export { context as default, context, ViewContext, DEFAULT_CONTEXT, useQuery, useConfig, useView };
