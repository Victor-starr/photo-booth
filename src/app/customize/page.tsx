"use client";

import Footer from "@/components/_Footer";
import Nav from "@/components/_Nav";
import { NoPhotosWrapper } from "@/guard/Guards";
import { useCamera } from "@/hook/useCamera";
import PhotoFrames from "@/components/PhotoFrames";
import { PhotoFramesProps } from "@/lib/types/camera";
import { VscDebugRestart } from "react-icons/vsc";
import { FaDownload } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { useState, useRef } from "react";
import { exportPhotoStrip } from "@/utils/imageExport";

export default function SessionPage() {
  const [frameType, setFrameType] =
    useState<PhotoFramesProps["type"]>("classic");
  const { photosArr, startOverAgain, savePhotos } = useCamera();
  const exportRef = useRef<HTMLDivElement>(null);

  const handleExport = async () => {
    if (!exportRef.current) return;

    try {
      await exportPhotoStrip(exportRef.current, frameType);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to export image";
      alert(errorMessage);
    }
  };

  const handleSave = async () => {
    try {
      await savePhotos(frameType);
      alert("Photos saved successfully!");
    } catch {
      alert("Failed to save photos.");
    }
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

  const frameOptions: PhotoFramesProps["type"][] = [
    "classic",
    "dark",
    "retro",
    "moon",
    "party",
  ];

  return (
    <NoPhotosWrapper>
      <Nav currentPage="customize" />
      <section className="relative flex lg:flex-row flex-col lg:justify-center items-center gap-6 lg:gap-10 bg-[#F2EDF1] px-4 py-8 lg:py-18 min-h-[calc(100vh-140px)] overflow-y-auto">
        <h2 className="lg:top-5 lg:left-1/2 static lg:absolute shadow-pink-8 px-4 small-text-cst text-[clamp(1.25rem,4vw,2rem)] md:text-cst lg:text-[clamp(2rem,2vw,3rem)] text-center lg:-translate-x-1/2">
          Customize Your Strip
        </h2>

        <div className="flex flex-1 justify-center w-full max-w-sm lg:max-w-lg">
          <div ref={exportRef} className="flex justify-center w-full">
            <PhotoFrames photoArr={photosArr} type={frameType} />
          </div>
        </div>

        <aside className="flex flex-col gap-4 lg:gap-6 bg-blue-2 p-4 lg:p-8 border border-black rounded-3xl w-full max-w-sm lg:max-w-md">
          <h2 className="shadow-blue-9 text-cst text-xl lg:text-2xl xl:text-3xl lg:text-left text-center">
            Photo Strip Theme
          </h2>

          <div className="flex flex-wrap gap-2 lg:gap-3 xl:gap-4">
            {frameOptions.map((t) => (
              <button
                key={t}
                onClick={() => setFrameType(t)}
                className={`px-3 lg:px-5 py-2 rounded-md border border-black shadow-custom-position bg-white hover:bg-blue-5 hover:text-white text-sm lg:text-base transition-colors ${
                  frameType === t ? "shadow-pink-8" : "shadow-black"
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex lg:flex-row flex-col gap-3 lg:gap-4">
            <button
              onClick={() => handleSave()}
              className="flex justify-center items-center gap-2 bg-blue-8 hover:bg-white shadow-blue-950 shadow-custom-position px-4 lg:px-6 py-2 border border-black rounded-lg text-white hover:text-blue-500 text-sm lg:text-base transition-colors"
            >
              <FaSave /> Save
            </button>
            <button
              onClick={startOverAgain}
              className="flex justify-center items-center gap-2 bg-gray-100 hover:bg-pink-8 shadow-custom-position px-4 lg:px-6 py-2 border border-black rounded-lg hover:text-white text-sm lg:text-base transition-colors"
            >
              <VscDebugRestart /> Start Over
            </button>
            <button
              onClick={handleExport}
              className="flex justify-center items-center gap-2 bg-blue-9 hover:bg-white shadow-custom-position px-4 lg:px-6 py-2 border border-black rounded-lg text-white hover:text-blue-9 text-sm lg:text-base transition-colors"
            >
              <FaDownload /> Export
            </button>
          </div>
        </aside>
      </section>
      <Footer />
    </NoPhotosWrapper>
  );
}
