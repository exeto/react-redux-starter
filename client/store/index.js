import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

export default function configureStore(initialState, history) {
  const isDevToolsAvailable = (
    typeof window !== 'undefined' &&
    window.devToolsExtension &&
    process.env.NODE_ENV !== 'production'
  );

  const enhancer = compose(
    applyMiddleware(routerMiddleware(history), thunk),
    isDevToolsAvailable ? window.devToolsExtension() : f => f
  );

  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)
    );
  }

  return store;
}
