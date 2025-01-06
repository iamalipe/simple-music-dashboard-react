// api.ts
import axios from "axios";

// import all api
import { genreAPI } from "./genre-api";
import { artistAPI } from "./artist-api";

// Axios instance configuration
const VITE_API_URL = (import.meta.env.VITE_API_URL as string) || "";
export const axiosInstance = axios.create({
  baseURL: VITE_API_URL,
});

// Export all APIs
const api = {
  genre: genreAPI(axiosInstance),
  artist: artistAPI(axiosInstance),
};

export type ApiType = typeof api;

export default api;
