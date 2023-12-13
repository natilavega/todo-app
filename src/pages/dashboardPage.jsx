import { useEffect } from 'react'
import { useUser } from '../hooks/useUser'
import { Header } from '../components/header'
import Todos from '../components/todos/todos'

export function DashboardPage () {
  const { user, error } = useUser()

  useEffect( () => {
    document.title = 'Tasks — TooDo'
  }, [] )

  return (
    <>
      { !user.uid
        ? <div className='loading'>Loading...</div>
        : ( error
          ? <div className='error'>{ error }</div>
          : (
            <>
              <Header name={ user.name } photo={ user.photo } />
              <Todos uid={ user.uid } allTodos={ user.todos } />
            </>
          )
        )
      }
    </>
  )
}
