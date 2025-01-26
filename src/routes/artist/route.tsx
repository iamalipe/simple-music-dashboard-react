import { createFileRoute, Outlet } from "@tanstack/react-router";

const RouteComponent = () => <Outlet />;
export const Route = createFileRoute("/artist")({
  component: RouteComponent,
  loader: () => ({
    crumb: "Artist",
  }),
});
