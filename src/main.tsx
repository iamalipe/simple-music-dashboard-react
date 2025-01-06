import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";

import "@/style/index.css";
import "@/style/custom.css";

import { routeTree } from "@/routeTree.gen";
import apiQuery, { queryClient } from "./hooks/use-api-query";
import api from "./api/api";

const router = createRouter({
  routeTree: routeTree,
  context: {
    apiQuery: apiQuery,
    api: api,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    // <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    // </StrictMode>
  );
}
