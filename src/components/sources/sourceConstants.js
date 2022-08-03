import React from 'react';
import { translate } from '../i18n/i18n';
// import { dictionary } from '../../constants/dictionaryConstants';
import { ViewToolbarFieldFilter } from '../viewToolbar/viewToolbarFieldFilter';

const SourceFilterFields = [
  {
    title: () => translate('toolbar.label', { context: ['option', 'search_by_name'] }),
    value: 'search_by_name',
    component: function SearchName(props) {
      return <ViewToolbarFieldFilter queryType="search_by_name" {...props} />;
    },
    selected: true
  },
  {
    title: () => translate('toolbar.label', { context: ['option', 'search_credentials_by_name'] }),
    value: 'search_credentials_by_name',
    component: function SearchName(props) {
      return <ViewToolbarFieldFilter queryType="search_credentials_by_name" {...props} />;
    }
  }
  /*
  {
    id: 'search_by_name',
    title: 'Name',
    placeholder: 'Filter by Name',
    filterType: 'text'
  },
  {
    id: 'search_credentials_by_name',
    title: 'Credential',
    placeholder: 'Filter by Credential Name',
    filterType: 'text'
  },
  {
    id: 'source_type',
    title: 'Source Type',
    placeholder: 'Filter by Source Type',
    filterType: 'select',
    filterValues: [
      { title: dictionary.network, id: 'network' },
      { title: dictionary.satellite, id: 'satellite' },
      { title: dictionary.vcenter, id: 'vcenter' }
    ]
  }
  */
];

/**
 * ID: Enum with the following possible values [name, source_type, most_recent_connect_scan__start_time]
 */
const SourceSortFields = [
  {
    title: () => translate('toolbar.label', { context: ['option', 'name'] }),
    value: 'name',
    isNumeric: false,
    selected: true
  },
  {
    title: () => translate('toolbar.label', { context: ['option', 'source_type'] }),
    value: 'source_type',
    isNumeric: false
  },
  {
    title: () => translate('toolbar.label', { context: ['option', 'most_recent'] }),
    value: 'most_recent_connect_scan__start_time',
    isNumeric: true,
    sortAscending: false
  }
];

export { SourceFilterFields, SourceSortFields };
