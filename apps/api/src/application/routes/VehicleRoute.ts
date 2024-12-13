import { createRoute } from '@hono/zod-openapi';
import { ErrorSchema } from '../schemas/ErrorSchema.js';
import {
  PostVehicleBodySchema,
  PostVehicleResponseSchema,
} from '../schemas/VehicleSchema.js';

export const postVehiclesRoute = createRoute({
  method: 'post',
  path: '/vehicles',
  description: '車両を新規登録する',
  request: {
    body: {
      content: {
        'application/json': {
          schema: PostVehicleBodySchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: PostVehicleResponseSchema,
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
