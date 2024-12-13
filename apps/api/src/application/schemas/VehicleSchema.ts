import { z } from '@hono/zod-openapi';

// 車両スキーマ
export const VehicleSchema = z.object({
  vehicle_id: z
    .string()
    .uuid()
    .openapi({ example: 'c1ef68d4-4675-49c5-63dc-4adc52284d82' }),
  series_id: z
    .string()
    .uuid()
    .openapi({ example: '4b8dd422-f42b-6a62-63fd-4b1d215f6db6' }),
  employee_id: z
    .string()
    .uuid()
    .openapi({ example: 'cd6c194b-aecb-8bac-c7cf-ad569ee9d5ea' }),
  created_at: z.string().datetime().openapi({ example: '2024-11-05 12:00:00' }),
  updated_at: z.string().datetime().openapi({ example: '2024-11-05 12:00:00' }),
});

// 車両新規登録用リクエストスキーマ
export const PostVehicleBodySchema = z.object({
  series_id: z
    .string()
    .uuid()
    .openapi({ example: '4b8dd422-f42b-6a62-63fd-4b1d215f6db6' }),
  employee_id: z
    .string()
    .uuid()
    .openapi({ example: 'cd6c194b-aecb-8bac-c7cf-ad569ee9d5ea' }),
});

// 車両新規登録用レスポンススキーマ
export const PostVehicleResponseSchema = z.object({
  message: z.string().openapi({ example: 'OK' }),
  vehicle_id: z
    .string()
    .uuid()
    .openapi({ example: 'c1ef68d4-4675-49c5-63dc-4adc52284d82' }),
});
