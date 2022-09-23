import React from 'react';
import { ViewContext } from '../view/viewContext';
import { Scans } from '../scans/scans';
import { Sources } from '../sources/sources';
import { Credentials, CONFIG as CredentialsConfig } from '../credentials/credentials';

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
    title: 'Sources',
    path: '/sources',
    redirect: true,
    element: <Sources />
  },
  {
    iconClass: 'pficon pficon-orders',
    title: 'Scans',
    path: '/scans',
    element: <Scans />
  },
  {
    iconClass: 'fa fa-id-card',
    title: 'Credentials',
    path: '/credentials',
    element: (
      <ViewContext.Provider value={{ ...CredentialsConfig }}>
        <Credentials />
      </ViewContext.Provider>
    )
  }
];

export { routes as default, baseName, routes };
