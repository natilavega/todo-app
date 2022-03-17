import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/config';
import { signInWithGoogle } from '../../firebase/api';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) return navigate('/tareas');
  }, [user]);

  return (
    <>
      <h6 className='page-title'>Iniciar Sesión</h6>

      <button onClick={signInWithGoogle}>Ingresar con Google</button>
    </>
  );
};

export default Login;
