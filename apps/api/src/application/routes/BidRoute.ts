import { createRoute } from '@hono/zod-openapi';
import {
  BidSchema,
  GetBidResponseSchema,
  PostBidBodySchema,
} from '../schemas/BidSchema.js';
import { ErrorSchema } from '../schemas/ErrorSchema.js';
import { StockIdSchema } from '../schemas/StockSchema.js';

// 入札用ルート
export const postBidRoute = createRoute({
  method: 'post',
  path: '/bid',
  description: '入札する',
  request: {
    body: {
      content: {
        'application/json': {
          schema: PostBidBodySchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: BidSchema,
        },
      },
    },
    400: {
      description: 'Bad Request',
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
    },
  },
});

// 最高入札額取得用ルート
export const getBidRoute = createRoute({
  method: 'get',
  path: '/bid/{stock_id}',
  description: '最高入札額を取得する',
  request: {
    params: StockIdSchema,
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: GetBidResponseSchema,
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
});
