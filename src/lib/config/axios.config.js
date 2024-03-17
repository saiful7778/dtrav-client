import axios from "axios";

const axiosBase = axios.create({
  baseURL: "http://localhost:5001",
});

export default axiosBase;
