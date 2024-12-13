'use client';
import dayjs from 'dayjs';
import { Card } from '../atoms/Card';
import { Timer, TimerPhase } from '../molecules/Timer';
import { Alert } from '../atoms/Alert';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../atoms/Button';
import { ButtonAttribute, ComboRadioButton } from '../molecules/ComboRadioButton';
import { sendBid } from './_action';

interface BidSidebarProps {
  beginTime: string;
  endTime: string;
  stockId: string;
  currentIndex: number;
  maxBid: { price: number; customer_id: string };
  userInfo: { customer_id: string } | null;
  stockList: string[];
}

export const BidSidebar = ({
  beginTime,
  endTime,
  stockId,
  currentIndex,
  stockList,
  maxBid,
  userInfo,
}: BidSidebarProps) => {
  const beginTimeDayJs = dayjs(beginTime);
  const endTimeDayJs = dayjs(endTime);

  const bidButtons: ButtonAttribute[] = [
    { label: '1万円', value: 10000, checked: true },
    { label: '10万円', value: 100000 },
    { label: '100万円', value: 1000000 },
  ];

  const [isHighestBid] = useState<boolean>(false);
  const [currentPrice, setCurrentPrice] = useState<number>(maxBid.price);
  const [isMaxBidder, setIsMaxBidder] = useState<boolean>(
    maxBid.customer_id === userInfo?.customer_id,
  );
  const [isLogin] = useState<boolean>(userInfo !== null);
  const [timerPhase, setTimerPhase] = useState<TimerPhase>('before');
  const socketRef = useRef<WebSocket>();

  useEffect(() => {
    const webSocket = new WebSocket(`${process.env.NEXT_PUBLIC_WS_HOST}/ws/${stockId}`);
    socketRef.current = webSocket;

    // WebSocket経由での通知
    const handleNotification = (event: MessageEvent<string>) => {
      /** @type {{customer_id: string, max_price: string}} */
      const data = JSON.parse(event.data);
      // 金額更新通知のフィルタリング
      if ((data.max_price !== undefined, data.customer_id !== undefined)) {
        console.log(
          data.customer_id,
          'によって',
          Number(data.max_price),
          '円に更新されました！',
        );
        setCurrentPrice(Number(data.max_price));
        setIsMaxBidder(data.customer_id === userInfo?.customer_id);
      }
    };
    webSocket.addEventListener('message', handleNotification);

    return () => {
      webSocket.close();
      webSocket.removeEventListener('message', handleNotification);
    };
  }, []);

  const handleSetTimerPhase = (phase: TimerPhase) => {
    console.log('handleTimerPhase', phase);

    setTimerPhase(phase);
  };

  const AlertVariable = () => {
    if (isHighestBid) {
      return (
        <Alert alertType="alert">
          <p>あなたが現在の最高額入札者です！</p>
        </Alert>
      );
    }
    return (
      <Alert alertType="alert">
        <p>
          残り時間は目安です。
          <br />
          余裕を持った入札をお願いします。
        </p>
      </Alert>
    );
  };

  const BidSection = () => {
    if (timerPhase === 'after') {
      if (isMaxBidder) {
        return (
          <div className="flex flex-col gap-5">
            <Alert>
              <h3 className="font-bold">おめでとうございます！</h3>
              <p className="text-sm">
                あなたが落札しました
                <br />
                マイページから手順をご確認ください
              </p>
            </Alert>
            <Button
              asLink
              href="/mypage/process"
              label="手続きをする"
              btnType="btn-primary"
            />
          </div>
        );
      }
      return <></>;
    }
    if (timerPhase === 'before') {
      return (
        <Alert>
          <p>
            この商品は入札受付開始前です。
            <br />
            開始までしばらくお待ちください
          </p>
        </Alert>
      );
    }
    return (
      <>
        {isMaxBidder ? (
          <Alert>
            <p>あなたが最高額入札者です！</p>
          </Alert>
        ) : (
          <></>
        )}
        {isLogin ? (
          <form action={sendBid} className="flex flex-col gap-5">
            <ComboRadioButton
              title="上乗せする額"
              buttonAttributes={bidButtons}
              name="bid-select"
            />
            <input type="hidden" name="current-price" value={currentPrice} />
            <input type="hidden" name="stock-id" value={stockId} />
            <Button btnType="btn-neutral" label="入札する" isSubmit />
          </form>
        ) : (
          <Button
            btnType="btn-warning"
            asLink
            href="/login"
            label="入札にはログインが必要です"
          />
        )}
      </>
    );
  };

  return (
    <Card className="min-w-[370px] max-w-[400px] sticky top-6">
      <section className="flex flex-row flex-wrap justify-between items-center">
        <div>
          <h2>残り時間</h2>
          <Timer
            startTime={beginTimeDayJs}
            endTime={endTimeDayJs}
            afterPhrase={'入札終了'}
            beforePhrase={'開始前'}
            onChange={handleSetTimerPhase}
          />
        </div>
        <div className="flex flex-col flex-wrap gap-5">
          <div>
            <h3>開始時間</h3>
            <p>{beginTimeDayJs.format('HH:mm')}</p>
          </div>
          <div>
            <h3>終了時間</h3>
            <p>{endTimeDayJs.format('HH:mm')}</p>
          </div>
        </div>
      </section>
      <AlertVariable />
      <div className="divider" />
      <section className="flex flex-col gap-5">
        <div className="flex flex-row flex-wrap justify-between items-center">
          <h2 className={isMaxBidder ? 'text-warning' : ''}>
            {timerPhase === 'after' ? '最終価格' : '現在の価格'}
          </h2>
          <p className={`text-right text-4xl ${isMaxBidder ? 'text-warning' : ''}`}>
            {currentPrice.toLocaleString()}円
          </p>
        </div>
        <BidSection />
      </section>
      <div className="divider" />
      <section className="flex flex-col flex-wrap gap-5">
        <Button
          asLink
          btnType="btn-primary"
          label="次の車両へ"
          disabled={stockList.length <= currentIndex + 1}
          href={``}
        />
        <Button
          asLink
          btnType="btn-neutral"
          label="前の車両へ"
          disabled={currentIndex <= 1}
          href={``}
        />
      </section>
    </Card>
  );
};
