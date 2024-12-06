import { z, type RouteHandler } from '@hono/zod-openapi';
import { getStocksRoute } from '../routes/StockRoute.js';
import { StockRepository } from '../../infra/repository/StockRepository.js';
import { StockListResponseSchema } from '../schemas/StockSchema.js';
type StockListResponseSchema = z.infer<typeof StockListResponseSchema>;

export const getStocksHandler: RouteHandler<typeof getStocksRoute> = async (c) => {
  const query = c.req.valid('query');

  const Stock = new StockRepository();
  const result = Stock.getStocks(query);

  const stocklist: StockListResponseSchema = (await result).map((stock) => {
    return {
      stock_id: stock.stockId,
      auction_id: stock.auctionId,
      vehicle_id: stock.vehicleId,
      series_id: stock.vehicle.seriesId,
      series_name: stock.vehicle.series.name,
      manufacturer_id: stock.vehicle.series.manufacturerId,
      manufacturer_name: stock.vehicle.series.manufacturer.name,
      sold_status_id: stock.soldStatusId,
      sold_states_name: stock.soldStatus.name,
      begin_date: stock.beginTime,
      created_at: stock.createdAt,
      updated_at: stock.updatedAt,
    };
  });

  return c.json(stocklist);
};
