import { z } from '@hono/zod-openapi';
import type { SQLWrapper } from 'drizzle-orm';
import { and, eq } from 'drizzle-orm';
import { StockQuerySchema } from '../../application/schemas/StockSchema.js';
import {
  manufacturers,
  series,
  soldStatuses,
  stocks,
  vehicles,
} from '../entity/schema.js';
import { db } from '../helper/db.js';
type StockQuerySchema = z.infer<typeof StockQuerySchema>;

export class StockRepository {
  async getStocks(query: StockQuerySchema) {
    const { auction_id, sold_status_id, series_id, manufacturer_id, limit } = query;
    const filters: SQLWrapper[] = [];

    if (auction_id) {
      filters.push(eq(stocks.auctionId, auction_id));
    }

    if (series_id) {
      filters.push(eq(series.seriesId, series_id));
    }

    if (manufacturer_id) {
      filters.push(eq(manufacturers.manufacturerId, manufacturer_id));
    }

    if (sold_status_id) {
      filters.push(eq(stocks.soldStatusId, sold_status_id));
    }

    let qb = db
      .select()
      .from(stocks)
      .innerJoin(vehicles, eq(stocks.vehicleId, vehicles.vehicleId))
      .innerJoin(series, eq(vehicles.seriesId, series.seriesId))
      .innerJoin(manufacturers, eq(series.manufacturerId, manufacturers.manufacturerId))
      .innerJoin(soldStatuses, eq(stocks.soldStatusId, soldStatuses.soldStatusId))
      .where(and(...filters))
      .$dynamic();

    if (limit) {
      qb = qb.limit(limit);
    }

    const result = await qb.execute();

    return result;
  }
}
