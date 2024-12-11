'use server'
import { cookies } from 'next/headers'

import { hc } from 'hono/client';
import { ApiType } from 'api/src/index';

const client = hc<ApiType>('http://localhost:3001/');

export const useAuth = async () => {
    const cookieStore = await cookies();
    const jwtToken = cookieStore.get('token');
    const rawRes = await client.api.v1.verify.$get({
        token: jwtToken,
    });

    let res = null;
    if (rawRes.ok) res = await rawRes.json();

    return res;
};

export default useAuth;
