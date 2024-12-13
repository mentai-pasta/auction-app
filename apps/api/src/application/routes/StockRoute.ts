import { createRoute } from '@hono/zod-openapi';
import { ErrorSchema } from '../schemas/ErrorSchema.js';
import {
  PostStocksBodySchema,
  PostStocksResponseSchema,
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
  tags: ['商品'],
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
  tags: ['商品'],
});

// 商品新規登録用ルート
export const postStocksRoute = createRoute({
  method: 'post',
  path: '/stocks',
  description: '商品を新規登録する',
  request: {
    body: {
      content: {
        'application/json': {
          schema: PostStocksBodySchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Created',
      content: {
        'application/json': {
          schema: PostStocksResponseSchema,
        },
      },
    },
    500: {
      description: 'Internal Server Error',
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
    },
  },
  tags: ['商品'],
});
