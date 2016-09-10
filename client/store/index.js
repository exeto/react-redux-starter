import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

const enhancer = compose(
  applyMiddleware(routerMiddleware(browserHistory), thunk),
  process.env.NODE_ENV !== 'production' &&
  typeof window !== 'undefined' && window.devToolsExtension ?
  window.devToolsExtension() : f => f
);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)
    );
  }

  return store;
}
