import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import UserContext from './contexts/user';
import useAuthListener from './hooks/useAuthListener';
import TodoApp from './components/Todo/TodoApp';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

const App = () => {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <div id='app'>
        <Router>
          <Routes>
            <Route path='/' element={user ? <TodoApp /> : <Login />} />
            <Route
              exact
              path='/registro'
              element={!user ? <Register /> : <Navigate to='/' replace />}
            />
          </Routes>
        </Router>
      </div>
    </UserContext.Provider>
  );
};

export default App;
