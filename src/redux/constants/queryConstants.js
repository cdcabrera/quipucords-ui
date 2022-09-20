import { API_QUERY_TYPES, API_QUERY_SORT_TYPES } from '../../constants/apiConstants';

const SET_QUERY = 'SET_QUERY';

/**
 * Filtering query types
 *
 * @type {{'[API_QUERY_TYPES.ORDERING_ASC]': string, '[API_QUERY_TYPES.SEARCH_SOURCES_NAME]': string,
 *    '[API_QUERY_TYPES.CREDENTIAL_TYPE]': string, '[API_QUERY_TYPES.ORDERING_DSC]': string, '[API_QUERY_TYPES.SEARCH_NAME]': string,
 *    '[API_QUERY_TYPES.ORDERING]': string, '[API_QUERY_TYPES.SOURCE_TYPE]': string, '[API_QUERY_TYPES.PAGE]': string,
 *    '[API_QUERY_TYPES.SEARCH_CREDENTIALS_NAME]': string, '[API_QUERY_TYPES.PAGE_SIZE]': string}}
 */
const SET_QUERY_TYPES = {
  [API_QUERY_TYPES.CREDENTIAL_TYPE]: `SET_QUERY_${API_QUERY_TYPES.CREDENTIAL_TYPE}`,
  [API_QUERY_TYPES.ORDERING]: `SET_QUERY_${API_QUERY_TYPES.ORDERING}`,
  [API_QUERY_TYPES.ORDERING_ASC]: `SET_QUERY_${API_QUERY_TYPES.ORDERING_ASC}`,
  [API_QUERY_TYPES.ORDERING_DSC]: `SET_QUERY_${API_QUERY_TYPES.ORDERING_DSC}`,
  [API_QUERY_TYPES.PAGE]: `SET_QUERY_${API_QUERY_TYPES.PAGE}`,
  [API_QUERY_TYPES.PAGE_SIZE]: `SET_QUERY_${API_QUERY_TYPES.PAGE_SIZE}`,
  [API_QUERY_TYPES.SEARCH_CREDENTIALS_NAME]: `SET_QUERY_${API_QUERY_TYPES.SEARCH_CREDENTIALS_NAME}`,
  [API_QUERY_TYPES.SEARCH_NAME]: `SET_QUERY_${API_QUERY_TYPES.SEARCH_NAME}`,
  [API_QUERY_TYPES.SEARCH_SOURCES_NAME]: `SET_QUERY_${API_QUERY_TYPES.SEARCH_SOURCES_NAME}`,
  [API_QUERY_TYPES.SOURCE_TYPE]: `SET_QUERY_${API_QUERY_TYPES.SOURCE_TYPE}`
};

/**
 * Sorting query types
 *
 * @type {{'[API_QUERY_SORT_TYPES.MOST_RECENT_SCANJOB_START_TIME]': string, '[API_QUERY_SORT_TYPES.CREDENTIAL_TYPE]': string,
 *    '[API_QUERY_SORT_TYPES.NAME]': string, '[API_QUERY_SORT_TYPES.SOURCE_TYPE]': string,
 *    '[API_QUERY_SORT_TYPES.MOST_RECENT_CONNECT_SCAN_START_TIME]': string}}
 */
const SET_QUERY_SORT_TYPES = {
  [API_QUERY_SORT_TYPES.CREDENTIAL_TYPE]: `SET_QUERY_SORT_${API_QUERY_SORT_TYPES.CREDENTIAL_TYPE}`,
  [API_QUERY_SORT_TYPES.MOST_RECENT_CONNECT_SCAN_START_TIME]: `SET_QUERY_SORT_${API_QUERY_SORT_TYPES.MOST_RECENT_CONNECT_SCAN_START_TIME}`,
  [API_QUERY_SORT_TYPES.MOST_RECENT_SCANJOB_START_TIME]: `SET_QUERY_SORT_${API_QUERY_SORT_TYPES.MOST_RECENT_SCANJOB_START_TIME}`,
  [API_QUERY_SORT_TYPES.NAME]: `SET_QUERY_SORT_${API_QUERY_SORT_TYPES.NAME}`,
  [API_QUERY_SORT_TYPES.SOURCE_TYPE]: `SET_QUERY_SORT_${API_QUERY_SORT_TYPES.SOURCE_TYPE}`
};

