// auth-api.ts
import { ApiErrorResponse } from "@/types/generic-type";
import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginReturn = {
  success: boolean;
};

export type RegisterPayload = {
  email: string;
  password: string;
};

export type RegisterReturn = {
  success: boolean;
};

export type CurrentUser = {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};
export type CurrentUserReturn = {
  success: boolean;
  data: CurrentUser;
};

// Module-specific APIs
export const authAPI = (axiosInstance: AxiosInstance) => ({
  login: async (
    data: LoginPayload,
    config?: AxiosRequestConfig
  ): Promise<LoginReturn> => {
    try {
      const response = await axiosInstance.post<LoginReturn>(
        "/auth/login",
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

  register: async (
    data: RegisterPayload,
    config?: AxiosRequestConfig
  ): Promise<RegisterReturn> => {
    try {
      const response = await axiosInstance.post<RegisterReturn>(
        "/auth/register",
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

  me: async (
    config?: AxiosRequestConfig
  ): Promise<CurrentUserReturn | null> => {
    try {
      // const stringifiedParams = params ? qString(params) : "";
      const response = await axiosInstance.get<CurrentUserReturn>(
        `/auth/me`,
        config
      );
      return response.data;
    } catch {
      // if (axios.isAxiosError(error) && error.response) {
      //   throw error.response.data as ApiErrorResponse;
      // }
      // throw error;
      return null;
    }
  },
});
