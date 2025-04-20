import { QueryClient } from "@tanstack/react-query";
import "@tanstack/react-query";

import type { ApiErrorResponse } from "@/types/generic-type";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: ApiErrorResponse | Error;
  }
}

// Create and export queryClient first to avoid circular dependencies
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
    mutations: {
      retry: false,
    },
  },
});

// Import query modules after exporting queryClient
import { genreQuery } from "./api-query/genre-query";
import { artistQuery } from "./api-query/artist-query";
import { authQuery } from "./api-query/auth-query";

const apiQuery = {
  genre: genreQuery(queryClient),
  artist: artistQuery(queryClient),
  auth: authQuery(queryClient),
};

export type ApiQuery = typeof apiQuery;

export default apiQuery;
