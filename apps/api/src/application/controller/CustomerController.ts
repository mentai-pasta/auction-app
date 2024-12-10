import { type RouteHandler } from '@hono/zod-openapi';
import { loginToken } from '../../infra/helper/jwt.js';
import { CustomerRepository } from '../../infra/repository/CustomerRepository.js';
import { postCustomerRoute } from '../routes/CustomerRoute.js';

// 顧客新規登録用ハンドラ
export const postCustomerHandler: RouteHandler<typeof postCustomerRoute> = async (c) => {
  const json = c.req.valid('json');

  try {
    const Customer = new CustomerRepository();
    const result = await Customer.createCustomer(json);
    const token = await loginToken(result.customer_id, result.name, result.email);

    return c.json(
      {
        message: 'Success',
        token: token,
      },
      200,
    );
  } catch (e: unknown) {
    return c.json(
      {
        message: e instanceof Error ? e.message : 'Unknown error',
        stackTrace: e instanceof Error ? e.stack : undefined,
      },
      400,
    );
  }
};
