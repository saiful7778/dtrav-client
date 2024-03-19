import { Popover } from "keep-react";
import { NavLink } from "react-router-dom";
import { AiOutlineMenuFold } from "react-icons/ai";
import { adminNavlinks } from "@/staticData";
import PropTypes from "prop-types";
import cn from "@/lib/cn";

const AdminDropDown = ({ role }) => {
  return (
    <div className="sm:hidden">
      <Popover placement="bottom-end">
        <Popover.Action>
          <AiOutlineMenuFold size={20} />
        </Popover.Action>
        <Popover.Content className="z-20 flex flex-col items-center gap-3 rounded-xl bg-white p-4">
          <div>
            <NavLink
              className={({ isActive }) =>
                cn("block w-full rounded px-4 py-1", isActive && "bg-gray-300")
              }
              to="/admin/profile"
            >
              My Profile
            </NavLink>
          </div>
          {adminNavlinks?.map(
            (ele, idx) =>
              ele.accessRole === role && (
                <div key={"addd" + idx}>
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
                </div>
              ),
          )}
        </Popover.Content>
      </Popover>
    </div>
  );
};

AdminDropDown.propTypes = {
  role: PropTypes.string,
};

export default AdminDropDown;
