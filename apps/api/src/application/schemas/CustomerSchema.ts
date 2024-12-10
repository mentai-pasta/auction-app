import { z } from '@hono/zod-openapi';

export const CustomerSchema = z.object({
  customer_id: z
    .string()
    .uuid()
    .openapi({ example: 'fdd25989-085e-fc11-31f0-a4a25095a47d' }),
  name: z.string().openapi({ example: '波留太郎' }),
  email: z.string().email().openapi({ example: 'sample@email.com' }),
  password_hash: z
    .string()
    .openapi({ example: '9f738ce8457f291b18ee47e665e96baa84f38fcd' }),
  prefecture: z.string().optional().openapi({ example: '東京都' }),
  city: z.string().optional().openapi({ example: '渋谷区' }),
  address: z.string().optional().openapi({ example: '渋谷1-1-1' }),
  postcode: z
    .string()
    .length(7)
    .regex(/^[0-9]{7}$/)
    .optional()
    .openapi({ example: '1500002' }),
  created_at: z.string().datetime().openapi({ example: '2024-11-05 12:00' }),
  updated_at: z.string().datetime().openapi({ example: '2024-11-05 12:00' }),
});

export const PostCustomerBodySchema = z.object({
  name: z.string().openapi({ example: '波留太郎' }),
  email: z.string().email().openapi({ example: 'sample@email.com' }),
  password: z.string().openapi({ example: 'passwordhogehoge' }),
  prefecture: z.string().optional().openapi({ example: '東京都' }),
  city: z.string().optional().openapi({ example: '渋谷区' }),
  address: z.string().optional().openapi({ example: '渋谷1-1-1' }),
  postcode: z
    .string()
    .length(7)
    .regex(/^[0-9]{7}$/)
    .optional()
    .openapi({ example: '1500002' }),
});

export const PostCustomerResponseSchema = z.object({
  customer_id: z
    .string()
    .uuid()
    .openapi({ example: 'fdd25989-085e-fc11-31f0-a4a25095a47d' }),
  name: z.string().openapi({ example: '波留太郎' }),
  email: z.string().email().openapi({ example: 'sample@email.com' }),
});
