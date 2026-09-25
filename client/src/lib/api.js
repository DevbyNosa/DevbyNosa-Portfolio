import axios from "axios";

const apiOrigin = (import.meta.env.VITE_API_URL || "").trim().replace(/\/+$/, "");

if (import.meta.env.PROD && !apiOrigin) {
  throw new Error("VITE_API_URL must be set to the production backend origin.");
}

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