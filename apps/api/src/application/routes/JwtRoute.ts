import { createRoute } from '@hono/zod-openapi';
import { ErrorSchema } from '../schemas/ErrorSchema.js';
import { GetAuthJwtResponseSchema } from '../schemas/JwtSchema.js';

export const getVerifyJwtRoute = createRoute({
  method: 'get',
  path: '/verify',
  description: 'JWTの検証を行う',
  request: {},
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
