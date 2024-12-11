import { hc } from 'hono/client';
import { ApiType } from 'api/src/index';

const client = hc<ApiType>('http://localhost:3001/api/v1');

export const useAuth = async () => {
    const rawRes = await client.verify.$get({
        credentials: 'include', 
    });

    let res = null;
    if (rawRes.ok)  res = await rawRes.json();

    return res;
};

export default useAuth;