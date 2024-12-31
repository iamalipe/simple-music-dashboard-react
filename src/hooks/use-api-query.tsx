import { QueryClient } from "@tanstack/react-query";
import { genreQuery } from "./api-query/genre-query";

import "@tanstack/react-query";
import { ApiErrorResponse } from "@/types/generic-type";

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
};

export default apiQuery;
