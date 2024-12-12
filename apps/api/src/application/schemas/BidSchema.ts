import { z } from '@hono/zod-openapi';

// 入札用JSONボディパラメータ
export const PostBidBodySchema = z.object({
  customer_id: z
    .string()
    .uuid()
    .openapi({ example: 'fdd25989-085e-fc11-31f0-a4a25095a47d' }),
  stock_id: z
    .string()
    .uuid()
    .openapi({ example: '7996ba52-eb36-09da-a21a-978e6cae937f' }),
  price: z.number().int().positive().openapi({ example: 1000 }),
});

// 入札用レスポンス
export const BidSchema = z.object({
  message: z.string().openapi({ example: 'success' }),
  bid_id: z.string().uuid().openapi({ example: '3385f099-f1ed-9603-1454-b34fbb828024' }),
  price: z.number().int().positive().openapi({ example: 1000 }),
});

// 最高入札額取得用レスポンス
export const GetBidResponseSchema = z.object({
  bid_id: z.string().uuid().openapi({ example: '3385f099-f1ed-9603-1454-b34fbb828024' }),
  customer_id: z
    .string()
    .uuid()
    .openapi({ example: 'fdd25989-085e-fc11-31f0-a4a25095a47d' }),
  price: z.number().int().nonnegative().openapi({ example: 1000 }),
});
