// import { useState } from "react";
import { createFileRoute, getRouteApi } from "@tanstack/react-router";

import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import TableFooter from "@/components/data-table/table-footer";

import ActionControls from "./-action-controls";
import { useVisibleColumns } from "@/store/use-columns-view-store";

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
      {/* <div className="overflow-hidden"> */}
      {/* <div className="overflow-auto"> */}
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow className="border-b-0 table-header-box-shadow">
            {tableColumns.map((column) => (
              <TableHead key={column.key}>{column.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {routeData?.data?.map((genre, index) => {
            return (
              <TableRow key={index}>
                {tableColumns.map((column) => (
                  <TableCell key={`${index}_${column.key}`}>
                    {genre[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {/* </div> */}
      <TableFooter />
    </main>
  );
};

export const Route = createFileRoute("/genre/")({
  component: GenreRoute,
  loader: ({ context: { apiQuery } }) => apiQuery.genre.getAll(),
  pendingComponent: () => <div>Loading...</div>,
});
