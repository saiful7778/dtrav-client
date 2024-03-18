import { FcGoogle } from "react-icons/fc";
import PropTypes from "prop-types";

const SocialAuth = ({ handleGoogle }) => {
  return (
    <div className="my-4 flex items-center gap-2">
      <button
        onClick={handleGoogle}
        className="flex w-full items-center justify-center gap-3 rounded border border-green-600 p-2 font-bold text-green-600"
        type="button"
      >
        <FcGoogle size={20} />
        <span>Google</span>
      </button>
    </div>
  );
};

SocialAuth.propTypes = {
  handleGoogle: PropTypes.func,
};

export default SocialAuth;
