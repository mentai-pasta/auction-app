import { createRoute } from '@hono/zod-openapi';
import { AuctionListSchema, AuctionQueryParamSchema } from '../schemas/AuctionSchema.js';

export const getAuctionRoute = createRoute({
  method: 'get',
  path: '/auctions',
  description: 'オークション一覧を取得する',
  request: { query: AuctionQueryParamSchema },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: AuctionListSchema,
        },
      },
    },
  },
});
