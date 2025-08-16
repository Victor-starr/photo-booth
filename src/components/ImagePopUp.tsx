import Image from "next/image";
import { FaWindowClose } from "react-icons/fa";
import React, { useState } from "react";
import { Spinner } from "@/components/LoadingScreen";

function ImagePopUp({
  imageUrl,
  onClose,
}: {
  imageUrl: string;
  onClose: () => void;
}) {
  const [imgLoading, setImgLoading] = useState(true);
  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/75 w-full h-full overflow-auto">
      <div className="relative p-4 max-w-full max-h-full">
        <FaWindowClose
          onClick={onClose}
          className="top-7 right-7 absolute text-white hover:text-red-500 active:text-red-500 cursor-pointer"
          size={24}
        />
        <div className="flex justify-center items-center min-w-[300px] min-h-[300px]">
          {imgLoading && (
            <div className="z-10 absolute inset-0 flex justify-center items-center bg-black bg-opacity-40">
              <Spinner text="Loading image..." />
            </div>
          )}
          <Image
            src={imageUrl as string}
            alt="Popup"
            width={600}
            height={600}
            className="rounded-lg w-full max-w-[90vw] h-auto max-h-[80vh] object-contain"
            priority
            onLoad={() => setImgLoading(false)}
            onError={() => setImgLoading(false)}
          />
        </div>
      </div>
    </div>
  );
}

export default ImagePopUp;
