import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';

import configureStore from './store';
import Root from './containers/Root';

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);
const history = syncHistoryWithStore(browserHistory, store);
const rootElement = document.getElementById('root');

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  rootElement
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root').default;
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      rootElement
    );
  });
}
