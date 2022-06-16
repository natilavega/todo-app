import PropTypes from 'prop-types';
import '../../styles/todos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons';

const TodosList = ({ todos, handleDelete }) => {
  const handleList = todos.map((todo) => {
    return (
      <li
        className='list-todo fadeIn'
        key={todo.todoId}
        onClick={() => handleDelete(todo)}
      >
        {todo.todo}
      </li>
    );
  });

  return (
    <section>
      {todos.length > 0 ? (
        <ul id='list'>{handleList}</ul>
      ) : (
        <div className='list-empty fadeIn'>
          <div>
            <FontAwesomeIcon icon={faClipboardCheck} />
          </div>
          <p>No hay tareas pendientes.</p>
        </div>
      )}
    </section>
  );
};

export default TodosList;

TodosList.propTypes = {
  todos: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
