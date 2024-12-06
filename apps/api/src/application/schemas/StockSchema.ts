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

export const StockListSchema = z.array(StockSchema).openapi('StockListSchema');

export const StockIdParamSchema = z.object({
  stock_id: z
    .string()
    .uuid()
    .openapi({ example: '7996ba52-eb36-09da-a21a-978e6cae937f' }),
});