import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";

import { queryClient } from "@/hooks/use-api-query";
import PrivateLayout from "@/private-pages/private-layout";

// NOTE: import pages
import HomePage from "@/private-pages/home-page/home-page";
import UserPage from "@/private-pages/user-page/user-page";
import GenrePage from "@/private-pages/genre-page/genre-page";

const MainRoute = () => {
  // NOTE any provider can be added here
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PrivateLayout />}>
              <Route index element={<HomePage />} />
              <Route path="/user" element={<UserPage />} />
              <Route path="/genre" element={<GenrePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default MainRoute;
