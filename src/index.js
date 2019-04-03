import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './components/app';
import { baseName } from './components/content/routes';
import store from './redux/store';

import 'patternfly/dist/css/rcue.css';
import 'patternfly/dist/css/rcue-additions.css';
import './styles/.css/index.css'; // eslint-disable-line import/no-unresolved

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={baseName}>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
