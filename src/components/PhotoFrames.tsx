import Image from "next/image";
import { PhotoFramesProps } from "@/lib/types/camera";

const PhotoFrames = (props: PhotoFramesProps) => {
  switch (props.type) {
    case "classic":
      return <ClassicFrame photosArr={props.photoArr} bg={"bg-white"} />;
    case "dark":
      // Implement Dark frame rendering
      return <ClassicFrame photosArr={props.photoArr} bg={"bg-gray-800"} />;
    case "moon":
      // Implement Moon frame rendering
      return <ClassicFrame photosArr={props.photoArr} bg={"moon-frame-bg"} />;
    case "retro":
      // Implement Retro frame rendering
      return <RetroFrame photosArr={props.photoArr} bg={"bg-black"} />;
    case "party":
      // Implement Party frame rendering
      return <ClassicFrame photosArr={props.photoArr} bg={"shine-frame-bg"} />;
  }
};

const ClassicFrame = ({
  photosArr,
  bg,
}: {
  photosArr: string[];
  bg: string;
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

const RetroFrame = ({ photosArr, bg }: { photosArr: string[]; bg: string }) => {
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
            className="shadow-lg rounded-sm object-cover"
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

export default PhotoFrames;
