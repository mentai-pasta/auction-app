import { createRoute } from '@hono/zod-openapi';
import { ErrorSchema } from '../schemas/ErrorSchema.js';
import { LoginBodySchema, LoginResponseSchema } from '../schemas/LoginSchema.js';

export const postLoginRoute = createRoute({
  method: 'post',
  path: '/login',
  description: 'カスタマーのログインを行い、JWTトークンを取得する',
  request: {
    body: {
      content: {
        'application/json': {
          schema: LoginBodySchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: LoginResponseSchema,
        },
      },
    },
    401: {
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
    },
  },
});
