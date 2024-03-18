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
        path: "/packages",
        element: <Packages />,
      },
      {
        path: "/package/:packageID",
        element: <Package />,
      },
      {
        path: "/authentication",
        element: <Authentication />,
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
            element: <Booking />,
          },
          {
            path: "wishlist",
            element: <Wishlist />,
          },
        ],
      },
    ],
  },
]);
