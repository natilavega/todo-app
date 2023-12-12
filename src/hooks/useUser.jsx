import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../contexts/auth'
import { getUserById } from '../services/firebase'

export function useUser () {
  const { authUser } = useContext( AuthContext )
  const [ user, setUser ] = useState( {} )
  
  useEffect( () => {
    getUser()
  }, [ authUser ] )

  const getUser = () => {
    getUserById( authUser.uid )
      .then( ( user ) => setUser( user ) )
  }

  return { user }
}
