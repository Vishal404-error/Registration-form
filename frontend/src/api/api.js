


import axios from "axios";

// Create an instance of axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",  // Use VITE_ prefixed variable
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor to include the token in the request headers for protected routes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");  // Get the token from localStorage (or another storage method)
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;  // Attach token to Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
