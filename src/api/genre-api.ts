// genre-api.ts
import { genericCRUD } from "@/lib/generic-crud";
import { AxiosInstance } from "axios";

export type GenreType = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

// Module-specific APIs
export const genreAPI = (axiosInstance: AxiosInstance) =>
  genericCRUD<GenreType, Pick<GenreType, "name">>(axiosInstance, "genre");
