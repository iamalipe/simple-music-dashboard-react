import { createFileRoute, getRouteApi } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";

import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { paginationZodSchema } from "@/lib/generic-validation";
import tableColumns from "./-table-columns";
import useTableColumnsVisibilityStore, {
  useTableVisibleColumns,
} from "@/store/use-table-columns-visibility-store";
import ActionControls from "./-action-controls";
import usePagination from "@/hooks/usePagination";
import DataTable from "@/components/data-table/data-table";
import TableFooter from "@/components/data-table/table-footer";

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
    columns: tableColumns,
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
      <TableFooter table={table} />
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