import { z } from '@hono/zod-openapi';
import type { SQLWrapper } from 'drizzle-orm';
import { and, eq, inArray } from 'drizzle-orm';
import {
  StockIdSchema,
  StockQuerySchema,
} from '../../application/schemas/StockSchema.js';
import { series, stocks, vehicles } from '../entity/schema.js';
import { db } from '../helper/db.js';
type StockQuerySchema = z.infer<typeof StockQuerySchema>;
type StockIdSchema = z.infer<typeof StockIdSchema>;

export class StockRepository {
  // 商品一覧取得
  async getStocks(query: StockQuerySchema) {
    const { auction_id, sold_status_id, series_id, manufacturer_id, limit } = query;
    const filters: SQLWrapper[] = [];

    if (auction_id) {
      filters.push(eq(stocks.auctionId, auction_id));
    }

    if (series_id) {
      filters.push(
        inArray(
          stocks.vehicleId,
          db
            .select({ vehicleId: vehicles.vehicleId })
            .from(vehicles)
            .where(eq(vehicles.seriesId, series_id)),
        ),
      );
    }

    if (manufacturer_id) {
      filters.push(
        inArray(
          stocks.vehicleId,
          db
            .select({ vehicleId: vehicles.vehicleId })
            .from(vehicles)
            .where(
              inArray(
                vehicles.seriesId,
                db
                  .select({ seriesId: series.seriesId })
                  .from(series)
                  .where(eq(series.manufacturerId, manufacturer_id)),
              ),
            ),
        ),
      );
    }

    if (sold_status_id) {
      filters.push(eq(stocks.soldStatusId, sold_status_id));
    }

    const result = db.query.stocks.findMany({
      with: {
        soldStatus: true,
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
      },
      where: and(...filters),
      limit: limit,
    });

    return result;
  }

  // 商品一件取得
  async getStockById(path: StockIdSchema) {
    const result = await db.query.stocks.findFirst({
      with: {
        soldStatus: true,
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
      },
      where: eq(stocks.stockId, path.stock_id),
    });

    return result;
  }
}
