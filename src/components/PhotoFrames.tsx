import Image from "next/image";
import { PhotoFramesProps, StickerTheme } from "@/lib/types/customize";

const PhotoFrames = (props: PhotoFramesProps & { bgCustom?: string }) => {
  switch (props.type) {
    case "classic":
      return (
        <PhotoContent
          photosArr={props.photoArr}
          bg={"bg-white"}
          onImageClick={props.onImageClick}
          stickerType={props.stickerType}
        />
      );
    case "dark":
      return (
        <PhotoContent
          photosArr={props.photoArr}
          bg={"bg-[#1e2939]"}
          onImageClick={props.onImageClick}
          stickerType={props.stickerType}
        />
      );
    case "moon":
      return (
        <PhotoContent
          photosArr={props.photoArr}
          bg={"moon-frame-bg"}
          onImageClick={props.onImageClick}
          stickerType={props.stickerType}
        />
      );
    case "retro":
      return (
        <RetroFrame
          photosArr={props.photoArr}
          bg={"bg-black"}
          onImageClick={props.onImageClick}
          stickerType={props.stickerType}
        />
      );
    case "party":
      return (
        <PhotoContent
          photosArr={props.photoArr}
          bg={"shine-frame-bg"}
          onImageClick={props.onImageClick}
          stickerType={props.stickerType}
        />
      );
    case "summer":
      return (
        <PhotoContent
          photosArr={props.photoArr}
          bg={"summer-frame-bg"}
          onImageClick={props.onImageClick}
          stickerType={props.stickerType}
        />
      );
    case "custom":
      return (
        <PhotoContent
          photosArr={props.photoArr}
          bgImage={props.bgCustom}
          onImageClick={props.onImageClick}
          stickerType={props.stickerType}
        />
      );
  }
};
const stickersPosition = [
  {
    top: "-15px",
    left: "-25px",
    transform: "rotate(350deg)",
  },
  {
    top: "-20px",
    right: "-20px",
    transform: "rotate(15deg)",
  },
  {
    top: "-15px",
    left: "-25px",
    transform: "rotate(320deg)",
  },
  {
    top: "-15px",
    right: "-30px",
    transform: "rotate(25deg)",
  },
];

const RetroFrame = ({
  photosArr,
  bg,
  onImageClick,
  stickerType,
}: {
  photosArr: string[];
  bg: string;
  onImageClick: (imageUrl: string) => void;
  stickerType: StickerTheme;
}) => {
  return (
    <div
      className={`flex flex-row justify-center gap-1 sm:gap-2 ${bg} p-2 sm:p-3 rounded-lg shadow-lg max-w-full overflow-hidden`}
    >
      <div className="flex flex-col justify-around gap-1 sm:gap-2">
        {Array.from({ length: photosArr.length * 6 }).map((_, i) => (
          <span
            key={i}
            className="inline-block bg-white w-2 sm:w-3 md:w-4 h-2 sm:h-3 md:h-4"
          ></span>
        ))}
      </div>
      <div className="flex flex-col gap-2 sm:gap-3 md:gap-5">
        {photosArr.map((photo, index) => (
          <span className="relative" key={index}>
            <Image
              src={photo}
              alt={`Captured photo ${index + 1}`}
              crossOrigin="anonymous"
              className="shadow-lg rounded-sm object-cover"
              onClick={() => onImageClick(photo)}
              width={120}
              height={120}
              unoptimized
              style={{
                width: "clamp(90px, 12vw, 140px)",
                height: "clamp(90px, 12vw, 140px)",
              }}
            />
            {stickerType !== "none" && (
              <Image
                src={`/svg/${stickerType}-${index + 1}.svg`}
                width={50}
                height={50}
                alt={`Sticker ${index + 1}`}
                className="absolute hover:scale-110 transition-transform duration-200"
                style={{
                  ...stickersPosition[index % stickersPosition.length],
                }}
              />
            )}
          </span>
        ))}
      </div>
      <div className="flex flex-col justify-around gap-1 sm:gap-2">
        {Array.from({ length: photosArr.length * 6 }).map((_, i) => (
          <span
            key={i}
            className="inline-block bg-white w-2 sm:w-3 md:w-4 h-2 sm:h-3 md:h-4"
          ></span>
        ))}
      </div>
    </div>
  );
};

const PhotoContent = ({
  photosArr,
  bgImage,
  bg,
  onImageClick,
  stickerType,
}: {
  photosArr: string[];
  bgImage?: string;
  bg?: string;
  onImageClick: (imageUrl: string) => void;
  stickerType: StickerTheme;
}) => {
  return (
    <div
      className={`flex flex-col justify-center items-center gap-2 p-3 sm:p-4 md:p-6 rounded-lg shadow-lg ${
        bg ?? ""
      }`}
      style={
        bgImage
          ? {
              backgroundImage: `url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }
          : undefined
      }
    >
      {photosArr.map((photo, index) => (
        <span className="relative" key={index}>
          <Image
            src={photo}
            alt={`Captured photo ${index + 1}`}
            className="shadow-lg rounded-md object-cover"
            crossOrigin="anonymous"
            onClick={() => onImageClick(photo)}
            width={120}
            height={120}
            unoptimized
            style={{
              width: "clamp(100px, 15vw, 140px)",
              height: "clamp(100px, 15vw, 140px)",
            }}
          />
          {stickerType !== "none" && (
            <Image
              src={`/svg/${stickerType}-${index + 1}.svg`}
              width={50}
              height={50}
              alt={`Sticker ${index + 1}`}
              className="absolute hover:scale-110 transition-transform duration-200"
              style={{
                ...stickersPosition[index % stickersPosition.length],
              }}
            />
          )}
        </span>
      ))}
    </div>
  );
};

export const LoadingFrameTemplate = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 bg-gray-300 shadow-lg p-3 sm:p-4 md:p-6 rounded-lg">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="bg-gray-200 rounded-lg w-32 h-32 animate-pulse"
        ></div>
      ))}
    </div>
  );
};

export default PhotoFrames;
