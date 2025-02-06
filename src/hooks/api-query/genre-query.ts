import {
  useMutation,
  useQuery,
  useQueryClient,
  queryOptions,
} from "@tanstack/react-query";

import api from "@/api/api";
import { GenreRawType } from "@/api/genre-api";
import { ApiQueryParams } from "@/types/generic-type";
import { queryClient } from "../use-api-query";

export const genreQueryKey = ["genre"];

const getAllOptions = (params?: ApiQueryParams) =>
  queryOptions({
    queryKey: [...genreQueryKey, params],
    queryFn: () => api.genre.getAll(params),
  });

const getOptions = (id: string) =>
  queryOptions({
    queryKey: [...genreQueryKey, id],
    queryFn: () => api.genre.get(id),
  });

export const genreQuery = {
  // getAll
  getAllOptions,
  getAll: (params?: ApiQueryParams) =>
    queryClient.fetchQuery(getAllOptions(params)),
  useGetAll: (params?: ApiQueryParams) => useQuery(getAllOptions(params)),

  // get
  getOptions,
  get: (id: string) => queryClient.fetchQuery(getOptions(id)),
  useGet: (id: string) => useQuery(getOptions(id)),

  // create
  useCreate: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data: GenreRawType) => api.genre.create(data),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: genreQueryKey }),
    });
  },
  create: async (data: GenreRawType) => {
    const result = await api.genre.create(data);
    queryClient.invalidateQueries({ queryKey: genreQueryKey });
    return result;
  },

  // update
  useUpdate: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: Partial<GenreRawType> }) =>
        api.genre.update(id, data),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: genreQueryKey }),
    });
  },
  update: async ({ id, data }: { id: string; data: Partial<GenreRawType> }) => {
    const result = await api.genre.update(id, data);
    queryClient.invalidateQueries({ queryKey: genreQueryKey });
    return result;
  },

  // delete
  useDelete: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id: string) => api.genre.delete(id),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: genreQueryKey }),
    });
  },
  delete: async (id: string) => {
    const result = await api.genre.delete(id);
    queryClient.invalidateQueries({ queryKey: genreQueryKey });
    return result;
  },
};
