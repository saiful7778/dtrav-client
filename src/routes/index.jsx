import MainLayout from "@/layouts/MainLayout";
import ErrorPage from "@/pages/ErrorPage";
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
    ],
  },
]);
