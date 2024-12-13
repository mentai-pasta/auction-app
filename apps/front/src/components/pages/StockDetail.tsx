import { BidSidebar } from '../organisms/BidSidebar';
import { CarInfo, CarInfoDisplay } from '../organisms/CarInfoDisplay';

interface StockDetailProps {
  title: string;
  stockId: string;
  currentIndex: number;
  maxBid: { price: number; customer_id: string };
  userInfo: { customer_id: string } | null;
  carInfo: CarInfo;
  stockList: string[];
  startTime: string;
  endTime: string;
  images: string[];
}

const StockDetail = (stock: StockDetailProps) => {
  return (
    <div className="flex flex-row gap-x-12 justify-center w-full h-full">
      <CarInfoDisplay title={stock.title} images={stock.images} carInfo={stock.carInfo} />
      <div className="py-6">
        <BidSidebar
          stockId={stock.stockId}
          beginTime={stock.startTime}
          endTime={stock.endTime}
          currentIndex={stock.currentIndex}
          maxBid={stock.maxBid}
          userInfo={stock.userInfo}
          stockList={stock.stockList}
        />
      </div>
    </div>
  );
};

export default StockDetail;
