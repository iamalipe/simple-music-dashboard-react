// generic-crud.ts

import queryString from "query-string";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import {
  ApiErrorResponse,
  ApiGetAllResponse,
  ApiNormalResponse,
  ApiQueryParams,
} from "@/types/generic-type";

export const genericCRUD = <T, U = T>(
  axiosInstance: AxiosInstance,
  endpoint: string
) => ({
  getAll: async (
    params?: ApiQueryParams<T>,
    config?: AxiosRequestConfig
  ): Promise<ApiGetAllResponse<T>> => {
    try {
      const stringifiedParams = params
        ? queryString.stringify(params, {
            skipEmptyString: true,
            skipNull: true,
          })
        : "";
      const response = await axiosInstance.get<ApiGetAllResponse<T>>(
        `${endpoint}?${stringifiedParams}`,
        config
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data as ApiErrorResponse;
      }
      throw error;
    }
  },

  get: async (
    id: string,
    config?: AxiosRequestConfig
  ): Promise<ApiNormalResponse<T>> => {
    try {
      const response = await axiosInstance.get<ApiNormalResponse<T>>(
        `${endpoint}/${id}`,
        config
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data as ApiErrorResponse;
      }
      throw error;
    }
  },

  create: async (
    data: U,
    config?: AxiosRequestConfig
  ): Promise<ApiNormalResponse<T>> => {
    try {
      const response = await axiosInstance.post<ApiNormalResponse<T>>(
        endpoint,
        data,
        config
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data as ApiErrorResponse;
      }
      throw error;
    }
  },

  update: async (
    id: string,
    data: Partial<U>,
    config?: AxiosRequestConfig
  ): Promise<ApiNormalResponse<T>> => {
    try {
      const response = await axiosInstance.put<ApiNormalResponse<T>>(
        `${endpoint}/${id}`,
        data,
        config
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data as ApiErrorResponse;
      }
      throw error;
    }
  },

  delete: async (
    id: string,
    config?: AxiosRequestConfig
  ): Promise<ApiNormalResponse<void>> => {
    try {
      const response = await axiosInstance.delete<ApiNormalResponse<void>>(
        `${endpoint}/${id}`,
        config
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data as ApiErrorResponse;
      }
      throw error;
    }
  },
});
