import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/artist/$id/delete")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/artist/$id/delete"!</div>;
}
