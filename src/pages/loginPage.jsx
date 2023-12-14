import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useField } from '../hooks/useField'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import '../styles/auth.css'

export function LoginPage () {
  const { login, googleLogin, error } = useAuth()

  const email = useField( { type: 'email' } )
  const password = useField( { type: 'password' } )

  const isDisabled = email.value === '' || password.value === ''

  useEffect( () => {
    document.title = 'Login — TooDo'
  }, [] )

  const handleSubmit = async ( event ) => {
    event.preventDefault()
    login( email.value, password.value )
  }

  return (
    <div className='login-page'>
      { error && (
        <div className='error-group'>
          <FontAwesomeIcon icon={ faCircleExclamation } />
          <p className='error-message'>{ error }</p>
        </div>
      )}

      <form onSubmit={ handleSubmit } className='auth'>
        <div className='control-group'>
          <input
            { ... email }
            id='email'
          />
          <label htmlFor='email'>Email Address:</label>
        </div>
        <div className='control-group'>
          <input
            { ... password }
            id='password'
          />
          <label htmlFor='password'>Password:</label>
        </div>
        <button
          disabled={ isDisabled }
          type='submit'
          className='form-btn'
          style={ { opacity: isDisabled ? '0.5' : '1' } }
        >
          Login
        </button>
      </form>

      <div className='btn-switch'>
        <Link to='/signup'>Sign Up</Link>
      </div>

      <div className='btn-social' onClick={ googleLogin }>
        Sign In with Google
      </div>
    </div>
  )
}
