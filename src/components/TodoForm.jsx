import React, { useState } from 'react';
import PropTypes from 'prop-types';

TodoForm.proptype = {
    addTodo: PropTypes.func.isRequired,  
};

function TodoForm(props) {
  const [todoInput, setTodoInput] = useState('');

  function handleInput(event) {
    setTodoInput(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    //handle white space case. do not add a new todo.
    if (todoInput.trim().length == 0) {
      return;
    }

    props.addTodo(todoInput)

    setTodoInput('');
  }

  return (
    <form action="#" onSubmit={handleSubmit}>
      <input
        type="text"
        value={todoInput}
        onChange={handleInput}
        className="todo-input"
        placeholder="What do you need to do?"
      />
    </form>
  );
}

export default TodoForm;
