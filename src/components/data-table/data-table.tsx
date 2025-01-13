import { flexRender } from "@tanstack/react-table";
import { Table as TableType } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { TableColumns } from "@/types/table-type";
import TableSortHeader from "./table-sort-header";

export type DataTableProps<T> = {
  table: TableType<T>;
};

const DataTable = <T,>(props: DataTableProps<T>) => {
  const { table } = props;
  return (
    <Table>
      <TableHeader className="z-10">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow
            className="border-b-0 table-header-box-shadow"
            key={headerGroup.id}
          >
            {headerGroup.headers.map((header) => {
              const renderData = header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  );

              return (
                <TableHead
                  onClick={header.column.getToggleSortingHandler}
                  key={header.id}
                >
                  {header.column.getCanSort() ? (
                    <TableSortHeader
                      headerTitle={renderData}
                      tableHeader={header}
                    />
                  ) : (
                    renderData
                  )}
                </TableHead>
              );
            })}
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

export default DataTable;