/**
 * Paging query types
 *
 * @type {{'[API_QUERY_PAGING_TYPES.ORDERING]': string, '[API_QUERY_PAGING_TYPES.PAGE]': string,'[API_QUERY_PAGING_TYPES.PAGE_SIZE]': string}}
 *
  const SET_QUERY_PAGING = {
    [API_QUERY_PAGING_TYPES.ORDERING]: `SET_QUERY_PAGING_${API_QUERY_PAGING_TYPES.ORDERING}`,
    [API_QUERY_PAGING_TYPES.PAGE]: `SET_QUERY_PAGING_${API_QUERY_PAGING_TYPES.PAGE}`,
    [API_QUERY_PAGING_TYPES.PAGE_SIZE]: `SET_QUERY_PAGING_${API_QUERY_PAGING_TYPES.PAGE_SIZE}`
  };
 */

/*
const SET_QUERY_CREDENTIALS_TYPES = {
  [API_QUERY_PAGING_TYPES.ORDERING]: `SET_QUERY_CREDENTIALS_ORDERING_${API_QUERY_PAGING_TYPES.ORDERING}`,
  [API_QUERY_PAGING_TYPES.PAGE]: `SET_QUERY_CREDENTIALS_PAGE_${API_QUERY_PAGING_TYPES.PAGE}`,
  [API_QUERY_PAGING_TYPES.PAGE_SIZE]: `SET_QUERY_CREDENTIALS_PAGE_SIZE_${API_QUERY_PAGING_TYPES.PAGE_SIZE}`
  // [apiTypes.API_.DIRECTION]: `SET_QUERY_SORT_DIRECTION_${RHSM_API_QUERY_TYPES.DIRECTION}`,
  // [RHSM_API_QUERY_TYPES.DISPLAY_NAME]: `SET_QUERY_RHSM_HOSTS_INVENTORY_${RHSM_API_QUERY_TYPES.DISPLAY_NAME}`,
  // [RHSM_API_QUERY_TYPES.SORT]: `SET_QUERY_RHSM_HOSTS_INVENTORY_${RHSM_API_QUERY_TYPES.SORT}`,
  // [RHSM_API_QUERY_TYPES.LIMIT]: `SET_QUERY_RHSM_HOSTS_INVENTORY_${RHSM_API_QUERY_TYPES.LIMIT}`,
  // [RHSM_API_QUERY_TYPES.OFFSET]: `SET_QUERY_RHSM_HOSTS_INVENTORY_${RHSM_API_QUERY_TYPES.OFFSET}`
};

const SET_QUERY_SCANS_TYPES = {
  [API_QUERY_PAGING_TYPES.ORDERING]: `SET_QUERY_SCANS_ORDERING_${API_QUERY_PAGING_TYPES.ORDERING}`,
  [API_QUERY_PAGING_TYPES.PAGE]: `SET_QUERY_SCANS_PAGE_${API_QUERY_PAGING_TYPES.PAGE}`,
  [API_QUERY_PAGING_TYPES.PAGE_SIZE]: `SET_QUERY_SCANS_PAGE_SIZE_${API_QUERY_PAGING_TYPES.PAGE_SIZE}`
};

const SET_QUERY_SOURCES_TYPES = {
  [API_QUERY_PAGING_TYPES.ORDERING]: `SET_QUERY_SOURCES_ORDERING_${API_QUERY_PAGING_TYPES.ORDERING}`,
  [API_QUERY_PAGING_TYPES.PAGE]: `SET_QUERY_SOURCES_PAGE_${API_QUERY_PAGING_TYPES.PAGE}`,
  [API_QUERY_PAGING_TYPES.PAGE_SIZE]: `SET_QUERY_SOURCES_PAGE_SIZE_${API_QUERY_PAGING_TYPES.PAGE_SIZE}`
};
 */

const queryTypes = {
  SET_QUERY,
  SET_QUERY_TYPES,
  SET_QUERY_SORT_TYPES
};

export { queryTypes as default, queryTypes, SET_QUERY, SET_QUERY_TYPES, SET_QUERY_SORT_TYPES };
