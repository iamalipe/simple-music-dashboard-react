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
import { Grid2x2 } from "lucide-react";

const ActionButtons = () => {
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              // size="default"
            >
              <Grid2x2 className="mr-2 h-4 w-4" />
              View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[150px]">
            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              className="capitalize"
              checked={"indeterminate"}
              // onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              column.id
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ActionButtons;
