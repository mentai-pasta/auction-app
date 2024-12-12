import { z, type RouteHandler } from '@hono/zod-openapi';
import { BidRepository } from '../../infra/repository/BidRepository.js';
import { StockRepository } from '../../infra/repository/StockRepository.js';
import {
  getStockByIdRoute,
  getStocksRoute,
  postStocksRoute,
} from '../routes/StockRoute.js';
import { StockListResponseSchema } from '../schemas/StockSchema.js';
type StockListResponseSchema = z.infer<typeof StockListResponseSchema>;

// 商品一覧取得用ハンドラ
export const getStocksHandler: RouteHandler<typeof getStocksRoute> = async (c) => {
  const query = c.req.valid('query');

  const Stock = new StockRepository();
  const result = await Stock.getStocks(query);

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
    const bidRepo = new BidRepository();
    const maxPrice = await bidRepo.getMaxBidPrice(result.stockId);

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
        price: maxPrice.max_price !== null ? Number(maxPrice.max_price) : undefined,
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

// 商品新規登録用ハンドラ
export const postStocksHandler: RouteHandler<typeof postStocksRoute> = async (c) => {
  const body = c.req.valid('json');

  try {
    const stockRepo = new StockRepository();
    const result = await stockRepo.createStock(body);

    return c.json(
      {
        message: 'ok',
        stock_id: result.stock_id,
      },
      201,
    );
  } catch (e: unknown) {
    console.log(e);
    return c.json({ message: 'Internal Server Error' }, 500);
  }
};
