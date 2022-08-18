import { useState } from 'react';
import { useShallowCompareEffect } from 'react-use';
// import { AlertVariant } from '@patternfly/react-core';
import { reduxActions, reduxTypes, storeHooks } from '../../redux';
// import apiTypes from '../../constants/apiConstants';
// import { translate } from '../i18n/i18n';

const useGetSources = (
  // query,
  {
    getSources = reduxActions.sources.getSources,
    useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch,
    // useSelectorsResponse: useAliasSelectorsResponse = storeHooks.reactRedux.useSelectorsResponse
    useSelectors: useAliasSelectors = storeHooks.reactRedux.useSelectors
  } = {}
) => {
  // const [] = useState();
  const dispatch = useAliasDispatch();
  const { view, options } = useAliasSelectors([
    { id: 'view', selector: ({ sources }) => ({ ...sources.view }) },
    { id: 'options', selector: ({ viewOptions }) => ({ ...viewOptions[reduxTypes.view.SOURCES_VIEW] }) }
  ]);

  // const query = helpers.createViewQueryObject(viewOptions);

  useShallowCompareEffect(() => {
    const query = helpers.createViewQueryObject(options);
    getSources(query);
  }, [dispatch, options]);
};

const context = {
  useGetSources
};

export { context as default, context, useGetSources };
