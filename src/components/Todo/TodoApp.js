import React, { useState, useEffect } from 'react';
import { getData, addData, deleteData } from '../../firebase/api';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import './TodoApp.css';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);

  const getTodos = () => {
    getData((querySnapshot) => {
      const data = [];
      querySnapshot.docs.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setTodos(data);
    });
  };

  useEffect(() => {
    getTodos();
  }, []);
  console.log(todos);

  const addTodo = (newTodo) => {
    let id = Date.now().toString();

    addData(id, newTodo.content);
  };

  const deleteTodo = (id) => {
    deleteData(id);
  };

  return (
    <div id='app'>
      <AddTodo addTodo={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} />
    </div>
  );
};

export default TodoApp;
