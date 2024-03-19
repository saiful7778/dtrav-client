import useAuth from "@/hooks/useAuth";
import AdminDropDown from "@/shared/AdminDropDown";
import Sidebar from "@/shared/Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const { userDetails } = useAuth();
  return (
    <>
      <AdminDropDown role={userDetails?.role} />
      <div className="flex gap-2">
        <aside>
          <Sidebar role={userDetails?.role} />
        </aside>
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
