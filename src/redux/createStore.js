import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { connectRoutes } from 'redux-first-router';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import routes from './router/routes';

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
    : compose;

export default (history, preloadedState = {}) => {
  const { reducer, middleware, enhancer, thunk } = connectRoutes(
    history,
    routes,
  );

  const rootReducer = combineReducers({ ...reducers, location: reducer });
  const middlewares = applyMiddleware(reduxThunk, middleware);
  const enhancers = composeEnhancers(enhancer, middlewares);
  const store = createStore(rootReducer, preloadedState, enhancers);

  if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
      module.hot.accept('./reducers', () => {
        const newRootReducer = combineReducers({
          ...require('./reducers').default,
          location: reducer,
        });

        store.replaceReducer(newRootReducer);
      });
    }
  }

  return { store, thunk };
};
