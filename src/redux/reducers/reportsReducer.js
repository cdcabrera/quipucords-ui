import { reportsTypes } from '../constants';
import { reduxHelpers } from '../common/reduxHelpers';

const initialState = {
  mergeReport: {},
  reportsDownload: {}
};

const reportsReducer = (state = initialState, action) =>
  reduxHelpers.generatedPromiseActionReducer(
    [
      { ref: 'reportsDownload', type: reportsTypes.GET_REPORTS_DOWNLOAD },
      { ref: 'mergeReport', type: reportsTypes.GET_MERGE_REPORT }
    ],
    state,
    action
  );

reportsReducer.initialState = initialState;

export { reportsReducer as default, initialState, reportsReducer };
