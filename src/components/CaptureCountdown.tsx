import Image from "next/image";

interface CaptureCountdownProps {
  isActive: boolean;
  countdownValue: number;
  capturedImage?: string;
}

const CaptureCountdown = ({
  isActive,
  countdownValue,
  capturedImage,
}: CaptureCountdownProps) => {
  if (!isActive) return null;

  return (
    <div className="-top-15 left-0 z-50 absolute flex justify-center items-center bg-black/80 text-shadow-pink2 backdrop-blur-sm w-screen h-screen text-cst text-7xl">
      {capturedImage ? (
        <div className="relative flex justify-center items-center w-full h-full">
          <Image
            src={capturedImage}
            alt="Captured photo"
            width={800}
            height={600}
            className="shadow-2xl rounded-lg max-w-[80%] max-h-[80%] object-contain -scale-x-100"
          />
        </div>
      ) : (
        <div className="drop-shadow-lg font-bold text-white">
          {countdownValue}
        </div>
      )}
    </div>
  );
};

export default CaptureCountdown;
