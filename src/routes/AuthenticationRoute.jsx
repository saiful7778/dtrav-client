import useAuth from "@/hooks/useAuth";
import { Spinner } from "keep-react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const AuthenticationRoute = ({ children }) => {
  const { user, loader } = useAuth();
  if (loader) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Spinner color="info" size="xl" />
      </div>
    );
  }

  if (!user) {
    return children;
  }

  return <Navigate to="/" />;
};

AuthenticationRoute.propTypes = {
  children: PropTypes.node,
};

export default AuthenticationRoute;
