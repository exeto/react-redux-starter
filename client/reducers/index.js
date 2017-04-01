import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import items from './item';
import topstories from './topstories';
import loading from './loading';

export default combineReducers({
  items,
  topstories,
  loading,
  router: routerReducer,
});
