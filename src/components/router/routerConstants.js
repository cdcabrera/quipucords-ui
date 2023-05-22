import React from 'react';
import { ViewContext } from '../view/viewContext';
import { Scans, CONFIG as ScansConfig } from '../scans/scans';
import { Sources, CONFIG as SourcesConfig } from '../sources/sources';
import { Credentials, CONFIG as CredentialsConfig } from '../credentials/credentials';
import { translate } from '../i18n/i18n';

/**
 * Return the application base directory.
 *
 * @type {string}
 */
const baseName = '/client';

/**
 * Return array of objects that describe navigation
 *
 * @returns {Array}
 */
const routes = [
  {
    iconClass: 'fa fa-crosshairs',
    title: translate('view.page', { context: 'sources' }),
    path: '/sources',
    redirect: true,
    element: (
      <ViewContext.Provider value={{ ...SourcesConfig }}>
        <Sources />
      </ViewContext.Provider>
    )
  },
  {
    iconClass: 'pficon pficon-orders',
    title: translate('view.page', { context: 'scans' }),
    path: '/scans',
    element: (
      <ViewContext.Provider value={{ ...ScansConfig }}>
        <Scans />
      </ViewContext.Provider>
    )
  },
  {
    iconClass: 'fa fa-id-card',
    title: translate('view.page', { context: 'credentials' }),
    path: '/credentials',
    element: (
      <ViewContext.Provider value={{ ...CredentialsConfig }}>
        <Credentials />
      </ViewContext.Provider>
    )
  }
];

export { routes as default, baseName, routes };
