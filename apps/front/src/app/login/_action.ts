import { ApiType } from "api/src";
import { hc } from "hono/client";

const client = hc<ApiType>("http://localhost:3001/");

export const sendBid = (form: FormData) => {
    form.get('bid-select'); // name="bid-select"のデータを取得
    client.api.v1.login.$post({
        json: {
            customer_id: `fdd25989-085e-fc11-31f0-a4a25095a47d`,
        }
    });
};