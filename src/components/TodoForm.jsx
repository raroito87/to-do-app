import React, { useState, useContext } from 'react';
import { TodosContext } from '../context/TodosContext';


function TodoForm() {
  const { todos, setTodos, idForTodo, setIdForTodo } = useContext(TodosContext);
  const [todoInput, setTodoInput] = useState('');

  function handleInput(event) {
    setTodoInput(event.target.value);
  }

  function addTodo(event) {
    event.preventDefault();

    // handle white space case. do not add a new todo.
    if (todoInput.trim().length === 0) {
      return;
    }

    setTodos([
      ...todos,
      {
        id: idForTodo,
        title: todoInput,
        isComplete: false,
      },
    ]);

    //setIdForTodo(idForTodo + 1) // we want a callback
   setIdForTodo(prevIdforTodo => prevIdforTodo + 1);

    setTodoInput('');
  }

  return (
    <form action="#" onSubmit={addTodo}>
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
