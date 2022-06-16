import { db, auth } from '../lib/firebase';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  doc,
  collection,
  where,
  query,
  onSnapshot,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';

// Google provider
const googleProvider = new GoogleAuthProvider();

// sign in with Google
export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;
  // check if user is already registered in db
  const docRef = doc(db, 'users', user.uid);
  const snapshot = await getDoc(docRef);

  if (!snapshot.data()) {
    setGoogleUser(user);
  }
};

// create Google user in db
const setGoogleUser = (user) => {
  const docRef = doc(db, 'users', user.uid);

  setDoc(docRef, {
    uid: user.uid,
    name: user.displayName,
    authProvider: 'google',
    email: user.email,
    photo: user.photoURL,
    todos: [],
  });
};

// log in with email and password
export const LoginWithEmail = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};

// sign up with email and password
export async function signUpWithEmail(name, email, password) {
  await createUserWithEmailAndPassword(auth, email, password).then(
    (userCredential) => {
      setLocalUser(userCredential.user, name);
    }
  );
}

// create Local user in db
const setLocalUser = (user, name) => {
  const docRef = doc(db, 'users', user.uid);

  setDoc(docRef, {
    uid: user.uid,
    name,
    authProvider: 'local',
    email: user.email,
    photo: null,
    todos: [],
  });
};

// get current user by ID
export async function getUserById(userId) {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('uid', '==', userId));
  const result = await getDocs(q);

  return result.docs[0].data();
}

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
export const addTodo = async (uid, todoId, content) => {
  const todoRef = doc(db, 'users', uid);

  await updateDoc(todoRef, {
    todos: arrayUnion({ todoId, todo: content }),
  });
};

// delete todo
export const deleteTodo = async (uid, todoId, todo) => {
  const todoRef = doc(db, 'users', uid);

  await updateDoc(todoRef, {
    todos: arrayRemove({ todoId, todo }),
  });
};
