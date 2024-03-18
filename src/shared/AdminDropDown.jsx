import { Button, Dropdown } from "keep-react";
import { NavLink } from "react-router-dom";
import { AiOutlineMenuFold } from "react-icons/ai";
import { adminNavlinks } from "@/staticData";
import PropTypes from "prop-types";
import cn from "@/lib/cn";

const AdminDropDown = ({ role }) => {
  return (
    <div className="sm:hidden">
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
          {adminNavlinks?.map(
            (ele, idx) =>
              ele.accessRole === role && (
                <Dropdown.Item className="p-1" key={"addd" + idx}>
                  <NavLink
                    className={({ isActive }) =>
                      cn(
                        "block w-full rounded px-4 py-1",
                        isActive && "bg-gray-300",
                      )
                    }
                    to={ele.path}
                  >
                    {ele.navName}
                  </NavLink>
                </Dropdown.Item>
              ),
          )}
        </Dropdown.List>
      </Dropdown>
    </div>
  );
};

AdminDropDown.propTypes = {
  role: PropTypes.string,
};

export default AdminDropDown;
