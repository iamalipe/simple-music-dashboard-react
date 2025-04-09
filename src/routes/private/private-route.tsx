import { createRoute } from "@tanstack/react-router";

import PrivateLayout from "@/routes/private/private-layout";
import { rootRoute } from "@/routes/root-route";

const privateRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "_private",
  component: PrivateLayout,
});

export default privateRoute;
