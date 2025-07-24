import { FaCamera } from "react-icons/fa";
import { UseCameraReturn } from "@/lib/types/camera";
import CameraWorkspace from "@/components/CameraWorkspace";

interface SessionLauncherProps {
  camera: UseCameraReturn;
}

const SessionLauncher = ({ camera }: SessionLauncherProps) => {
  const { isSessionActive, startSession } = camera;

  return (
    <div className="-top-8 z-10 flex flex-col justify-center items-center bg-blue-2 shadow-xl mx-auto px-6 py-6 border-2 border-blue-8 rounded-2xl w-[95vw] md:w-[70vw] lg:w-[60vw] h-[70vh]">
      {!isSessionActive ? (
        <>
          <span className="bg-pink-400 mb-6 p-6 rounded-full">
            <FaCamera size={50} color="white" />
          </span>
          <article className="flex flex-col items-center gap-4 shadow-blue-8 mb-10 w-[85%] text-cst text-center">
            <h1 className="text-[clamp(1.75rem,3vw,2.5rem)]">
              Ready to Start?
            </h1>
            <p className="text-[clamp(1.25rem,2vw,1.5rem)]">
              You will take 4 photos, then customize your photo strip with
              filters, stickers, and themes.
            </p>
          </article>
          <button
            disabled={isSessionActive}
            onClick={startSession}
            className="bg-blue-9 hover:bg-blue-8 disabled:opacity-85 px-8 pt-3 pb-4 rounded-full text-white text-2xl"
          >
            {isSessionActive ? "Loading..." : "Start Session"}
          </button>
        </>
      ) : (
        <CameraWorkspace camera={camera} />
      )}
    </div>
  );
};

export default SessionLauncher;
