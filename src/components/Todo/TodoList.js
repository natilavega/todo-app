import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons';

const TodoList = ({ todos, deleteTodo }) => {
  const todoList = todos.length ? (
    todos.map((todo) => {
      return (
        <ul id='todo' className='fadeIn' key={todo.id}>
          <li
            onClick={() => {
              deleteTodo(todo.id);
            }}
          >
            {todo.content}
          </li>
        </ul>
      );
    })
  ) : (
    <div id='empty' className='fadeIn'>
      <div>
        <FontAwesomeIcon icon={faClipboardCheck} />
      </div>
      <p>No hay tareas pendientes.</p>
    </div>
  );

  return <div>{todoList}</div>;
};

export default TodoList;
