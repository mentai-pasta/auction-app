'use server';
import { cookies } from 'next/headers';
import { useApi } from './useApi';

export const useAuth = async () => {
  const cookieStore = await cookies();
  const jwtToken = cookieStore.get('token');
  // TODO: メモ化するとエラーをasync内で使用することができない旨のエラーが回避できるらしいので検討する。
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const client = useApi(jwtToken?.value ?? '');
  const rawRes = await client.api.v1.verify.$get();

  let res = null;
  if (rawRes.ok) res = await rawRes.json();

  return res;
};

export default useAuth;
