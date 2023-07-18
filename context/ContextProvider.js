/**
 * Global context provider
 * */

import React from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "../src/firebase";
import { getProfile } from "../src/firebase-func";
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

  const getProfileData = async(id) => {
    const {error, result} = await getProfile(id);
    if(result){
      if(result?.exists()){
        setUser({
          ...user,
          profile: result?.data()
        })
      }
    }
  } 

  React.useEffect(() => {
    if(user?.uid){
      getProfileData(user?.uid);
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
  return <context.Provider value={value}>{children}</context.Provider>;
};



// const useContextProvider = React.useContext(context);
const useContextProvider = () => {
  return React.useContext(context);
};

export { ContextProvider, useContextProvider };
