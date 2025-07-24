import { UseCameraReturn } from "@/lib/types/camera";
import PhotoCaptureControls from "./PhotoCaptureControls";
import CaptureCountdown from "./CaptureCountdown";

interface CameraWorkspaceProps {
  camera: UseCameraReturn;
}

const CameraWorkspace = ({ camera }: CameraWorkspaceProps) => {
  const {
    permissionStatus,
    isCountdownActive,
    countdownValue,
    capturedImage,
    isWideAspectRatio,
    requestPermission,
    isRequestingPermission,
  } = camera;
  return (
    <>
      <CaptureCountdown
        isActive={isCountdownActive}
        countdownValue={countdownValue}
        capturedImage={capturedImage}
      />

      <div
        className={`relative bg-black shadow-2xl border-4 border-blue-8 rounded-2xl flex justify-center items-center transition-all duration-300
          w-full h-full sm:w-[90%] sm:h-full
          ${
            isWideAspectRatio
              ? "md:w-full md:h-[50%] lg:w-full lg:h-[60%]"
              : "md:w-[45%] md:h-full lg:w-[50%] lg:h-full"
          }
        `}
      >
        <div className="md:hidden top-2 left-2 z-10 absolute bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs">
          💡 Rotate phone for landscape
        </div>
        {permissionStatus === "granted" ? (
          <PhotoCaptureControls camera={camera} />
        ) : (
          <div className="flex flex-col items-center gap-4 p-6 text-white text-center">
            <div>
              {permissionStatus === "denied"
                ? "Camera access denied. Please enable it in your browser settings."
                : permissionStatus === "prompt"
                ? "Camera access is required to take photos."
                : "Please grant camera access to start."}
            </div>
            {permissionStatus !== "denied" && (
              <button
                onClick={requestPermission}
                disabled={isRequestingPermission}
                className="bg-pink-400 hover:bg-pink-500 disabled:opacity-75 px-6 py-3 rounded-lg text-white transition-all duration-200 disabled:cursor-not-allowed"
              >
                {isRequestingPermission
                  ? "Requesting Access..."
                  : "Enable Camera"}
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};
export default CameraWorkspace;
