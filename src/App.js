import React, { Component } from 'react'
import TodoList from './component/TodoList'
import AddTodo from './component/AddTodo'

import './App.css'

class App extends Component {
  state = {
    todos: []
  }

  deleteTodo = (id) => {
    const todos = this.state.todos.filter(todo => {
      return todo.id !== id
    });

    this.setState({
      todos
    });
  }

  addTodo = (todo) => {
    todo.id = Math.random();
    let todos = [...this.state.todos, todo];
    this.setState({
      todos
    })
  }

  render() {
    return (
      <div>
        <AddTodo addTodo={this.addTodo} />
        <TodoList todos={this.state.todos} deleteTodo={this.deleteTodo} />
      </div>
    );
  }
}

export default App
