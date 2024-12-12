'use server';
import useAuth from '@/utils/useAuth';
import type { ApiType } from 'api/src';
import { hc } from 'hono/client';

const client = hc<ApiType>('http://localhost:3001/');

export const sendBid = async (form: FormData) => {
  // TODO: メモ化するとエラーをasync内で使用することができない旨のエラーが回避できるらしいので検討する。
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const user = await useAuth();
  if (user === null) return;
  console.log('userComponent', user);
  await client.api.v1.bid.$post({
    json: {
      customer_id: user?.customer_id,
      price:
        (Number(form.get('bid-select')) ?? 0) + (Number(form.get('current-price')) ?? 0),
      stock_id: form.get('stock-id')?.toString() ?? '',
    },
  });
};
