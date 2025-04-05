import { createRoute } from "@tanstack/react-router";

import Home from "@/routes/home/home";
import { rootRoute } from "@/routes/root-route";

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

export default homeRoute;
