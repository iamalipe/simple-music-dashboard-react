import ErrorPage from "@/components/general/error-page";
import LoadingElement from "@/components/general/loading-element";
import PageNotFound from "@/components/general/page-not-found";
import { getOneZodSchema } from "@/lib/generic-validation";
import { createFileRoute, Outlet } from "@tanstack/react-router";

const RouteComponent = () => <Outlet />;
export const Route = createFileRoute("/artist/$id")({
  component: RouteComponent,
  loader: async ({ context: { apiQuery }, params: { id } }) => {
    const data = await apiQuery.artist.get(id);
    return { data, crumb: data.data.name };
  },
  beforeLoad: ({ params }) => getOneZodSchema.parse(params),
  errorComponent: ErrorPage,
  notFoundComponent: PageNotFound,
  pendingComponent: LoadingElement,
});
