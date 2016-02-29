import { createAction } from 'redux-actions';

import * as types from '../constants/todos';

export const addTodo = createAction(types.ADD_TODO);
export const deleteTodo = createAction(types.DELETE_TODO);
export const editTodo = createAction(types.EDIT_TODO);
export const completeTodo = createAction(types.COMPLETE_TODO);
export const completeAll = createAction(types.COMPLETE_ALL);
export const clearCompleted = createAction(types.CLEAR_COMPLETE);
