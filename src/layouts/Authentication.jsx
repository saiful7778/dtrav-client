import { Outlet } from "react-router-dom";

const Authentication = () => {
  return (
    <div className="mx-auto w-full max-w-xs rounded border border-gray-300 p-4 shadow">
      <Outlet />
    </div>
  );
};

export default Authentication;
