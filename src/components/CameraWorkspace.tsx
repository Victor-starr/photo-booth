"use client";
import { useState, useRef, useEffect } from "react";
import CaptureCountdown from "./CaptureCountdown";
import PhotoCaptureControls from "./PhotoCaptureControls";

interface CameraRef {
  takePhoto: () => string;
  switchCamera?: () => void;
  getNumberOfCameras?: () => number;
}

const CameraWorkspace = () => {
  const camera = useRef<CameraRef>(null!);
  const [cameraAspectRatio, setCameraAspectRatio] = useState(false);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [numberOfCameras, setNumberOfCameras] = useState(0);
  const [countdownTrigger, setCountdownTrigger] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState<
    "granted" | "denied" | "prompt"
  >("prompt");

  useEffect(() => {
    navigator.permissions
      .query({ name: "camera" as PermissionName })
      .then((result) => {
        setPermissionStatus(result.state);

        result.onchange = () => {
          setPermissionStatus(result.state);
        };
      })
      .catch(() => {
        setPermissionStatus("prompt");
      });
  }, []);

  const handleTakePhoto = () => {
    if (loading) return;
    setLoading(true);
    setCountdownTrigger(true);

    setTimeout(() => {
      if (camera.current) {
        const photo = camera.current.takePhoto();
        setImage(photo);
      }
    }, 3000);

    setTimeout(() => {
      setCountdownTrigger(false);
      setLoading(false);
    }, 6000);
  };

  const handleSwitchCamera = () => {
    if (camera.current && camera.current.switchCamera) {
      camera.current.switchCamera();
    }
  };

  const cameraAspectRatioChange = () => {
    setCameraAspectRatio((prev) => !prev);
  };

  return (
    <>
      <CaptureCountdown image={image} triggerCountdown={countdownTrigger} />
      <div
        className={`relative w-full  sm:max-w-[400px] md:max-w-none bg-black shadow-2xl border-4 border-blue-8 rounded-2xl flex justify-center items-center transition-all duration-300 ${
          cameraAspectRatio ? " h-[75%]" : " lg:w-[50%] h-full"
        }`}
      >
        {/* Mobile rotation hint - only shows on small screens */}
        <div className="md:hidden top-2 left-2 z-10 absolute bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs">
          💡 Rotate phone for landscape
        </div>
        {permissionStatus !== "prompt" ? (
          permissionStatus === "granted" ? (
            <PhotoCaptureControls
              cameraRef={camera}
              onTakePhoto={handleTakePhoto}
              onToggleAspectRatio={cameraAspectRatioChange}
              onSwitchCamera={handleSwitchCamera}
              cameraCount={numberOfCameras}
              loading={loading}
              setCameraCount={setNumberOfCameras}
            />
          ) : (
            <div className="p-4 text-white text-center">
              {permissionStatus === "denied"
                ? "Camera access denied. Please enable it in your browser settings."
                : "Please grant camera access to start."}
            </div>
          )
        ) : (
          <div className="p-4 text-white text-center">
            Checking camera permissions…
          </div>
        )}
      </div>
    </>
  );
};

export default CameraWorkspace;
