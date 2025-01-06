// genre-api.ts
import { genericCRUD } from "@/lib/generic-crud";
import { AxiosInstance } from "axios";

export type GenreType = {
  name: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  originYear?: string | null;
  description?: string | null;
  popularInCountry?: string | null;
};

export type GenreRawType = Pick<
  GenreType,
  "name" | "originYear" | "description" | "popularInCountry"
>;

// Module-specific APIs
export const genreAPI = (axiosInstance: AxiosInstance) =>
  genericCRUD<GenreType, GenreRawType>(axiosInstance, "genre");
