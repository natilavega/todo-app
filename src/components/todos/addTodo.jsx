import PropTypes from 'prop-types'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import '../../styles/addTodo.css'

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
    <section>
      <form onSubmit={ handleSubmit } className='form add-todo'>
        <div className='control-group'>
          <label htmlFor='new-todo'>Nueva Tarea:</label>
          <div className='group_row'>
            <input
              name='new-todo'
              onChange={ handleChange }
              value={ newTodo }
            />
            <button type='submit'>
              <FontAwesomeIcon icon={ faPlus } />
            </button>
          </div>
        </div>
      </form>
    </section>
  )
}

AddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
}
