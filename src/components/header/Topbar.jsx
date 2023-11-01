import { Link } from "react-router-dom";
import { BsFacebook, BsGithub, BsLinkedin } from "react-icons/bs";

const Topbar = () => {
  return (
    <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-300">
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
      <div className="flex items-center gap-4">
        <Link to="/sign_in" className="btn-pri btn-sm" type="button">
          sign in
        </Link>
        <Link to="/sign_up" className="btn-outline btn-sm" type="button">
          sign up
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
