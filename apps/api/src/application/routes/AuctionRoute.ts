import { createRoute } from '@hono/zod-openapi';
import { AuctionListSchema, AuctionQueryParamSchema } from '../schemas/AuctionSchema.js';
import { StockIdParamSchema } from '../schemas/StockSchema.js';

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
export const getAuction1item = createRoute({
  method: 'get',
  path: '/stocks/{stock_id}',
  description: '商品一件を取得する',
  request: { query: StockIdParamSchema },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: StockRsponseSchema,
        },
      },
    },
  },
})