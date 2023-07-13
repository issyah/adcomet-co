/**
 * Global context provider
 * */

import React from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "../src/firebase";
const context = React.createContext();

const auth = getAuth(firebase_app);
const ContextProvider = ({ children }) => {
  const [user, setUser] = React.useState();
  const [alert, setAlert] = React.useState({
    open: false,
    status: "",
    message: "",
  });
  const [loading, setLoading] = React.useState(false);

  let value = {
    user,
    setUser,
    alert,
    setAlert,
    loading,
    setLoading,
  };
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);
  return <context.Provider value={value}>{children}</context.Provider>;
};

// const useContextProvider = React.useContext(context);
const useContextProvider = () => {
  return React.useContext(context);
};

export { ContextProvider, useContextProvider };
