import { createRoute } from '@hono/zod-openapi';
import { ErrorSchema } from '../schemas/ErrorSchema.js';
import {
  StockIdSchema,
  StockListResponseSchema,
  StockQuerySchema,
  StockResponseSchema,
} from '../schemas/StockSchema.js';

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

// 商品一件取得用ルート
export const getStockByIdRoute = createRoute({
  method: 'get',
  path: '/stocks/{stock_id}',
  description: '商品一件を取得する',
  request: { params: StockIdSchema },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: StockResponseSchema,
        },
      },
    },
    404: {
      description: 'Not Found',
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
    },
  },
});
