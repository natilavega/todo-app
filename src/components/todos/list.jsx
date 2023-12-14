import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons'

export function TodosList ( { todos, removeTodo } ) {
  return (
    <>
      { todos?.length > 0 ? (
        <ul
          className='flex flex-col gap-1.5 mt-6 mx-auto w-full md:w-2/4'
        >
          { todos.map( ( todo ) => (
            <li
              key={ todo.todoId }
              onClick={ () => removeTodo( todo ) }
              className='bg-slate-400 dark:bg-slate-600 rounded-md p-2.5 cursor-pointer'
            >
              { todo.todo }
            </li>
          ) ) }
        </ul>
      ) : (
        <div
          className='flex flex-col items-center gap-4 mt-20 mx-auto w-full md:w-2/4 opacity-50'
        >
          <div>
            <FontAwesomeIcon
              icon={ faClipboardCheck }
              className='text-5xl'
            />
          </div>
          <p>No hay tareas pendientes.</p>
        </div>
      ) }
    </>
  )
}

TodosList.propTypes = {
  todos: PropTypes.array.isRequired,
  removeTodo: PropTypes.func.isRequired,
}
