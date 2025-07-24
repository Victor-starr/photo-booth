"use client";

import { Camera } from "react-camera-pro";
import { FaCamera } from "react-icons/fa";
import { MdOutlineFlipCameraAndroid } from "react-icons/md";
import { IoMdQrScanner } from "react-icons/io";
import { RefObject } from "react";

interface CameraRef {
  takePhoto: () => string;
  switchCamera?: () => void;
  getNumberOfCameras?: () => number;
}

interface CameraControlsProps {
  cameraRef: RefObject<CameraRef>;
  onTakePhoto: () => void;
  onToggleAspectRatio: () => void;
  onSwitchCamera: () => void;
  cameraCount: number;
  loading: boolean;
  setCameraCount: (count: number) => void;
}

const PhotoCaptureControls = ({
  cameraRef,
  onTakePhoto,
  onToggleAspectRatio,
  onSwitchCamera,
  cameraCount,
  loading,
  setCameraCount,
}: CameraControlsProps) => {
  return (
    <>
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
      {/* Only show aspect ratio toggle on non-mobile devices */}
      <button
        onClick={onToggleAspectRatio}
        className="hidden md:block top-2 right-2 absolute bg-white/50 hover:bg-white/70 shadow-lg p-2 rounded-full text-white"
        title="Toggle Aspect Ratio"
      >
        <IoMdQrScanner />
      </button>

      <button
        onClick={onTakePhoto}
        disabled={loading}
        className="bottom-2 left-1/2 z-10 absolute bg-pink-400 hover:bg-pink-500 active:bg-pink-600 disabled:opacity-75 shadow-lg p-4 rounded-full font-bold text-white hover:scale-105 transition-all -translate-x-1/2 duration-200 transform"
      >
        {loading ? (
          <span className="inline-block border-2 border-white border-t-transparent rounded-full w-6 h-6 animate-spin"></span>
        ) : (
          <FaCamera size={24} />
        )}
      </button>

      {cameraCount > 1 && (
        <button
          onClick={onSwitchCamera}
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
