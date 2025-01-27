import { createFileRoute } from "@tanstack/react-router";
import apiQuery from "@/hooks/use-api-query";
import LoadingElement from "@/components/general/loading-element";
import ErrorPage from "@/components/general/error-page";
import PageNotFound from "@/components/general/page-not-found";
import { useToast } from "@/hooks/use-toast";
import SingleForm, { type FormSchemaType } from "./-single-form";

function RouteComponent() {
  const { toast } = useToast();
  // This can come from your database or API.
  const defaultValues: Partial<FormSchemaType> = {
    name: "",
    bio: undefined,
    imageUrl: undefined,
  };

  const onSubmit = async (data: FormSchemaType) => {
    await apiQuery.artist.create(data);
    toast({
      title: "Artist created",
      description: "Your artist has been created successfully.",
    });
  };

  return (
    <SingleForm
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      mode="create"
    />
  );
}

export const Route = createFileRoute("/artist/new")({
  component: RouteComponent,
  loader: () => ({
    crumb: "New Artist",
  }),
  errorComponent: ErrorPage,
  notFoundComponent: PageNotFound,
  pendingComponent: LoadingElement,
});
