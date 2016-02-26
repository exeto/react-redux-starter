import { createStore, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from '../reducers';

const enhancer = applyMiddleware(routerMiddleware(browserHistory));

export default function configure(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}
