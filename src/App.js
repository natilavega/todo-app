import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import AuthContext from './contexts/auth';
import useAuthListener from './hooks/useAuthListener';

import LoginPage from './pages/loginPage';
import SignUpPage from './pages/signUpPage';
import DashboardPage from './pages/dashboardPage';

const App = () => {
  const { user } = useAuthListener();

  return (
    <AuthContext.Provider value={{ user }}>
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
                user ? (
                  <DashboardPage authUser={user} />
                ) : (
                  <Navigate to='/inicio-de-sesion' replace />
                )
              }
            />
          </Routes>
        </Router>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
