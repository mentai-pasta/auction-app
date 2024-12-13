import { type RouteHandler } from '@hono/zod-openapi';
import { getCookie } from 'hono/cookie';
import { verifyToken } from '../../infra/helper/jwt.js';
import { getVerifyJwtRoute } from '../routes/JwtRoute.js';

// JWT検証ハンドラー
export const getVerifyJwtHandler: RouteHandler<typeof getVerifyJwtRoute> = async (c) => {
  const token = getCookie(c, 'token');

  if (!token) {
    return c.json(
      {
        message: 'Unauthorized',
      },
      401,
    );
  }

  const resultVerify = await verifyToken(token);
  if (resultVerify) {
    return c.json(
      {
        message: 'Verified',
        customer_id: resultVerify.customer_id,
      },
      200,
    );
  } else {
    return c.json(
      {
        message: 'Unauthorized',
      },
      401,
    );
  }
};
