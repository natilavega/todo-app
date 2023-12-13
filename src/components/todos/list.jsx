import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons'
import '../../styles/todos.css'

export function TodosList ( { todos, removeTodo } ) {
  return (
    <section>
      { todos?.length > 0 ? (
        <ul id='list'>
          { todos.map( ( todo ) => (
            <li
              className='list-todo fadeIn'
              key={ todo.todoId }
              onClick={ () => removeTodo( todo ) }
            >
              { todo.todo }
            </li>
          ) ) }
        </ul>
      ) : (
        <div className='list-empty fadeIn'>
          <div>
            <FontAwesomeIcon icon={ faClipboardCheck } />
          </div>
          <p>No hay tareas pendientes.</p>
        </div>
      ) }
    </section>
  )
}

TodosList.propTypes = {
  todos: PropTypes.array.isRequired,
  removeTodo: PropTypes.func.isRequired,
}
