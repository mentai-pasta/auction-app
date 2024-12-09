import { createRoute } from '@hono/zod-openapi';
import { StockListResponseSchema, StockQuerySchema } from '../schemas/StockSchema.js';

// 商品一覧取得用ルート
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
          schema: StockListResponseSchema,
        },
      },
    },
  },
});