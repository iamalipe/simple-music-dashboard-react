import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableColumns } from "@/types/table-type";
import TableSortHeader from "./table-sort-header";

export type DataTableProps<T> = {
  tableColumns: TableColumns<T>[];
  data: T[];
};

const DataTable = <T,>(props: DataTableProps<T>) => {
  const { tableColumns, data } = props;
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-b-0 table-header-box-shadow">
          {tableColumns.map((column) => (
            <TableHead key={column.key as string}>
              {column.sortable !== false ? (
                <TableSortHeader title={column.label} />
              ) : (
                column.label
              )}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => {
          return (
            <TableRow key={index}>
              {tableColumns.map((column) => (
                <TableCell key={`${index}_${column.key as string}`}>
                  {String(item[column.key as keyof typeof item])}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default DataTable;