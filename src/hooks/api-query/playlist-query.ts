import {
  useMutation,
  useQuery,
  useQueryClient,
  queryOptions,
} from "@tanstack/react-query";

import api from "@/api/api";
import { PlaylistRawType } from "@/api/playlist-api";
import { ApiQueryParams } from "@/types/generic-type";
import { queryClient } from "../use-api-query";

export const playlistQueryKey = ["playlist"];

const getAllOptions = (params?: ApiQueryParams) =>
  queryOptions({
    queryKey: [...playlistQueryKey, params],
    queryFn: () => api.playlist.getAll(params),
  });

const getOptions = (id: string) =>
  queryOptions({
    queryKey: [...playlistQueryKey, id],
    queryFn: () => api.playlist.get(id),
  });

export const playlistQuery = {
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
      mutationFn: (data: PlaylistRawType) => api.playlist.create(data),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: playlistQueryKey }),
    });
  },
  create: async (data: PlaylistRawType) => {
    const result = await api.playlist.create(data);
    queryClient.invalidateQueries({ queryKey: playlistQueryKey });
    return result;
  },

  // update
  useUpdate: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({
        id,
        data,
      }: {
        id: string;
        data: Partial<PlaylistRawType>;
      }) => api.playlist.update(id, data),
      onSuccess: (_, { id }) =>
        queryClient.invalidateQueries({ queryKey: [...playlistQueryKey, id] }),
    });
  },
  update: async ({
    id,
    data,
  }: {
    id: string;
    data: Partial<PlaylistRawType>;
  }) => {
    const result = await api.playlist.update(id, data);
    queryClient.invalidateQueries({ queryKey: [...playlistQueryKey, id] });
    return result;
  },

  // delete
  useDelete: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id: string) => api.playlist.delete(id),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: playlistQueryKey }),
    });
  },
  delete: async (id: string) => {
    const result = await api.playlist.delete(id);
    queryClient.invalidateQueries({ queryKey: playlistQueryKey });
    return result;
  },
};
