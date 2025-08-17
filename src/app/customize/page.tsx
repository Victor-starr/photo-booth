"use client";

import Footer from "@/components/_Footer";
import Nav from "@/components/_Nav";
import { NoPhotosWrapper } from "@/guard/Guards";
import { useCamera } from "@/hook/useCamera";
import PhotoFrames from "@/components/PhotoFrames";
import { PhotoFramesProps } from "@/lib/types/camera";
import { useState } from "react";
import ImagePopUp from "@/components/ImagePopUp";
import FrameController from "@/components/FrameController";

export default function SessionPage() {
  const [frameType, setFrameType] =
    useState<PhotoFramesProps["type"]>("classic");
  const {
    loading,
    exportRef,
    photosArr,
    startOverAgain,
    handleExport,
    savePhotos,
  } = useCamera();
  const [imageDisplay, setImageDisplay] = useState<string | null>(null);

  const handleImagePopup = (imageUrl: string) => {
    setImageDisplay(imageUrl);
  };

  if (photosArr.length < 4) {
    return (
      <NoPhotosWrapper>
        <Nav currentPage="customize" />
        <div className="flex flex-col justify-center items-center px-4 py-8 min-h-[calc(100vh-140px)]">
          <>
            <h2 className="mb-4 text-xl sm:text-2xl text-center">
              Not enough photos!
            </h2>
            <p className="mb-6 text-center">
              You have {photosArr.length} photo
              {photosArr.length > 1 ? "s" : ""}. Need 4 to customize.
            </p>
            <a
              href="/session"
              className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-medium text-white transition-colors"
            >
              Go take more
            </a>
          </>
        </div>
        <Footer />
      </NoPhotosWrapper>
    );
  }

  return (
    <NoPhotosWrapper>
      <Nav currentPage="customize" />
      <section className="relative flex lg:flex-row flex-col lg:justify-center items-center gap-6 lg:gap-10 bg-[#F2EDF1] px-4 py-0 lg:py-18 min-h-[calc(100vh-140px)] overflow-y-auto">
        <h2 className="lg:top-5 lg:left-1/2 static lg:absolute shadow-pink-8 px-4 pt-5 lg:pt-0 small-text-cst text-[clamp(1.25rem,4vw,2rem)] md:text-cst lg:text-[clamp(2rem,2vw,3rem)] text-center lg:-translate-x-1/2">
          Customize Your Strip
        </h2>

        {imageDisplay && (
          <ImagePopUp
            imageUrl={imageDisplay}
            onClose={() => setImageDisplay(null)}
          />
        )}

        <div className="flex flex-1 justify-center w-full max-w-sm lg:max-w-lg">
          <div ref={exportRef} className="flex justify-center w-full">
            <PhotoFrames
              photoArr={photosArr}
              type={frameType}
              onImageClick={handleImagePopup}
            />
          </div>
        </div>
        <FrameController
          frameType={frameType}
          setFrameType={setFrameType}
          startOverAgain={startOverAgain}
          controllerType={"customize"}
          handleExport={handleExport}
          handleSave={savePhotos}
          loading={loading}
        />
      </section>
      <Footer />
    </NoPhotosWrapper>
  );
}
