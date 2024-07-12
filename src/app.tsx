/**
 * Root component of the application that sets up global styles, localization, secure API requests, and routing.
 * It includes automatic token authorization for axios requests and wraps the UI with localization and routing contexts.
 *
 * @module app
 */
import React, { useEffect } from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';
import { I18n } from './components/i18n/I18n';
import { useLocale } from './components/sessionContext/sessionProvider';
import { AppLayout } from './components/viewLayout/viewLayout';
import { AppRoutes } from './routes';
import './app.css';

const App: React.FC = () => {
  const locale = useLocale();
  const queryClient = new QueryClient();

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      axios.interceptors.request.use(
        config => ({
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Token ${localStorage.getItem('authToken')}`
          } as any
        }),
        error => {
          console.error('Failed to set axios configuration', error);
        }
      );
    }
  }, []);

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        {/* <SessionProvider> TODO: possibly add this back in when we do login/auth stuff */}
        <I18n locale={locale}>
          <BrowserRouter>
            <AppLayout>
              <AppRoutes />
            </AppLayout>
          </BrowserRouter>
        </I18n>
        {/* </SessionProvider> */}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export { App as default, App };
