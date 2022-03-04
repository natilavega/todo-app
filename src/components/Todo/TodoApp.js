import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/config';
import { getUserData, logout } from '../../firebase/api';
/*import TodoList from './TodoList';
import AddTodo from './AddTodo';*/
import './TodoApp.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const TodoApp = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState({});

  const fetchCurrentUser = async () => {
    setIsLoading(true);

    try {
      const data = await getUserData(user.uid);
      if (data) {
        setUserData(data.data());
      }
    } catch (error) {
      console.log(error.message);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (!user) return navigate('/');

    fetchCurrentUser();
  }, [user]);

  return (
    <>
      {isLoading ? (
        <div className='loading'>Cargando...</div>
      ) : (
        <>
          <div className='profile'>
            <img src={userData.photo} className='profile-pic' />
            <div className='profile-name'>{userData.name}</div>
            <button className='logout' onClick={logout}>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
          </div>

          <p>Toodo</p>
        </>
      )}
    </>
  );

  /*const getTodos = () => {
    getData((querySnapshot) => {
      const data = [];
      querySnapshot.docs.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setTodos(data);
    });
  };

  const addTodo = (newTodo) => {
    let id = Date.now().toString();

    addData(id, newTodo.content);
  };

  const deleteTodo = (id) => {
    deleteData(id);
  };*/

  return (
    <>
      {isLoading ? (
        <div className='loading'>Cargando...</div>
      ) : (
        <>
          <div className='profile'>
            <img src={userData.photo} className='profile-pic' />
            <div className='profile-name'>{userData.name}</div>
            <button className='logout' onClick={logout}>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
          </div>

          <p>TooDo</p>
        </>
      )}
    </>
  );
};

export default TodoApp;
