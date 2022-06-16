import { useEffect } from 'react';
import PropTypes from 'prop-types';
import useUser from '../hooks/useUser';
import Header from '../components/header';
import Todos from '../components/todos/todos';

const DashboardPage = ({ authUser }) => {
  const { user } = useUser(authUser.uid);

  useEffect(() => {
    document.title = 'Tareas';
  }, []);

  return (
    <>
      {!user.uid ? (
        <div className='loading'>Cargando...</div>
      ) : (
        <>
          <Header name={user.name} photo={user.photo} />
          <Todos uid={user.uid} allTodos={user.todos} />
        </>
      )}
    </>
  );
};

export default DashboardPage;

DashboardPage.propTypes = {
  authUser: PropTypes.object.isRequired,
};
