import { serve } from '@hono/node-server';
import { Hono } from 'hono';
const app = new Hono();
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
const port = 3001;
console.log(`Server is running on http://localhost:${port}`);
serve({
    fetch: app.fetch,
    port,
});
