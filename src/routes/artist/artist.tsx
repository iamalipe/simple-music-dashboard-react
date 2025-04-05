import PageBreadcrumb from "@/components/general/page-breadcrumb";
import usePagination from "@/hooks/usePagination";
import useSort from "@/hooks/useSort";
import { useTableVisibility } from "@/store/use-table-columns-visibility-store";
import { getRouteApi } from "@tanstack/react-router";
import ActionControls from "@/routes/artist/action-controls";
import DataTable from "@/components/data-table/data-table";
import TableFooter from "@/components/data-table/table-footer";
import { useDataTable } from "@/hooks/useDataTable";
import tableColumns from "@/routes/artist/table-columns";

const routeApi = getRouteApi("/artist");
const Artist = () => {
  const routeData = routeApi.useLoaderData();

  const tableVisibility = useTableVisibility("artist");

  const pagination = usePagination({
    initialPageSize: routeData.data.pagination.limit,
    initialPageIndex: routeData.data.pagination.page,
    routeFrom: "/artist",
  });

  const sort = useSort({
    initialSort: routeData.data.sort,
    routeFrom: "/artist",
  });

  const dataTable = useDataTable({
    data: routeData.data.data,
    columns: tableColumns,
    rowCount: routeData.data.pagination.total,
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

export default Artist;
