import AdminDropDown from "@/shared/AdminDropDown";
import Sidebar from "@/shared/Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <AdminDropDown />
      <div className="flex gap-2">
        <aside>
          <Sidebar />
        </aside>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
