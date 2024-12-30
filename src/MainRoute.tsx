import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateLayout from "@/private-pages/private-layout";
import HomePage from "@/private-pages/home-page/home-page";
import UserPage from "@/private-pages/user-page/user-page";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

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
      </QueryClientProvider>
    </>
  );
};

export default MainRoute;
