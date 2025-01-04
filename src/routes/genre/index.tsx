// import { useState } from "react";
import { createFileRoute, getRouteApi } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";

import TableFooter from "@/components/data-table/table-footer";

import ActionControls from "./-action-controls";
import { useVisibleColumns } from "@/store/use-columns-view-store";
import DataTable from "@/components/data-table/data-table";
import { paginationZodSchema } from "@/lib/generic-validation";

const GenreRoute = () => {
  const routeApi = getRouteApi("/genre/");
  const routeData = routeApi.useLoaderData();

  // const [tablePagination, setTablePagination] = useState<TablePagination>({
  //   page: 1,
  //   limit: 30,
  // });

  // const [tableSort, setTableSort] = useState<TableSort<GenreType>>({
  //   orderBy: "createdAt",
  //   order: "desc",
  // });

  const tableColumns = useVisibleColumns("genre");

  return (
    <main className="flex-1 overflow-hidden flex flex-col p-2 md:p-4 gap-2 md:gap-4">
      <ActionControls tableKey="genre" />
      <DataTable tableColumns={tableColumns} data={routeData?.data} />
      <TableFooter pagination={routeData?.pagination} routeFrom="/genre" />
    </main>
  );
};

export const Route = createFileRoute("/genre/")({
  component: GenreRoute,
  loaderDeps: ({ search: { page, limit } }) => ({ page, limit }),
  loader: ({ context: { apiQuery }, deps: deps }) =>
    apiQuery.genre.getAll(deps),
  validateSearch: zodValidator(paginationZodSchema),
  pendingComponent: () => <div>Loading...</div>,
});
