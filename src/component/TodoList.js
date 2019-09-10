import React from 'react'

const TodoList = ({ todos, deleteTodo }) => {

    const todoList = todos.length ? (
        todos.map(todo => {
            return (
                <div key={todo.id}>
                    <span onClick={() => { deleteTodo(todo.id) }}>{todo.content}</span>
                </div>
            )
        })
    ) : (
            <p>No hay tareas pendientes.</p>
        );

    return (
        <div>
            {todoList}
        </div>
    )
}

export default TodoList
