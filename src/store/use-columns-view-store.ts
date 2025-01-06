import { create } from "zustand";
import { persist } from "zustand/middleware";

import { TableColumns } from "@/types/table-type";

import genreTableColumns from "@/routes/genre/-table-columns";
import { GenreType } from "@/api/genre-api";

import artistTableColumns from "@/routes/artist/-table-columns";
import { ArtistType } from "@/api/artist-api";

export type TableColumnsForStore<T> = TableColumns<T> & {
  visibility: boolean;
};

export type ColumnsViewStore = {
  genre: TableColumnsForStore<GenreType>[];
  artist: TableColumnsForStore<ArtistType>[];
  toggleColumnViewVisibility: (
    tableKey: ColumnsViewTableKeys,
    columnKey: string | number | symbol
  ) => void;
  resetColumnVisibility: (tableKey: ColumnsViewTableKeys) => void;
};

export type ColumnsViewTableKeys = keyof Pick<
  ColumnsViewStore,
  "genre" | "artist"
>;

const useColumnsViewStore = create(
  persist<ColumnsViewStore>(
    (set) => ({
      genre: genreTableColumns
        .filter((col) => col.toggleVisibility !== false)
        .map((column) => ({
          ...column,
          visibility: true,
        })),
      artist: artistTableColumns
        .filter((col) => col.toggleVisibility !== false)
        .map((column) => ({
          ...column,
          visibility: true,
        })),
      toggleColumnViewVisibility: (tableKey, columnKey) => {
        set((state) => {
          const columns = state[tableKey];
          const visibleColumns = columns.filter((col) => col.visibility);
          if (
            visibleColumns.length === 1 &&
            visibleColumns[0].key === columnKey
          ) {
            return state; // Prevent toggling the last visible column
          }
          return {
            ...state,
            [tableKey]: columns.map((col) =>
              col.key === columnKey
                ? { ...col, visibility: !col.visibility }
                : col
            ),
          };
        });
      },
      resetColumnVisibility: (tableKey: ColumnsViewTableKeys) => {
        set((state) => ({
          ...state,
          [tableKey]: state[tableKey].map((col) => ({
            ...col,
            visibility: true,
          })),
        }));
      },
    }),
    {
      name: "columns-view",
    }
  )
);

export const useVisibleColumns = (tableKey: ColumnsViewTableKeys) => {
  const columns = useColumnsViewStore((state) => state[tableKey]);
  return columns.filter((col) => col.visibility);
};

export default useColumnsViewStore;
