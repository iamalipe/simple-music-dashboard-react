import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTable as DataTableType } from "@/hooks/useDataTable";
import TableSortHeader from "./table-sort-header";

export type DataTableProps<T> = {
  dataTable: DataTableType<T>;
};

const DataTable = <T,>(props: DataTableProps<T>) => {
  const { dataTable } = props;

  return (
    <Table>
      <TableHeader className="z-10">
        <TableRow className="border-b-0 table-header-box-shadow">
          {dataTable.columns
            .filter((item) => item.columnVisibility)
            .map((item) =>
              item.isSortable ? (
                <TableSortHeader
                  dataTable={dataTable}
                  key={item.id}
                  item={item}
                />
              ) : (
                <TableHead className="min-w-10" key={item.id}>
                  {item.labelRender ? item.labelRender(item) : item.label}
                </TableHead>
              )
            )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataTable.rows.map((item) => (
          <TableRow key={item.id as string}>
            {dataTable.columns
              .filter((item) => item.columnVisibility)
              .map((colItem) => (
                <TableCell key={colItem.id}>
                  {colItem.render(item.data)}
                </TableCell>
              ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
