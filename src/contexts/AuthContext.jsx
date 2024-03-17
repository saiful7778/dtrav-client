import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
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

  const register = (email, password) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    setLoader(true);
    return signOut(auth);
  };

  console.log(token);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (currentUser) => {
      setLoader(false);
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
              setToken(data.token);
            }
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        setToken(null);
      }
    });
    return () => {
      unSub();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ loader, user, token, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthContextProvider;
