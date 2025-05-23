import axios from "axios";
import endPoints from "./endPoints";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const Axios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Add a flag to track if a request is a refresh token request
Axios.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    // Mark refresh token requests to avoid infinite loops
    if (
      config.url === endPoints.refreshToken.url &&
      config.method === endPoints.refreshToken.method.toLowerCase()
    ) {
      config._isRefreshRequest = true;
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
    const reConfig = error.config;

    // Skip retry logic for refresh token requests to prevent infinite loops
    if (reConfig._isRefreshRequest) {
      return Promise.reject(error);
    }

    // Handle 401 errors
    if (error?.response?.status === 401) {
      try {
        const response = await Axios({
          ...endPoints.refreshToken,
        });

        const newAccessToken = response?.data?.accessToken;
        if (!newAccessToken) {
          throw new Error("No access token received from refresh endpoint");
        }

        localStorage.setItem("accessToken", newAccessToken);
        reConfig.headers.Authorization = `Bearer ${newAccessToken}`;
        return Axios(reConfig);
      } catch (refreshError) {
        // If refresh fails, clear tokens and redirect to login (or handle as needed)
        localStorage.removeItem("accessToken");
        // Optionally redirect to login page
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default Axios;
