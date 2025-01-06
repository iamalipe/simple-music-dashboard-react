import { Table as TableType } from "@tanstack/react-table";

import ColumnsViewControls from "@/components/data-table/columns-view-controls";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

export type ActionControlsProps<T> = {
  table: TableType<T>;
};

const ActionControls = <T,>(props: ActionControlsProps<T>) => {
  const { table } = props;

  // console.log("pagination.pageSize", table.getState().pagination.pageSize);
  // console.log("getCanNextPage", table.getCanNextPage());
  // console.log("getCanPreviousPage", table.getCanPreviousPage());

  return (
    <div className="flex flex-none justify-between">
      <div className="flex gap-2 md:gap-4">
        <SidebarTrigger variant="outline" />
        <Button variant="outline" onClick={() => table.previousPage()}>
          Previous
        </Button>
        <Button variant="outline" onClick={() => table.nextPage()}>
          {/* <Button variant="outline" onClick={() => table.setPageIndex(2)}> */}
          Next
        </Button>
        <Button variant="outline" onClick={() => table.setPageSize(50)}>
          Limit 50
        </Button>
      </div>
      <div className="flex gap-2 md:gap-4">
        <Button>Right Btn 1</Button>
        <Button variant="secondary">Right Btn 2</Button>
        <ColumnsViewControls table={table} />
      </div>
    </div>
  );
};

export default ActionControls;
