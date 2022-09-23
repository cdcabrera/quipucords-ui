import { reduxHelpers } from '../common';
import { reduxTypes } from '../constants';
import { API_QUERY_TYPES } from '../../constants/apiConstants';

/**
 * Initial state.
 */
const initialState = {
  query: {}
};

/**
 * Apply user observer/reducer logic for views to state, against actions.
 *
 * @param {object} state
 * @param {object} action
 * @returns {object|{}}
 */
const queryReducer = (state = initialState, action) => {
  switch (action.type) {
    case reduxTypes.query.SET_QUERY:
      return reduxHelpers.setStateProp(
        'query',
        {
          [action.viewId]: {
            ...state.query[action.viewId],
            [action.filter]: action.value
          }
        },
        {
          state,
          reset: false
        }
      );

    case reduxTypes.query.SET_QUERY_TYPES[API_QUERY_TYPES.PAGE]:
      return reduxHelpers.setStateProp(
        'query',
        {
          [action.viewId]: {
            ...state.query[action.viewId],
            [API_QUERY_TYPES.PAGE]: action.value
          }
        },
        {
          state,
          reset: false
        }
      );

    case reduxTypes.query.SET_QUERY_TYPES[API_QUERY_TYPES.PAGE_SIZE]:
      return reduxHelpers.setStateProp(
        'query',
        {
          [action.viewId]: {
            ...state.query[action.viewId],
            [API_QUERY_TYPES.PAGE_SIZE]: action.value
          }
        },
        {
          state,
          reset: false
        }
      );

    default:
      return state;
  }
};

queryReducer.initialState = initialState;

export { queryReducer as default, initialState, queryReducer };
