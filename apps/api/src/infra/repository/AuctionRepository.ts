import { z } from '@hono/zod-openapi';
import type { SQLWrapper } from 'drizzle-orm';
import { and, gte, lte } from 'drizzle-orm';
import { AuctionQueryParamSchema } from '../../application/schemas/AuctionSchema.js';
import { auctions } from '../entity/schema.js';
import { db } from '../helper/db.js';
type AuctionQueryParamSchema = z.infer<typeof AuctionQueryParamSchema>;

export class AuctionRepository {
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
}
