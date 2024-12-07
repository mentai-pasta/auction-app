import { z } from '@hono/zod-openapi';

export const LoginBodySchema = z.object({
  email: z.string().email().openapi({ example: 'hogehoge@email.com' }),
  password: z.string().openapi({ example: 'password' }),
});

export const LoginResponseSchema = z.object({
  token: z.string().openapi({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6ImZkZDI1OTg5LTA4NWUtZmMxMS0zMWYwLWE0YTI1MDk1YTQ3ZCIsImN1c3RvbWVyX25hbWUiOiLms6LnlZnlpKrpg44iLCJlbWFpbCI6InNhbXBsZTFAZ21haWwuY29tIiwiZXhwIjoxNzMzNTc4ODAwfQ.30fV5Vj7ZMYj7F3c_Kc45bsgbVpuj6KH0YSA2vio8ys',
  }),
  created_at: z.string().datetime().openapi({ example: '2024-11-05 12:00' }),
  updated_at: z.string().datetime().openapi({ example: '2024-11-05 12:00' }),
});
