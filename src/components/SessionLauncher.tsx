"use client";
import { useCamera } from "@/hook/useCamera";
import CameraWorkspace from "@/components/CameraWorkspace";
import { FaCamera } from "react-icons/fa";

const SessionLauncher = () => {
  const camera = useCamera();
  const { isSessionActive, startSession } = camera;

  return (
    <div className="z-20 flex flex-col justify-center items-center bg-blue-2 shadow-xl mx-auto px-4 sm:px-6 py-6 sm:py-8 border-2 border-blue-8 rounded-2xl w-[95vw] sm:w-[90vw] md:w-[70vw] lg:w-[60vw] min-h-[500px] sm:min-h-[60vh] max-h-[80vh]">
      {!isSessionActive ? (
        <>
          <span className="flex justify-center items-center bg-pink-400 mb-4 sm:mb-6 p-4 sm:p-6 rounded-full">
            <FaCamera
              size={40}
              className="w-8 sm:w-[50px] h-8 sm:h-[50px]"
              color="white"
            />
          </span>
          <article className="flex flex-col items-center gap-3 sm:gap-4 shadow-blue-8 mb-6 sm:mb-10 w-[95%] sm:w-[85%] md:w-[70%] lg:w-[60%] text-cst text-center">
            <h1 className="text-[clamp(1.25rem,4vw,2.5rem)] sm:text-[clamp(1.5rem,5vw,2.5rem)]">
              Ready to Start?
            </h1>
            <p className="text-[clamp(0.95rem,2.5vw,1.25rem)] sm:text-[clamp(1rem,3vw,1.5rem)] leading-relaxed">
              You will take 4 photos, then customize your photo strip with
              filters, stickers, and themes.
            </p>
          </article>
          <button
            disabled={isSessionActive}
            onClick={startSession}
            className="bg-blue-9 hover:bg-blue-8 disabled:opacity-85 px-5 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full text-white text-lg sm:text-xl md:text-2xl transition-colors"
          >
            {isSessionActive ? "Loading..." : "Start Session"}
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center w-full h-full">
          <CameraWorkspace camera={camera} />
        </div>
      )}
    </div>
  );
};

export default SessionLauncher;
