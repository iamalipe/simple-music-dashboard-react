import { z } from "zod";

export const paginationZodSchema = z
  .object({
    page: z.number().min(0).optional().default(1),
    limit: z.number().min(1).max(100).optional().default(10),
  })
  .transform((data) => {
    // Remove default values to return undefined for them
    const result: { page?: number; limit?: number } = {};
    if (data.page !== 1) {
      result.page = data.page;
    }
    if (data.limit !== 10) {
      result.limit = data.limit;
    }
    return result;
  });

export type paginationZodSchemaType = z.infer<typeof paginationZodSchema>;

export const sortArrayZodSchema = z
  .array(
    z.object({
      order: z
        .string()
        .optional()
        .refine((val) => !val || ["asc", "desc"].includes(val), {
          message: "Order must be 'asc' or 'desc'",
        })
        .transform((val) => (val === "" || val === undefined ? "desc" : val))
        .default("desc"),
      orderBy: z
        .string()
        .optional()
        .transform((val) =>
          val === "" || val === undefined ? "createdAt" : val
        )
        .default("createdAt"),
    })
  )
  .transform((val) =>
    val.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.orderBy === item.orderBy)
    )
  )
  .default([]);

export type sortArrayZodSchemaType = z.infer<typeof sortArrayZodSchema>;

export const getAllZodSchema = z
  .object({
    page: z.number().min(0).optional().default(1),
    limit: z.number().min(1).max(100).optional().default(10),
    sort: sortArrayZodSchema,
  })
  .transform((data) => {
    // Remove default values to return undefined for them
    const result: {
      page?: number;
      limit?: number;
      sort?: sortArrayZodSchemaType;
    } = {};

    if (data.page !== 1) {
      result.page = data.page;
    }
    if (Array.isArray(data.sort) && data.sort.length > 0) {
      result.sort = data.sort;
    }
    if (data.limit !== 10) {
      result.limit = data.limit;
    }
    return result;
  });
