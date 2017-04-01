import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import createHistory from 'history/createBrowserHistory';

import configureStore from './store';
import Root from './containers/Root';

const initialState = window.__INITIAL_STATE__;
const history = createHistory();
const store = configureStore(initialState, history);
const rootElement = document.getElementById('root');

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component store={store} history={history} />
    </AppContainer>,
    rootElement
  );
};

render(Root);

if (module.hot) {
  module.hot.accept('./containers/Root', () => render(Root));
}
