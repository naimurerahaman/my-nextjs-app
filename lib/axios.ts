import axios from "axios";

const axiosInstance = axios.create({
  // FIX: Pointing to port 3000 (standard NestJS port)
  // while your Next.js app runs on 3001
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default axiosInstance;
