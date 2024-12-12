import { z } from '@hono/zod-openapi';
import { desc, eq, max } from 'drizzle-orm';
import { PostBidBodySchema } from '../../application/schemas/BidSchema.js';
import { bids, stocks } from '../entity/schema.js';
import { db } from '../helper/db.js';
import { getEndTime } from '../util/date.js';
type PostBidBodySchema = z.infer<typeof PostBidBodySchema>;

export class BidRepository {
  // 新規入札
  async createBid(body: PostBidBodySchema) {
    const { customer_id, stock_id, price } = body;

    return await db.transaction(async (trx) => {
      const result = await trx
        .select({ value: max(bids.price) })
        .from(bids)
        .where(eq(bids.stockId, stock_id));
      const max_bid = result[0].value;

      const stock = await trx.query.stocks.findFirst({
        with: {
          auction: true,
        },
        where: eq(stocks.stockId, stock_id),
      });

      if (!stock) {
        throw new Error('stock not found');
      }

      const beginTime = new Date(stock.beginTime);
      const endTime = getEndTime(stock.beginTime, stock.auction.duration);

      if (max_bid !== null && Number(max_bid) >= price) {
        throw new Error('low bid price');
      } else if (beginTime > new Date()) {
        throw new Error('auction not started');
      } else if (endTime < new Date()) {
        throw new Error('auction already ended');
      } else {
        const result = await trx
          .insert(bids)
          .values({
            stockId: stock_id,
            customerId: customer_id,
            price: price.toString(),
          })
          .returning({ insertId: bids.bidId });

        return {
          bid_id: result[0].insertId,
          price: price,
        };
      }
    });
  }

  // 最高入札額取得
  async getMaxBidPrice(stock_id: string) {
    return await db.transaction(async (trx) => {
      const result = await trx.query.bids.findFirst({
        where: eq(bids.stockId, stock_id),
        orderBy: desc(bids.price),
      });

      if (!result) {
        return {
          bid_id: '',
          customer_id: '',
          max_price: 0,
        };
      }

      const response = {
        bid_id: result.bidId,
        customer_id: result.customerId,
        max_price: Number(result.price),
      };
      return response;
    });
  }
}
