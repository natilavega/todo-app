import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../lib/firebase';
import {
  getUserData,
  logout,
  addData,
  deleteData,
} from '../../services/firebase';
import AddTodo from './AddTodo';
import '../../styles/TodoApp.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignOutAlt,
  faClipboardCheck,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

const TodoApp = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [uid, setUid] = useState('');
  const [userData, setUserData] = useState({});
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCurrentUser = async () => {
    setIsLoading(true);

    try {
      await getUserData(user.uid, (result) => {
        if (result.data()) {
          setUserData(result.data().auth);
          setTodos(result.data().todos);
          setUid(result.id);
        }
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (!user) return navigate('/');

    fetchCurrentUser();
  }, [user]);

  const addTodo = (newTodo) => {
    let todoId = Date.now().toString();

    addData(uid, todoId, newTodo);
  };

  const showTodos = todos.map((todo) => {
    return (
      <li
        className='list-todo fadeIn'
        key={todo.id}
        onClick={() => deleteData(uid, todo)}
      >
        {todo.todo}
      </li>
    );
  });

  return (
    <>
      {isLoading ? (
        <div className='loading'>Cargando...</div>
      ) : (
        <>
          <button className='logout' onClick={logout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
        </>
      )}
    </>
  );
};

export default TodoApp;
