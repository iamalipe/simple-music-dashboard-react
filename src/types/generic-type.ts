// generic-type.ts
export type ApiValidationError = { message: string; path: string };

export type ApiSortReturn = { orderBy: string; order: string };

export type ApiPaginationReturn = {
  page: number;
  limit: number;
  total: number;
  current: number;
};

export type ApiErrorResponse = {
  success: boolean;
  message: string;
  errors: ApiValidationError[];
};

export type ApiGetAllResponse<T> = {
  success: boolean;
  sort: ApiSortReturn;
  pagination: ApiPaginationReturn;
  data: T[];
};

export type ApiNormalResponse<T> = {
  success: boolean;
  data: T;
};

export type ApiQueryParams<T> = {
  page?: number; // Optional page number
  limit?: number; // Optional limit per page
  orderBy?: keyof T | string; // Can be a key of T or any other string
  order?: "asc" | "desc"; // Optional order direction
  [key: string]: unknown; // Additional key-value pairs
};
