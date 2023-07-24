/**
 * Global context provider
 * */

import React from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "../src/firebase";
import {
  getProfile,
  updateData,
  getData,
  getCurrentStorage,
} from "../src/firebase-func";
import { doc, getFirestore, onSnapshot, Timestamp } from "firebase/firestore";
const context = React.createContext();

const auth = getAuth(firebase_app);
const db = getFirestore(firebase_app);
const ContextProvider = ({ children }) => {
  const [user, setUser] = React.useState();
  const [alert, setAlert] = React.useState({
    open: false,
    status: "",
    message: "",
  });
  const [company, setCompany] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [storage, setStorage] = React.useState({
    currentSize: 0,
    maxSize: 0,
  });
  let value = {
    user,
    setUser,
    alert,
    setAlert,
    loading,
    setLoading,
    company,
    storage,
    setStorage,
  };

  const getProfileData = async (id) => {
    const { error, result } = await getProfile(id);
    if (result) {
      if (result?.exists()) {
        setUser({
          ...user,
          profile: result?.data(),
        });
        // set company id and name for quick reference
        setCompany(result?.data()?.company);
      }
    }
  };

  React.useEffect(() => {
    if (user?.uid) {
      getProfileData(user?.uid);
      // update his lastSeen
      updateData("users", user?.uid, {
        lastSeen: Timestamp.fromDate(new Date()),
      });
    }
  }, [user?.uid]);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      if (usr) {
        // pull in his profile information for campaign id
        // getProfileData(user, user?.uid)
        setUser(usr);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    if (company.id) {
      const unsubscribe = onSnapshot(
        doc(db, "companies", company?.id),
        (doc) => {
          if (doc.exists()) {
            setStorage(doc.data().creativeStorage);
          }
        }
      );
      return () => unsubscribe();
    }
  }, [company.id]);

  return <context.Provider value={value}>{children}</context.Provider>;
};

// const useContextProvider = React.useContext(context);
const useContextProvider = () => {
  return React.useContext(context);
};

export { ContextProvider, useContextProvider };
