import { db, auth } from './config';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import {
  collection,
  doc,
  query,
  where,
  onSnapshot,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';

// Google provider
const googleProvider = new GoogleAuthProvider();

// sign in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    // check if user is already registered in db
    //const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docRef = doc(db, 'users', user.uid);

    const snapshot = await getDoc(docRef);

    if (!snapshot.data()) {
      console.log('no existe');
      setUser(user);
    }
    /*if (docs.docs.length === 0) {
      setUser(user);
    }*/
  } catch (error) {
    console.log(error.message);
  }
};

// create new user in db
const setUser = (user) => {
  const docRef = doc(db, 'users', user.uid);

  setDoc(docRef, {
    auth: {
      name: user.displayName,
      authProvider: 'google',
      email: user.email,
      photo: user.photoURL,
    },
    todos: [],
  });
};

// get current user data in realtime
export const getUserData = (uid, callback) => {
  const userRef = doc(db, 'users', uid);

  const unsub = onSnapshot(userRef, callback);
  return unsub;
};

// log out
export const logout = () => {
  signOut(auth);
};

// add todo
export const addData = async (uid, todoId, content) => {
  const todoRef = doc(db, 'users', uid);

  await updateDoc(todoRef, {
    todos: arrayUnion({ id: todoId, todo: content }),
  });
};

// delete todo
export const deleteData = async (uid, todo) => {
  const todoRef = doc(db, 'users', uid);

  await updateDoc(todoRef, {
    todos: arrayRemove({ id: todo.id, todo: todo.todo }),
  });
};
