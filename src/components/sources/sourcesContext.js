import { useState } from 'react';
import { useShallowCompareEffect } from 'react-use';
// import { AlertVariant } from '@patternfly/react-core';
import { reduxActions, reduxTypes, storeHooks } from '../../redux';
// import apiTypes from '../../constants/apiConstants';
// import { translate } from '../i18n/i18n';

const useGetSources = (
  query,
  {
    getSources = reduxActions.sources.getSources,
    useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch,
    useSelectorsResponse: useAliasSelectorsResponse = storeHooks.reactRedux.useSelectorsResponse
  } = {}
) => {
  // const [] = useState();
  const dispatch = useAliasDispatch();
  // const query = helpers.createViewQueryObject(viewOptions);

  useShallowCompareEffect(() => {

  }, [dispatch, query]);
};

const context = {
  useGetSources
};

export { context as default, context, useGetSources };
