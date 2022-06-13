import { db, auth } from '../lib/config';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  doc,
  onSnapshot,
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
    const docRef = doc(db, 'users', user.uid);
    const snapshot = await getDoc(docRef);

    if (!snapshot.data()) {
      console.log('no existe');
      setGoogleUser(user);
    }
  } catch (error) {
    console.log(error.message);
  }
};

// create Google user in db
const setGoogleUser = (user) => {
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

// log in with email and password
export const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error.message);
  }
};

// register with email and password
export const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        console.log(userCredential.user);
        setLocalUser(userCredential.user, name);
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};

// create Local user in db
const setLocalUser = (user, name) => {
  const docRef = doc(db, 'users', user.uid);

  setDoc(docRef, {
    auth: {
      name,
      authProvider: 'local',
      email: user.email,
      photo: null,
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
