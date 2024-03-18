import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PackageTypeItem = ({ link, children }) => {
  return (
    <Link
      to={"/packages/" + link}
      className="group flex size-40 flex-col items-center justify-center gap-2 rounded border border-blue-400 bg-blue-500 text-white shadow-md"
    >
      {children}
    </Link>
  );
};

PackageTypeItem.propTypes = {
  link: PropTypes.string,
  children: PropTypes.node,
};

export default PackageTypeItem;
