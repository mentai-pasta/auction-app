import { z } from '@hono/zod-openapi';

// 画像スキーマ
export const ImageSchema = z.object({
  image_id: z
    .string()
    .uuid()
    .openapi({ example: 'b1db3622-3162-9a45-1742-44c4e3d9105b' }),
  url: z.string().openapi({ example: 'https://auction-stocks.kosuke.dev/P1.png' }),
});

// 画像リストスキーマ
export const ImageListSchema = z.array(ImageSchema).openapi('画像リスト');
