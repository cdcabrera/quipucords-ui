import _get from 'lodash/get';
import { reduxHelpers } from '../common';
import { viewTypes, viewToolbarTypes, credentialsTypes, scansTypes, sourcesTypes } from '../constants';
import { apiTypes } from '../../constants/apiConstants';

const initialState = {};

const INITAL_VIEW_STATE = {
  currentPage: 1,
  pageSize: 10,
  totalCount: 0,
  totalPages: 0,
  filterType: null,
  filterValue: '',
  activeFilters: [],
  sortType: null,
  sortField: 'name',
  sortAscending: true,
  selectedItems: [],
  expandedItems: []
};

initialState[viewTypes.SOURCES_VIEW] = Object.assign(INITAL_VIEW_STATE);
initialState[viewTypes.SCANS_VIEW] = Object.assign(INITAL_VIEW_STATE);
initialState[viewTypes.CREDENTIALS_VIEW] = Object.assign(INITAL_VIEW_STATE);

const viewOptionsReducer = (state = initialState, action) => {
  const updateState = {};

  const updatePageCounts = (viewType, itemsCount) => {
    let totalCount = itemsCount;

    // TODO: Remove this when we get decent data back in development mode
    if (process.env.NODE_ENV === 'development') {
      totalCount = Math.abs(itemsCount) % 1000;
    }

    const totalPages = Math.ceil(totalCount / state[viewType].pageSize);

    updateState[viewType] = {
      ...state[viewType],
      totalCount,
      totalPages,
      currentPage: Math.min(state[viewType].currentPage, totalPages || 1)
    };
  };

  switch (action.type) {
    case viewToolbarTypes.SET_FILTER_TYPE:
      if (state[action.viewType].filterType === action.filterType) {
        return state;
      }

      updateState[action.viewType] = { ...state[action.viewType], filterType: action.filterType, filterValue: '' };
      return { ...state, ...updateState };

    case viewToolbarTypes.SET_FILTER_VALUE:
      updateState[action.viewType] = { ...state[action.viewType], filterValue: action.filterValue };
      return { ...state, ...updateState };

    case viewToolbarTypes.ADD_FILTER:
      const currentFilter = state[action.viewType].activeFilters.find(filter => action.filter.field === filter.field);

      if (!currentFilter) {
        updateState[action.viewType] = {
          ...state[action.viewType],
          activeFilters: [...state[action.viewType].activeFilters, action.filter],
          currentPage: 1
        };
      } else if (currentFilter.value === action.filter.value) {
        // Do nothing if an existing filter has the same value
        return state;
      } else {
        // replace the existing filter
        const index = state[action.viewType].activeFilters.indexOf(currentFilter);
        updateState[action.viewType] = {
          ...state[action.viewType],
          activeFilters: [
            ...state[action.viewType].activeFilters.slice(0, index),
            action.filter,
            ...state[action.viewType].activeFilters.slice(index + 1)
          ],
          currentPage: 1
        };
      }

      return { ...state, ...updateState };

    case viewToolbarTypes.REMOVE_FILTER:
      const index = state[action.viewType].activeFilters.indexOf(action.filter);
      if (index >= 0) {
        updateState[action.viewType] = {
          ...state[action.viewType],
          activeFilters: [
            ...state[action.viewType].activeFilters.slice(0, index),
            ...state[action.viewType].activeFilters.slice(index + 1)
          ],
          currentPage: 1
        };
        return { ...state, ...updateState };
      }

      return state;

    case viewToolbarTypes.CLEAR_FILTERS:
      updateState[action.viewType] = { ...state[action.viewType], activeFilters: [], currentPage: 1 };
      return { ...state, ...updateState };

    case viewToolbarTypes.SET_SORT_TYPE:
      if (state[action.viewType].sortType === action.sortType) {
        return state;
      }

      updateState[action.viewType] = {
        ...state[action.viewType],
        sortType: action.sortType,
        sortField: action.sortType && action.sortType.id,
        sortAscending: _get(action, 'sortType.sortAscending', true),
        currentPage: 1
      };

      return { ...state, ...updateState };

    case viewToolbarTypes.TOGGLE_SORT_ASCENDING:
      updateState[action.viewType] = {
        ...state[action.viewType],
        sortAscending: !state[action.viewType].sortAscending,
        currentPage: 1
      };
      return { ...state, ...updateState };

    case reduxHelpers.FULFILLED_ACTION(credentialsTypes.GET_CREDENTIALS):
      updatePageCounts(viewTypes.CREDENTIALS_VIEW, action.payload.data[apiTypes.API_RESPONSE_CREDENTIALS_COUNT]);
      return { ...state, ...updateState };

    case reduxHelpers.FULFILLED_ACTION(sourcesTypes.GET_SOURCES):
      updatePageCounts(viewTypes.SOURCES_VIEW, action.payload.data[apiTypes.API_RESPONSE_SOURCES_COUNT]);
      return { ...state, ...updateState };

    case reduxHelpers.FULFILLED_ACTION(scansTypes.GET_SCANS):
      updatePageCounts(viewTypes.SCANS_VIEW, action.payload.data[apiTypes.API_RESPONSE_SCANS_COUNT]);
      return { ...state, ...updateState };

    default:
      return state;
  }
};

viewOptionsReducer.initialState = initialState;

export { viewOptionsReducer as default, initialState, viewOptionsReducer };
