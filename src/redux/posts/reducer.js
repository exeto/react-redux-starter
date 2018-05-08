import { handleActions } from 'redux-actions';

import indexBy from '@/utils/indexBy';
import { FIND_SUCCESS, FIND_RECORD_SUCCESS } from './types';

const initialState = {};

const reducerMap = {
  [FIND_SUCCESS]: (state, { payload }) => ({
    ...state,
    ...indexBy(item => item.id, payload),
  }),

  [FIND_RECORD_SUCCESS]: (state, { payload }) => ({
    ...state,
    [payload.id]: payload,
  }),
};

export default handleActions(reducerMap, initialState);
