import { z } from '@hono/zod-openapi';
import type { SQLWrapper } from 'drizzle-orm';
import { and, eq } from 'drizzle-orm';
import { StockQuerySchema } from '../../application/schemas/StockSchema.js';
import { stocks } from '../entity/schema.js';
import { db } from '../helper/db.js';
type StockQuerySchema = z.infer<typeof StockQuerySchema>;

export class StockRepository {
  async getStocks(query: StockQuerySchema) {
    const { auction_id, sold_status_id, limit } = query;
    const filters: SQLWrapper[] = [];

    if (auction_id) {
      filters.push(eq(stocks.auctionId, auction_id));
    }

    if (sold_status_id) {
      filters.push(eq(stocks.soldStatusId, sold_status_id));
    }

    const result = await db.query.stocks.findMany({
      with: {
        soldStatus: true,
        vehicle: {
          with: {
            series: {
              with: {
                manufacturer: true,
              },
            },
          },
        },
      },
      where: and(...filters),
      limit: limit,
    });

    return result;
  }
}
