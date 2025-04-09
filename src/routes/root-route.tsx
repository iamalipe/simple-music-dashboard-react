import { createRootRouteWithContext } from "@tanstack/react-router";

import RootLayout from "@/routes/root-layout";
import ErrorPage from "@/components/general/error-page";
import PageNotFound from "@/components/general/page-not-found";
import LoadingElement from "@/components/general/loading-element";
import { ApiQuery } from "@/hooks/use-api-query";
import { ApiType } from "@/api/api";

// privateRoute
import privateRoute from "@/routes/private/private-route";
import homeRoute from "@/routes/private/home/home-route";
import artistRoute from "@/routes/private/artist/artist-route";
import createArtistRoute from "@/routes/private/artist/create-record/create-record-route";
import viewArtistRoute from "@/routes/private/artist/view-record/view-record-route";

// authRoute
import authRoute from "@/routes/auth/auth-route";
import loginRoute from "@/routes/auth/login/login-route";
import registerRoute from "@/routes/auth/register/register-route";

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
  privateRoute.addChildren([
    homeRoute,
    artistRoute,
    createArtistRoute,
    viewArtistRoute,
  ]),
  authRoute.addChildren([loginRoute, registerRoute]),
]);

