import { Table as TableType } from "@tanstack/react-table";

import TablePagination from "./table-pagination";
import TableLimit from "./table-limit";

export type TableFooterProps<T> = {
  table: TableType<T>;
};
const TableFooter = <T,>(props: TableFooterProps<T>) => {
  const { table } = props;

  return (
    <div className="flex items-center justify-between px-2 py-1 flex-none">
      <div className="text-xs text-muted-foreground flex flex-col">
        <span>
          Selected: {table.getSelectedRowModel().rows.length} of{" "}
          {table.getRowCount()}
        </span>
        <span>
          Total : {table.getRowCount()} • Page:{" "}
          {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <TableLimit table={table} />
        <TablePagination table={table} />
      </div>
    </div>
  );
};

export default TableFooter;
