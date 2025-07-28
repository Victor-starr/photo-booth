"use client";

import Footer from "@/components/_Footer";
import Nav from "@/components/_Nav";
import { AuthGuardWrapper } from "@/guard/Guards";
import { useCamera } from "@/hook/useCamera";
import PhotoFrames from "@/components/PhotoFrames";
import { PhotoFramesProps } from "@/lib/types/camera";
import { VscDebugRestart } from "react-icons/vsc";
import { FaDownload } from "react-icons/fa";
import { useState, useRef } from "react";
import { exportPhotoStrip } from "@/utils/imageExport";

export default function SessionPage() {
  const [frameType, setFrameType] =
    useState<PhotoFramesProps["type"]>("classic");
  const { photosArr, startOverAgain } = useCamera();
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

  if (photosArr.length < 4) {
    return (
      <AuthGuardWrapper>
        <Nav />
        <div className="flex flex-col justify-center items-center h-[85vh]">
          {photosArr.length === 0 ? (
            <p>Loading photos...</p>
          ) : (
            <>
              <h2 className="mb-4 text-2xl">Not enough photos!</h2>
              <p>
                You have {photosArr.length} photo
                {photosArr.length > 1 ? "s" : ""}. Need 4 to customize.
              </p>
              <a
                href="/session"
                className="bg-blue-500 mt-4 px-4 py-2 rounded text-white"
              >
                Go take more
              </a>
            </>
          )}
        </div>
        <Footer />
      </AuthGuardWrapper>
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
    <AuthGuardWrapper>
      <Nav />
      <section className="relative flex lg:flex-row flex-col justify-center items-center gap-10 bg-[#F2EDF1] mb-35 px-4 pt-20 overflow-y-auto">
        <h2 className="top-5 left-1/2 absolute shadow-pink-8 text-[clamp(1.25rem,1.5vw,2rem)] text-cst text-center -translate-x-1/2">
          Customize Your Strip
        </h2>

        <div className="flex flex-1 justify-center w-full max-w-lg">
          <div ref={exportRef}>
            <PhotoFrames photoArr={photosArr} type={frameType} />
          </div>
        </div>

        <aside className="flex flex-col flex-shrink-0 gap-6 bg-blue-2 p-8 border border-black rounded-3xl w-full max-w-md">
          <h2 className="shadow-blue-9 mb-4 text-cst text-2xl sm:text-3xl">
            Photo Strip Theme
          </h2>

          <div className="flex flex-wrap gap-3 sm:gap-4 mb-4">
            {frameOptions.map((t) => (
              <button
                key={t}
                onClick={() => setFrameType(t)}
                className={`px-5 py-2 rounded-md border border-black shadow-custom-position bg-white hover:bg-blue-5 hover:text-white ${
                  frameType === t ? "shadow-pink-8" : "shadow-black"
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex sm:flex-row flex-col gap-4">
            <button
              onClick={startOverAgain}
              className="flex justify-center items-center gap-2 bg-gray-100 hover:bg-pink-8 shadow-custom-position px-6 py-2 border border-black rounded-lg hover:text-white"
            >
              <VscDebugRestart /> Start Over
            </button>
            <button
              onClick={handleExport}
              className="flex justify-center items-center gap-2 bg-blue-9 hover:bg-white shadow-custom-position px-6 py-2 border border-black rounded-lg text-white hover:text-blue-9"
            >
              <FaDownload /> Export
            </button>
          </div>
        </aside>
      </section>
      <Footer />
    </AuthGuardWrapper>
  );
}
