import ErrorPage from "@/components/general/error-page";
import LoadingElement from "@/components/general/loading-element";
import PageNotFound from "@/components/general/page-not-found";
import { rootRoute } from "@/routes/root-route";
import { createRoute } from "@tanstack/react-router";
import React from "react";

const createRecordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/artist/new",
  component: React.lazy(
    () => import("@/routes/artist/create-record/create-record")
  ),
  loader: async () => ({
    crumb: "New Artist",
  }),
  errorComponent: ErrorPage,
  notFoundComponent: PageNotFound,
  pendingComponent: LoadingElement,
});

export default createRecordRoute;
