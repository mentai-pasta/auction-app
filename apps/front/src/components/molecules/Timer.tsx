import dayjs, { Dayjs, extend } from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useEffect, useRef, useState } from 'react';

interface TimerProps {
  /** タイマーが開始する時間 */
  startTime: Dayjs;
  /** タイマーが終了する時間 */
  endTime: Dayjs;
  /** タイマー終了後の文字列 */
  afterPhrase: string;
  /** タイマー開始前の文字列 */
  beforePhrase: string;
  /** TimerPhaseが変更されたときに呼び出されます。 */
  onChange?: (phase: TimerPhase) => void;
  /** 終了時に一度だけ呼び出されます */
  onFinish?: () => void;
  /** 開始時に一度だけ呼び出されます */
  onStart?: () => void;
}

export type TimerPhase = 'before' | 'progress' | 'after';

/**
 * カウントダウンタイマーコンポーネント
 * @param {TimerProps} props
 * @returns
 */
export const Timer = ({
  startTime,
  endTime,
  afterPhrase,
  beforePhrase,
  onChange = () => {},
  onFinish = () => {},
  onStart = () => {},
}: TimerProps) => {
  const [remain, setRemain] = useState<string | undefined>();
  const beginTimeDayJs = dayjs(startTime);
  const endTimeDayJs = dayjs(endTime);
  const isStartedRef = useRef(
    beginTimeDayJs.isBefore(dayjs()) && endTimeDayJs.isAfter(dayjs()),
  );

  extend(duration);
  useEffect(() => {
    onChange('before');
    const id = setInterval(() => {
      const diff = dayjs.duration(endTimeDayJs.diff(dayjs()));
      if (beginTimeDayJs.isBefore(dayjs()) && endTimeDayJs.isAfter(dayjs())) {
        if (!isStartedRef.current) {
          onChange('progress');
          onStart();
          isStartedRef.current = true;
        }
        const hours = 0 < diff.hours() ? 'HH:' : '';
        setRemain(diff.format(`${hours}mm:ss`));
      } else if (beginTimeDayJs.isAfter(dayjs())) {
        setRemain(beforePhrase);
      } else {
        onChange('after');
        onFinish();
        setRemain(afterPhrase);
        clearInterval(id);
      }
    }, 100);
    return () => clearInterval(id);
    // 初回レンダリング時のみ実行したいため適切
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <p className="text-5xl">
      {remain ?? <span className="loading loading-dots loading-lg" />}
    </p>
  );
};
