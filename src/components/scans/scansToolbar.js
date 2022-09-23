import React from 'react';
import { translate } from '../i18n/i18n';
import { ViewToolbarTextInput } from '../viewToolbar/viewToolbarTextInput';
import { API_QUERY_SORT_TYPES, API_QUERY_TYPES } from '../../constants/apiConstants';

/**
 * Available filtering
 *
 * @type {{component: React.ReactNode, selected: boolean, title: Function|string, selected: boolean}[]}
 */
const ScansFilterFields = [
  {
    title: () => translate('toolbar.label', { context: ['option', API_QUERY_TYPES.SEARCH_NAME] }),
    component: function SearchName(props) {
      return <ViewToolbarTextInput filter={API_QUERY_TYPES.SEARCH_NAME} {...props} />;
    },
    selected: true
  },
  {
    title: () => translate('toolbar.label', { context: ['option', API_QUERY_TYPES.SEARCH_SOURCES_NAME] }),
    component: function SearchSourcesName(props) {
      return <ViewToolbarTextInput filter={API_QUERY_TYPES.SEARCH_SOURCES_NAME} {...props} />;
    }
  }
];

/**
 * Available sorting
 *
 * @type {{isNumeric: boolean, title: string|Function, value: string, selected: boolean}[]}
 */
const ScansSortFields = [
  {
    title: () => translate('toolbar.label', { context: ['option', API_QUERY_SORT_TYPES.NAME] }),
    value: API_QUERY_SORT_TYPES.NAME,
    selected: true
  },
  {
    title: () =>
      translate('toolbar.label', { context: ['option', API_QUERY_SORT_TYPES.MOST_RECENT_CONNECT_SCAN_START_TIME] }),
    isNumeric: true,
    value: API_QUERY_SORT_TYPES.MOST_RECENT_CONNECT_SCAN_START_TIME
  }
];

/**
 * Charge initial view query
 *
 * @type {{'[API_QUERY_TYPES.ORDERING]': string, '[API_QUERY_TYPES.PAGE]': number, '[API_QUERY_TYPES.PAGE_SIZE]': number}}
 */
const ScansQuery = {
  [API_QUERY_TYPES.ORDERING]: API_QUERY_SORT_TYPES.NAME,
  [API_QUERY_TYPES.PAGE]: 1,
  [API_QUERY_TYPES.PAGE_SIZE]: 10
};

const ScansToolbar = {
  ScansFilterFields,
  ScansSortFields,
  ScansQuery
};

export { ScansToolbar as default, ScansToolbar, ScansFilterFields, ScansSortFields, ScansQuery };
