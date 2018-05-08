import { createAction } from 'redux-actions';

import { FIND_SUCCESS, FIND_RECORD_SUCCESS } from './types';

export const findSuccess = createAction(FIND_SUCCESS);
export const findRecordSuccess = createAction(FIND_RECORD_SUCCESS);
