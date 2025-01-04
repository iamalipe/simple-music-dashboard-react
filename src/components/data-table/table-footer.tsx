import { LinkProps } from "@tanstack/react-router";

import { ApiPaginationReturn } from "@/types/generic-type";
import TablePagination from "./table-pagination";
import TableLimit from "./table-limit";

export type TableFooterProps = {
  pagination: ApiPaginationReturn;
  routeFrom: LinkProps["from"];
};
const TableFooter = (props: TableFooterProps) => {
  const { pagination, routeFrom } = props;

  const totalPages = Math.ceil(pagination.total / pagination.limit);

  return (
    <div className="flex items-center justify-between px-2 py-1 flex-none">
      <div className="text-xs text-muted-foreground flex flex-col">
        <span>Selected: 1 of {pagination.limit}</span>
        <span>
          Total : {pagination.total} • Page: {pagination.page} of {totalPages}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <TableLimit pagination={pagination} />
        <TablePagination pagination={pagination} routeFrom={routeFrom} />
      </div>
    </div>
  );
};

export default TableFooter;
