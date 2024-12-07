import type { WSContext, WSEvents } from 'hono/ws';

export const ws_stocks = new Map();

export function WebSocketHandler(stock_id: string): WSEvents {
  if (!ws_stocks.has(stock_id)) {
    ws_stocks.set(stock_id, new Set<WSContext>());
  }
  const ws_stock = ws_stocks.get(stock_id);

  const ws: WSEvents = {
    onOpen(event, socket) {
      ws_stock.add(socket);
      console.log(`Client connected to: ${stock_id}`);
    },
    onClose(event, socket) {
      ws_stock.delete(socket);
      if (ws_stock.size === 0) {
        ws_stocks.delete(stock_id);
      }
      console.log(`Client disconnected from: ${stock_id}`);
    },
  };

  return ws;
}
