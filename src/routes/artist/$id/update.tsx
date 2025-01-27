import ErrorPage from "@/components/general/error-page";
import LoadingElement from "@/components/general/loading-element";
import PageNotFound from "@/components/general/page-not-found";
import { createFileRoute, getRouteApi } from "@tanstack/react-router";
import SingleForm, { type FormSchemaType } from "../-single-form";
import apiQuery from "@/hooks/use-api-query";
import { toast } from "@/hooks/use-toast";

export const Route = createFileRoute("/artist/$id/update")({
  component: RouteComponent,
  loader: () => ({ crumb: "Update" }),
  errorComponent: ErrorPage,
  notFoundComponent: PageNotFound,
  pendingComponent: LoadingElement,
});

function RouteComponent() {
  const routeApi = getRouteApi("/artist/$id");
  const routeData = routeApi.useLoaderData();
  const mainData = routeData.data.data;

  const defaultValues: Partial<FormSchemaType> = {
    name: mainData.name,
    bio: mainData.bio || undefined,
    imageUrl: mainData.imageUrl || undefined,
  };

  const onSubmit = async (data: FormSchemaType) => {
    await apiQuery.artist.update({ id: mainData.id, data });
    toast({
      title: "Artist updated",
      description: "Your artist has been updated successfully.",
    });
  };

  return (
    <SingleForm
      defaultValues={defaultValues}
      id={mainData.id}
      mode="update"
      onSubmit={onSubmit}
    />
  );
}
