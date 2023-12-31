/**
 * FIrebase function*/

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
  createUserWithEmailAndPassword,
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
  addDoc,
  onSnapshot,
  FieldValue,
  increment,
  deleteDoc,
  writeBatch,
  orderBy,
  limit,
  getCountFromServer,
} from "firebase/firestore";

import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  uploadString,
} from "firebase/storage";
import { bytesToMegaBytes } from "./common";

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
      lastSeen: Timestamp.fromDate(new Date()),
    });
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

// fetch creatives assets via companyId
export const getCreativesByCompany = async (id) => {
  const collectionCreatives = collection(db, "creatives");
  let result, error;
  try {
    const q = query(collectionCreatives, where("company", "==", id));
    result = await getDocs(q);
  } catch (e) {
    error = e;
  }
  return {
    result,
    error,
  };
};

export const deleteCreatives = async (item) => {
  const { id, path, company, size, thumbPath } = item;

  if (!id) {
    return {
      error: "ID document is required to delete the creative asset.",
    };
  }
  if (!path) {
    return {
      error: "Missing path reference to delete file.",
    };
  }
  let result, error;
  let fileRef = ref(storage, path);
  try {
    await deleteObject(fileRef);
  } catch (e) {
    error = e.message;
    return { error };
  }
  if (thumbPath) {
    let thumbRef = ref(storage, thumbPath);
    try {
      await deleteObject(thumbRef);
    } catch (e) {
      error = e.message;
      return { error };
    }
  }
  const batch = writeBatch(db);
  // delete creative reference from creatives document
  const creativeRef = doc(db, "creatives", id);
  batch.delete(creativeRef);
  const companyRef = doc(db, "companies", company);
  batch.update(companyRef, {
    "creativeStorage.currentSize": increment(-size),
  });

  try {
    result = await batch.commit();
  } catch (e) {
    error = e.message;
    return {
      error,
    };
  }
  return { result, error };
};

// upload creatives
export const uploadCreatives = async (id, file, thumbnail) => {
  if (!file) {
    return;
  }
  const name = file.name;
  const path = `creatives/${id}/${name}`;
  const creativePath = ref(storage, path);
  const metadata = {
    contentType: file.type,
    name: name,
    uploadedBy: auth.currentUser?.email,
  };
  let result, error, downloadUrl;
  try {
    result = await uploadBytes(creativePath, file, metadata);
  } catch (e) {
    error = e;
  }
  if (result?.ref) {
    downloadUrl = await getDownloadURL(result?.ref);
  }
  let thumbnailResult, thumbnailUrl;
  const thumbnailPath = `creatives/${id}/thumb_${name}`;
  const thumbRef = ref(storage, thumbnailPath);
  if (thumbnail) {
    // upload a thumbnail using putstring
    try {
      thumbnailResult = await uploadString(thumbRef, thumbnail, "data_url");
    } catch (e) {
      error = e;
      return { error };
    }
  }
  if (thumbnailResult?.ref) {
    thumbnailUrl = await getDownloadURL(thumbnailResult?.ref);
  }

  // add in new creatives collection
  const batch = writeBatch(db);
  const creativeRef = doc(collection(db, "creatives"));
  let data = {
    url: downloadUrl,
    company: id,
    ...metadata,
    path: path,
    created: Timestamp.fromDate(new Date()),
    size: bytesToMegaBytes(result?.metadata?.size),
    id: creativeRef.id,
  };
  if (thumbnailUrl) {
    data["thumbUrl"] = thumbnailUrl;
    data["thumbPath"] = thumbnailPath;
    data["size"] =
      data["size"] + bytesToMegaBytes(thumbnailResult?.metadata?.size);
  }
  batch.set(creativeRef, data);
  // lastly add the storage size to the company page
  const companyRef = doc(db, "companies", id);
  batch.update(companyRef, {
    "creativeStorage.currentSize": increment(data["size"]),
  });
  try {
    await batch.commit();
  } catch (e) {
    error = e;
  }
  return {
    result,
    error,
    downloadUrl,
    data,
  };
};

