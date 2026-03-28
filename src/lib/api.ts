import axios from "axios";

// En desarrollo usamos el proxy de Vite, en producción la URL completa
const API_BASE_URL = import.meta.env.DEV 
  ? "/api" 
  : "https://presti-api.onrender.com/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token a cada request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("presti-auth-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si el token expiró o es inválido, redirigir al login
    if (error.response?.status === 401) {
      localStorage.removeItem("presti-auth-token");
      localStorage.removeItem("presti-user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
