import { type RouteHandler } from '@hono/zod-openapi';
import { verifyToken } from '../../infra/helper/jwt.js';
import { postVerifyJwtRoute } from '../routes/JwtRoute.js';

// JWT検証ハンドラー
export const postVerifyJwtHandler: RouteHandler<typeof postVerifyJwtRoute> = async (
  c,
) => {
  const body = c.req.valid('json');

  const resultVerify = await verifyToken(body.token);
  if (resultVerify) {
    return c.json(
      {
        message: 'Verified',
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
