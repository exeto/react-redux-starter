import { handleActions } from 'redux-actions';

import { types } from '../actions/item';

export default handleActions({
  [types.fetchSuccess]: (state, action) => (
    [...state, action.payload]
  ),
}, []);
