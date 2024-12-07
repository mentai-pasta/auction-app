import { z } from '@hono/zod-openapi';

export const ErrorSchema = z.object({
  message: z.string().openapi({ example: 'Not Found' }),
  stackTrace: z.string().optional().openapi({
    example:
      'Error: Not Found\n    at Function.getAuctionByIdRoute [as handler] (/app/src/application/routes/AuctionRoute.ts:23:13)\n    at processTicksAndRejections (internal/process/task_queues.js:95:5)',
  }),
});

export const ErrorBidSchema = z.object({
  message: z.string().openapi({ example: 'low bid price' }),
  customer_id: z
    .string()
    .uuid()
    .openapi({ example: 'fdd25989-085e-fc11-31f0-a4a25095a47d' }),
  max_price: z.number().int().nonnegative().openapi({ example: 100000 }),
});
