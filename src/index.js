import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import FirebaseContext from './contexts/firebase';
import { auth, db } from './lib/firebase';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FirebaseContext.Provider value={{ auth, db }}>
    <App />
  </FirebaseContext.Provider>
);
