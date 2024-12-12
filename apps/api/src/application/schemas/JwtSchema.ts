import { z } from '@hono/zod-openapi';

export const GetAuthJwtResponseSchema = z.object({
  message: z.string().openapi({ example: 'Verified' }),
  customer_id: z
    .string()
    .uuid()
    .openapi({ example: '07c3ce66-bda2-4e10-3752-8665cd96b26d' }),
});
