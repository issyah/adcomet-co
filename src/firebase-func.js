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
  updatePassword,
  sendEmailVerification,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";

import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";

const auth = getAuth(firebase_app);
const db = getFirestore(firebase_app);
const storage = getStorage(firebase_app);
export const signIn = async (email, password) => {
  let result = null,
    error = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }
  // update the lastSeen on users collection
  if (result) {
    const uid = result?.user?.uid;
    const docRef = doc(db, "users", uid);
    updateDoc(docRef, {
      'lastSeen' : Timestamp.fromDate(new Date())
    });
    // we don't do anything here
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

// fetch current users in the company

export const getUsersInCompany = async (id) => {
  const userRef = collection(db, "users");
  let result, error;
  try {
    const q = query(userRef, where("company.id", "==", id));
    result = await getDocs(q);
  } catch (e) {
    error = e;
  }
  return {
    result,
    error,
  };
};

// upload logo for company profile
export const uploadCompanyLogo = async (id, file) => {
  // delete the current logo first
  const companyPath = ref(storage, `companies/${id}/logo`);
  let result, error, downloadUrl;
  try {
    result = await uploadBytes(companyPath, file);
  } catch (e) {
    error = e;
  }

  if (result?.ref) {
    downloadUrl = await getDownloadURL(result?.ref);
  }
  // update the file path on the fly
  const docRef = doc(db, "companies", id);
  const updatePath = await updateDoc(docRef, {
    "photo.url": downloadUrl,
  });

  return {
    result,
    error,
    downloadUrl,
  };
};

// handle resend email verification for a logged in user only
export const handleResendVerificationEmail = async () => {
  let result, error;
  try {
    result = await sendEmailVerification(auth.currentUser);
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

export const getCompanyById = async (id) => {
  let docRef = (doc, "companies", id);
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

// update new password. This happens after we verify his current password via handleVerifyCredentials
export const handleUpdateNewPassword = async (newPass) => {
  let result = null,
    error = null;
  try {
    result = await updatePassword(auth.currentUser, newPass);
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
