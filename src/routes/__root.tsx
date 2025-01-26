import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Header from "@/components/general/header";
import Footer from "@/components/general/footer";
import { AppSidebar } from "@/components/app-sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import type { ApiQuery } from "@/hooks/use-api-query";
import type { ApiType } from "@/api/api";
import PageNotFound from "@/components/general/page-not-found";
import LoadingElement from "@/components/general/loading-element";
import ErrorPage from "@/components/general/error-page";
import { Toaster } from "@/components/ui/toaster";

export const Route = createRootRouteWithContext<{
  apiQuery: ApiQuery;
  api: ApiType;
}>()({
  component: PrivateLayout,
  errorComponent: ErrorPage,
  notFoundComponent: PageNotFound,
  pendingComponent: LoadingElement,
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
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
      <TanStackRouterDevtools />
    </>
  );
}
