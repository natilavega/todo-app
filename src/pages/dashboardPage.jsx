import { useEffect } from 'react'
import { useUser } from '../hooks/useUser'
import { useTodos } from '../hooks/useTodos'
import { Header } from '../components/header'
import { AddTodo } from '../components/todos/addTodo'
import { TodosList } from '../components/todos/list'
import Loading from '../components/loading'

export default function DashboardPage () {
  const { user, error } = useUser()
  const { todos, addTodo, removeTodo } = useTodos( { user } )

  useEffect( () => {
    document.title = 'Tareas — TooDo'
  }, [] )

  return (
    <section
      className='flex flex-col min-h-screen container mx-auto'
    >
      { !user.uid
        ? <Loading />
        : ( error
          ? <div className='flex justify-center items-center h-full'>
            { error }
          </div>
          : (
            <>
              <Header name={ user.name } photo={ user.photo } />
              <AddTodo addTodo={ addTodo } />
              <TodosList todos={ todos } removeTodo={ removeTodo } />
            </>
          )
        )
      }
    </section>
  )
}
