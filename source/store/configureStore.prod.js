import { createStore, applyMiddleware } from 'redux';
import { syncHistory } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from '../reducers';

const enhancer = applyMiddleware(syncHistory(browserHistory));

export default function configure(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}
