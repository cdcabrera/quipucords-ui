import React from 'react';
import { reduxTypes, storeHooks } from '../../redux';
import { helpers } from '../../common';

const onUseScan = ({ useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch } = {}) => {
  const dispatch = useAliasDispatch();

  return source => {
    dispatch({
      type: reduxTypes.scans.EDIT_SCAN_SHOW,
      sources: [source]
    });
  };
};

