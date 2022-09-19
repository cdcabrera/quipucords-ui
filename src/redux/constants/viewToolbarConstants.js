const SET_FILTER = 'SET_FILTER';
const SET_FILTER_TYPE = 'SET_FILTER_TYPE'; // ToDo: replaced by SET_FILTER, remove when refactor complete
const SET_FILTER_VALUE = 'SET_FILTER_VALUE'; // ToDo: replaced by SET_FILTER, remove when refactor complete
const ADD_FILTER = 'ADD_FILTER'; // ToDo: replaced by SET_FILTER, remove when refactor complete
const REMOVE_FILTER = 'REMOVE_FILTER';
const CLEAR_FILTERS = 'CLEAR_FILTERS';
const SET_SORT_TYPE = 'SET_SORT_TYPE';
const TOGGLE_SORT_ASCENDING = 'TOGGLE_SORT_ASCENDING';

const viewToolbarTypes = {
  SET_FILTER_TYPE,
  SET_FILTER_VALUE,
  ADD_FILTER,
  REMOVE_FILTER,
  CLEAR_FILTERS,
  SET_SORT_TYPE,
  TOGGLE_SORT_ASCENDING
};

export {
  viewToolbarTypes as default,
  viewToolbarTypes,
  SET_FILTER,
  SET_FILTER_TYPE,
  SET_FILTER_VALUE,
  ADD_FILTER,
  REMOVE_FILTER,
  CLEAR_FILTERS,
  SET_SORT_TYPE,
  TOGGLE_SORT_ASCENDING
};
