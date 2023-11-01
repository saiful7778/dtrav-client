import { Link } from "react-router-dom";
import siteLogo from "../assets/img/logo.png";

const SiteLogo = () => {
  return (
    <Link to="/" className="flex gap-1 items-center">
      <img className="w-10 h-10" src={siteLogo} alt="" />
      <div>
        <h3 className="text-3xl font-extrabold leading-5">
          <span className="text-primary">D</span>TRAV
        </h3>
        <p className="text-sm text-gray-500">A touring plan</p>
      </div>
    </Link>
  );
};

export default SiteLogo;
