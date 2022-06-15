import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { signInWithGoogle, signUpWithEmail } from '../services/firebase';
import '../styles/auth.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isDisabled = name === '' || email === '' || password === '';

  useEffect(() => {
    document.title = 'Registro';
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();

    //TODO: check if user is already registered in db.

    try {
      await signUpWithEmail(name, email, password);
    } catch (error) {
      setPassword('');
      setError(error.message);
    }
  };

  return (
    <div className='sign-up-page'>
      {error && (
        <div className='error-group'>
          <FontAwesomeIcon icon={faCircleExclamation} />
          <p className='error-message'>{error}</p>
        </div>
      )}

      <form onSubmit={handleSignUp} method='POST' className='form'>
        <div className='control-group'>
          <input
            type='text'
            onChange={(e) => setName(e.target.value)}
            value={name}
            id='name'
          />
          <label htmlFor='name'>Nombre:</label>
        </div>
        <div className='control-group'>
          <input
            type='text'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            id='email'
          />
          <label htmlFor='email'>Correo electrónico:</label>
        </div>
        <div className='control-group'>
          <input
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            id='password'
          />
          <label htmlFor='password'>Contraseña:</label>
        </div>

        <button
          disabled={isDisabled}
          type='submit'
          className='form-btn'
          style={{ opacity: isDisabled ? '0.5' : '1' }}
        >
          Registrarse
        </button>
      </form>

      <div className='btn-switch'>
        <Link to='/'>Iniciar sesión</Link>
      </div>

      <div className='btn-social' onClick={signInWithGoogle}>
        Ingresar con Google
      </div>
    </div>
  );
};

export default SignUpPage;
