"use client";
import { useState, useRef, useEffect } from "react";
import PhotoCountDown from "./CaptureCountdown";
import CameraControls from "./PhotoCaptureControls";

interface CameraRef {
  takePhoto: () => string;
  switchCamera?: () => void;
  getNumberOfCameras?: () => number;
}

const CameraSection = () => {
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
      <PhotoCountDown image={image} triggerCountdown={countdownTrigger} />
      <div
        className={`relative bg-black shadow-2xl border-4 border-blue-8 rounded-2xl flex justify-center items-center transition-all duration-300 ${
          cameraAspectRatio ? "w-[65%] h-[75%]" : "w-[50%] h-full"
        }`}
      >
        {permissionStatus !== "prompt" ? (
          permissionStatus === "granted" ? (
            <CameraControls
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

export default CameraSection;
