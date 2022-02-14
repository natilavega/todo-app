import React, { useState, useEffect } from 'react';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import db from './component/firebase/firebaseConfig';
import TodoList from './component/TodoList';
import AddTodo from './component/AddTodo';

import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  console.log(todos);

  async function getData() {
    const querySnapshot = await getDocs(collection(db, 'todos'));
    setTodos(
      querySnapshot.docs.map((doc) => ({
        id: doc.id,
        content: doc.data().content,
      }))
    );
  }

  function deleteTodo(id) {
    const deleteData = async () => {
      await deleteDoc(doc(db, 'todos', id));
    };

    deleteData();
    getData();
  }

  function addTodo(newTodo) {
    let id = Date.now().toString();

    const addData = async () => {
      await setDoc(doc(db, 'todos', id), {
        content: newTodo.content,
      });
    };

    addData();
    getData();
  }

  return (
    <div id='app'>
      <AddTodo addTodo={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} />
    </div>
  );
};

export default App;
