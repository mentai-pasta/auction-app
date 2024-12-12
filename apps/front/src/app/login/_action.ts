import { ApiType } from "api/src";
import { hc } from "hono/client";

const client = hc<ApiType>("http://localhost:3001/");

export const sendLogin = async (form: FormData) => {
    const cookieStore = await cookies();
    const rawRes = await client.api.v1.login.$post({
        json: {
            email: form.get("loginId"),
            password: form.get("password"),
        }
    });

    let res = null;
    if (rawRes.ok) res = await rawRes.json();

    cookieStore.set("token", res.token);
};