import ColumnsViewControls from "@/components/data-table/columns-view-controls";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ColumnsViewTableKeys } from "@/store/use-columns-view-store";

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

export default ActionControls;
