import { createFileRoute, getRouteApi } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";

import { getAllZodSchema } from "@/lib/generic-validation";
import { useTableVisibility } from "@/store/use-table-columns-visibility-store";
import ActionControls from "./-action-controls";
import usePagination from "@/hooks/usePagination";
import TableFooter from "@/components/data-table/table-footer";
import useSort from "@/hooks/useSort";
import LoadingElement from "@/components/general/loading-element";
import ErrorPage from "@/components/general/error-page";
import PageNotFound from "@/components/general/page-not-found";
import PageBreadcrumb from "@/components/general/page-breadcrumb";
import { useDataTable } from "@/hooks/useDataTable";
import DataTable from "@/components/data-table/data-table";
import tableColumns from "./-table-columns";

const ArtistRoute = () => {
  const routeApi = getRouteApi("/artist/");
  const routeData = routeApi.useLoaderData();

  const tableVisibility = useTableVisibility("artist");

  const pagination = usePagination({
    initialPageSize: routeData.pagination.limit,
    initialPageIndex: routeData.pagination.page,
    routeFrom: "/artist",
  });

  const sort = useSort({
    initialSort: routeData.sort,
    routeFrom: "/artist",
  });

  const dataTable = useDataTable({
    data: routeData?.data,
    columns: tableColumns,
    rowCount: routeData.pagination.total,
    paginationState: pagination.state,
    columnVisibility: tableVisibility.state,
    onToggleVisibilityChange: tableVisibility.toggleVisibility,
    sortState: sort.state,
    onPaginationChange: pagination.onPaginationChange,
    onSortingChange: sort.onSortChange,
  });

  return (
    <main className="flex-1 overflow-hidden flex flex-col p-2 md:p-4 gap-2 md:gap-4">
      <PageBreadcrumb />
      <ActionControls dataTable={dataTable} />
      <DataTable dataTable={dataTable} />
      <TableFooter dataTable={dataTable} />
    </main>
  );
};

export const Route = createFileRoute("/artist/")({
  component: ArtistRoute,
  loaderDeps: ({ search: { sort, limit, page } }) => ({ sort, limit, page }),
  loader: ({ context: { apiQuery }, deps }) => apiQuery.artist.getAll(deps),
  validateSearch: zodValidator(getAllZodSchema),
  errorComponent: ErrorPage,
  notFoundComponent: PageNotFound,
  pendingComponent: LoadingElement,
});
