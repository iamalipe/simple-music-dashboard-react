import type { Updater, VisibilityState } from "@tanstack/react-table";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ColumnsVisibility = {
  tableKey: string;
  columns: VisibilityState;
};

export type TableColumnsVisibilityStore = {
  tables: ColumnsVisibility[];
  toggleTableVisibility: (
    tableKey: string,
    updater: Updater<VisibilityState>
  ) => void;
};

const useTableColumnsVisibilityStore = create(
  persist<TableColumnsVisibilityStore>(
    (set) => ({
      tables: [],
      toggleTableVisibility: (tableKey, updater) => {
        set((state) => {
          const findIndex = state.tables.findIndex(
            (e) => e.tableKey === tableKey
          );
          const tables = [...state.tables];
          if (findIndex !== -1) {
            if (updater instanceof Function) {
              tables[findIndex] = {
                ...tables[findIndex],
                columns: updater(tables[findIndex].columns),
              };
            } else {
              tables[findIndex] = { ...tables[findIndex], columns: updater };
            }
          } else {
            if (updater instanceof Function) {
              const newColumns = {
                tableKey: tableKey,
                columns: updater({}),
              };
              tables.push(newColumns);
            } else {
              const newColumns = {
                tableKey: tableKey,
                columns: updater,
              };
              tables.push(newColumns);
            }
          }

          return { ...state, tables: tables };
        });
      },
    }),
    {
      name: "columns-view",
    }
  )
);

export const useTableVisibleColumns = (tableKey: string) => {
  const columnsState = useTableColumnsVisibilityStore((state) => state.tables);
  const columns = columnsState.find((tables) => tables.tableKey === tableKey);
  return columns?.columns;
};

export default useTableColumnsVisibilityStore;
