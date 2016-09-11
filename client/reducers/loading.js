import { handleActions } from 'redux-actions';

import { types as item } from '../actions/item';
import { types as topstories } from '../actions/topstories';

const request = state => state + 1;
const success = state => (state > 0 ? state - 1 : 0);

export default handleActions({
  [item.fetchRequest]: request,
  [item.fetchSuccess]: success,
  [item.fetchFailure]: success,

  [topstories.fetchAllRequest]: request,
  [topstories.fetchAllSuccess]: success,
  [topstories.fetchAllFailure]: success,
}, 0);
