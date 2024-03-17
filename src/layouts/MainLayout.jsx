import Banner from "@/shared/Banner";
import Navbar from "@/shared/Navbar";
import { Spinner } from "keep-react";
import { Outlet, useLocation, useNavigation } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();
  const navigation = useNavigation();
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-gray-100 font-inter text-gray-800">
      <div className="container ">
        <header>
          <Navbar />
          {location.pathname === "/" && <Banner />}
        </header>
        <main className="mb-8 mt-14 p-2">
          {navigation.state === "loading" ? (
            <div className="flex h-[50vh] w-full items-center justify-center">
              <Spinner color="info" size="xl" />
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
