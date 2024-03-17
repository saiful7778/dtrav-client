import Authentication from "@/layouts/Authentication";
import MainLayout from "@/layouts/MainLayout";
import ErrorPage from "@/pages/ErrorPage";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import About from "@/pages/public/About";
import Home from "@/pages/public/Home";
import { createBrowserRouter } from "react-router-dom";

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
    ],
  },
]);
