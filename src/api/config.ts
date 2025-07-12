import axios from "axios";
//const server = process.env.REACT_APP_API_URL || "http://localhost:3000";
const server = process.env.VITE_API_URL || "http://localhost:3000";

const defaultOptions = {
  baseURL: server,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 300000,
};

const _axios = axios.create(defaultOptions);

_axios.interceptors.request.use((config) => {
  const token = getToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const { get, post, put, delete: destroy, patch } = _axios;
export { destroy, get, patch, post, put };

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const setToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }
};

export const removeToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
};
