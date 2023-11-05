import { Link } from "react-router-dom";
import { BsFacebook, BsGithub, BsLinkedin } from "react-icons/bs";
import { useContext } from "react";
import { AuthData } from "../../hooks/AuthContext";
import PropTypes from "prop-types";

const Topbar = () => {
  const { userData, logout } = useContext(AuthData);
  return (
    <div className="flex items-center justify-between py-3 px-2 border-b border-gray-300">
      <div className="flex items-center divide-x divide-gray-300">
        <Link
          className="text-gray-500 p-2 outline-focus"
          to="https://www.facebook.com/Saiful.Islam.Rafi.89"
          target="_blank"
        >
          <BsFacebook size={20} />
        </Link>
        <Link
          className="text-gray-500 p-2 outline-focus"
          to="https://github.com/saiful7778"
          target="_blank"
        >
          <BsGithub size={20} />
        </Link>
        <Link
          className="text-gray-500 p-2 outline-focus"
          to="https://www.linkedin.com/in/saiful-islam-0471b924b/"
          target="_blank"
        >
          <BsLinkedin size={20} />
        </Link>
      </div>
      <div className="flex items-center gap-2">
        {userData ? (
          <UserLogin user={userData} logOut={logout} />
        ) : (
          <>
            <Link to="/signin" className="btn-pri btn-sm">
              sign in
            </Link>
            <Link to="/signup" className="btn-outline btn-sm">
              sign up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

const UserLogin = ({ user, logOut }) => {
  return (
    <>
      <div className="avater">
        {user?.photoURL ? (
          <img src={user?.photoURL} alt="user image" />
        ) : (
          <span>{user?.displayName[0] + user?.displayName[1]}</span>
        )}
      </div>
      <button onClick={logOut} className="btn-pri btn-sm" type="button">
        sign out
      </button>
    </>
  );
};

UserLogin.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func,
};

export default Topbar;
