import { createFileRoute, getRouteApi } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";

import ActionControls from "./-action-controls";
import DataTable from "@/components/data-table/data-table";
import { paginationZodSchema } from "@/lib/generic-validation";
import tableColumns from "./-table-columns";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import useTableColumnsVisibilityStore, {
  useTableVisibleColumns,
} from "@/store/use-table-columns-visibility-store";
import usePagination from "@/hooks/usePagination";
import TableFooter from "@/components/data-table/table-footer";
import useSort from "@/hooks/useSort";

const GenreRoute = () => {
  const routeApi = getRouteApi("/genre/");
  const routeData = routeApi.useLoaderData();

  const tableVisibleColumns = useTableVisibleColumns("genre");
  const toggleTableVisibility = useTableColumnsVisibilityStore(
    (state) => state.toggleTableVisibility
  );

  const pagination = usePagination({
    initialPageSize: routeData.pagination.limit,
    initialPageIndex: routeData.pagination.page,
    routeFrom: "/genre",
  });

  const sort = useSort({
    initialSort: [],
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
    onSortingChange: sort.setSorting,
    onColumnVisibilityChange: (updater) =>
      toggleTableVisibility("genre", updater),
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

export const Route = createFileRoute("/genre/")({
  component: GenreRoute,
  loaderDeps: ({ search: { page, limit } }) => ({ page, limit }),
  loader: ({ context: { apiQuery }, deps: deps }) =>
    apiQuery.genre.getAll(deps),
  validateSearch: zodValidator(paginationZodSchema),
  pendingComponent: () => <div>Loading...</div>,
});
