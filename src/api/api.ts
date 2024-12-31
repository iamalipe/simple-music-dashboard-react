// api.ts
import axios from "axios";

import { genreAPI } from "./genre-api";

// Axios instance configuration
const VITE_API_URL = (import.meta.env.VITE_API_URL as string) || "";
export const axiosInstance = axios.create({
  baseURL: VITE_API_URL,
});

// Export all APIs
const api = {
  genre: genreAPI(axiosInstance),
};

export default api;
