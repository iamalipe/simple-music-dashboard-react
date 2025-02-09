import {
  useMutation,
  useQuery,
  useQueryClient,
  queryOptions,
} from "@tanstack/react-query";

import api from "@/api/api";
import { AlbumRawType } from "@/api/album-api";
import { ApiQueryParams } from "@/types/generic-type";
import { queryClient } from "../use-api-query";

export const albumQueryKey = ["album"];

const getAllOptions = (params?: ApiQueryParams) =>
  queryOptions({
    queryKey: [...albumQueryKey, params],
    queryFn: () => api.album.getAll(params),
  });

const getOptions = (id: string) =>
  queryOptions({
    queryKey: [...albumQueryKey, id],
    queryFn: () => api.album.get(id),
  });

export const albumQuery = {
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
      mutationFn: (data: AlbumRawType) => api.album.create(data),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: albumQueryKey }),
    });
  },
  create: async (data: AlbumRawType) => {
    const result = await api.album.create(data);
    queryClient.invalidateQueries({ queryKey: albumQueryKey });
    return result;
  },

  // update
  useUpdate: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: Partial<AlbumRawType> }) =>
        api.album.update(id, data),
      onSuccess: (_, { id }) =>
        queryClient.invalidateQueries({ queryKey: [...albumQueryKey, id] }),
    });
  },
  update: async ({ id, data }: { id: string; data: Partial<AlbumRawType> }) => {
    const result = await api.album.update(id, data);
    queryClient.invalidateQueries({ queryKey: [...albumQueryKey, id] });
    return result;
  },

  // delete
  useDelete: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id: string) => api.album.delete(id),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: albumQueryKey }),
    });
  },
  delete: async (id: string) => {
    const result = await api.album.delete(id);
    queryClient.invalidateQueries({ queryKey: albumQueryKey });
    return result;
  },
};
