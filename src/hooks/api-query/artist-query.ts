import {
  useMutation,
  useQuery,
  useQueryClient,
  queryOptions,
} from "@tanstack/react-query";

import api from "@/api/api";
import { ArtistType, ArtistRawType } from "./../../api/artist-api";
import { ApiQueryParams } from "@/types/generic-type";
import { queryClient } from "../use-api-query";

export const artistQueryKey = ["artist"];

const getAllOptions = (params?: ApiQueryParams<ArtistType>) =>
  queryOptions({
    queryKey: [...artistQueryKey, params],
    queryFn: () => api.artist.getAll(params),
  });

const getOptions = (id: string) =>
  queryOptions({
    queryKey: [...artistQueryKey, id],
    queryFn: () => api.artist.get(id),
  });

export const artistQuery = {
  // getAll
  getAllOptions,
  getAll: (params?: ApiQueryParams<ArtistType>) =>
    queryClient.fetchQuery(getAllOptions(params)),
  useGetAll: (params?: ApiQueryParams<ArtistType>) =>
    useQuery(getAllOptions(params)),

  // get
  getOptions,
  get: (id: string) => queryClient.fetchQuery(getOptions(id)),
  useGet: (id: string) => useQuery(getOptions(id)),

  // create
  useCreate: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data: ArtistRawType) => api.artist.create(data),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: artistQueryKey }),
    });
  },
  create: async (data: ArtistRawType) => {
    const result = await api.artist.create(data);
    queryClient.invalidateQueries({ queryKey: artistQueryKey });
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
        data: Partial<ArtistRawType>;
      }) => api.artist.update(id, data),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: artistQueryKey }),
    });
  },
  update: async ({
    id,
    data,
  }: {
    id: string;
    data: Partial<ArtistRawType>;
  }) => {
    const result = await api.artist.update(id, data);
    queryClient.invalidateQueries({ queryKey: artistQueryKey });
    return result;
  },

  // delete
  useDelete: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id: string) => api.artist.delete(id),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: artistQueryKey }),
    });
  },
  delete: async (id: string) => {
    const result = await api.artist.delete(id);
    queryClient.invalidateQueries({ queryKey: artistQueryKey });
    return result;
  },
};
