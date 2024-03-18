import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import PropTypes from "prop-types";
import { auth } from "@/lib/firebase";
import axiosBase from "@/lib/config/axios.config";

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);
  const [token, setToken] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  const register = (email, password) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const googleAuth = () => {
    setLoader(true);
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const login = (email, password) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    setLoader(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        axiosBase
          .post("/authentication/login", {
            name: currentUser.displayName,
            email: currentUser.email,
            userID: currentUser.uid,
          })
          .then(({ data }) => {
            if (data.success) {
              setToken(data?.token);
              setUserDetails(data?.user);
            }
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        setToken(null);
        setUserDetails(null);
      }
      setLoader(false);
    });
    return () => {
      unSub();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loader,
        user,
        userDetails,
        googleAuth,
        token,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthContextProvider;
