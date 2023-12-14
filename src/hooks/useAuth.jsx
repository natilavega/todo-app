import { useState } from 'react'
import { signInWithGoogle, LoginWithEmail, signUpWithEmail } from '../services/firebase'

export function useAuth () {
  const [ error, setError ] = useState( '' )

  const login = async ( email, password ) => {
    try {
      await LoginWithEmail( email, password )
    } catch ( error ) {
      setError( error.message )
    }
  }

  const googleLogin = () => {
    try {
      signInWithGoogle()
    } catch ( error ) {
      setError( error.message )
    }
  }

  const signup = async ( name, email, password ) => {
    try {
      await signUpWithEmail( name, email, password )
    } catch ( error ) {
      setError( error.message )
    }
  }

  return { login, googleLogin, signup, error }
}
