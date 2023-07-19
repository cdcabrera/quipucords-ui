import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.scss';
import App from './components/app';
import { baseName } from './components/router/router';
import { store } from './redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter basename={baseName}>
      <App />
    </BrowserRouter>
  </Provider>
);
