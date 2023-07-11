/**
 * FIrebase function for signin in*/

import firebase_app from "./firebase";
import {
  signInWithEmailAndPassword,
  getAuth,
  browserLocalPersistence,
  setPersistence,
  signOut,
} from "firebase/auth";

const auth = getAuth(firebase_app);
const signIn = async (email, password) => {
  let result = null,
    error = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }
  return { result, error };
};

const handleSignOut = async () => {
  let result = null,
    error = null;

  try {
    result = await signOut(auth);
  } catch (e) {
    error = e;
  }
  return {
    result,
    error,
  };
};
export { signIn, handleSignOut };
