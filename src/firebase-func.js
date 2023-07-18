/**
 * FIrebase function for signin in*/

import firebase_app from "./firebase";
import {
  signInWithEmailAndPassword,
  getAuth,
  signOut,
  sendPasswordResetEmail,
  confirmPasswordReset,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updateEmail,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

const auth = getAuth(firebase_app);
const db = getFirestore(firebase_app);

export const signIn = async (email, password) => {
  let result = null,
    error = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }
  return { result, error };
};

export const getData = async (collection, id) => {
  let docRef = doc(db, collection, id);
  let result = null,
    error = null;
  try {
    result = await getDoc(docRef);
  } catch (e) {
    error = e;
  }
  return {
    result,
    error,
  };
};

export const updateData = async (collection, id, data) => {
  let docRef = doc(db, collection, id);
  let result = null,
    error = null;
  try {
    result = await updateDoc(docRef, data);
  } catch (e) {
    error = e;
  }
  return {
    result,
    error,
  };
};

export const getProfile = async (id) => {
  let docRef = doc(db, "users", id);
  let result = null,
    error = null;
  try {
    result = await getDoc(docRef);
  } catch (e) {
    error = e;
  }
  return {
    result,
    error,
  };
};

// Change primary email
export const handleConfirmChangeEmail = async (email) => {
  let result = null,
    error = null;
  try {
    result = await updateEmail(auth.currentUser, email);
  } catch (e) {
    error = e;
  }

  return {
    result,
    error,
  };
};

/**
 * This is used to re-authenticate the user for critical updates such as email updates and password change*/
export const handleVerifyCredentials = async (email, password) => {
  let result = null,
    error = null;
  try {
    const credentials = EmailAuthProvider.credential(email, password);
    result = await reauthenticateWithCredential(auth.currentUser, credentials);
  } catch (e) {
    error = e;
  }
  return {
    result,
    error,
  };
};

export const handleResetPassword = async (email) => {
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
export const handleConfirmResetPassword = async (code, newPassword) => {
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

export const handleSignOut = async () => {
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
