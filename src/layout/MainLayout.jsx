import { Outlet } from "react-router-dom";
import Navbar from "../components/header/Navbar";
import Topbar from "../components/header/Topbar";
import Banner from "../components/header/Banner";
import { useLocation } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();
  return (
    <div className="w-full relative min-h-screen overflow-x-hidden font-poppins text-gray-800 bg-gray-100">
      <header>
        <div className="container w-full md:w-90 mx-auto relative">
          <Topbar />
          <Navbar />
        </div>
        {location.pathname === "/" ? <Banner /> : ""}
      </header>
      <main className="container w-full md:w-90 mx-auto p-2 my-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
