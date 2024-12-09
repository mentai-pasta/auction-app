import { z, type RouteHandler } from '@hono/zod-openapi';
import { getStocksRoute } from '../routes/StockRoute.js';
import { StockRepository } from '../../infra/repository/StockRepository.js';
import { StockListResponseSchema } from '../schemas/StockSchema.js';
type StockListResponseSchema = z.infer<typeof StockListResponseSchema>;

// 商品一覧取得用ハンドラ
export const getStocksHandler: RouteHandler<typeof getStocksRoute> = async (c) => {
  const query = c.req.valid('query');

  const Stock = new StockRepository();
  const result = Stock.getStocks(query);

  const stocklist: StockListResponseSchema = (await result).map((stock) => {
    return {
      stock_id: stock.stocks.stockId,
      auction_id: stock.stocks.auctionId,
      vehicle_id: stock.stocks.vehicleId,
      series_id: stock.series.seriesId,
      series_name: stock.series.name,
      manufacturer_id: stock.series.manufacturerId,
      manufacturer_name: stock.manufacturers.name,
      sold_status_id: stock.sold_statuses.soldStatusId,
      sold_states_name: stock.sold_statuses.name,
      begin_date: stock.stocks.beginTime,
      created_at: stock.stocks.createdAt,
      updated_at: stock.stocks.updatedAt,
    };
  });

  return c.json(stocklist);
};
