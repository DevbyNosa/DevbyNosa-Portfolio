import axios from "axios";

const apiOrigin = import.meta.env.PROD
  ? ""
  : (import.meta.env.VITE_API_URL || "").trim().replace(/\/+$/, "");

const api = axios.create({
  baseURL: apiOrigin,
  withCredentials: true,
});

export function apiFetch(path, options = {}) {
  return fetch(`${apiOrigin}${path}`, {
    ...options,
    credentials: options.credentials || "include",
  });
}

export default api;