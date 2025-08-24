"use client";

import { useState } from "react";
import ConfirmPopUp from "@/components/ConfirmPopUp";
import { NoPhotosWrapper } from "@/guard/Guards";
import { useCamera } from "@/hook/useCamera";
import { useCustomize } from "@/hook/useCustomize";
import PhotoFrames, { LoadingFrameTemplate } from "@/components/PhotoFrames";
import ImagePopUp from "@/components/ImagePopUp";
import FrameController from "@/components/FrameController";
import Footer from "@/components/_Footer";
import Nav from "@/components/_Nav";
import { FrameType, StickerTheme } from "@/lib/types/camera";
import useConfirmPopUp from "@/hook/useConfirmPopUp";

export default function SessionPage() {
  const [frameType, setFrameType] = useState<FrameType>("classic");
  const [stickerType, setStickerType] = useState<StickerTheme>("none");
  const confirmPopUp = useConfirmPopUp();
  const {
    loading,
    exportRef,
    photosArr,
    handleExport,
    savePhotos,
    handleFileChange,
    customFrame,
  } = useCustomize();
  const { startOverAgain } = useCamera();
  const [imageDisplay, setImageDisplay] = useState<string | null>(null);

  const handleImagePopup = (imageUrl: string) => {
    setImageDisplay(imageUrl);
  };

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
        {loading ? (
          <div className="w-[200px]">
            <LoadingFrameTemplate />
          </div>
        ) : (
          <div ref={exportRef} className="w-[200px]">
            <PhotoFrames
              {...{
                photoArr: photosArr,
                type: frameType,
                stickerType: stickerType,
                bgCustom: customFrame,
                onImageClick: handleImagePopup,
                frame_custom: customFrame,
              }}
            />
          </div>
        )}
        <FrameController
          frameType={frameType}
          customFrame={customFrame}
          setFrameType={setFrameType}
          stickerType={stickerType}
          setStickerType={setStickerType}
          startOverAgain={() =>
            confirmPopUp.showPopUp(
              "Are you sure you want to restart? This will clear your current strip.",
              () => startOverAgain()
            )
          }
          controllerType={"customize"}
          handleExport={handleExport}
          handleSave={() =>
            confirmPopUp.showPopUp(
              "Are you sure you want to save this strip?",
              () => savePhotos(frameType)
            )
          }
          loading={loading}
          handleFileChange={handleFileChange}
        />
        {confirmPopUp.open && (
          <ConfirmPopUp
            message={confirmPopUp.message}
            onConfirm={confirmPopUp.handleConfirm}
            onCancel={confirmPopUp.handleCancel}
          />
        )}
      </section>
      <Footer />
    </NoPhotosWrapper>
  );
}
