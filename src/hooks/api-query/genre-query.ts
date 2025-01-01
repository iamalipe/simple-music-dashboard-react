import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import api from "@/api/api";
import { GenreRawType, GenreType } from "@/api/genre-api";
import { ApiQueryParams } from "@/types/generic-type";

export const genreQueryKey = ["genre"];

export const genreQuery = {
  useGetAll: (params?: ApiQueryParams<GenreType>) => {
    return useQuery({
      queryKey: [...genreQueryKey, params],
      queryFn: () => api.genre.getAll(params),
    });
  },

  useGet: (id: string) => {
    return useQuery({
      queryKey: [...genreQueryKey, id],
      queryFn: () => api.genre.get(id),
    });
  },

  useCreate: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data: GenreRawType) => api.genre.create(data),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: genreQueryKey }),
    });
  },

  useUpdate: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: Partial<GenreRawType> }) =>
        api.genre.update(id, data),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: genreQueryKey }),
    });
  },

  useDelete: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id: string) => api.genre.delete(id),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: genreQueryKey }),
    });
  },
};
