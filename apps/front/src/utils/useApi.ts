import type { ApiType } from 'api/src';
import { hc } from 'hono/client';

export const useApi = (token: string) => {
  return hc<ApiType>('http://localhost:3001/', {
    headers: {
      cookie: `token=${token};`,
    },
  });
};
