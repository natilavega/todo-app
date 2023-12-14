import PropTypes from 'prop-types'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export function AddTodo ( { addTodo } ) {
  const [ newTodo, setNewTodo ] = useState( '' )

  const handleChange = ( event ) => {
    const input = event.target.value

    if ( input.startsWith( ' ' ) ) return
    setNewTodo( input )
  }

  const handleSubmit = ( event ) => {
    event.preventDefault()

    addTodo( newTodo )
    setNewTodo( '' )
  }

  return (
    <form
      onSubmit={ handleSubmit }
      className='flex flex-col justify-between gap-1.5 my-6 mx-auto w-full md:w-2/4'
    >
      <label
        htmlFor='new-todo'
        className='text-sm'
      >
        Nueva Tarea:
      </label>
      <div className='flex flex-row gap-1.5 w-full'>
        <input
          name='new-todo'
          onChange={ handleChange }
          value={ newTodo }
          className='bg-transparent border border-slate-500 rounded-md p-2.5 grow'
        />
        <button
          className='bg-slate-800 dark:bg-white text-white dark:text-slate-900 border border-slate-800 dark:border-white py-2.5 px-3.5 rounded-md cursor-pointer'
        >
          <FontAwesomeIcon icon={ faPlus } />
        </button>
      </div>
    </form>
  )
}

AddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
}
