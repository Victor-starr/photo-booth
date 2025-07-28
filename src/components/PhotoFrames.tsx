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
    <div className={`flex flex-col gap-3 relative top-10 lg:top-0 ${bg} p-6`}>
      {photosArr.map((photo, index) => (
        <Image
          key={index}
          src={photo}
          alt={`Captured photo ${index + 1}`}
          className="bg-cover shadow-lg w-[150px] h-[150px]"
          width={1}
          height={1}
        />
      ))}
    </div>
  );
};

const RetroFrame = ({ photosArr, bg }: { photosArr: string[]; bg: string }) => {
  return (
    <div className={`flex flex-row gap-2 top-10 lg:top-0 ${bg} p-2`}>
      <div className="flex flex-col gap-2 mb-2">
        {Array.from({ length: 28 }).map((_, i) => (
          <span key={i} className="inline-block bg-white w-4 h-4"></span>
        ))}
      </div>
      <div className="flex flex-col gap-5 mb-5">
        {photosArr.map((photo, index) => (
          <Image
            key={index}
            src={photo}
            alt={`Captured photo ${index + 1}`}
            className="bg-cover shadow-lg w-[150px] h-[150px]"
            width={1}
            height={1}
          />
        ))}
      </div>
      <div className="flex flex-col gap-2 mb-2">
        {Array.from({ length: 28 }).map((_, i) => (
          <span key={i} className="inline-block bg-gray-300 w-4 h-4"></span>
        ))}
      </div>
    </div>
  );
};

export default PhotoFrames;
