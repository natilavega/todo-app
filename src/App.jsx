import { lazy, Suspense } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import { AuthProvider } from './contexts/auth'
import { useAuthListener } from './hooks/useAuthListener'
import Loading from './components/loading'

const LoginPage = lazy( () => import( './pages/loginPage' ) )
const SignUpPage = lazy( () => import( './pages/signUpPage' ) )
const DashboardPage = lazy( () => import( './pages/dashboardPage' ) )

export function App () {
  const { authUser } = useAuthListener()

  return (
    <AuthProvider>
      <main
        className='bg-white dark:bg-slate-800 text-slate-900 dark:text-white'
      >
        <Router>
          <Suspense fallback={ <Loading /> }>
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
          </Suspense>
        </Router>
      </main>
    </AuthProvider>
  )
}
