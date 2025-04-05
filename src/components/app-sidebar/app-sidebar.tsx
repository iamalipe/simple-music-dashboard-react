import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { Home, User } from "lucide-react";
import AppSidebarMenuItem from "@/components/app-sidebar/app-sidebar-menu-item";

export function AppSidebar() {
  const _items = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Artist",
      url: "/artist",
      icon: User,
    },
  ];

  const items = [..._items];

  return (
    <Sidebar className="mt-16 mb-12 h-[calc(100svh-7rem)]" variant="sidebar">
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
