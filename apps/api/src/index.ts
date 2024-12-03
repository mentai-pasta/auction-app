import { serve } from '@hono/node-server';
import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono } from '@hono/zod-openapi';
import { cors } from 'hono/cors';
import { getAuctionsHandler } from './application/controller/AuctionController.js';
import { getAuctionRoute } from './application/routes/AuctionRoute.js';

const app = new OpenAPIHono();
const api = app.basePath('/api/v1');

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

api.openapi(getAuctionRoute, getAuctionsHandler);

api
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

serve({
  fetch: app.fetch,
  port,
});
