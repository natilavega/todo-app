import React, { useState } from 'react';
import '../../styles/TodoApp.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const AddTodo = ({ addTodo }) => {
  const [content, setContent] = useState('');

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    content.trim();
    if (content) {
      addTodo(content);
    }
    setContent('');
  };

  return (
    <div>
      <form className='add-todo' onSubmit={handleSubmit}>
        <div className='input-group'>
          <label>Nueva tarea:</label>
          <div className='add-todo_row'>
            <input type='text' onChange={handleChange} value={content} />
            <button type='submit'>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
