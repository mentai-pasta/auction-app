import { z } from '@hono/zod-openapi';
import type { SQLWrapper } from 'drizzle-orm';
import { and, eq, gte, lte } from 'drizzle-orm';
import {
  AuctionIdParamSchema,
  AuctionQueryParamSchema,
} from '../../application/schemas/AuctionSchema.js';
import { auctions } from '../entity/schema.js';
import { db } from '../helper/db.js';
type AuctionQueryParamSchema = z.infer<typeof AuctionQueryParamSchema>;
type AuctionIdParamSchema = z.infer<typeof AuctionIdParamSchema>;

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
}
