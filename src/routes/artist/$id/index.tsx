import { createFileRoute, getRouteApi } from "@tanstack/react-router";
import SingleForm, { type FormSchemaType } from "../-single-form";

export const Route = createFileRoute("/artist/$id/")({
  component: RouteComponent,
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

  return (
    <SingleForm defaultValues={defaultValues} id={mainData.id} mode="view" />
  );
}
