import { createContext, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import PropTypes from "prop-types";
import { auth } from "@/lib/firebase";

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  return (
    <AuthContext.Provider value={{ user, register }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthContextProvider;
