import { useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/addTodo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const AddTodo = ({ handleSubmit }) => {
  const [content, setContent] = useState('');

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    content.trim();
    if (content) {
      handleSubmit(content);
    }
    setContent('');
  };

  return (
    <section>
      <form onSubmit={onSubmit} method='POST' className='form add-todo'>
        <div className='control-group'>
          <label htmlFor='add-todo'>New Task:</label>
          <div className='group_row'>
            <input
              type='text'
              name='add-todo'
              onChange={handleChange}
              value={content}
            />
            <button type='submit'>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default AddTodo;

AddTodo.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
