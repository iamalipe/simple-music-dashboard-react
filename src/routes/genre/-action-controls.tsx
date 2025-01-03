import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import useColumnsViewStore, {
  ColumnsViewTableKeys,
} from "@/store/use-columns-view-store";
import { Grid2x2 } from "lucide-react";

export type ActionControlsProps = {
  tableKey: ColumnsViewTableKeys;
};

const ActionControls = (props: ActionControlsProps) => {
  const { tableKey } = props;
  return (
    <div className="flex flex-none justify-between">
      <div className="flex gap-2 md:gap-4">
        <SidebarTrigger variant="outline" />
        <Button variant="outline">Left Btn 1</Button>
        <Button variant="destructive">Left Btn 1</Button>
      </div>
      <div className="flex gap-2 md:gap-4">
        <Button>Right Btn 1</Button>
        <Button variant="secondary">Right Btn 2</Button>
        <ColumnsViewControls tableKey={tableKey} />
      </div>
    </div>
  );
};

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

export default ActionControls;
