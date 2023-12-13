import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import { AuthProvider } from './contexts/auth'
import { useAuthListener } from './hooks/useAuthListener'

import LoginPage from './pages/loginPage'
import SignUpPage from './pages/signUpPage'
import { DashboardPage } from './pages/dashboardPage'

export function App () {
  const { authUser } = useAuthListener()

  return (
    <AuthProvider>
      <div id='app'>
        <Router>
          <Routes>
            <Route
              path='/'
              element={
                authUser
                  ? <Navigate to='/tasks' replace />
                  : <Navigate to='/login' replace />
              }
            />
            <Route
              exact
              path='/login'
              element={
                !authUser
                  ? <LoginPage />
                  : <Navigate to='/tasks' replace />
              }
            />
            <Route
              exact
              path='/signup'
              element={
                !authUser
                  ? <SignUpPage />
                  : <Navigate to='/' replace />
              }
            />
            <Route
              exact
              path='/tasks'
              element={
                authUser
                  ? <DashboardPage />
                  : <Navigate to='/login' replace />
              }
            />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  )
}
