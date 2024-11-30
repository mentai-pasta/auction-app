import { serve } from '@hono/node-server';
import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono } from '@hono/zod-openapi';
import { getAuctionsHandler } from './application/controller/AuctionController.js';
import { getAuctionRoute } from './application/routes/AuctionRoute.js';

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

app.openapi(getAuctionRoute, getAuctionsHandler);

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
