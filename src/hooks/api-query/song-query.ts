import {
  useMutation,
  useQuery,
  useQueryClient,
  queryOptions,
} from "@tanstack/react-query";

import api from "@/api/api";
import { SongRawType } from "@/api/song-api";
import { ApiQueryParams } from "@/types/generic-type";
import { queryClient } from "../use-api-query";

export const songQueryKey = ["song"];

const getAllOptions = (params?: ApiQueryParams) =>
  queryOptions({
    queryKey: [...songQueryKey, params],
    queryFn: () => api.song.getAll(params),
  });

const getOptions = (id: string) =>
  queryOptions({
    queryKey: [...songQueryKey, id],
    queryFn: () => api.song.get(id),
  });

export const songQuery = {
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
      mutationFn: (data: SongRawType) => api.song.create(data),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: songQueryKey }),
    });
  },
  create: async (data: SongRawType) => {
    const result = await api.song.create(data);
    queryClient.invalidateQueries({ queryKey: songQueryKey });
    return result;
  },

  // update
  useUpdate: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: Partial<SongRawType> }) =>
        api.song.update(id, data),
      onSuccess: (_, { id }) =>
        queryClient.invalidateQueries({ queryKey: [...songQueryKey, id] }),
    });
  },
  update: async ({ id, data }: { id: string; data: Partial<SongRawType> }) => {
    const result = await api.song.update(id, data);
    queryClient.invalidateQueries({ queryKey: [...songQueryKey, id] });
    return result;
  },

  // delete
  useDelete: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id: string) => api.song.delete(id),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: songQueryKey }),
    });
  },
  delete: async (id: string) => {
    const result = await api.song.delete(id);
    queryClient.invalidateQueries({ queryKey: songQueryKey });
    return result;
  },
};
