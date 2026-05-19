import axios from "axios";

const api = axios.create({ baseURL: "/" });

api.interceptors.request.use((config) => {
  const raw = localStorage.getItem("auth-storage");
  const token = raw ? JSON.parse(raw)?.state?.token : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const isLoginRequest = error.config?.url?.includes("/api/auth/login");

    if (error.response?.status === 401 && !isLoginRequest) {
      localStorage.removeItem("auth-storage");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;
