import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/style.css";
import { RouterProvider } from "react-router-dom";
import { route } from "@/routes";
import AuthContextProvider from "./contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider router={route} />
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
