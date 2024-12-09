import { createRoute } from '@hono/zod-openapi';
import { BidSchema, PostBidBodySchema } from '../schemas/BidSchema.js';
import { ErrorSchema } from '../schemas/ErrorSchema.js';

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
