import { type RouteHandler } from '@hono/zod-openapi';
import type { WSContext } from 'hono/ws';
import { BidRepository } from '../../infra/repository/BidRepository.js';
import { getBidRoute, postBidRoute } from '../routes/BidRoute.js';
import { ws_stocks } from './WebSocketController.js';

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

    return c.json(
      {
        message: 'success',
        bid_id: result.bid_id,
        price: result.price,
      },
      200,
    );
  } catch (e: unknown) {
    if (e instanceof Error && e.message === 'low bid price') {
      const Bid = new BidRepository();
      const max_bid = await Bid.getMaxBidPrice(body.stock_id);
      const max_price = max_bid.max_price ?? 0;

      return c.json(
        {
          message: e.message,
          customer_id: max_bid.customer_id,
          max_price: Number(max_price),
        },
        400,
      );
    }

    return c.json(
      {
        message: e instanceof Error ? e.message : 'Unknown error',
        stackTrace: e instanceof Error ? e.stack : undefined,
      },
      400,
    );
  }
};

export const getBidHandler: RouteHandler<typeof getBidRoute> = async (c) => {
  const { stock_id } = c.req.valid('param');

  try {
    const bidRepo = new BidRepository();
    const result = await bidRepo.getMaxBidPrice(stock_id);

    return c.json(
      {
        bid_id: result.bid_id,
        customer_id: result.customer_id,
        price: result.max_price,
      },
      200,
    );
  } catch (e: unknown) {
    return c.json(
      {
        message: e instanceof Error ? e.message : 'Unknown error',
        stackTrace: e instanceof Error ? e.stack : undefined,
      },
      500,
    );
  }
};
