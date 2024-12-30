"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { User, Home } from "lucide-react";
// import { User, Home, MessageSquare } from "lucide-react";
import AppSidebarMenuItem from "@/components/app-sidebar/app-sidebar-menu-item";
// import { useAtomValue } from "jotai";
// import { currentUserAtom } from "@/state/user-state";

export function AppSidebar() {
  // const currentUser = useAtomValue(currentUserAtom);

  const _items = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "User",
      url: "/user",
      icon: User,
    },
  ];
  // const items = currentUser
  //   ? [
  //       ..._items,
  //       {
  //         title: "Chat",
  //         url: `/chat?uid=${currentUser.id}`,
  //         icon: MessageSquare,
  //       },
  //     ]
  //   : [..._items];
  const items = [..._items];

  return (
    <Sidebar className="mt-12 mb-8 h-[calc(100svh-5rem)]" variant="sidebar">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Pages</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <AppSidebarMenuItem
                  key={item.title}
                  title={item.title}
                  url={item.url}
                  icon={item.icon}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
