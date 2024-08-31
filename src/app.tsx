/**
 * Root component of the application that initializes global styles, localization, secure API requests, and routing.
 *
 * @module app
 */
import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { BrowserRouter } from 'react-router-dom';
import { I18n } from './components/i18n/I18n';
import { Login } from './components/login/login';
import { AppLayout } from './components/viewLayout/viewLayout';
import { AppRoutes } from './routes';
import './app.css';

const App: React.FC = () => (
  <I18n>
    <Login>
      <BrowserRouter>
        <AppLayout>
          <AppRoutes />
        </AppLayout>
      </BrowserRouter>
    </Login>
  </I18n>
);

export { App as default, App };
