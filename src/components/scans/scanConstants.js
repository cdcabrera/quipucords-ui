import React from 'react';
import { translate } from '../i18n/i18n';
import { ViewToolbarFieldFilter } from '../viewToolbar/viewToolbarFieldFilter';

const ScanFilterFields = [
  /*
  {
    id: 'search_by_name',
    title: 'Name',
    placeholder: 'Filter by Name',
    filterType: 'text'
  },
  {
    id: 'search_sources_by_name',
    title: 'Source',
    placeholder: 'Filter by Source Name',
    filterType: 'text'
  }
  */
  {
    title: () => translate('toolbar.label', { context: ['option', 'search_by_name'] }),
    value: 'search_by_name',
    component: function SearchName(props) {
      return <ViewToolbarFieldFilter queryType="search_by_name" {...props} />;
    },
    selected: true
  },
  {
    title: () => translate('toolbar.label', { context: ['option', 'search_sources_by_name'] }),
    value: 'search_sources_by_name',
    component: function CredentialType(props) {
      return <ViewToolbarFieldFilter queryType="search_sources_by_name" {...props} />;
    }
  }
];

/**
 * ID: Enum with the following possible values [id, name, scan_type, most_recent_scanjob__start_time, most_recent_scanjob__status]
 */
const ScanSortFields = [
  {
    title: () => translate('toolbar.label', { context: ['option', 'name'] }),
    value: 'name',
    isNumeric: false,
    selected: true
  },
  {
    title: () => translate('toolbar.label', { context: ['option', 'most_recent'] }),
    value: 'most_recent_scanjob__start_time',
    isNumeric: true,
    sortAscending: false
  }
];

export { ScanFilterFields, ScanSortFields };
