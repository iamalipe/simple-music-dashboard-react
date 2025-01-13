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
import type { Header } from "@tanstack/react-table";

export type TableSortHeaderProps<T> = React.HTMLAttributes<HTMLDivElement> & {
  headerTitle?: React.ReactNode;
  tableHeader: Header<T, unknown>;
};

const TableSortHeader = <T,>(props: TableSortHeaderProps<T>) => {
  const { className, headerTitle, tableHeader } = props;

  const sorted = tableHeader.column.getIsSorted();

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{headerTitle}</span>
            {sorted === "asc" ? (
              <ArrowUp />
            ) : sorted === "desc" ? (
              <ArrowDown />
            ) : (
              <ChevronsUpDown />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            isTableHeader
            className={cn({ "text-primary": sorted === "asc" })}
            onClick={() =>
              sorted === "asc"
                ? tableHeader.column.clearSorting()
                : tableHeader.column.toggleSorting(false)
            }
          >
            <ArrowUp
              className={cn("h-3.5 w-3.5 text-muted-foreground/70", {
                "text-primary": sorted === "asc",
              })}
            />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem
            isTableHeader
            className={cn({ "text-primary": sorted === "desc" })}
            onClick={() =>
              sorted === "desc"
                ? tableHeader.column.clearSorting()
                : tableHeader.column.toggleSorting(true)
            }
          >
            <ArrowDown
              className={cn("h-3.5 w-3.5 text-muted-foreground/70", {
                "text-primary": sorted === "desc",
              })}
            />
            Desc
          </DropdownMenuItem>
          {tableHeader.column.getCanHide() && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                isTableHeader
                onClick={() => tableHeader.column.toggleVisibility(false)}
              >
                <EyeOff className="h-3.5 w-3.5 text-muted-foreground/70" />
                Hide
              </DropdownMenuItem>
            </>
          )}
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
