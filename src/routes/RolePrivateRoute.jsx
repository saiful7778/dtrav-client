import useAuth from "@/hooks/useAuth";
import { adminNavlinks } from "@/staticData";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";

const RolePrivateRoute = ({ children }) => {
  const location = useLocation();
  const { userDetails } = useAuth();

  const checkRole = adminNavlinks.find((ele) => {
    if (ele.path === location.pathname) {
      if (ele.accessRole === userDetails?.role) {
        return true;
      } else {
        return false;
      }
    }
  });

  if (checkRole) {
    return children;
  }
  return <Navigate to="/admin/profile" />;
};

RolePrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default RolePrivateRoute;
