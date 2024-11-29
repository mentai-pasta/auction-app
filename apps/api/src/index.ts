import { serve } from '@hono/node-server';
import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono, z } from '@hono/zod-openapi';
import { and, gte, lte, type SQLWrapper } from 'drizzle-orm';
import { AuctionRoute } from './application/routes/AuctionRoute.js';
import type { AuctionListSchema } from './application/schemas/AuctionSchema.js';
import { db } from './infra/db/index.js';
import * as schema from './infra/entity/schema.js';
type AuctionListSchema = z.infer<typeof AuctionListSchema>;

const app = new OpenAPIHono();

app.use(async (_, next) => {
  console.log(`request`);
  await next();
});

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.get('/ping', (c) => {
  return c.json({ message: `hi your message is ${c.req.query('message')}` });
});

app.openapi(AuctionRoute, async (c) => {
  const query = c.req.valid('query');
  const { start_date, end_date, limit } = query;
  console.log(query);

  const filters: SQLWrapper[] = [];

  if (start_date) {
    filters.push(gte(schema.auctions.beginTime, start_date));
  }

  if (end_date) {
    filters.push(lte(schema.auctions.beginTime, end_date));
  }

  const options: Parameters<typeof db.query.auctions.findMany>[0] = {};

  if (filters.length > 0) {
    options.where = and(...filters);
  }

  if (limit) {
    options.limit = limit;
  }

  const result = await db.query.auctions.findMany({
    with: {
      stocks: true,
    },
    ...options,
  });

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
});

app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: 'α0.1.0',
    title: 'Auction API',
  },
});

app.get('/doc/ui', swaggerUI({ url: '/doc' }));

const port = 3001;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
