import { createFileRoute, getRouteApi } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";

import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { getAllZodSchema } from "@/lib/generic-validation";
import tableColumns from "./-table-columns";
import useTableColumnsVisibilityStore, {
  useTableVisibleColumns,
} from "@/store/use-table-columns-visibility-store";
import ActionControls from "./-action-controls";
import usePagination from "@/hooks/usePagination";
import DataTable from "@/components/data-table/data-table";
import TableFooter from "@/components/data-table/table-footer";
import useSort from "@/hooks/useSort";

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
    routeFrom: "/artist",
  });

  const sort = useSort({
    initialSort: routeData.sort,
    routeFrom: "/artist",
  });

  const table = useReactTable({
    data: routeData?.data,
    columns: tableColumns,
    state: {
      columnVisibility: tableVisibleColumns,
      pagination: pagination.state,
      sorting: sort.state,
    },
    manualPagination: true,
    manualSorting: true,
    rowCount: routeData.pagination.total,
    onPaginationChange: pagination.setPagination,
    onColumnVisibilityChange: (updater) =>
      toggleTableVisibility("artist", updater),
    onSortingChange: sort.setSorting,
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
  loaderDeps: ({ search: { sort, limit, page } }) => ({ sort, limit, page }),
  loader: ({ context: { apiQuery }, deps }) => apiQuery.artist.getAll(deps),
  pendingComponent: () => <div>Loading...</div>,
  validateSearch: zodValidator(getAllZodSchema),
});
