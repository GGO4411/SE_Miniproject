import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Attach the stored JWT (if any) to every outgoing request.
// NOTE: localStorage is used here for simplicity in this student project.
// A production system would prefer an httpOnly cookie to reduce XSS risk.
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("ems_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Normalize errors so components can just read err.message
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiMessage = error.response?.data?.error?.message;
    return Promise.reject(new Error(apiMessage || error.message || "Something went wrong"));
  }
);

export default apiClient;
