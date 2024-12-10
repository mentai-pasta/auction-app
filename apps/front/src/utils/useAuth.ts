import { hc } from "hono/client";
import { ApiType } from "api/src/index";

const client = hc<ApiType>('/api/v1');

export const useAuth = async () => {
    const rawRes = await client.verify.$get();

    let res = null;
    if (rawRes.ok) res = rawRes.json();

    return res;
};

export default useAuth;