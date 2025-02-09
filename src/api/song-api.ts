// song-api.ts
import { genericCRUD } from "@/lib/generic-crud";
import { AxiosInstance } from "axios";
import { ArtistType } from "./artist-api";
import { AlbumType } from "./album-api";
import { GenreType } from "./genre-api";

export type SongType = {
  title: string;
  duration: number;
  audioUrl: string;
  albumId: string;
  album?: AlbumType;
  artistId: string;
  artist?: ArtistType;
  genreId: string;
  genre?: GenreType;
  trackNumber?: number;
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type SongRawType = Pick<
  SongType,
  | "title"
  | "duration"
  | "audioUrl"
  | "albumId"
  | "artistId"
  | "genreId"
  | "trackNumber"
>;

// Module-specific APIs
export const songAPI = (axiosInstance: AxiosInstance) =>
  genericCRUD<SongType, SongRawType>(axiosInstance, "song");
