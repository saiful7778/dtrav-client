import useAuth from "@/hooks/useAuth";
import { adminNavlinks } from "@/staticData";
import { Spinner } from "keep-react";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";

const RolePrivateRoute = ({ children }) => {
  const location = useLocation();
  const { loader, userDetails } = useAuth();

  if (loader || !userDetails) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Spinner color="info" size="xl" />
      </div>
    );
  }

  const checkRole = adminNavlinks.find((ele) => {
    if (ele.path === location.pathname && ele.accessRole === userDetails.role) {
      return true;
    } else {
      return false;
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
