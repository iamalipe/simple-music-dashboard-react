"use client";

import { ForwardRefExoticComponent, RefAttributes } from "react";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { LucideProps } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export type AppSidebarMenuItemProps = {
  title: string;
  url: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};
const AppSidebarMenuItem = (props: AppSidebarMenuItemProps) => {
  const { title, url } = props;
  const location = useLocation();

  const pathname = location.pathname;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton isActive={pathname === url} asChild>
        <Link to={url}>
          <props.icon />
          <span>{title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default AppSidebarMenuItem;
