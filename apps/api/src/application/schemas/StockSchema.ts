import { z } from '@hono/zod-openapi';

// オークション一覧取得用商品スキーマ
export const StockIdSchema = z.object({
  stock_id: z
    .string()
    .uuid()
    .openapi({ example: '7996ba52-eb36-09da-a21a-978e6cae937f' }),
});

// オークション一件取得用商品スキーマ
export const StockSchema = z.object({
  stock_id: z
    .string()
    .uuid()
    .openapi({ example: '7996ba52-eb36-09da-a21a-978e6cae937f' }),
  vehicle_id: z
    .string()
    .uuid()
    .openapi({ example: 'c1ef68d4-4675-49c5-63dc-4adc52284d82' }),
  series_id: z
    .string()
    .uuid()
    .openapi({ example: '4b8dd422-f42b-6a62-63fd-4b1d215f6db6' }),
  series_name: z.string().openapi({ example: 'N-BOX' }),
  manufacturers_id: z
    .string()
    .uuid()
    .openapi({ example: 'ef532ea5-0aaf-b4a8-b93c-2b3e83adb7aa' }),
  manufacturers_name: z.string().openapi({ example: 'ホンダ' }),
  sold_status_id: z
    .string()
    .uuid()
    .openapi({ example: '5e1a6f97-72b8-81fa-2e7d-39cc54d982d4' }),
  sold_status_name: z.string().openapi({ example: '入札開始前' }),
  begin_date: z.string().datetime().openapi({ example: '2024-11-10 12:00' }),
  created_at: z.string().datetime().openapi({ example: '2024-11-05 12:00' }),
  updated_at: z.string().datetime().openapi({ example: '2024-11-05 12:00' }),
});

// スキーマのリスト定義
export const StockIdListSchema = z.array(StockIdSchema).openapi('StockIdListSchema');
export const StockListSchema = z.array(StockSchema).openapi('StockListSchema');
