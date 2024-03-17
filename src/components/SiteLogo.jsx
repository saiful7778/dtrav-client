import { Link } from "react-router-dom";
import siteLogo from "../assets/img/logo.png";

const SiteLogo = () => {
  return (
    <Link to="/" className="flex items-center gap-1">
      <img className="size-8" src={siteLogo} alt="" />
      <div>
        <h3 className="text-xl font-extrabold leading-5">
          <span className="text-pri">D</span>TRAV
        </h3>
        <p className="text-xs text-gray-500">A tour guide</p>
      </div>
    </Link>
  );
};

export default SiteLogo;
