import { reduxTypes, store } from '../../redux'
import { helpers } from '../../common'
import React from 'react';


const onEdit = source => {
  dispatch({
    type: reduxTypes.sources.EDIT_SOURCE_SHOW,
    source
  });
};

const onScan = source => {
  dispatch({
    type: reduxTypes.scans.EDIT_SCAN_SHOW,
    sources: [source]
  });
};
