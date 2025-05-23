import axios from "axios";
import endPoints from "./endPoints";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const Axios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

Axios.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    let reConfig = error.config;
    if (error?.response?.status === 401) {
      const response = await Axios({
        ...endPoints.refreshToken,
      });
      localStorage.setItem("accessToken", response?.data?.accessToken);
      reConfig.headers.Authorization = `Bearer ${response?.data?.accessToken}`;
      return Axios(reConfig);
    }
    return Promise.reject(error);
  }
);

export default Axios;
