import { db } from './config';
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';

// collection ref
const colRef = collection(db, 'todos');

// realtime collection data
export const getData = (callback) => {
  const unsub = onSnapshot(colRef, callback);
  return unsub;
};

// add docs
export const addData = (id, content) => {
  const docRef = doc(db, 'todos', id);

  setDoc(docRef, {
    content,
  });
};

// delete docs
export const deleteData = (id) => {
  const docRef = doc(db, 'todos', id);

  deleteDoc(docRef);
};
