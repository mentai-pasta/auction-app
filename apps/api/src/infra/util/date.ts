/**
 * 終了時間を取得する
 * @param beginTime 開始時間
 * @param duration 間隔
 * @returns 終了時間
 */
export const getEndTime = (beginTime: string, duration: string): Date => {
  const date = new Date(beginTime);
  const [hours, minutes, seconds] = duration.split(':').map(Number);
  date.setHours(date.getHours() + hours);
  date.setMinutes(date.getMinutes() + minutes);
  date.setSeconds(date.getSeconds() + (seconds || 0));
  return date;
};
