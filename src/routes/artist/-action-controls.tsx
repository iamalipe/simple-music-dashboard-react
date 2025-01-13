import { Table as TableType } from "@tanstack/react-table";

import ColumnsViewControls from "@/components/data-table/columns-view-controls";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
// import { qs, sanitizeObject } from "@/lib/utils";

export type ActionControlsProps<T> = {
  table: TableType<T>;
};

const ActionControls = <T,>(props: ActionControlsProps<T>) => {
  const { table } = props;

  return (
    <div className="flex flex-none justify-between">
      <div className="flex gap-2 md:gap-4">
        <SidebarTrigger variant="outline" />
      </div>
      <div className="flex gap-2 md:gap-4">
        <Button>Add</Button>
        <ColumnsViewControls table={table} />
      </div>
    </div>
  );
};

export default ActionControls;
