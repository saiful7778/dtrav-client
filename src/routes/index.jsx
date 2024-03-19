import AdminLayout from "@/layouts/AdminLayout";
import Authentication from "@/layouts/Authentication";
import MainLayout from "@/layouts/MainLayout";
import ErrorPage from "@/pages/ErrorPage";
import Profile from "@/pages/admin/Profile";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import About from "@/pages/public/About";
import Home from "@/pages/public/Home";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Booking from "@/pages/admin/Booking";
import Wishlist from "@/pages/admin/Wishlist";
import Package from "@/pages/public/Package";
import Packages from "@/pages/public/Packages";
import PackageType from "@/pages/public/PackageType";
import AuthenticationRoute from "./AuthenticationRoute";
import RolePrivateRoute from "./RolePrivateRoute";
import AssignTour from "@/pages/admin/guide/AssignTour";
import AddPackage from "@/pages/admin/superAdmin/AddPackage";
import ManageUser from "@/pages/admin/superAdmin/ManageUser";
import Guide from "@/pages/public/Guide";
import Community from "@/pages/public/Community";
import Blog from "@/pages/public/Blog";
import Contact from "@/pages/public/Contact";

export const route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/community",
        element: <Community />,
      },
      {
        path: "/blogs",
        element: <Blog />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/packages",
        element: <Packages />,
      },
      {
        path: "/packages/:packageType",
        element: <PackageType />,
      },
      {
        path: "/package/:packageID",
        element: <Package />,
      },
      {
        path: "/guide/:guideID",
        element: <Guide />,
      },
      {
        path: "/authentication",
        element: (
          <AuthenticationRoute>
            <Authentication />
          </AuthenticationRoute>
        ),
        children: [
          {
            path: "register",
            element: <Register />,
          },
          {
            path: "login",
            element: <Login />,
          },
        ],
      },
      {
        path: "/admin",
        element: (
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        ),
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "bookings",
            element: (
              <RolePrivateRoute>
                <Booking />
              </RolePrivateRoute>
            ),
          },
          {
            path: "wishlist",
            element: (
              <RolePrivateRoute>
                <Wishlist />
              </RolePrivateRoute>
            ),
          },
          {
            path: "assign_tours",
            element: (
              <RolePrivateRoute>
                <AssignTour />
              </RolePrivateRoute>
            ),
          },
          {
            path: "add_package",
            element: (
              <RolePrivateRoute>
                <AddPackage />
              </RolePrivateRoute>
            ),
          },
          {
            path: "manage_users",
            element: (
              <RolePrivateRoute>
                <ManageUser />
              </RolePrivateRoute>
            ),
          },
        ],
      },
    ],
  },
]);
