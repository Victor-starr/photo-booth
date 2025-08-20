import { Camera } from "react-camera-pro";
import { UseCameraReturn } from "@/lib/types/camera";
import { MdOutlineFlipCameraAndroid } from "react-icons/md";
import { IoMdQrScanner } from "react-icons/io";
import { FaCamera } from "react-icons/fa";

const PhotoCaptureControls = ({ camera }: { camera: UseCameraReturn }) => {
  const {
    cameraRef,
    takePhoto,
    switchCamera,
    toggleAspectRatio,
    numberOfCameras,
    isCapturing,
    setCameraCount,
    numOfTakenPhotos,
  } = camera;

  return (
    <>
      <h2 className="inline-block top-10 lg:top-2 left-2 z-10 absolute bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs">
        You have {numOfTakenPhotos} photos left
      </h2>
      <Camera
        ref={cameraRef}
        aspectRatio="cover"
        numberOfCamerasCallback={setCameraCount}
        errorMessages={{
          noCameraAccessible: "No camera accessible.",
          permissionDenied: "Permission denied.",
          switchCamera: "Only one camera available.",
          canvas: "Canvas is not supported.",
        }}
      />
      <button
        onClick={toggleAspectRatio}
        className="hidden md:block lg:block top-2 right-2 absolute bg-black/50 hover:bg-black/70 shadow-lg p-2 rounded-full text-white"
        title="Toggle Aspect Ratio"
      >
        <IoMdQrScanner />
      </button>

      <button
        onClick={takePhoto}
        disabled={isCapturing}
        className="bottom-2 left-1/2 z-10 absolute bg-pink-400 hover:bg-pink-500 active:bg-pink-600 disabled:opacity-75 shadow-lg p-4 rounded-full font-bold text-white hover:scale-105 transition-all -translate-x-1/2 duration-200 transform"
      >
        {isCapturing ? (
          <span className="inline-block border-2 border-white border-t-transparent rounded-full w-6 h-6 animate-spin"></span>
        ) : (
          <FaCamera size={24} />
        )}
      </button>

      {numberOfCameras > 1 && (
        <button
          onClick={switchCamera}
          className="top-4 right-4 absolute bg-black/50 hover:bg-black/70 shadow-lg backdrop-blur-sm p-3 rounded-full text-white transition-all duration-200"
          title="Switch Camera"
        >
          <MdOutlineFlipCameraAndroid />
        </button>
      )}
    </>
  );
};

export default PhotoCaptureControls;
