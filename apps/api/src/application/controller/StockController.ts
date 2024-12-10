import { z, type RouteHandler } from '@hono/zod-openapi';
import { StockRepository } from '../../infra/repository/StockRepository.js';
import { getStockByIdRoute, getStocksRoute } from '../routes/StockRoute.js';
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
      sold_status_name: stock.sold_statuses.name,
      begin_date: stock.stocks.beginTime,
      created_at: stock.stocks.createdAt,
      updated_at: stock.stocks.updatedAt,
    };
  });

  return c.json(stocklist);
};

// 商品一件取得用ハンドラ
export const getStockByIdHandler: RouteHandler<typeof getStockByIdRoute> = async (c) => {
  const path = c.req.valid('param');

  const Stock = new StockRepository();
  const result = await Stock.getStockById(path);

  if (result) {
    return c.json(
      {
        stock_id: result.stockId,
        auction_id: result.auctionId,
        vehicle_id: result.vehicleId,
        series_id: result.vehicle.seriesId,
        series_name: result.vehicle.series.name,
        manufacturer_id: result.vehicle.series.manufacturerId,
        manufacturer_name: result.vehicle.series.manufacturer.name,
        sold_status_id: result.soldStatusId,
        sold_status_name: result.soldStatus.name,
        begin_date: result.beginTime,
        created_at: result.createdAt,
        updated_at: result.updatedAt,
      },
      200,
    );
  } else {
    return c.json({ message: 'Not Found' }, 404);
  }
};
