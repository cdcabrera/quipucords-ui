import React from 'react';
import { translate } from '../i18n/i18n';
import { ViewToolbarFieldCredentialType } from '../viewToolbar/viewToolbarFieldCredentialType';
// import ViewToolbarFieldNameFilter from '../viewToolbar/viewToolbarFieldNameFilter';
import { ViewToolbarFieldFilter } from '../viewToolbar/viewToolbarFieldFilter';

const CredentialFilterFields = [
  /*
  {
    id: 'search_by_name',
    title: 'Name',
    placeholder: 'Filter by Name',
    filterType: 'text'
  },
  {
    filterType: 'select',
    component: <ViewToolbarFieldSelectType
  }
  {
    id: 'cred_type',
      title: 'Credential Type',
    placeholder: 'Filter by Credential Type',
    filterType: 'select',
    filterValues: [
    { title: 'Network', id: 'network' },
    { title: 'Satellite', id: 'satellite' },
    { title: 'VCenter', id: 'vcenter' }
  ]
  }
  */
  {
    title: () => translate('toolbar.label', { context: ['option', 'search_by_name'] }),
    value: 'search_by_name',
    component: function SearchName(props) {
      // return <ViewToolbarFieldNameFilter key="SearchName" {...props} />;
      return <ViewToolbarFieldFilter queryType="search_by_name" {...props} />;
    },
    selected: true
  },
  {
    title: () => translate('toolbar.label', { context: ['option', 'cred_type'] }),
    value: 'cred_type',
    component: function CredentialType(props) {
      return <ViewToolbarFieldCredentialType {...props} />;
    }
  }
];

/**
 * ID: Enum with the following possible values [name, cred_type]
 */
const CredentialSortFields = [
  {
    title: () => translate('toolbar.label', { context: ['option', 'name'] }),
    value: 'name',
    isNumeric: false,
    selected: true
  },
  {
    title: () => translate('toolbar.label', { context: ['option', 'cred_type'] }),
    value: 'cred_type',
    isNumeric: false
  }
];

export { CredentialFilterFields, CredentialSortFields };
