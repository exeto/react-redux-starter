import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import items from './item';
import topstories from './topstories';
import loading from './loading';

export default combineReducers({
  routing,
  items,
  topstories,
  loading,
});
