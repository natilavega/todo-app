import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../contexts/auth'
import { getUserById } from '../services/firebase'

export function useUser () {
  const { authUser } = useContext( AuthContext )
  const [ user, setUser ] = useState( {} )
  const [ error, setError ] = useState( null )
  
  useEffect( () => {
    if ( !authUser ) return

    getUser()
  }, [ authUser ] )

  const getUser = async () => {
    try {
      setError( null )

      const newUser = await getUserById( authUser.uid )
      setUser( newUser )
    } catch ( error ) {
      setError( 'Error al obtener los datos del usuario.' )
    }
  }

  return { user, error }
}
