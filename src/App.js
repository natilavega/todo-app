import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import UserContext from './contexts/user';
import useAuthListener from './hooks/useAuthListener';
import TodoApp from './components/Todo/TodoApp';
import LoginPage from './pages/loginPage';
import SignUpPage from './pages/signUpPage';

const App = () => {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <div id='app'>
        <Router>
          <Routes>
            <Route
              path='/'
              element={
                user ? (
                  <Navigate to='/tareas' replace />
                ) : (
                  <Navigate to='/inicio-de-sesion' replace />
                )
              }
            />
            <Route
              exact
              path='/inicio-de-sesion'
              element={
                !user ? <LoginPage /> : <Navigate to='/tareas' replace />
              }
            />
            <Route
              exact
              path='/registro'
              element={!user ? <SignUpPage /> : <Navigate to='/' replace />}
            />
            <Route
              exact
              path='/tareas'
              element={
                user ? <TodoApp /> : <Navigate to='/inicio-de-sesion' replace />
              }
            />
          </Routes>
        </Router>
      </div>
    </UserContext.Provider>
  );
};

export default App;
