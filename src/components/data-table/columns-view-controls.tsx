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

import useColumnsViewStore, {
  ColumnsViewTableKeys,
} from "@/store/use-columns-view-store";
import { Button } from "../ui/button";

export type ColumnsViewControlsProps = {
  tableKey: ColumnsViewTableKeys;
};
const ColumnsViewControls = (props: ColumnsViewControlsProps) => {
  const { tableKey } = props;
  const isMobile = useIsMobile();

  const tableColumnsView = useColumnsViewStore((state) => state[tableKey]);
  const toggleColumnViewVisibility = useColumnsViewStore(
    (state) => state.toggleColumnViewVisibility
  );

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
        {tableColumnsView.map((column, index) => {
          return (
            <DropdownMenuCheckboxItem
              key={index}
              className="capitalize"
              checked={column.visibility}
              onCheckedChange={() =>
                toggleColumnViewVisibility(tableKey, column.key)
              }
            >
              {column.label}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ColumnsViewControls;
