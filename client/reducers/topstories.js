import { handleActions } from 'redux-actions';

import { types } from '../actions/topstories';

export default handleActions({
  [types.fetchAllSuccess]: (state, action) => action.payload,
}, []);
