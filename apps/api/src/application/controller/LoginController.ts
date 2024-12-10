import { type RouteHandler } from '@hono/zod-openapi';
import { createHash } from 'crypto';
import { loginToken } from '../../infra/helper/jwt.js';
import { CustomerRepository } from '../../infra/repository/CustomerRepository.js';
import type { postLoginRoute } from '../routes/LoginRoute.js';

export const postLoginHandler: RouteHandler<typeof postLoginRoute> = async (c) => {
  const { email, password } = c.req.valid('json');

  const Customer = new CustomerRepository();
  const result = await Customer.getCustomerByEmail(email);

  if (
    result &&
    result.passwordHash === createHash('sha1').update(password).digest('hex')
  ) {
    const token = await loginToken(result.customerId, result.name, result.email);

    return c.json(
      {
        token: token,
        created_at: result.createdAt,
        updated_at: result.updatedAt,
      },
      200,
    );
  }

  return c.json(
    {
      message: 'Invalid email or password',
    },
    401,
  );
};
