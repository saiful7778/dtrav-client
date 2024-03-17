import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/style.css";
import { RouterProvider } from "react-router-dom";
import { route } from "@/routes";
import AuthContextProvider from "./contexts/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={route} />
    </AuthContextProvider>
  </React.StrictMode>,
);
