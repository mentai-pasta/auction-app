import { z, type RouteHandler } from '@hono/zod-openapi';
import type { WSContext } from 'hono/ws';
import { BidRepository } from '../../infra/repository/BidRepository.js';
import { postBidRoute } from '../routes/BidRoute.js';
import { BidSchema } from '../schemas/BidSchema.js';
import { ErrorBidSchema, ErrorSchema } from '../schemas/ErrorSchema.js';
import { ws_stocks } from './WebSocketController.js';
type BidSchema = z.infer<typeof BidSchema>;
type ErrorSchema = z.infer<typeof ErrorSchema>;
type ErrorBidSchema = z.infer<typeof ErrorBidSchema>;

export const postBidHandler: RouteHandler<typeof postBidRoute> = async (c) => {
  const body = c.req.valid('json');

  try {
    const Bid = new BidRepository();
    const result = await Bid.createBid(body);
    const max_bid = await Bid.getMaxBidPrice(body.stock_id);

    const ws_stock = ws_stocks.get(body.stock_id);
    if (ws_stock) {
      ws_stock.forEach((client: WSContext) => {
        if (client.readyState == 1) {
          const ws_json = JSON.stringify({
            customer_id: max_bid.customer_id,
            max_price: max_bid.max_price,
          });
          client.send(ws_json);
        }
      });
    }

    const response: BidSchema = {
      message: 'success',
      bid_id: result.bid_id,
      price: result.price,
    };

    return c.json(response, 200);
  } catch (e: unknown) {
    if (e instanceof Error && e.message === 'low bid price') {
      const Bid = new BidRepository();
      const max_bid = await Bid.getMaxBidPrice(body.stock_id);
      const max_price = max_bid.max_price ?? 0;

      const response: ErrorBidSchema = {
        message: e.message,
        customer_id: max_bid.customer_id,
        max_price: Number(max_price),
      };

      return c.json(response, 400);
    }

    const response: ErrorSchema = {
      message: e instanceof Error ? e.message : 'Unknown error',
      stackTrace: e instanceof Error ? e.stack : undefined,
    };
    return c.json(response, 400);
  }
};
