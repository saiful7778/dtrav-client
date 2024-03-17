import { Button, Dropdown } from "keep-react";
import { NavLink } from "react-router-dom";
import { AiOutlineMenuFold } from "react-icons/ai";
import cn from "@/lib/cn";

const AdminDropDown = () => {
  return (
    <div className="md:hidden">
      <Dropdown
        className="w-fit p-0"
        action={
          <Button className="bg-pri hover:bg-pri/80" shape="icon" size="sm">
            <AiOutlineMenuFold size={20} />
          </Button>
        }
      >
        <Dropdown.List>
          <Dropdown.Item className="p-1">
            <NavLink
              className={({ isActive }) =>
                cn("block w-full rounded px-4 py-1", isActive && "bg-gray-300")
              }
              to="/admin/profile"
            >
              My Profile
            </NavLink>
          </Dropdown.Item>
          <Dropdown.Item className="p-0">
            <NavLink
              className={({ isActive }) =>
                cn("block w-full rounded px-4 py-1", isActive && "bg-gray-300")
              }
              to="/admin/bookings"
            >
              My Bookings
            </NavLink>
          </Dropdown.Item>
        </Dropdown.List>
      </Dropdown>
    </div>
  );
};

export default AdminDropDown;
