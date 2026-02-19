import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
});
// Debug logs with Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log(
      `[DEBUG-API-REQ] URL: ${config.url} | Token Present: ${!!token}`
    );

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("[DEBUG-API-ERR] Request Interceptor Error");
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    // console.log(`[DEBUG-API-RES] ${response.config.url}:`, response.data);
    return response;
  },
  (error) => {
    console.error("[DEBUG-API-ERR] Response Error:", error.response?.data);
    return Promise.reject(error);
  }
);

export default api;
