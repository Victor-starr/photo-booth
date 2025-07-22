"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

interface PhotoCountDownProps {
  image: string | undefined;
  triggerCountdown: boolean;
}

const PhotoCountDown = ({ image, triggerCountdown }: PhotoCountDownProps) => {
  const [count, setCount] = useState(3);
  const [showPhoto, setShowPhoto] = useState(false);

  useEffect(() => {
    setCount(3);
    setShowPhoto(false);

    if (!triggerCountdown) return;

    const timer = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount > 1) {
          return prevCount - 1;
        } else {
          clearInterval(timer);
          setShowPhoto(true);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [triggerCountdown]);

  if (!triggerCountdown) return null;

  return (
    <div className="top-0 left-0 z-50 absolute flex justify-center items-center bg-black/80 text-shadow-pink2 backdrop-blur-sm w-screen h-screen text-cst text-7xl">
      {showPhoto && image ? (
        <div className="relative flex justify-center items-center w-full h-full">
          <Image
            src={image}
            alt="Taken photo"
            width={800}
            height={600}
            className="shadow-2xl rounded-lg max-w-[80%] max-h-[80%] object-contain -scale-x-100"
          />
        </div>
      ) : (
        <div className="drop-shadow-lg font-bold text-white">{count}</div>
      )}
    </div>
  );
};

export default PhotoCountDown;
