import { z } from '@hono/zod-openapi';

export const GetAuthJwtResponseSchema = z.object({
  message: z.string().openapi({ example: 'Verified' }),
});
