import { Table as TableType } from "@tanstack/react-table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export type TableLimitProps<T> = {
  table: TableType<T>;
  limits?: number[];
};
const TableLimit = <T,>(props: TableLimitProps<T>) => {
  const { table } = props;
  const limits = props.limits || [10, 25, 50, 100];

  const pageSize = table.getState().pagination.pageSize;

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground text-right whitespace-nowrap">
        Rows Per
        <br />
        Page
      </span>
      <Select
        value={`${pageSize}`}
        onValueChange={(value) => table.setPageSize(Number(value))}
      >
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder={`${pageSize}`} />
        </SelectTrigger>
        <SelectContent side="top">
          {limits.map((limit, index) => (
            <SelectItem key={`${index}_${limit}`} value={`${limit}`}>
              {limit}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TableLimit;
