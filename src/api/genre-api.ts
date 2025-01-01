// genre-api.ts
import { genericCRUD } from "@/lib/generic-crud";
import { AxiosInstance } from "axios";

export type GenreType = {
  id: string;
  name: string;
  originYear?: string;
  description?: string;
  popularInCountry?: string;
  createdAt: string;
  updatedAt: string;
};

export type GenreRawType = Pick<
  GenreType,
  "name" | "originYear" | "description" | "popularInCountry"
>;

// Module-specific APIs
export const genreAPI = (axiosInstance: AxiosInstance) =>
  genericCRUD<GenreType, GenreRawType>(axiosInstance, "genre");
