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

export const sortZodSchema = z.object({
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
    .transform((val) => (val === "" || val === undefined ? "createdAt" : val))
    .default("createdAt"),
});
