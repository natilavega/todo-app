import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { signInWithGoogle, LoginWithEmail } from '../services/firebase';
import '../styles/auth.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isDisabled = email === '' || password === '';

  useEffect(() => {
    document.title = 'Inicio de Sesión';
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await LoginWithEmail(email, password);
    } catch (error) {
      setPassword('');
      setError(error.message);
    }
  };

  const handleGoogleLogin = () => {
    try {
      signInWithGoogle();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='login-page'>
      {error && (
        <div className='error-group'>
          <FontAwesomeIcon icon={faCircleExclamation} />
          <p className='error-message'>{error}</p>
        </div>
      )}

      <form onSubmit={handleLogin} method='POST' className='form'>
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
          Iniciar Sesión
        </button>
      </form>

      <div className='btn-switch'>
        <Link to='/registro'>Registrarse</Link>
      </div>

      <div className='btn-social' onClick={handleGoogleLogin}>
        Ingresar con Google
      </div>
    </div>
  );
};

export default LoginPage;
