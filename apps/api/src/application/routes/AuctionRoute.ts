import { createRoute } from '@hono/zod-openapi';
import {
  AuctionDetailSchema,
  AuctionIdParamSchema,
  AuctionListSchema,
  AuctionQueryParamSchema,
  PostAuctionsBodySchema,
  PostAuctionsResponseSchema,
} from '../schemas/AuctionSchema.js';
import { ErrorSchema } from '../schemas/ErrorSchema.js';

// オークション一覧取得用ルート
export const getAuctionsRoute = createRoute({
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

// オークション1件取得用ルート
export const getAuctionByIdRoute = createRoute({
  method: 'get',
  path: '/auctions/{auction_id}',
  description: '指定したオークションを一件取得する',
  request: { params: AuctionIdParamSchema },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: AuctionDetailSchema,
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

// オークション新規作成用ルート
export const postAuctionsRoute = createRoute({
  method: 'post',
  path: '/auctions',
  description: '新規オークションを作成する',
  request: {
    body: {
      content: {
        'application/json': {
          schema: PostAuctionsBodySchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Created',
      content: {
        'application/json': {
          schema: PostAuctionsResponseSchema,
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
