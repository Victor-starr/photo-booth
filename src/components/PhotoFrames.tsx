import Image from "next/image";
import { PhotoFramesProps } from "@/lib/types/camera";

const PhotoFrames = (props: PhotoFramesProps & { bgCustom?: string }) => {
  switch (props.type) {
    case "classic":
      return (
        <ClassicFrame
          photosArr={props.photoArr}
          bg={"bg-white"}
          onImageClick={props.onImageClick}
        />
      );
    case "dark":
      // Implement Dark frame rendering
      return (
        <ClassicFrame
          photosArr={props.photoArr}
          bg={"bg-[#1e2939]"}
          onImageClick={props.onImageClick}
        />
      );
    case "moon":
      // Implement Moon frame rendering
      return (
        <ClassicFrame
          photosArr={props.photoArr}
          bg={"moon-frame-bg"}
          onImageClick={props.onImageClick}
        />
      );
    case "retro":
      // Implement Retro frame rendering
      return (
        <RetroFrame
          photosArr={props.photoArr}
          bg={"bg-black"}
          onImageClick={props.onImageClick}
        />
      );
    case "party":
      // Implement Party frame rendering
      return (
        <ClassicFrame
          photosArr={props.photoArr}
          bg={"shine-frame-bg"}
          onImageClick={props.onImageClick}
        />
      );
    case "custom":
      return (
        <CustomFrame
          photosArr={props.photoArr}
          bgImage={props.bgCustom}
          onImageClick={props.onImageClick}
        />
      );
  }
};

const ClassicFrame = ({
  photosArr,
  bg,
  onImageClick,
}: {
  photosArr: string[];
  bg: string;
  onImageClick: (imageUrl: string) => void;
}) => {
  return (
    <div
      className={`flex flex-col gap-2 ${bg} p-3 sm:p-4 md:p-6 rounded-lg shadow-lg`}
    >
      {photosArr.map((photo, index) => (
        <Image
          key={index}
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
      ))}
    </div>
  );
};

const RetroFrame = ({
  photosArr,
  bg,
  onImageClick,
}: {
  photosArr: string[];
  bg: string;
  onImageClick: (imageUrl: string) => void;
}) => {
  return (
    <div
      className={`flex flex-row gap-1 sm:gap-2 ${bg} p-2 sm:p-3 rounded-lg shadow-lg max-w-full overflow-hidden`}
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
          <Image
            key={index}
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

const CustomFrame = ({
  photosArr,
  bgImage,
  onImageClick,
}: {
  photosArr: string[];
  bgImage?: string;
  onImageClick: (imageUrl: string) => void;
}) => {
  return (
    <div
      className={`flex flex-col gap-2  p-3 sm:p-4 md:p-6 rounded-lg shadow-lg `}
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
        <Image
          key={index}
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
      ))}
    </div>
  );
};

export default PhotoFrames;
