import { z } from '@hono/zod-openapi';
import type { SQLWrapper } from 'drizzle-orm';
import { and, eq, gte, lte } from 'drizzle-orm';
import {
  AuctionIdParamSchema,
  AuctionQueryParamSchema,
  PostAuctionsBodySchema,
} from '../../application/schemas/AuctionSchema.js';
import { auctions } from '../entity/schema.js';
import { db } from '../helper/db.js';
type AuctionQueryParamSchema = z.infer<typeof AuctionQueryParamSchema>;
type AuctionIdParamSchema = z.infer<typeof AuctionIdParamSchema>;
type PostAuctionsBodySchema = z.infer<typeof PostAuctionsBodySchema>;

export class AuctionRepository {
  // オークション一覧取得
  async getAuctions(query: AuctionQueryParamSchema) {
    const { start_date, end_date, limit } = query;
    const filters: SQLWrapper[] = [];

    if (start_date) {
      filters.push(gte(auctions.beginTime, start_date));
    }

    if (end_date) {
      filters.push(lte(auctions.beginTime, end_date));
    }

    const result = await db.query.auctions.findMany({
      with: {
        stocks: true,
      },
      where: and(...filters),
      limit: limit,
    });

    return result;
  }

  // オークション1件取得
  async getAuctionById(path: AuctionIdParamSchema) {
    const result = await db.query.auctions.findFirst({
      with: {
        stocks: {
          with: {
            imagesStocks: {
              with: {
                image: true,
              },
            },
            vehicle: {
              with: {
                series: {
                  with: {
                    manufacturer: true,
                  },
                },
              },
            },
            soldStatus: true,
          },
        },
      },
      where: eq(auctions.auctionId, path.auction_id),
    });

    return result;
  }

  // オークション新規作成
  async createAuction(body: PostAuctionsBodySchema) {
    const result = await db
      .insert(auctions)
      .values({
        employeeId: body.employee_id,
        duration: body.duration,
        beginTime: body.begin_time,
      })
      .returning({
        insertId: auctions.auctionId,
      });

    return {
      auction_id: result[0].insertId,
    };
  }
}
