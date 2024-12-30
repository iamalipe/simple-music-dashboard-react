"use client";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

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
      </div>
    </div>
  );
};

export default ActionButtons;