// upload user avatar
export const uploadAvatar = async (id, file) => {
  const avatarRef = ref(storage, `avatars/${id}`);
  let result, error, downloadUrl;
  try {
    result = await uploadBytes(avatarRef, file);
  } catch (e) {
    error = e;
  }
  if (result?.ref) {
    downloadUrl = await getDownloadURL(result?.ref);
  }
  // need the download url to be saved on the users account
  const userRef = doc(db, "users", id);
  try {
    result = await updateDoc(userRef, {
      avatar: downloadUrl,
    });
  } catch (e) {
    error = e;
  }
  return {
    result,
    error,
    downloadUrl,
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

// get locations by company Id
export const getLocationsByCompany = async (id) => {
  const collectionLocations = collection(db, "locations");
  let result,
    error = null;
  try {
    const q = query(collectionLocations, where("companyId", "==", id));
    result = await getDocs(q);
  } catch (error) {
    error = e;
  }

  return {
    result,
    error,
  };
};

/**
 * Store the adspace location details into adspace collections
 * 1. We need to split the name into an array nameIndex
 **/
export const createAdSpaceLocation = async (data) => {
  const { name, companyId } = data;
  const nameArray = name.toLowerCase().split(" ");
  let docRef, error, companyRef, companyData;
  try {
    const cRef = doc(db, "companies", companyId);
    companyRef = await getDoc(cRef);
    companyData = companyRef.exists() ? companyRef.data() : {};
  } catch (e) {
    return {
      error: e,
    };
  }
  try {
    docRef = await addDoc(collection(db, "adspaces"), {
      ...data,
      nameArray: nameArray,
      created: Timestamp.fromDate(new Date()),
    });
  } catch (e) {
    return {
      error: e,
    };
  }
  // success,
  return {
    result: docRef,
    error,
  };
};

/**
 * Upload media for adspace */

export const UploadMediaForAdSpace = async (id, name, files) => {
  // use docRef ID to store media
  // build the downloadUrl here
  if (!files.length) {
    return {
      error: {
        message: "No files added",
      },
    };
  }
  let media = [];
  const promise = new Promise((resolve, reject) => {
    files.forEach((item, index) => {
      const file = item.file;
      const path = `adspaces/${id}/${name}-${index}`;
      const storeRef = ref(storage, path);
      const uploadTask = uploadBytesResumable(storeRef, file);
      // let media = [];
      uploadTask.on(
        "state_changed",
        (snapshot) => { },
        (error) => {
          reject(error.message);
        },
        () => {
          // success, save to media array
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            media.push({
              path: path,
              src: downloadUrl,
              name: `${name}-${index}`,
            });

            // check if all media has been uploaded
            if (media.length == files.length) {
              // update the doc with media object
              const batch = writeBatch(db);
              const docRef = doc(db, "adspaces", id);
              batch.update(docRef, {
                media: media,
              });
              resolve(batch.commit());
            }
          });
        }
      );
    });
  });
  return promise;
};

// get list of adspaces by id
export const getAdSpacesByCompany = async ({ id, status, search, order }) => {
  const collectionRef = collection(db, "adspaces");
  let result, error;
  const ord = order || "created";
  try {
    let baseQuery = query(collectionRef, where("companyId", "==", id));
    if (status !== "all") {
      baseQuery = query(baseQuery, where("status", "==", status));
    }
    if (search && search.length) {
      let lowerCasedSearch = search.toLowerCase();
      const searchArr = lowerCasedSearch.split(" ");
      baseQuery = query(
        baseQuery,
        where("nameArray", "array-contains-any", searchArr)
      );
    }
    // sorting
    baseQuery = query(baseQuery, orderBy(ord, "desc"), limit(25));
    result = await getDocs(baseQuery);
  } catch (e) {
    error = e;
  }

  return {
    result,
    error,
  };
};

// get list of adspace that is live
export const getLiveAdSpaces = async ({ sort, search }) => {
  const collectionRef = collection(db, "adspaces");
  let result, error;
  try {
    let baseQuery = query(collectionRef, where("status", "==", "live"));
    if (search && search.length) {
      const lowerCasedSearch = search.toLowerCase();
      const searchArr = lowerCasedSearch.split(" ");
      baseQuery = query(
        baseQuery,
        where("nameArray", "array-contains-any", searchArr)
      );
    }
    // sorting
    baseQuery = query(baseQuery, orderBy(sort, "desc"), limit(25));
    result = await getDocs(baseQuery);
  } catch (e) {
    error = e;
  }
  return {
    result,
    error,
  };
};

// count total live ad spaces 
export const getCountLiveAdSpaces = async ({ sort, search }) => {
  const collectionRef = collection(db, 'adspaces');
  let result, error;
  try {
    let baseQuery = query(collectionRef, where("status", "==", "live"));
    if (search && search.length) {
      const lowerCasedSearch = search.toLowerCase();
      const searchArr = lowerCasedSearch.split(" ");
      baseQuery = query(
        baseQuery,
        where("nameArray", "array-contains-any", searchArr)
      );
    }
    result = await getCountFromServer(baseQuery);

  } catch (e) {
    error = e;
  }
  return {
    result,
    error
  };
}
