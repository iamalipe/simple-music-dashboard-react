// artist-api.ts
import { genericCRUD } from "@/lib/generic-crud";
import { AxiosInstance } from "axios";

export type ArtistType = {
  name: string;
  bio?: string | null;
  imageUrl?: string | null;
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ArtistRawType = Pick<ArtistType, "name" | "bio" | "imageUrl">;

// Module-specific APIs
export const artistAPI = (axiosInstance: AxiosInstance) =>
  genericCRUD<ArtistType, ArtistRawType>(axiosInstance, "artist");
