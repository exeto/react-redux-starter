import { handleActions } from 'redux-actions';

import * as types from '../constants/todos';

const initialState = [{
  id: 0,
  text: 'Use Redux',
  completed: false,
}];

export default handleActions({
  [types.ADD_TODO]: (state, action) => (
    [{
      id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
      text: action.payload,
      completed: false,
    }, ...state]
  ),

  [types.DELETE_TODO]: (state, action) => state.filter(todo => todo.id !== action.payload),

  [types.EDIT_TODO]: (state, action) => (
    state.map(todo => (
      todo.id === action.payload.id
        ? { ...todo, text: action.payload.text }
        : todo
    ))
  ),

  [types.COMPLETE_TODO]: (state, action) => (
    state.map(todo => (
      todo.id === action.payload
        ? { ...todo, completed: !todo.completed }
        : todo
    ))
  ),

  [types.COMPLETE_ALL]: state => {
    const areAllMarked = state.every(todo => todo.completed);

    return state.map(todo => (
      {
        ...todo,
        completed: !areAllMarked,
      }
    ));
  },

  [types.CLEAR_COMPLETE]: state => (
    state.filter(todo => todo.completed === false)
  ),
}, initialState);
