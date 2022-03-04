import { db, auth } from './config';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  query,
  where,
  getDocs,
  getDoc,
  onSnapshot,
} from 'firebase/firestore';

// Google provider
const googleProvider = new GoogleAuthProvider();

// sign in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    // check if user is already registered in db
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      setUser(user);
    }
  } catch (error) {
    console.log(error.message);
  }
};

// create new user in db
const setUser = (user) => {
  const docRef = doc(db, 'users', user.uid);

  setDoc(docRef, {
    name: user.displayName,
    authProvider: 'google',
    email: user.email,
    photo: user.photoURL,
  });
};

// get current user data
export const getUserData = async (id) => {
  const userRef = doc(db, 'users', id);

  const data = await getDoc(userRef);
  return data;
};

// log out
export const logout = () => {
  signOut(auth);
};

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
