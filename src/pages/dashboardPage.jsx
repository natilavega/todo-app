import { useEffect } from 'react'
import { useUser } from '../hooks/useUser'
import { useTodos } from '../hooks/useTodos'
import { Header } from '../components/header'
import { AddTodo } from '../components/todos/addTodo'
import { TodosList } from '../components/todos/list'

export function DashboardPage () {
  const { user, error } = useUser()
  const { todos, addTodo, removeTodo } = useTodos( { user } )

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
              <AddTodo addTodo={ addTodo } />
              <TodosList todos={ todos } removeTodo={ removeTodo } />
            </>
          )
        )
      }
    </>
  )
}
