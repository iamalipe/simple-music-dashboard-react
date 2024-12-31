import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { queryClient } from "@/hooks/use-api-query";
import PrivateLayout from "@/private-pages/private-layout";

// NOTE: import pages
import HomePage from "@/private-pages/home-page/home-page";
import UserPage from "@/private-pages/user-page/user-page";
import GenrePage from "@/private-pages/genre-page/genre-page";
import { QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <PrivateLayout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/user",
          element: <UserPage />,
        },
        {
          path: "/genre",
          element: <GenrePage />,
        },
      ],
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

const MainRoute = () => {
  // NOTE any provider can be added here
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider
          future={{
            v7_startTransition: true,
          }}
          router={router}
        />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default MainRoute;
