import { combineReducers } from 'redux';

import posts from './posts/reducer';

export default {
  entities: combineReducers({
    posts,
  }),
};
