import { createRootRouteWithContext } from "@tanstack/react-router";

import RootLayout from "@/routes/root-layout";
import ErrorPage from "@/components/general/error-page";
import PageNotFound from "@/components/general/page-not-found";
import LoadingElement from "@/components/general/loading-element";
import { ApiQuery } from "@/hooks/use-api-query";
import { ApiType } from "@/api/api";

import homeRoute from "@/routes/home/home-route";
import artistRoute from "@/routes/artist/artist-route";
import createArtistRoute from "@/routes/artist/create-record/create-record-route";
import viewArtistRoute from "@/routes/artist/view-record/view-record-route";

export const rootRoute = createRootRouteWithContext<{
  apiQuery: ApiQuery;
  api: ApiType;
}>()({
  component: RootLayout,
  errorComponent: ErrorPage,
  notFoundComponent: PageNotFound,
  pendingComponent: LoadingElement,
});

export const routeTree = rootRoute.addChildren([
  homeRoute,
  // artist
  artistRoute,
  createArtistRoute,
  viewArtistRoute,
]);
