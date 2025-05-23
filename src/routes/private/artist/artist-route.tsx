import { createRoute } from "@tanstack/react-router";

import Artist from "@/routes/private/artist/artist";
import { zodValidator } from "@tanstack/zod-adapter";
import ErrorPage from "@/components/general/error-page";
import PageNotFound from "@/components/general/page-not-found";
import LoadingElement from "@/components/general/loading-element";
import { getAllZodSchema } from "@/lib/generic-validation";
import privateRoute from "@/routes/private/private-route";

const artistRoute = createRoute({
  getParentRoute: () => privateRoute,
  path: "/artist",
  component: Artist,
  loaderDeps: ({ search: { sort, limit, page, mode } }) => ({
    sort,
    limit,
    page,
    mode,
  }),
  loader: async ({ context: { apiQuery }, deps }) => ({
    data: await apiQuery.artist.getAll(deps),
    crumb: "Artist",
  }),
  validateSearch: zodValidator(getAllZodSchema),
  errorComponent: ErrorPage,
  notFoundComponent: PageNotFound,
  pendingComponent: LoadingElement,
});

export default artistRoute;
