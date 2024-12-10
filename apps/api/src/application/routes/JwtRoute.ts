import { createRoute } from '@hono/zod-openapi';
import { ErrorSchema } from '../schemas/ErrorSchema.js';
import {
  GetAuthJwtRequestSchema,
  GetAuthJwtResponseSchema,
} from '../schemas/JwtSchema.js';

export const postVerifyJwtRoute = createRoute({
  method: 'post',
  path: '/verify',
  description: 'JWTの検証を行う',
  request: {
    body: {
      content: {
        'application/json': {
          schema: GetAuthJwtRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: GetAuthJwtResponseSchema,
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
