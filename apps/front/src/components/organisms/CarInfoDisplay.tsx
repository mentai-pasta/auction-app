import { Card } from '../atoms/Card';
import { ImageViewer } from '../molecules/ImageViewer';

export interface CarInfo {
  manufacturer: string;
  series: string;
}

interface CarInfoDisplayProps {
  title: string;
  images: string[];
  carInfo: CarInfo;
}

export const CarInfoDisplay = ({ title, images, carInfo }: CarInfoDisplayProps) => {
  return (
    <div className="flex flex-col gap-5 p-7">
      <h1 className="text-4xl">{title}</h1>
      <ImageViewer imageUrls={images} />
      <Card className="w-[300px]">
        <h2 className="font-bold text-2xl">車体情報</h2>
        <dl className="flex flex-col gap-3">
          <div className="flex justify-between">
            <dt className="font-bold">メーカー</dt>
            <dl>{carInfo.manufacturer}</dl>
          </div>
          <div className="flex justify-between">
            <dt className="font-bold">車種名</dt>
            <dl>{carInfo.series}</dl>
          </div>
        </dl>
      </Card>
    </div>
  );
};
