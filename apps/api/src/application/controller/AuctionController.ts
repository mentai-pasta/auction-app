import { z, type RouteHandler } from '@hono/zod-openapi';
import { AuctionRepository } from '../../infra/repository/AuctionRepository.js';
import { getAuctionByIdRoute, getAuctionsRoute } from '../routes/AuctionRoute.js';
import { AuctionDetailSchema, AuctionListSchema } from '../schemas/AuctionSchema.js';
import { ErrorSchema } from '../schemas/ErrorSchema.js';
type AuctionListSchema = z.infer<typeof AuctionListSchema>;
type AuctionDetailSchema = z.infer<typeof AuctionDetailSchema>;
type ErrorSchema = z.infer<typeof ErrorSchema>;

// オークション一覧取得ハンドラー
export const getAuctionsHandler: RouteHandler<typeof getAuctionsRoute> = async (c) => {
  const query = c.req.valid('query');
  console.log(query);

  const Auction = new AuctionRepository();
  const result = await Auction.getAuctions(query);

  const auctionlist: AuctionListSchema = result.map((auction) => {
    const durationArray = auction.duration.split(':');
    const hours = parseInt(durationArray[0], 10);
    const minutes = parseInt(durationArray[1], 10);

    const duration = hours * 60 + minutes;

    return {
      auction_id: auction.auctionId,
      stock_list: auction.stocks.map((stock) => {
        return {
          stock_id: stock.stockId,
        };
      }),
      duration: duration,
      begin_date: auction.beginTime,
      created_at: auction.createdAt,
      updated_at: auction.updatedAt,
    };
  });

  return c.json(auctionlist);
};

// オークション1件取得ハンドラー
export const getAuctionByIdHandler: RouteHandler<typeof getAuctionByIdRoute> = async (
  c,
) => {
  const path = c.req.valid('param');

  const Auction = new AuctionRepository();
  const result = await Auction.getAuctionById(path);

  if (result) {
    const durationArray = result.duration.split(':');
    const hours = parseInt(durationArray[0], 10);
    const minutes = parseInt(durationArray[1], 10);

    const duration = hours * 60 + minutes;

    const auction: AuctionDetailSchema = {
      auction_id: result.auctionId,
      stock_list: result.stocks.map((stock) => {
        return {
          stock_id: stock.stockId,
          vehicle_id: stock.vehicleId,
          series_id: stock.vehicle.seriesId,
          series_name: stock.vehicle.series.name,
          manufacturers_id: stock.vehicle.series.manufacturerId,
          manufacturers_name: stock.vehicle.series.manufacturer.name,
          sold_status_id: stock.soldStatusId,
          sold_status_name: stock.soldStatus.name,
          begin_date: stock.beginTime,
          created_at: stock.createdAt,
          updated_at: stock.updatedAt,
        };
      }),
      duration: duration,
      begin_date: result.beginTime,
      created_at: result.createdAt,
      updated_at: result.updatedAt,
    };

    return c.json(auction, 200);
  } else {
    const message: ErrorSchema = {
      message: 'Not Found',
    };

    return c.json(message, 404);
  }
};
