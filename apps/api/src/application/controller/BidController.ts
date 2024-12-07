import { z, type RouteHandler } from '@hono/zod-openapi';
import { BidRepository } from '../../infra/repository/BidRepository.js';
import { postBidRoute } from '../routes/BidRoute.js';
import { BidSchema } from '../schemas/BidSchema.js';
import { ErrorSchema } from '../schemas/ErrorSchema.js';
type BidSchema = z.infer<typeof BidSchema>;
type ErrorSchema = z.infer<typeof ErrorSchema>;

export const postBidHandler: RouteHandler<typeof postBidRoute> = async (c) => {
  const body = c.req.valid('json');

  try {
    const Bid = new BidRepository();
    const result = await Bid.createBid(body);

    const response: BidSchema = {
      message: 'success',
      bid_id: result.bid_id,
      price: result.price,
    };

    return c.json(response, 200);
  } catch (e: unknown) {
    const response: ErrorSchema = {
      message: e instanceof Error ? e.message : 'Unknown error',
      stackTrace: e instanceof Error ? e.stack : undefined,
    };
    return c.json(response, 400);
  }
};
