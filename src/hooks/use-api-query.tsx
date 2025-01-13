import { QueryClient } from "@tanstack/react-query";
import "@tanstack/react-query";

import type { ApiErrorResponse } from "@/types/generic-type";

// import all api-query
import { genreQuery } from "./api-query/genre-query";
import { artistQuery } from "./api-query/artist-query";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: ApiErrorResponse | Error;
  }
}

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

const apiQuery = {
  genre: genreQuery,
  artist: artistQuery,
};

export type ApiQuery = typeof apiQuery;

export default apiQuery;
