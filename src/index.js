import 'core-js/shim';

import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';

import createStore from './redux/createStore';
import Root from './components/Root';

const preloadedState = window.__PRELOADED_STATE__;

delete window.__PRELOADED_STATE__;

const history = createHistory();
const { store } = createStore(history, preloadedState);
const render = preloadedState ? ReactDOM.hydrate : ReactDOM.render;

render(<Root store={store} />, document.getElementById('root'), () => {
  const element = document.getElementById('server-side-styles');

  if (element) {
    element.parentNode.removeChild(element);
  }
});
