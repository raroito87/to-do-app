import '../reset.css';
import '../App.css';
import NoTodos from './NoTodos';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import useLocalStorage from '../hooks/useLocalStorage';
import { useRef, useEffect, useState } from 'react';
import { toHaveFocus } from '@testing-library/jest-dom/dist/matchers';
import { TodosContext } from '../context/TodosContext';

function App() {
  const [name, setName] = useLocalStorage('name', '');
  const nameInputEl = useRef(null);
  const [todos, setTodos] = useLocalStorage('todos', []);

  const [idForTodo, setIdForTodo] = useLocalStorage('idForTodo', 1);

  const [filter, setFilter] = useState('all');

  
  function todosFiltered() {
    if (filter == 'all') {
      return todos;
    } else if (filter == 'active') {
      return todos.filter(todo => !todo.isComplete);
    } else if (filter == 'completed') {
      return todos.filter(todo => todo.isComplete);
    }
  }

  useEffect(() => {
    // console.log('use effect running')
    nameInputEl.current.focus();

    // setName(JSON.parse(localStorage.getItem('name')) ?? '')

    return function cleanUp() {
      console.log('cleanin up');
    };
  }, []); // when the compnent mounts

  function handleNameInput(event) {
    setName(event.target.value);
    // localStorage.setItem('name', JSON.stringify(event.target.value))
  }

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        idForTodo,
        setIdForTodo,
        todosFiltered,
        filter,
        setFilter,
      }}
    >
      <div className="todo-app-container">
        <div className="todo-app">
          <div className="name-container">
            <h2>What is your name?</h2>
            <form action="#">
              <input
                type="text"
                ref={nameInputEl}
                className="todo-input"
                placeholder="what is your name?"
                value={name}
                onChange={handleNameInput}
              ></input>
            </form>
            {name && <p className="name-label">Hello, {name}</p>}
          </div>
          <TodoForm />

          {todos.length > 0 ? (
            <TodoList
            />
          ) : (
            <NoTodos />
          )}
        </div>
      </div>
    </TodosContext.Provider>
  );
}

export default App;
