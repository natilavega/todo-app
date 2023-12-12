import { createContext } from 'react'
import { useAuthListener } from '../hooks/useAuthListener'

export const AuthContext = createContext( null )

export function AuthProvider ( { children } ) {
  const { authUser } = useAuthListener()

  return (
    <AuthContext.Provider value={ { authUser } }>
      { children }
    </AuthContext.Provider>
  )
}
