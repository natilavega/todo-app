import { useEffect, useState } from 'react'
import { addToDatabase, removeFromDatabase } from '../services/firebase'

export function useTodos ( { user } ) {
  const [ todos, setTodos ] = useState( [] )

  useEffect( () => {
    if ( !user ) return
    
    setTodos( user.todos )
  }, [ user ])
  
  const addTodo = ( newTodo ) => {
    let todoId = Date.now().toString()

    setTodos( [ ...todos, { todoId, todo: newTodo } ] )
    addToDatabase( user.uid, todoId, newTodo )
  }

  const removeTodo = ( todo ) => {
    removeFromDatabase( user.uid, todo.todoId, todo.todo )

    let updateTodos = todos.filter( ( item ) => item.todoId !== todo.todoId )
    setTodos( updateTodos )
  }

  return { todos, addTodo, removeTodo }
}
