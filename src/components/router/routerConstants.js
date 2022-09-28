import React from 'react';
import { useSetViewContext } from '../view/viewContext';
import { Scans, CONFIG as ScansConfig } from '../scans/scans';
import { Sources, CONFIG as SourcesConfig } from '../sources/sources';
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
    element: function SourcesView(props) {
      useSetViewContext(SourcesConfig);
      console.log('HEY >>> SOURCES >>>');
      return <Sources {...props} />;
    }
  },
  {
    iconClass: 'pficon pficon-orders',
    title: 'Scans',
    path: '/scans',
    element: function ScansView(props) {
      useSetViewContext(ScansConfig);
      return <Scans {...props} />;
    }
  },
  {
    iconClass: 'fa fa-id-card',
    title: 'Credentials',
    path: '/credentials',
    element: function CredentialsView(props) {
      useSetViewContext(CredentialsConfig);
      return <Credentials {...props} />;
    }
  }
];

export { routes as default, baseName, routes };
