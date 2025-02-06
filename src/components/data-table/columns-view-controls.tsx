import { Grid2x2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";

import { Button } from "../ui/button";
import { DataTable } from "@/hooks/useDataTable";

export type ColumnsViewControlsProps<T> = {
  dataTable: DataTable<T>;
};
const ColumnsViewControls = <T,>(props: ColumnsViewControlsProps<T>) => {
  const { dataTable } = props;
  const isMobile = useIsMobile();

  const hidableColumns = dataTable.columns.filter((col) => col.isHidable);
  if (hidableColumns.length === 0) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} size={isMobile ? "icon" : "default"}>
          <Grid2x2 className="md:mr-2 h-4 w-4" />
          {isMobile ? "" : "View"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {hidableColumns.map((column) => (
          <DropdownMenuCheckboxItem
            key={column.id}
            className="capitalize"
            checked={column.columnVisibility}
            onCheckedChange={(checked) => column.toggleVisibility(checked)}
          >
            {column.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ColumnsViewControls;
