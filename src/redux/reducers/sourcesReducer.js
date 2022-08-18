import { sourcesTypes } from '../constants';
import { helpers } from '../../common';
import { reduxHelpers } from '../common';

const initialState = {
  update: 0,
  view: {},
  confirmDelete: {},
  deleted: {}
};

const sourcesReducer = (state = initialState, action) => {
  switch (action.type) {
    case sourcesTypes.UPDATE_SOURCES:
      return reduxHelpers.setStateProp(
        null,
        {
          update: helpers.getCurrentDate().getTime()
        },
        {
          state,
          reset: false
        }
      );
    case sourcesTypes.CONFIRM_DELETE_SOURCE:
      return reduxHelpers.setStateProp(
        'confirmDelete',
        {
          source: action.source
        },
        {
          state,
          initialState
        }
      );
    default:
      return reduxHelpers.generatedPromiseActionReducer(
        [
          { ref: 'deleted', type: [sourcesTypes.DELETE_SOURCE, sourcesTypes.DELETE_SOURCES] },
          { ref: 'view', type: sourcesTypes.GET_SOURCES }
        ],
        state,
        action
      );
  }
};

sourcesReducer.initialState = initialState;

export { sourcesReducer as default, initialState, sourcesReducer };
