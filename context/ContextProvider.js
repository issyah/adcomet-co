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
import jwt from "jsonwebtoken";
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
  const [accessToken, setAccessToken] = React.useState(null);
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
    accessToken,
  };

  const getProfileData = async (id) => {
    setLoading(true);
    const { error, result } = await getProfile(id);
    if (error) {
      return;
    }
    if (result?.exists()) {
      const data = result?.data();
      let accessToken = jwt.sign(
        {
          companyRole: data?.company?.userType,
          companyId: data?.company?.id,
          role: data?.role,
        },
        process.env.NEXT_PUBLIC_JWT_KEY,
        {
          algorithm: "HS256",
        }
      );
      setAccessToken(accessToken);
      setUser({
        ...user,
        profile: data,
      });
      // set company id and name for quick reference
      setCompany(result?.data()?.company);
    }
    setLoading(false);
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
        setAccessToken(null);
        setUser(null);
        setCompany(null);
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
  }, [company?.id]);

  return <context.Provider value={value}>{children}</context.Provider>;
};

// const useContextProvider = React.useContext(context);
const useContextProvider = () => {
  return React.useContext(context);
};

export { ContextProvider, useContextProvider };
