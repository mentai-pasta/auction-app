import { z } from '@hono/zod-openapi';

export const StockSchema = z.object({
  stock_id: z
    .string()
    .uuid()
    .openapi({ example: '7996ba52-eb36-09da-a21a-978e6cae937f' }),
  vehicle_id: z
    .string()
    .uuid()
    .openapi({ example: '07c3ce66-bda2-4e10-3752-8665cd96b26d' }),
  sold_status_id: z
    .string()
    .uuid()
    .openapi({ example: 'c1ef68d4-4675-49c5-63dc-4adc52284d82' }),
  begin_time: z.string().datetime().openapi({ example: '2024-11-10 12:00' }),
  created_at: z.string().datetime().openapi({ example: '2024-11-05 12:00' }),
  updated_at: z.string().datetime().openapi({ example: '2024-11-05 12:00' }),
});

export const StockQuerySchema = z.object({
  auction_id: z
    .string()
    .uuid()
    .optional()
    .openapi({ example: '7996ba52-eb36-09da-a21a-978e6cae937f' }),
  series_id: z
    .string()
    .uuid()
    .optional()
    .openapi({ example: '4b8dd422-f42b-6a62-63fd-4b1d215f6db6' }),
  manufacturer_id: z
    .string()
    .uuid()
    .optional()
    .openapi({ example: 'ef532ea5-0aaf-b4a8-b93c-2b3e83adb7aa' }),
  sold_status_id: z
    .string()
    .uuid()
    .optional()
    .openapi({ example: 'c1ef68d4-4675-49c5-63dc-4adc52284d82' }),
  limit: z
    .string()
    .pipe(z.coerce.number().int().positive())
    .optional()
    .openapi({ example: '5' }),
});

export const StockResponseSchema = z.object({
  stock_id: z
    .string()
    .uuid()
    .openapi({ example: '7996ba52-eb36-09da-a21a-978e6cae937f' }),
  auction_id: z
    .string()
    .uuid()
    .openapi({ example: '7996ba52-eb36-09da-a21a-978e6cae937f' }),
  vehicle_id: z
    .string()
    .uuid()
    .openapi({ example: '7996ba52-eb36-09da-a21a-978e6cae937f' }),
  manufacturer_id: z
    .string()
    .uuid()
    .openapi({ example: 'ef532ea5-0aaf-b4a8-b93c-2b3e83adb7aa' }),
  manufacturer_name: z.string().openapi({ example: 'ホンダ' }),
  series_id: z
    .string()
    .uuid()
    .openapi({ example: '4b8dd422-f42b-6a62-63fd-4b1d215f6db6' }),
  series_name: z.string().openapi({ example: 'N-BOX' }),
  sold_status_id: z
    .string()
    .uuid()
    .openapi({ example: '5e1a6f97-72b8-81fa-2e7d-39cc54d982d4' }),
  sold_states_name: z.string().uuid().openapi({ example: '入札開始前' }),
  begin_date: z.string().datetime().openapi({ example: '2024-11-05 12:00' }),
  created_at: z.string().datetime().openapi({ example: '2024-11-05 12:00' }),
  updated_at: z.string().datetime().openapi({ example: '2024-11-05 12:00' }),
});

export const StockListSchema = z.array(StockSchema).openapi('StockListSchema');
export const StockListResponseSchema = z
  .array(StockResponseSchema)
  .openapi('StockListSchema');
