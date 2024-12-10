import { z } from '@hono/zod-openapi';

export const GetAuthJwtRequestSchema = z.object({
  token: z.string().openapi({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6ImZkZDI1OTg5LTA4NWUtZmMxMS0zMWYwLWE0YTI1MDk1YTQ3ZCIsImN1c3RvbWVyX25hbWUiOiLms6LnlZnlpKrpg44iLCJlbWFpbCI6InNhbXBsZTFAZ21haWwuY29tIiwiZXhwIjoxNzMzNTc4ODAwfQ.30fV5Vj7ZMYj7F3c_Kc45bsgbVpuj6KH0YSA2vio8ys',
  }),
});

export const GetAuthJwtResponseSchema = z.object({
  message: z.string().openapi({ example: 'Verified' }),
});
