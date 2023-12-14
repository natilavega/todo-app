import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useField } from '../hooks/useField'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'

export default function LoginPage () {
  const { login, googleLogin, error } = useAuth()

  const email = useField( { type: 'email' } )
  const password = useField( { type: 'password' } )

  const isDisabled = email.value === '' || password.value === ''

  useEffect( () => {
    document.title = 'Iniciar Sesión — TooDo'
  }, [] )

  const handleSubmit = async ( event ) => {
    event.preventDefault()
    login( email.value, password.value )
  }

  return (
    <section
      className='flex flex-col justify-center items-center min-h-screen container mx-auto'
    >
      { error && (
        <div className='flex flex-row'>
          <FontAwesomeIcon
            icon={ faCircleExclamation }
            className='text-red-800 dark:text-red-400'
          />
          <p
            className='text-sm font-semibold ml-3.5 text-red-800 dark:text-red-400'
          >
            { error }
          </p>
        </div>
      )}

      <form
        onSubmit={ handleSubmit }
        className='mt-6 mb-10 mx-auto w-full md:w-1/3'
      >
        <div className='flex flex-col gap-1.5 mb-4'>
          <label
            htmlFor='email'
            className='text-sm text-slate-500'
          >
            Correo Electrónico:
          </label>
          <input
            { ... email }
            id='email'
            className='bg-transparent border border-slate-500 rounded-md p-2.5'
          />
        </div>
        <div className='flex flex-col gap-1.5 mb-6'>
          <label
            htmlFor='password'
            className='text-sm text-slate-500'
          >
            Contraseña:
          </label>
          <input
            { ... password }
            id='password'
            className='bg-transparent border border-slate-500 rounded-md p-2.5'
          />
        </div>
        <button
          disabled={ isDisabled }
          className='bg-slate-800 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold uppercase tracking-wider w-full py-3 rounded-md cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed'
        >
          Iniciar Sesión
        </button>
      </form>

      <div
        className='text-slate-500 hover:text-slate-900 dark:hover:text-white font-semibold mb-2.5'
      >
        <Link to='/signup'>Registrarse</Link>
      </div>

      <button
        onClick={ googleLogin }
        className='text-slate-500 hover:text-slate-900 dark:hover:text-white font-semibold'
      >
        Ingresar con Google
      </button>
    </section>
  )
}
