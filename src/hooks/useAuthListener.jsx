import { useState, useEffect } from 'react'
import { auth } from '../lib/firebase'

export function useAuthListener () {
  const [ authUser, setAuthUser ] = useState( null )

  useEffect(() => {
    const listener = auth.onAuthStateChanged( ( user ) => {
      user
        ? setAuthUser( user )
        : setAuthUser( null )
    } )

    return () => listener()
  }, [ auth ] )

  return { authUser }
}
