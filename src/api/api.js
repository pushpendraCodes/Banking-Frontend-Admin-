// src/api.js
import axios from "axios";
import { apiMainUrl } from "./apiRoutes";

const api = axios.create({
  // baseURL: "http://localhost:8000/api", // yaha apna base URL dalna
   baseURL: apiMainUrl, // render.com wali live API
  
});

// Har request ke saath token attach karega
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
