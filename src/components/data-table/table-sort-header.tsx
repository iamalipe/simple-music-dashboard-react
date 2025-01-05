import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export type TableSortHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
};

const TableSortHeader = (props: TableSortHeaderProps) => {
  const { className, title } = props;
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            <ChevronsUpDown />
            {/* <ArrowDown /> */}
            {/* <ArrowUp /> */}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem>
            <ArrowUp className="h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem>
            {/* <DropdownMenuItem onClick={() => column.toggleSorting(true)}> */}
            <ArrowDown className="h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <EyeOff className="h-3.5 w-3.5 text-muted-foreground/70" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TableSortHeader;

// add filter
// search
// select options (can be select multiple)
// date single
// date range
// number
// number range
