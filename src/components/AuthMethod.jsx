import { AiOutlineGithub, AiOutlineGoogle } from "react-icons/ai";
import { BiLogoFacebookCircle } from "react-icons/bi";

const AuthMethod = () => {
  return (
    <div className="flex flex-wrap justify-center gap-2 items-center mt-4">
      <button
        type="button"
        className="flex justify-center items-center gap-1 rounded-md border border-green-600 text-green-600 px-3 py-2 divide-x divide-green-600"
      >
        <AiOutlineGoogle size={20} />
        <span className="pl-1">Google</span>
      </button>
      <button
        type="button"
        className="flex justify-center items-center gap-1 rounded-md border border-blue-600 text-blue-600 px-3 py-2 divide-x divide-blue-600"
      >
        <BiLogoFacebookCircle size={20} />
        <span className="pl-1">Facebook</span>
      </button>
      <button
        type="button"
        className="flex justify-center items-center gap-1 rounded-md border border-black text-black px-3 py-2 divide-x divide-black"
      >
        <AiOutlineGithub size={20} />
        <span className="pl-1">Github</span>
      </button>
    </div>
  );
};

export default AuthMethod;
