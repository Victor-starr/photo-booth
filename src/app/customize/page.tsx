"use client";
import Footer from "@/components/_Footer";
import Nav from "@/components/_Nav";
import { AuthGuardWrapper } from "@/guard/Guards";
import { useCamera } from "@/hook/useCamera";
import PhotoFrames from "@/components/PhotoFrames";
import { PhotoFramesProps } from "@/lib/types/camera";
import { VscDebugRestart } from "react-icons/vsc";
import { FaDownload } from "react-icons/fa";
import { useState } from "react";

export default function SessionPage() {
  const [frameType, setFrameType] =
    useState<PhotoFramesProps["type"]>("classic");
  const { photosArr } = useCamera();

  if (photosArr.length === 0) {
    return (
      <AuthGuardWrapper>
        <Nav />
        <div className="flex flex-col justify-center items-center h-[85vh]">
          <div>Loading photos...</div>
        </div>
        <Footer />
      </AuthGuardWrapper>
    );
  }

  if (photosArr.length < 4) {
    return (
      <AuthGuardWrapper>
        <Nav />
        <div className="flex flex-col justify-center items-center h-[85vh]">
          <div className="text-center">
            <h2 className="mb-4 text-2xl">Not enough photos!</h2>
            <p>You have {photosArr.length} photos. Need 4 to customize.</p>
            <a
              href="/session"
              className="inline-block bg-blue-500 mt-4 px-4 py-2 rounded text-white"
            >
              Go back to take more photos
            </a>
          </div>
        </div>
        <Footer />
      </AuthGuardWrapper>
    );
  }

  return (
    <AuthGuardWrapper>
      <Nav />
      <section className="relative flex lg:flex-row flex-col lg:justify-center items-center gap-10 bg-[#F2EDF1] pt-20 w-full h-full overflow-y-auto">
        <h2 className="top-0 lg:top-5 left-1/2 z-10 absolute shadow-pink-8 text-[clamp(2rem,2vw,3rem)] text-cst text-center -translate-x-1/2">
          Customize Your Strip
        </h2>
        <div className="flex flex-1 justify-center items-center px-4 w-full max-w-lg">
          <PhotoFrames photoArr={photosArr} type={frameType} />
        </div>

        <section className="flex flex-col bg-blue-2 mt-5 mb-15 px-4 sm:px-8 md:px-12 py-6 sm:py-10 border border-black rounded-3xl w-full max-w-md h-auto lg:min-h-[400px]">
          <h2 className="shadow-blue-9 mb-4 text-cst text-2xl sm:text-3xl">
            Photo Strip Theme
          </h2>

          <div className="flex flex-wrap gap-3 sm:gap-4 mb-4 w-full">
            {["classic", "dark", "retro", "moon", "party"].map((t) => (
              <button
                key={t}
                onClick={() => setFrameType(t as PhotoFramesProps["type"])}
                className={`bg-white pb-2 pt-2 px-4 sm:px-5 rounded-md text-base sm:text-xl border hover:bg-blue-5 hover:text-white border-black shadow-custom-position ${
                  frameType === t ? "shadow-pink-8" : "shadow-black "
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          <hr className="mb-4 border-gray-400 border-t w-full" />

          <div className="flex sm:flex-row flex-col gap-4 sm:gap-6 w-full">
            <button className="flex justify-center items-center gap-2 bg-gray-100 hover:bg-pink-8 shadow-black shadow-custom-position px-4 sm:px-6 py-2 border border-black rounded-lg w-full sm:w-auto text-black hover:text-white">
              <VscDebugRestart className="mr-1" /> Start Over
            </button>
            <button className="flex justify-center items-center gap-2 bg-blue-9 hover:bg-white shadow-black shadow-custom-position px-4 sm:px-6 py-2 border border-black rounded-lg w-full sm:w-auto text-white hover:text-blue-9">
              <FaDownload className="mr-1" /> Export
            </button>
          </div>
        </section>
      </section>
      <Footer />
    </AuthGuardWrapper>
  );
}
