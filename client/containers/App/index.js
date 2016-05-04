import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as TodoActions from '../../actions/todos';
import Header from '../../components/Header';
import MainSection from '../../components/MainSection';
import style from './style.scss';

const App = ({ todos, actions, children }) => (
  <div className={style.normal}>
    <Header addTodo={actions.addTodo} />
    <MainSection todos={todos} actions={actions} />
    {children}
  </div>
);

App.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  children: PropTypes.object,
};

export default connect(
  state => ({ todos: state.todos }),
  dispatch => ({ actions: bindActionCreators(TodoActions, dispatch) })
)(App);
