import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoApp from './components/Todo/TodoApp';
import Login from './components/Auth/Login';

const App = () => {
  return (
    <div id='app'>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route exact path='/tareas' element={<TodoApp />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
