import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex gap-2">
      <aside>sidebar</aside>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
