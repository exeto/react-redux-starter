import React, { PropTypes } from 'react';

import TodoTextInput from '../TodoTextInput';

function handleSave(text, addTodo) {
  if (text.length) {
    addTodo(text);
  }
}

const Header = ({ addTodo }) => (
  <header>
    <h1>Todos</h1>
    <TodoTextInput
      newTodo
      onSave={text => handleSave(text, addTodo)}
      placeholder="What needs to be done?"
    />
  </header>
);

Header.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default Header;
