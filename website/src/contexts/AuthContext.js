import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, getAuth } from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  const signUp = (email, password) => {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
  };
  return <AuthContext.Provider>{children}</AuthContext.Provider>;
};
