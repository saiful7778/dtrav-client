import { adminNavlinks } from "@/staticData";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import cn from "@/lib/cn";

const Sidebar = ({ role }) => {
  return (
    <nav className="border-r border-gray-400 pr-2 max-sm:hidden">
      <ul className="space-y-2">
        <li>
          <NavLink
            className={({ isActive }) =>
              cn("block rounded px-4 py-1", isActive && "bg-gray-300")
            }
            to="/admin/profile"
          >
            My Profile
          </NavLink>
        </li>
        {adminNavlinks?.map(
          (ele, idx) =>
            ele.accessRole === role && (
              <li key={"sd" + idx}>
                <NavLink
                  className={({ isActive }) =>
                    cn("block rounded px-4 py-1", isActive && "bg-gray-300")
                  }
                  to={ele.path}
                >
                  {ele.navName}
                </NavLink>
              </li>
            ),
        )}
      </ul>
    </nav>
  );
};

Sidebar.propTypes = {
  role: PropTypes.string,
};

export default Sidebar;
