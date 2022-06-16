import { useState } from 'react';
import PropTypes from 'prop-types';
import { addTodo, deleteTodo } from '../../services/firebase';
import AddTodo from './addTodo';
import TodosList from './list';

const Todos = ({ uid, allTodos }) => {
  const [todos, setTodos] = useState(allTodos);

  const handleSubmit = (newTodo) => {
    let todoId = Date.now().toString();

    setTodos([...todos, { todoId, todo: newTodo }]);
    addTodo(uid, todoId, newTodo);
  };

  const handleDelete = (todo) => {
    deleteTodo(uid, todo.todoId, todo.todo);

    let updateTodos = todos.filter((item) => item.todoId !== todo.todoId);
    setTodos(updateTodos);
  };

  return (
    <>
      <AddTodo handleSubmit={handleSubmit} />
      <TodosList todos={todos} handleDelete={handleDelete} />
    </>
  );
};

export default Todos;

Todos.propTypes = {
  uid: PropTypes.string.isRequired,
  allTodos: PropTypes.array.isRequired,
};
