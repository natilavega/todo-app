import React, { useState, useEffect } from 'react';
import { auth } from '../../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, Link } from 'react-router-dom';
import {
  signInWithGoogle,
  logInWithEmailAndPassword,
} from '../../services/firebase';
import '../../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) return navigate('/tareas');
  }, [user]);

  const login = () => {
    logInWithEmailAndPassword(email, password);
  };

  return (
    <>
      <h6 className='page-title'>Inicio de Sesión</h6>

      <div className='form-group'>
        <div className='input-group login-group'>
          <label>Correo electrónico:</label>
          <input
            type='text'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className='input-group login-group'>
          <label>Contraseña:</label>
          <input
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button className='login-btn' onClick={login}>
          Iniciar Sesión
        </button>

        <div className='login-switch'>
          ¿No tienes cuenta? <Link to='/registro'>Registrarse</Link>
        </div>
      </div>

      <button className='login-btn-social' onClick={signInWithGoogle}>
        Ingresar con Google
      </button>
    </>
  );
};

export default Login;
