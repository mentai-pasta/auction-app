import noImage from '../../../public/noImage.png';

interface ImageViewerProps {
  /** 画像のURL */
  imageUrls: string[];
}

export const ImageViewer = ({ imageUrls }: ImageViewerProps) => {
  return (
    <>
      <div className="carousel w-full">
        {imageUrls.map((v, i) => (
          <div
            id={`item${i + 1}`}
            className="carousel-item w-full justify-center"
            key={i + 1}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={v ?? noImage} className="w-full" alt="" />
          </div>
        ))}
      </div>
      <div className="flex w-full justify-center gap-2 py-2">
        {imageUrls.map((_, i) => (
          <a href={`#item${i + 1}`} className="btn btn-xs" key={i}>
            {i + 1}
          </a>
        ))}
      </div>
    </>
  );
};
