import cn from "@/lib/cn";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
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
        <li>
          <NavLink
            className={({ isActive }) =>
              cn("block rounded px-4 py-1", isActive && "bg-gray-300")
            }
            to="/admin/bookings"
          >
            My Bookings
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              cn("block rounded px-4 py-1", isActive && "bg-gray-300")
            }
            to="/admin/wishlist"
          >
            My Wishlist
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
