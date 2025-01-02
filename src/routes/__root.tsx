import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Header from "@/components/general/header";
import Footer from "@/components/general/footer";
import { AppSidebar } from "@/components/app-sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ApiQuery } from "@/hooks/use-api-query";
import { ApiType } from "@/api/api";

export const Route = createRootRouteWithContext<{
  apiQuery: ApiQuery;
  api: ApiType;
}>()({
  component: PrivateLayout,
});

function PrivateLayout() {
  return (
    <>
      <div className="h-full-x flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-hidden flex bg-background">
          <SidebarProvider>
            <AppSidebar />
            <Outlet />
          </SidebarProvider>
        </div>
        <Footer />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
      <TanStackRouterDevtools />
    </>
  );
}
