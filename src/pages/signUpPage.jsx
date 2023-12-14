import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { signInWithGoogle, signUpWithEmail } from '../services/firebase'
import { useField } from '../hooks/useField'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import '../styles/auth.css'

export function SignUpPage () {
  const [ error, setError ] = useState( '' )
  
  const name = useField( { type: 'text' } )
  const email = useField( { type: 'email' } )
  const password = useField( { type: 'password' } )

  const isDisabled = name.value === '' || email.value === '' || password.value === ''

  useEffect( () => {
    document.title = 'Sign Up — TooDo'
  }, [] )

  const handleSignUp = async ( e ) => {
    e.preventDefault()

    //TODO: check if user is already registered in db.

    try {
      await signUpWithEmail( name, email, password )
    } catch ( error ) {
      setError( error.message )
    }
  }

  return (
    <div className='sign-up-page'>
      {error && (
        <div className='error-group'>
          <FontAwesomeIcon icon={ faCircleExclamation } />
          <p className='error-message'>{ error }</p>
        </div>
      )}

      <form onSubmit={ handleSignUp } className='auth'>
        <div className='control-group'>
          <input
            { ...name }
            id='name'
          />
          <label htmlFor='name'>Name:</label>
        </div>
        <div className='control-group'>
          <input
            { ...email }
            id='email'
          />
          <label htmlFor='email'>Email Address:</label>
        </div>
        <div className='control-group'>
          <input
            { ...password }
            id='password'
          />
          <label htmlFor='password'>Password:</label>
        </div>
        <button
          disabled={ isDisabled }
          className='form-btn'
          style={ { opacity: isDisabled ? '0.5' : '1' } }
        >
          Sign Up
        </button>
      </form>

      <div className='btn-switch'>
        <Link to='/'>Login</Link>
      </div>

      <div className='btn-social' onClick={ signInWithGoogle }>
        Sign In with Google
      </div>
    </div>
  )
}
