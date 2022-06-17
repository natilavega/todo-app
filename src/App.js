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
                  <Navigate to='/tasks' replace />
                ) : (
                  <Navigate to='/login' replace />
                )
              }
            />
            <Route
              exact
              path='/login'
              element={!user ? <LoginPage /> : <Navigate to='/tasks' replace />}
            />
            <Route
              exact
              path='/signup'
              element={!user ? <SignUpPage /> : <Navigate to='/' replace />}
            />
            <Route
              exact
              path='/tasks'
              element={
                user ? (
                  <DashboardPage authUser={user} />
                ) : (
                  <Navigate to='/login' replace />
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
