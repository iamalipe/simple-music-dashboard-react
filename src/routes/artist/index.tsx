import { createFileRoute, getRouteApi } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { paginationZodSchema } from "@/lib/generic-validation";
import { Table as TableType } from "@tanstack/react-table";
import { columns } from "./-table-columns";
import useTableColumnsVisibilityStore, {
  useTableVisibleColumns,
} from "@/store/use-table-columns-visibility-store";
import ActionControls from "./-action-controls";
import usePagination from "@/hooks/usePagination";

const ArtistRoute = () => {
  const routeApi = getRouteApi("/artist/");
  const routeData = routeApi.useLoaderData();
  const tableVisibleColumns = useTableVisibleColumns("artist");
  const toggleTableVisibility = useTableColumnsVisibilityStore(
    (state) => state.toggleTableVisibility
  );

  const pagination = usePagination({
    initialPageSize: routeData.pagination.limit,
    initialPageIndex: routeData.pagination.page,
  });

  const table = useReactTable({
    data: routeData?.data,
    columns: columns,
    state: {
      columnVisibility: tableVisibleColumns,
      pagination: pagination.state,
    },
    manualPagination: true,
    rowCount: routeData.pagination.total,
    onPaginationChange: pagination.setPagination,
    onColumnVisibilityChange: (updater) =>
      toggleTableVisibility("artist", updater),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <main className="flex-1 overflow-hidden flex flex-col p-2 md:p-4 gap-2 md:gap-4">
      <ActionControls table={table} />
      <DataTable table={table} />
      {/* <TableFooter pagination={routeData?.pagination} routeFrom="/artist" /> */}
    </main>
  );
};

export const Route = createFileRoute("/artist/")({
  component: ArtistRoute,
  loaderDeps: ({ search: { page, limit } }) => ({ page, limit }),
  loader: ({ context: { apiQuery }, deps: deps }) =>
    apiQuery.artist.getAll(deps),
  validateSearch: zodValidator(paginationZodSchema),
  pendingComponent: () => <div>Loading...</div>,
});

export type DataTableProps<T> = {
  table: TableType<T>;
};

const DataTable = <T,>(props: DataTableProps<T>) => {
  const { table } = props;
  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow
            className="border-b-0 table-header-box-shadow"
            key={headerGroup.id}
          >
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
