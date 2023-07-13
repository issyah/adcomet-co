/**
 * FIrebase function for signin in*/

import firebase_app from "./firebase";
import {
  signInWithEmailAndPassword,
  getAuth,
  signOut,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from "firebase/auth";

import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const auth = getAuth(firebase_app);
const db = getFirestore(firebase_app);

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

const getData = async (collection, id) => {
  let docRef = doc(db, collection, id);
  let result = null,
    error = null;
  try {
    const result = await getDoc(docRef);
  } catch (e) {
    error = e;
  }
  return {
    result,
    error,
  };
};

const handleResetPassword = async (email) => {
  let result = null,
    error = null;
  try {
    result = await sendPasswordResetEmail(auth, email);
  } catch (e) {
    error = e;
  }
  return {
    result,
    error,
  };
};
// This is after the user has clicked on the link and wants to create a new passsword
const handleConfirmResetPassword = async (code, newPassword) => {
  let result = null,
    error = null;
  try {
    result = await confirmPasswordReset(auth, code, newPassword);
  } catch (e) {
    error = e;
  }
  return {
    result,
    error,
  };
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
export {
  signIn,
  handleSignOut,
  getData,
  handleResetPassword,
  handleConfirmResetPassword,
};
