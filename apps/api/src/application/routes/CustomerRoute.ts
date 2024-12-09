import { createRoute } from '@hono/zod-openapi';
import {
  PostCustomerBodySchema,
  PostCustomerResponseSchema,
} from '../schemas/CustomerSchema.js';
import { ErrorSchema } from '../schemas/ErrorSchema.js';

// 顧客新規登録用ルート
export const postCustomerRoute = createRoute({
  method: 'post',
  path: '/customers',
  description: '新規顧客を登録する',
  request: {
    body: {
      content: {
        'application/json': {
          schema: PostCustomerBodySchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: PostCustomerResponseSchema,
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
