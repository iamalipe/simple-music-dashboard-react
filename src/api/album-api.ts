// album-api.ts
import { genericCRUD } from "@/lib/generic-crud";
import { AxiosInstance } from "axios";
import { ArtistType } from "./artist-api";

export type AlbumType = {
  title: string;
  releaseDate: string;
  artistId: string;
  artist?: ArtistType;
  coverUrl?: string | null;
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type AlbumRawType = Pick<
  AlbumType,
  "title" | "artistId" | "releaseDate" | "coverUrl"
>;

// Module-specific APIs
export const albumAPI = (axiosInstance: AxiosInstance) =>
  genericCRUD<AlbumType, AlbumRawType>(axiosInstance, "album");
