import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, Link } from 'react-router-dom';
import {
  signInWithGoogle,
  registerWithEmailAndPassword,
} from '../../firebase/api';
import './Login.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) return navigate('/tareas');
  }, [user]);

  const register = () => {
    if (!name) alert('Por favor ingresa tu nombre.');
    registerWithEmailAndPassword(name, email, password);
  };

  return (
    <>
      <h6 className='page-title'>Registro</h6>

      <div className='form-group'>
        <div className='input-group login-group'>
          <label>Nombre:</label>
          <input
            type='text'
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
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

        <button className='login-btn' onClick={register}>
          Registrarse
        </button>

        <div className='login-switch'>
          ¿Ya tienes cuenta? <Link to='/'>Iniciar sesión</Link>
        </div>
      </div>

      <button className='login-btn-social' onClick={signInWithGoogle}>
        Ingresar con Google
      </button>
    </>
  );
};

export default Register;
