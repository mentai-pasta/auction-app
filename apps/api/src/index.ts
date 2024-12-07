import { serve } from '@hono/node-server';
import { createNodeWebSocket } from '@hono/node-ws';
import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono } from '@hono/zod-openapi';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import {
  getAuctionByIdHandler,
  getAuctionsHandler,
} from './application/controller/AuctionController.js';
import { postBidHandler } from './application/controller/BidController.js';
import { WebSocketHandler } from './application/controller/WebSocketController.js';
import {
  getAuctionByIdRoute,
  getAuctionsRoute,
} from './application/routes/AuctionRoute.js';
import { postBidRoute } from './application/routes/BidRoute.js';
import { StockIdSchema } from './application/schemas/StockSchema.js';

const app = new OpenAPIHono();
const { injectWebSocket, upgradeWebSocket } = createNodeWebSocket({ app: app as Hono });

app.use(
  '*',
  cors({
    origin: 'http://localhost:3000',
    allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests'],
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
    exposeHeaders: ['Content-Length', 'X-Kuma-Revision', 'Content-Type'],
    maxAge: 600,
    credentials: true,
  }),
);

app.use(async (_, next) => {
  console.log(`request`);
  await next();
});

app.get('/ping', (c) => {
  return c.json({ message: 'Hello Hono! Status OK!' });
});

app.get('/ws/:stock_id', async (c, next) => {
  const stock_id = c.req.param('stock_id');
  const result = StockIdSchema.safeParse({ stock_id });

  return upgradeWebSocket(() => {
    const ws = WebSocketHandler(stock_id, result.success);
    return ws;
  })(c, next);
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const route = app
  .basePath('/api/v1')
  .openapi(getAuctionsRoute, getAuctionsHandler)
  .openapi(getAuctionByIdRoute, getAuctionByIdHandler)
  .openapi(postBidRoute, postBidHandler)
  .doc('/doc', {
    openapi: '3.0.0',
    info: {
      version: process.env.npm_package_version,
      title: 'Auction API',
    },
  })
  .get('/doc/ui', swaggerUI({ url: '/api/v1/doc' }));

const port = 3001;
console.log(`Server is running on http://localhost:${port}`);

const server = serve({
  fetch: app.fetch,
  port,
});

injectWebSocket(server);

export type ApiType = typeof route;
