'use server';

import { hc } from 'hono/client';
import type { ApiType } from 'api/src/index';

const client = hc<ApiType>('http://localhost:3001/');

/**
 * 最高額を取得する
 * @param stockId 商品ID
 * @returns 最高入札額のオブジェクト
 */
export const getMaxPrice = async (stockId: string) => {
  const res = await client.api.v1.bid[':stock_id'].$get({
    param: {
      stock_id: stockId,
    },
  });

  if (res.ok) {
    return await res.json();
  }
  return undefined;
};

/**
 * オークションを取得する
 * @param auctionId オークションID
 */
export const fetchAuction = async (auctionId: string) => {
  const rawRes = await client.api.v1.auctions[':auction_id'].$get({
    param: {
      auction_id: auctionId,
    },
  });

  let res = null;
  if (rawRes.ok) res = await rawRes.json();

  return res;
};

/**
 * 商品詳細情報を取得する
 * @param stockId 商品ID
 */
export const fetchStock = async (stockId: string) => {
  const rawRes = await client.api.v1.stocks[':stock_id'].$get({
    param: {
      stock_id: stockId,
    },
  });

  let res = null;
  if (rawRes.ok) res = await rawRes.json();

  return res;
};
