import { z } from '@hono/zod-openapi';
import { StockListSchema } from './StockSchema.js';

export const AuctionQueryParamSchema = z.object({
  start_date: z
    .string()
    .date()
    .optional()
    .openapi({ param: { name: 'start_date', in: 'query', example: '2024-11-5' } }),
  end_date: z
    .string()
    .date()
    .optional()
    .openapi({ param: { name: 'end_date', in: 'query', example: '2024-11-10' } }),
  limit: z
    .string()
    .pipe(z.coerce.number().int().positive())
    .optional()
    .openapi({
      type: 'integer',
      param: { name: 'limit', in: 'query', example: '5' },
    }),
});

export const AuctionSchema = z.object({
  auction_id: z
    .string()
    .uuid()
    .openapi({ example: '07c3ce66-bda2-4e10-3752-8665cd96b26d' }),
  stock_list: StockListSchema,
  duration: z.number().int().positive().openapi({ example: 30 }),
  begin_date: z.string().datetime().openapi({ example: '2024-11-5 12:00' }),
});

export const AuctionListSchema = z.array(AuctionSchema).openapi('AuctionListSchema');
