import { fetchAuction, getMaxPrice } from './_action';
import { Metadata } from 'next';
import StockDetail from '@/components/pages/StockDetail';
import dayjs from 'dayjs';
import { notFound } from 'next/navigation';
import useAuth from '@/utils/useAuth';

export const metadata: Metadata = {
  title: '車両詳細',
};

const StockDetails = async ({
  params,
}: {
  params: Promise<{ auctionId: string; id: number }>;
}) => {
  const { auctionId, id } = await params;
  const auction = await fetchAuction(auctionId);
  if (auction === null) notFound();
  const stock = auction.stock_list.at(id - 1);
  if (stock == undefined) notFound();
  const maxBid = await getMaxPrice(stock.stock_id);
  // TODO: maxBidにエラーが発生する場合はDBとの接続障害時などのため、notFound以外のエラー処理をする。
  if (maxBid == undefined) notFound();
  // TODO: メモ化するとエラーをasync内で使用することができない旨のエラーが回避できるらしいので検討する。
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const userInfo = await useAuth();

  const beginTime = dayjs(stock.begin_date);
  const FORMAT = 'YYYY-MM-DD HH:mm:ss';
  const startTime = beginTime.format(FORMAT);
  const endTime = beginTime.add(auction.duration, 'minute').format(FORMAT);

  return (
    <StockDetail
      title={`${stock.manufacturers_name} ${stock.series_name}`}
      carInfo={{ manufacturer: stock.manufacturers_name, series: stock.series_name }}
      startTime={startTime}
      endTime={endTime}
      images={stock.image_list?.map((v) => v.url)}
      stockId={stock.stock_id}
      currentIndex={id - 1}
      maxBid={maxBid}
      userInfo={userInfo}
      stockList={auction.stock_list.map((v) => v.stock_id)}
    />
  );
};

export default StockDetails;
