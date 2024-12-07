import { z } from '@hono/zod-openapi';
import { eq, max } from 'drizzle-orm';
import { PostBidBodySchema } from '../../application/schemas/BidSchema.js';
import { bids } from '../entity/schema.js';
import { db } from '../helper/db.js';
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
      const max_bid = result[0];

      if (max_bid.value !== null && max_bid.value >= price.toString()) {
        throw new Error('low bid price');
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
      const result = await trx
        .select({ customerId: bids.customerId, max_price: max(bids.price) })
        .from(bids)
        .where(eq(bids.stockId, stock_id))
        .groupBy(bids.customerId);
      const response = {
        customer_id: result[0].customerId,
        max_price: result[0].max_price,
      };
      return response;
    });
  }
}
