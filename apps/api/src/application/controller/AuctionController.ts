import { z, type RouteHandler } from '@hono/zod-openapi';
import { AuctionRepository } from '../../infra/repository/AuctionRepository.js';
import type { getAuctionRoute } from '../routes/AuctionRoute.js';
import type { AuctionListSchema } from '../schemas/AuctionSchema.js';
type AuctionListSchema = z.infer<typeof AuctionListSchema>;

export const getAuctionsHandler: RouteHandler<typeof getAuctionRoute> = async (c) => {
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
          vehicle_id: stock.vehicleId,
          sold_statud_id: stock.soldStatusId,
          begin_time: stock.beginTime,
          created_at: stock.createdAt,
          updated_at: stock.updatedAt,
        };
      }),
      duration: duration,
      begin_date: auction.beginTime,
    };
  });

  return c.json(auctionlist);
};
