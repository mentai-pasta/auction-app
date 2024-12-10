import { z, type RouteHandler } from '@hono/zod-openapi';
import { StockRepository } from '../../infra/repository/StockRepository.js';
import { getStockByIdRoute, getStocksRoute } from '../routes/StockRoute.js';
import { StockListResponseSchema } from '../schemas/StockSchema.js';
type StockListResponseSchema = z.infer<typeof StockListResponseSchema>;

// 商品一覧取得用ハンドラ
export const getStocksHandler: RouteHandler<typeof getStocksRoute> = async (c) => {
  const query = c.req.valid('query');

  const Stock = new StockRepository();
  const result = await Stock.getStocks(query);

  console.log(result);
  const stocklist: StockListResponseSchema = result.map((stock) => {
    return {
      stock_id: stock.stockId,
      auction_id: stock.auctionId,
      vehicle_id: stock.vehicleId,
      series_id: stock.vehicle.seriesId,
      series_name: stock.vehicle.series.name,
      manufacturer_id: stock.vehicle.series.manufacturerId,
      manufacturer_name: stock.vehicle.series.manufacturer.name,
      sold_status_id: stock.soldStatusId,
      sold_status_name: stock.soldStatus.name,
      image_list: stock.imagesStocks.map((image) => {
        return {
          image_id: image.imageId,
          url: image.image.url,
        };
      }),
      begin_date: stock.beginTime,
      created_at: stock.createdAt,
      updated_at: stock.updatedAt,
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
        image_list: result.imagesStocks.map((image) => {
          return {
            image_id: image.imageId,
            url: image.image.url,
          };
        }),
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
