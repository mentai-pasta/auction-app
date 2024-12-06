import { createRoute } from '@hono/zod-openapi';
import { AuctionListSchema, AuctionQueryParamSchema } from '../schemas/AuctionSchema.js';
import { StockQuerySchema ,StockResponseSchema} from '../schemas/StockSchema.js';

export const getStocksRoute = createRoute({
  method: 'get',
  path: '/stocks',
  description: '商品一覧を取得する',
  request: { query: StockQuerySchema },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: StockResponseSchema,
        },
      },
    },
  },
});
