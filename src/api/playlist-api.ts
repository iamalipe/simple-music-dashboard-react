// playlist-api.ts
import { genericCRUD } from "@/lib/generic-crud";
import { AxiosInstance } from "axios";
import { SongType } from "./song-api";

export type PlaylistType = {
  name: string;
  description?: string | null;
  songIDs: string[];
  songs?: SongType[];
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PlaylistRawType = Pick<
  PlaylistType,
  "name" | "description" | "songIDs"
>;

// Module-specific APIs
export const playlistAPI = (axiosInstance: AxiosInstance) =>
  genericCRUD<PlaylistType, PlaylistRawType>(axiosInstance, "playlist");
