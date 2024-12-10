import 'dotenv/config';
import { sign, verify } from 'hono/jwt';

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

export const secret = process.env.JWT_SECRET;

export const loginToken = async (
  customer_id: string,
  customer_name: string,
  email: string,
): Promise<string> => {
  return await sign(
    {
      customer_id: customer_id,
      customer_name: customer_name,
      email: email,
      exp: Math.floor(Date.now() / 1000) + 60 * 1, // 1 minute
    },
    secret,
  );
};

export const verifyToken = async (token: string): Promise<boolean> => {
  try {
    await verify(token, secret);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
