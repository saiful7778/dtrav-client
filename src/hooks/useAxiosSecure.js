import axiosBase from "@/lib/config/axios.config";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

export default function useAxiosSecure() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axiosBase.interceptors.response.use(
      (data) => {
        return data;
      },
      (err) => {
        let status = err.response.status;
        if (status === 401 || status === 403) {
          logout()
            .then(() => {
              navigate("/authentication/login");
            })
            .catch((err) => console.error(err));
        }
      },
    );
  }, [logout, navigate]);

  return axiosBase;
}
