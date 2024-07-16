import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import App from './app/App';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
const queryClient = new QueryClient();

//TODO: just to get token manually until we have login screen
axios
  .post('https://0.0.0.0:9443/api/v1/token/', {
    username: 'admin',
    password: 'pleasechangethispassword'
  })
  .then(res => {
    localStorage.setItem('authToken', res.data.token);
    console.log('Token', res.data.token);
  });

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <SessionProvider> TODO: possibly add this back in when we do login/auth stuff */}
      <App />
      {/* </SessionProvider> */}
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
